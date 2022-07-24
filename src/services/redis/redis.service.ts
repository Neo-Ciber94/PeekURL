import redisInstance from "src/database/redis";
import superjson from 'superjson';

export type Transformer = {
    parse: <T = unknown>(json: string) => T;
    stringify: (obj: unknown) => string;
}

export interface RedisServiceOptions {
    baseKey: string;
    transform?: Transformer
}

export type RedisSetOptions = {
    expiresInSeconds?: number;
}

export type GetOrSetFactory<T> = (key: string) => T;

export class RedisService<T> {
    private readonly transformer: Transformer;
    private readonly baseKey: string;

    constructor(options: RedisServiceOptions) {
        if (options.baseKey.trim().length === 0) {
            throw new Error("Base key cannot be empty");
        }

        this.transformer = options.transform || defaultTransformer();
        this.baseKey = options.baseKey;
    }

    async get(key: string): Promise<T | null> {
        const json = await redisInstance.get(this.keyFor(key));

        if (json == null) {
            return null;
        }

        const obj = this.transformer.parse<T>(json);
        return obj;
    }

    async *getAllAsIterator(): AsyncIterable<T> {
        const scanIterator = redisInstance.scanIterator({
            MATCH: `${this.baseKey}/*`
        })

        for await (const key of scanIterator) {
            const json = await redisInstance.get(key);

            if (json) {
                const obj = this.transformer.parse<T>(json);
                yield obj;
            }
        }
    }

    async getAll(): Promise<T[]> {
        const result: T[] = [];

        for await (const value of this.getAllAsIterator()) {
            result.push(value);
        }

        return result;
    }

    async set(key: string, value: T, options: RedisSetOptions = {}): Promise<T | null> {
        const keyString = this.keyFor(key);
        const valueString = this.transformer.stringify(value);

        let json: string | null;

        if (options.expiresInSeconds) {
            json = await redisInstance.setEx(key, options.expiresInSeconds, valueString);
        } else {
            json = await redisInstance.set(keyString, valueString);
        }

        if (json == null) {
            return null;
        }

        const obj = this.transformer.parse<T>(json);
        return obj;
    }

    async remove(key: string): Promise<T | null> {
        const json = await redisInstance.getDel(this.keyFor(key));

        if (json == null) {
            return null;
        }

        const obj = this.transformer.parse<T>(json);
        return obj;
    }

    ///// Utilities

    async getAllByQuery(predicate: (value: T) => boolean): Promise<T[]> {
        const result: T[] = [];

        for await (const value of this.getAllAsIterator()) {
            if (predicate(value)) {
                result.push(value);
            }
        }

        return result;
    }

    async getOrSet(key: string, factory: (key: string) => Promise<T> | T): Promise<T> {
        let result = await this.get(key);

        if (result == null) {
            result = await factory(key);
            await this.set(key, result);
        }

        return result!;
    }

    async exists(key: string): Promise<boolean> {
        const result = await redisInstance.exists(this.keyFor(key));
        return result > 0;
    }

    private keyFor(key: string): string {
        return `${this.baseKey}:${key}`;
    }
}

function defaultTransformer(): Transformer {
    return {
        parse: superjson.parse,
        stringify: superjson.stringify,
    }
}
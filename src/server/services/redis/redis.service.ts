import Redis from "ioredis";
import superjson from "superjson";

export type Transformer = {
  parse: <T = unknown>(json: string) => T;
  stringify: (obj: unknown) => string;
};

export interface RedisServiceOptions {
  client: Redis;
  baseKey: string;
  transform?: Transformer;
}

export type RedisSetOptions = {
  expiresInSeconds?: number;
};

export type GetOrSetFactory<T> = (key: string) => T;

export class RedisService<T> {
  private readonly client: Redis;
  private readonly transformer: Transformer;
  private readonly baseKey: string;

  constructor(options: RedisServiceOptions) {
    if (options.baseKey.trim().length === 0) {
      throw new Error("Base key cannot be empty");
    }

    this.client = options.client;
    this.transformer = options.transform || defaultTransformer();
    this.baseKey = options.baseKey;
  }

  async get(key: string): Promise<T | null> {
    const json = await this.client.get(this.keyFor(key));

    if (json == null) {
      return null;
    }

    const obj = this.transformer.parse<T>(json);
    return obj;
  }

  async *getAllAsIterator(): AsyncIterable<T> {
    let cursor = 0;

    while (true) {
      const [cursorString, keys] = await this.client.scan(
        cursor,
        "MATCH",
        `${this.baseKey}/*`
      );

      for (const key of keys) {
        const json = await this.client.get(key);

        if (json) {
          const obj = this.transformer.parse<T>(json);
          yield obj;
        }
      }

      cursor = Number(cursorString);

      if (Number.isNaN(cursor) || cursor === 0) {
        break;
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

  async set(
    key: string,
    value: T,
    options: RedisSetOptions = {}
  ): Promise<T | null> {
    const keyString = this.keyFor(key);
    const valueString = this.transformer.stringify(value);

    let json: string | null;

    if (options.expiresInSeconds) {
      json = await this.client.setex(
        key,
        options.expiresInSeconds,
        valueString
      );
    } else {
      json = await this.client.set(keyString, valueString);
    }

    if (json == null) {
      return null;
    }

    const obj = this.transformer.parse<T>(json);
    return obj;
  }

  async remove(key: string): Promise<T | null> {
    const json = await this.client.getdel(this.keyFor(key));

    if (json == null) {
      return null;
    }

    const obj = this.transformer.parse<T>(json);
    return obj;
  }

  close() {
    this.client.disconnect();
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

  async getOrSet(
    key: string,
    factory: (key: string) => Promise<T> | T
  ): Promise<T> {
    let result = await this.get(key);

    if (result == null) {
      result = await factory(key);
      await this.set(key, result);
    }

    return result!;
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(this.keyFor(key));
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
  };
}

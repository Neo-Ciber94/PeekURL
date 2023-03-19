
export type StoreEvent = 'save' | 'load';

export type StoreMiddleware<T> = (data: T | null, event: StoreEvent) => Promise<T | null> | T | null;

export interface IStore<T> {
    save(data: T | null): Promise<void>;
    load(): Promise<T | null>;
}

export abstract class BaseStore<T> implements IStore<T> {
    private middlewares: StoreMiddleware<T>[] = [];

    constructor(middlewares: StoreMiddleware<T>[]) {
        this.middlewares = middlewares || [];
    }

    private async runMiddlewares(data: T | null, event: StoreEvent): Promise<T | null> {
        const middlewares = this.middlewares.slice();
        let result = data;

        for (const middleware of middlewares) {
            result = await middleware(result, event);
        }

        return result;
    }

    addMiddleware(middleware: StoreMiddleware<T>): void {
        this.middlewares.push(middleware);
    }

    async save(data: T | null): Promise<void> {
        const result = await this.runMiddlewares(data, 'save');
        this.doSave(result);
    }

    async load(): Promise<T | null> {
        const data = await this.doLoad();
        return this.runMiddlewares(data, 'load');
    }

    protected abstract doSave(data: T | null): void;
    protected abstract doLoad(): T | null;
}
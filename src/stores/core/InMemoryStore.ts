import { BaseStore, IStore, StoreMiddleware } from "./store";

export class InMemoryStore<T> extends BaseStore<T> {
    private data: T | null = null;

    constructor(initialValue: T | null = null, middlewares: StoreMiddleware<T>[] = []) {
        super(middlewares)
        this.data = initialValue;
    }

    protected doSave(data: T | null): void {
        this.data = data;
    }

    protected doLoad(): T | null {
        return this.data;
    }
}

export interface InMemoryStoreOptions<T> {
    initialValue?: T | null;
    middlewares?: StoreMiddleware<T>[];
    onLoad?: (data: Readonly<T> | null) => void;
    onSave?: (data: Readonly<T> | null) => void;
}

export function createInMemoryStore<T>(options: InMemoryStoreOptions<T> = {}): IStore<T> {
    const initialValue = options.initialValue || null;
    const middlewares = options.middlewares || [];

    const onLoad = options.onLoad;
    const onSave = options.onSave;

    if (onLoad) {
        middlewares.push((data, event) => {
            if (event === 'load') {
                onLoad(data);
            }

            return data;
        })
    }

    if (onSave) {
        middlewares.push((data, event) => {
            if (event === 'save') {
                onSave(data);
            }

            return data;
        })
    }

    const store = new InMemoryStore<T>(initialValue, middlewares);
    return store;
}
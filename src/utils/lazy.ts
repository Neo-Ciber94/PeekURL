
interface LazyInit<T> {
    type: 'init',
    value: T
}

interface LazyUninit<T> {
    type: 'uninit',
    factory: () => T
}

type LazyState<T> = LazyInit<T> | LazyUninit<T>;

/**
 * A lazy evaluated value.
 */
export class Lazy<T> {
    #state: LazyState<T>;

    constructor(factory: () => T) {
        this.#state = {
            type: 'uninit',
            factory
        }
    }

    /**
     * Whether if this lazy instance is already initialized.
     */
    isInitialized(): boolean {
        return this.#state.type === 'init';
    }

    /**
     * Gets the value.
     */
    get(): T {
        const state = this.#state;
        let returnValue: T;

        switch (state.type) {
            case 'init':
                returnValue = state.value;
                break;
            case 'uninit':
                {
                    const temp = state.factory();
                    this.#state = { type: 'init', value: temp };
                    returnValue = temp;
                }
                break;
            default:
                throw new Error("Invalid state");
        }

        return returnValue;
    }
}
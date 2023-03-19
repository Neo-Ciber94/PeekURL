import { useRef } from "react";


export function useValue<T>(valueOrFactory: T | (() => T)) {
    const { current } = useRef(getValue(valueOrFactory));
    return current;
}

function getValue<T>(valueOrFactory: T | (() => T)): T {
    if (typeof valueOrFactory === 'function') {
        const f = valueOrFactory as () => T;
        return f();
    }

    return valueOrFactory;
}
import { useEffect, useRef } from "react";

export const useSkipEffect = (fn, deps = []) => {
    const called = useRef(false);

    const operation = () => {
        if (called.current) return fn();
        called.current = true;
    }
    useEffect(operation, deps)
}
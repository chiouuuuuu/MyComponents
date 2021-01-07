import { useMemo, useState } from "react";
export function useStateAnimation(parentSetState, delay = 300) {
    const [state, setState] = useState(true);
    const [innerClose, unmount] = useMemo(() => {
        let timer;
        let innerclose = (v) => {
            setState(v);
            timer = window.setTimeout(() => {
                parentSetState(v);
                setState(true);
            }, delay);
        };
        let unmount = () => window.clearTimeout(timer);
        return [innerclose, unmount];
    }, [setState, parentSetState, delay]);
    return [state, innerClose, unmount];
}

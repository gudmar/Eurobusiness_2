import { useEffect, useState } from "react";

export const useIsTimeout = (time: number) => {
    const [isTimeout, setIsTimeout] = useState<boolean>(false)
    useEffect(
        () => {
            const timeout = setTimeout( () => setIsTimeout(true), time)
            return () => clearTimeout(timeout);
        },
    [])
    return isTimeout
}
export type tDoAfterTimeout = () => void
export const useDoAfterTimeout = (time: number, callback: tDoAfterTimeout) => {
    const isTimeout = useIsTimeout(time);
    useEffect(() => { if (isTimeout) callback();}, [isTimeout, callback])
}

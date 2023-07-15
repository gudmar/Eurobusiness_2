import { useEffect, useRef } from "react"

export const useCreateSingleton = (singletonClass: any, ...props: any[]) => {
    const singletonInstance = useRef();
    useEffect(() => {
        const singleton = new singletonClass(...props);
        singletonInstance.current = singleton;
    }, [])
    return singletonInstance.current;
}
import { useEffect, useState } from "react";

export const useClock = (interval: number) => {
    const [time, setTime] = useState<number>(0);
    useEffect(() => {
        const i = setInterval(() => {
            const t = time > Number.MAX_SAFE_INTEGER ? 0 : time;
            setTime(t + interval);
        }, interval)
        return () => clearInterval(i);
    }, [time, setTime, interval])

    return { time, reset: () => setTime(0) }
}

export const useSwitchableClock = (interval: number) => {
    const [grade, setGrade] = useState<number>(0);
    const [isOn, setOn] = useState<boolean>(false);
    useEffect(() => { if (isOn) setGrade(interval); }, [isOn, setGrade, interval])
    const {time} = useClock(grade);
    return {time, setOn: () => setOn(true)}
}

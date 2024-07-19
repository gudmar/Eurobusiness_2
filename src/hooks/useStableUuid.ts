import { useMemo } from "react"
import { getUuid } from '../Functions/getUuid'

export const useStableUuid = () => {
    const uuid = useMemo(() => getUuid(), []);
    return uuid;
}

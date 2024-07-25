import { ESTATES } from "../Data/const";

export const isEstateName = (name: string) => {
    const result = ESTATES.includes(name);
    return result;
}

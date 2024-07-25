import { FC } from "react";
import { isEstateName } from "../../Functions/isEstateName";
import { tObject } from "../../Logic/types";


export const withAlternativeComponent = (AlternativeComponent: FC<any>) => ({estateName, ...props}: {estateName: string, [key: string]: any}) => {
    if (!isEstateName(estateName)) {
        return <AlternativeComponent estateName={estateName} { ...props }/>
    }
    return null;
}

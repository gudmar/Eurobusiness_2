import { FC } from "react";
import { tObject } from "../../Logic/types";
import { useStyles } from "./styles"

export const withPresentReason = (Actions: FC<tObject<any>>) => ({reason, actions}: tObject<any>) => {
    const classes = useStyles();
    if (reason) return (<div className={classes.smallReason}>{reason}</div>)
    return (
        <Actions actions={actions} />
    )
}

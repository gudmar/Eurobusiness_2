import { useIconStyles } from "./styles"
import { FC } from "react";

const withIcon = (IconComponent: FC<any>) => ({...props}) => {
    const classes = useIconStyles();

    return (
        <div className={props.className} onClick={props.onClick}>
            <IconComponent className={classes.icon}/>
        </div>
    )
}

export default withIcon
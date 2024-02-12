import { useClasses } from "./styles";

export enum ButtonColorScheme {
    alert = 'alert',
    success = 'success',
    info = 'info',
}

export interface iButton {
    disabled?: boolean,
    label?: string,
    action?: () => void,
    colorVariant?: ButtonColorScheme,
    disabledTooltip?: string,
}

export const Button = ({
    disabled = false,
    label = 'Button',
    action = () => {},
    colorVariant = ButtonColorScheme.info,
    disabledTooltip = 'Button is disabled for some reason'
}: iButton) => {
    const classes = useClasses();
    const getCalculatedClass = (): string => {
        if (disabled) return `${classes.button} ${classes.center} ${classes.disabled}`;
        if (colorVariant === ButtonColorScheme.alert) return   `${classes.button} ${classes.center} ${classes.alert}`
        if (colorVariant === ButtonColorScheme.success) return `${classes.button} ${classes.center} ${classes.success}`
        if (colorVariant === ButtonColorScheme.info) return    `${classes.button} ${classes.center} ${classes.info}`
        return classes.center;
    }
    const onActication = () => { if (!disabled) action() }
    return (
        <div className={classes.housing}>
            {disabled && <div className={classes.tooltip}>{disabledTooltip}</div> }
            <div className={getCalculatedClass()} onClick = {onActication}>
                { label }
            </div>
        </div>
    )


}
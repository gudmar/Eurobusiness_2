import { useClasses } from "./styles";

export enum ButtonColorScheme {
    alert = 'alert',
    success = 'success',
    info = 'info',
    primary = 'primary',
    secondary = 'secondary',
}

export interface iButton {
    disabled?: boolean,
    label?: string,
    action?: () => void,
    colorVariant?: ButtonColorScheme,
    disabledTooltip?: string,
    selected?: boolean,
}

export const Button = ({
    disabled = false,
    selected = false,
    label = 'Button',
    action = () => {},
    colorVariant = ButtonColorScheme.info,
    disabledTooltip = 'Button is disabled for some reason'
}: iButton) => {
    const classes = useClasses();
    const getCalculatedClass = (): string => {
        if (disabled) return `${classes.button} ${classes.center} ${classes.disabled}`;
        if (selected) return `${classes.button} ${classes.center} ${classes.disabled}`;
        if (colorVariant === ButtonColorScheme.alert) return   `${classes.button} ${classes.center} ${classes.alert}`
        if (colorVariant === ButtonColorScheme.success) return `${classes.button} ${classes.center} ${classes.success}`
        if (colorVariant === ButtonColorScheme.info) return    `${classes.button} ${classes.center} ${classes.info}`
        if (colorVariant === ButtonColorScheme.primary) return    `${classes.button} ${classes.center} ${classes.primary}`
        if (colorVariant === ButtonColorScheme.secondary) return    `${classes.button} ${classes.center} ${classes.secondary}`
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

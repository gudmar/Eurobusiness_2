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
}

export const Button = ({
    disabled = false,
    label = 'Button',
    action = () => {},
    colorVariant = ButtonColorScheme.info,
}: iButton) => {
    const classes = useClasses();
    const getCalculatedClass = (): string => {
        if (disabled) return `${classes.center} ${classes.disabled}`;
        if (colorVariant === ButtonColorScheme.alert) return `${classes.center} ${classes.alert}`
        if (colorVariant === ButtonColorScheme.success) return `${classes.center} ${classes.success}`
        if (colorVariant === ButtonColorScheme.info) return `${classes.center} ${classes.info}`
        return classes.center;
    }
    const onActication = () => { if (!disabled) action() }
    return (
        <div className={classes.housing}>
            <div className={getCalculatedClass()} onClick = {onActication}>
                { label }
            </div>
        </div>
    )


}
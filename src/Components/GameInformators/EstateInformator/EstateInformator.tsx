
export interface Props {
    name: string
}

export const EstatesInformator = ({name}: Props) => {
    console.warn('Name type can be more narrow')
    return (<>Information about estate {name}</>)
}
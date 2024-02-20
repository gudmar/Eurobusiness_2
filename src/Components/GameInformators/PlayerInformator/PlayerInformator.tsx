export interface Props {
    name: string,
}

export const PlayerInformator = ({name}: Props) => {
    return (<>Information about player: {name}</>)
}

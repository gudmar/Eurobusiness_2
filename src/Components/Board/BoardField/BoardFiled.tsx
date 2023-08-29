import { ReactNode } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CHANCE_BLUE, CHANCE_RED, CITY, FREE_PARK, GUARDED_PARKING, JAIL, PLANT, RAILWAY, START, TAX } from "../../../Data/const";
import CityBoardField from "./CityBoardField";
import EnterpriseBoardField from "./EnterpriseBoardField";
import FreeParkingField from "./FreeParkingField";
import JailField from "./JailField";
import StartField from "./StartField";
import { useStyles } from "./styels";
import { ChanceBlueField, ChanceRedField } from "./withChanceField";

const getField = (props: any): ReactNode => {
    switch (props.type) {
        case CITY: return <CityBoardField />;
        case PLANT:
        case TAX:
        case GUARDED_PARKING:
        case RAILWAY: return <EnterpriseBoardField />;
        case CHANCE_BLUE: return <ChanceBlueField />;
        case CHANCE_RED: return <ChanceRedField />;
        case START: return <StartField />;
        case FREE_PARK: return <FreeParkingField />
        case JAIL: return <JailField />
        default: return <></>
    }
}

const BoardField = (props: any) => {
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div>
            {getField(props)}
        </div>
    )
}

export default BoardField

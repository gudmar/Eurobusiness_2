import { ReactNode } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CHANCE_BLUE, CHANCE_RED, CITY, FREE_PARK, GO_TO_JAIL, GUARDED_PARKING, JAIL, PLANT, RAILWAY, START, TAX } from "../../../Data/const";
import { useClasses } from "../../Pawns/styles";
import CityBoardField from "./CityBoardField";
import EnterpriseBoardField from "./EnterpriseBoardField";
import FreeParkingField from "./FreeParkingField";
import GoToJail from "./GoToJail";
import JailField from "./JailField";
import OtherBoardField from "./OtherBoardField";
import StartField from "./StartField";
import { useStyles } from "./styels";
import { ChanceBlueField, ChanceRedField } from "./withChanceField";

const getField = (props: any): ReactNode => {
    switch (props.type) {
        case CITY: return <CityBoardField {...props} />;
        case GUARDED_PARKING: 
        case TAX: return <OtherBoardField {...props} />;
        case PLANT:
        case RAILWAY: return <EnterpriseBoardField {...props}/>;
        case CHANCE_BLUE: return <ChanceBlueField  {...props}/>;
        case CHANCE_RED: return <ChanceRedField  {...props}/>;
        case START: return <StartField  {...props}/>;
        case FREE_PARK: return <FreeParkingField  {...props}/>
        case JAIL: return <JailField  {...props}/>
        case GO_TO_JAIL: return <GoToJail {...props}/>
        default: return <></>
    }
}

const BoardField = (props: any) => {
    // const { theme } = useThemesAPI();
    // const classes = useClasses();
    // const classes = useStyles(theme as any);
    return (
        <>
            {getField(props)}
        </>
    )
}

export default BoardField

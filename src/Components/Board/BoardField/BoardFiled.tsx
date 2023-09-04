import { ReactNode } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { CHANCE_BLUE, CHANCE_RED, CITY, FREE_PARK, GUARDED_PARKING, JAIL, PLANT, RAILWAY, START, TAX } from "../../../Data/const";
import { OtherFieldTypesField } from "../../../Logic/FieldCreators";
import CityBoardField from "./CityBoardField";
import EnterpriseBoardField from "./EnterpriseBoardField";
import FreeParkingField from "./FreeParkingField";
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
        default: return <></>
    }
}

const BoardField = (props: any) => {
    const { theme } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <>
            {getField(props)}
        </>
    )
}

export default BoardField

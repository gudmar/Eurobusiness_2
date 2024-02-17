import { useEffect, useState } from "react";
import { useThemesAPI } from "../../../Contexts/ThemeContext";
import { Color } from "../../../Functions/Color/Color";
import { PlayerToken } from "../../InfoTokens/PlayerToken";
import { StateEditorForm } from "../../StateEditorForm/StateEditorForm";
import { StateEditorEntry } from "../../StateEditorForm/StateEditorFormEntry";
import { useStyles } from "./styles";

type tColorSlider = {value: number, setValue: (v: number) => void, colorName: string};

const ColorSlider = ({value, setValue, colorName}: tColorSlider) => {
    return (
        <input type={'range'} id={colorName} min={0} max={255} step={1} onChange={
            (e) => {
                setValue(+e.target.value)
            }}
            // :React.ChangeEventHandler<HTMLInputElement>
            />
    )
}

const useColors = (initialValues = [128, 128, 128]) => {
    const [red, setRed] = useState(initialValues[0]);
    const [green, setGreen] = useState(initialValues[1]);
    const [blue, setBlue] = useState(initialValues[2]);
    const [complementaryColor, setComplementaryColor] = useState('#000')
    useEffect(() => {
        const color = new Color(Color.getColorAsRgbString([red, green, blue]))
        const complementary = color.contrastColor;
        setComplementaryColor(complementary);
    }, [
        red, setRed, green, setGreen, blue, setBlue
    ])
    useEffect(() => console.log(complementaryColor), [complementaryColor])
    return {
        red, setRed, green, setGreen, blue, setBlue,
        color: Color.getColorAsRgbString([red, green, blue]),
        complementaryColor
    }
}


export const ViewTester = () => {
    const { theme } = useThemesAPI();
    const classes: {[key:string]: string} = useStyles(theme as any);
    const {red, blue, green, setRed, setBlue, setGreen, color, complementaryColor} = useColors();
    const log = () => {
        console.log('I do nothing for now')
    }
    return (
        <StateEditorForm
            headline={'Testing contrast'}
            logAction={log}
            formName={'testing contrast'}
        >
            <StateEditorEntry
                title='Red'
                currentValue={red}
            >
                <ColorSlider
                    colorName={'Red'}
                    value={red}
                    setValue={setRed}
                />
            </StateEditorEntry>
            <StateEditorEntry
                title='Green'
                currentValue={green}
            >
                <ColorSlider
                    colorName={'Green'}
                    value={green}
                    setValue={setGreen}
                />
            </StateEditorEntry>
            <StateEditorEntry
                title='Blue'
                currentValue={blue}
            >
                <ColorSlider
                    colorName={'Blue'}
                    value={blue}
                    setValue={setBlue}
                />
            </StateEditorEntry>
            <StateEditorEntry
                title='Result'
                currentValue={complementaryColor}
            >
                <div className={classes.colorResult}
                    style={{
                        color: complementaryColor,
                        backgroundColor: color
                    }}
                >Content</div>
            </StateEditorEntry>
            <StateEditorEntry
                title='Player token'
                currentValue=''
            >
                <PlayerToken
                    color={color}
                    name={'John Doe'}
                />
            </StateEditorEntry>

        </StateEditorForm>
    )
}
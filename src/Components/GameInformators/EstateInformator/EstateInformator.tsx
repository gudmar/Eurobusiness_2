import { BANK, CITY } from "../../../Data/const";
import { Color } from "../../../Functions/Color/Color";
import { getBoard, getEstate } from "../../../Logic/BoardCaretaker";
import { Players } from "../../../Logic/Players/Players";
import { tSelectedEstate } from "../../../Types/types";
import { useEstatesEditor } from "../../StateEditor/EstatesStateEditor/useEstatesEditor";
import { ReportDocument } from "../ReportDocument/ReportDocument";

export interface Props {
    name: string
}

const describeVisitCosts = (type: string, visit: number[]) => {
    if (type === CITY) {
        const visitWithHouses = visit.slice(0, visit.length - 1).map((cost, index) => `${index} houses: ${cost}$`)
        const result = [
            ...visitWithHouses,
            `Hotel: ${visit[visit.length - 1]}$`
        ]
        return result
    }
    return visit;
}

export const EstatesInformator = ({name}: Props) => {
    console.warn('Name type can be more narrow')
    console.log('name', name)
    
    const estatesInstance = getEstate(name) as tSelectedEstate;
    const {
        isPlegded, nrOfHotels, nrOfHouse,
        country, hotelPrice, housePrice, index, mortgage, price,
        type, visit, owner
    } = useEstatesEditor(estatesInstance);
    console.log('Color', owner)
    const ownerColorInstance = new Color(owner !== BANK ? owner : 'rgb(0,0,0)');
    const ownerColorContrast = ownerColorInstance.contrastColor;
    const playerName = owner === BANK ? BANK : Players.playerColorToPlayerName(owner);
    const visitCost = describeVisitCosts(type, visit)
    
    const data = [
        {propName: 'Owners color', propValue: {color: owner, contrastColor: ownerColorContrast, text: playerName }, ariaLabel: 'Owner', visibility: owner !== BANK},
        {propName: 'Owner', propValue: playerName, ariaLabel: 'Owner'},
        {propName: 'Type', propValue: type, ariaLabel: 'Estate type'},
        {propName: 'Country', propValue: country, ariaLabel: 'Country', visibility: type === CITY},
        {propName: 'Price', propValue: price, ariaLabel: 'Price'},
        {propName: 'Is plegded', propValue: isPlegded, ariaLabel: 'Is plegded'},
        {propName: 'Visit cost', propValue: visitCost, ariaLabel: 'Visit cost'},
        {propName: 'Number of houses', propValue: nrOfHouse, ariaLabel: 'Number of houses', visibility: nrOfHouse > 0},
        {propName: 'Number of hotels', propValue: nrOfHouse, ariaLabel: 'Number of hotels', visibility: nrOfHotels > 0},
        {propName: 'House price', propValue: housePrice, ariaLabel: 'House price', visibility: type === CITY},
        {propName: 'Hotel price', propValue: hotelPrice, ariaLabel: 'Hotel price', visibility: type === CITY},
        {propName: 'Mortgage loan', propValue: mortgage, ariaLabel: 'How much may be loaned when mortgaged'},
        {propName: 'Field index', propValue: index + 1, ariaLabel: 'Field index'},

    ]
    return (
        <ReportDocument
            title={'Estate report'}
            subtitle={`For ${name}`}
            ariaLabel={`Data about player ${name}`}
            data={data}
        />
    )
}
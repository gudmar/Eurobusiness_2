import { memo } from "react";
import withIcon from "./withIcon";
import { ReactComponent as EPIcon } from '../../Icons/ElectricPlantIcon.svg'
import { ReactComponent as FParkIcon } from '../../Icons/freePark.svg'
import { ReactComponent as GTJailIcon } from '../../Icons/goToJail.svg'
import { ReactComponent as JIcon } from '../../Icon/jail.svg'
import { ReactComponent as PIcon } from '../../Icon/parkIcon.svg'
import { ReactComponent as QBlueIcon } from '../../Icon/questionBlue.svg';
import { ReactComponent as QRedIcon } from '../../Icon/questionRed.svg'
import { ReactComponent as RWIcon} from '../../Icon/railway.svg'
import { ReactComponent as StIcon} from '../../Icon/Start.svg'
import { ReactComponent as TIcon } from '../../Icon/tax.svg';
import { ReactComponent as WPIcon } from '../../Icon/waterPlant.svg';

export const ElectricPlantIcon = memo(withIcon(EPIcon))
export const FreeParkIcon = memo(withIcon(FParkIcon))
export const GoToJailIcon = memo(withIcon(GTJailIcon))
export const JailIcon = memo(withIcon(JIcon));
export const ParkIcon = memo(withIcon(PIcon));
export const QuestionBlueIcon = memo(withIcon(QBlueIcon));
export const QuestionRedIcon = memo(withIcon(QRedIcon));
export const TaxIcon = memo(withIcon(TIcon));
export const RailwayIcon = memo(withIcon(RWIcon));
export const StartIcon = memo(withIcon(StIcon));
export const WaterPlantIcon = memo(withIcon(WPIcon));

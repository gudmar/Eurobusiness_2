import { useEffect } from 'react';
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { DARK_THEME } from '../../Themes/darkTheme';
import { GREY_THEME } from '../../Themes/greyTheme';
import { Board } from '../Board/Board';
import CommandArea from '../CommandArea/CommandArea';
import { GameStarter } from './GameStarter';
import { useStyles } from './styles';
const Game = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    return (
        <div className = {classes.screen}>
            <button onClick={() => setThemeName(DARK_THEME.name)}>{DARK_THEME.name}</button>
            <button onClick={() => setThemeName(GREY_THEME.name)}>{GREY_THEME.name}</button>
            Sample text
            {/* <Board></Board>
            <CommandArea></CommandArea> */}
            <GameStarter/>
        </div>
    )
}

export default Game;

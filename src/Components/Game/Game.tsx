import { useEffect } from 'react';
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { useModal } from '../../hooks/useModal';
import { DARK_THEME } from '../../Themes/darkTheme';
import { GREY_THEME } from '../../Themes/greyTheme';
import { Board } from '../Board/Board';
import { Button } from '../Button/Button';
import CommandArea from '../CommandArea/CommandArea';
import { GameStarter } from './GameStarter';
import { useStyles } from './styles';
const Game = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {component: stateEditorButton, setOpen: openStateEditor, setIsOpen: setIsOpenStateEditor} = useModal(() => <></>)
    return (
        <div className = {classes.screen}>
            <Button 
                action = {() => setThemeName(DARK_THEME.name)}
                label = {DARK_THEME.name}
            />
            <Button 
                action = {() => setThemeName(GREY_THEME.name)}
                label = {GREY_THEME.name}
            />
            <Button
                action = {openStateEditor}
                label = {'State Editor'}
            />
            {stateEditorButton}
            <GameStarter/>
        </div>
    )
}

export default Game;

import { useThemesAPI } from '../../Contexts/ThemeContext';
import { useModal } from '../../hooks/useModal';
import { DARK_THEME } from '../../Themes/darkTheme';
import { GREY_THEME } from '../../Themes/greyTheme';
import { Button } from '../Button/Button';
import { PlayerStateEditor } from '../StateEditor/PlayerStateEditor/PlayerStateEditor';
import { GameStarter } from './GameStarter';
import { useStyles } from './styles';
const Game = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {Component: StateEditor, setOpen: openStateEditor, setIsOpen: setIsOpenStateEditor} = useModal(PlayerStateEditor)
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
            {StateEditor ? StateEditor: null}
            <GameStarter/>
        </div>
    )
}

export default Game;

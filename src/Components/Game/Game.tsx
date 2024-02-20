import { GameInformator, useReport } from '../../Contexts/GameInformator.ts/GameInformator';
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { YELLOW } from '../../Data/const';
import { displayError, displayInfo, displayWarning } from '../../Functions/displayMessage';
import { useModal } from '../../hooks/useModal';
import { Commander } from '../../Logic/Commander/Commander';
import { DARK_THEME } from '../../Themes/darkTheme';
import { GREY_THEME } from '../../Themes/greyTheme';
import { Button, ButtonColorScheme } from '../Button/Button';
import { Report } from '../GameInformators/Report/Report';
import { InformationStack } from '../Information/Information';
import { Informator } from '../Information/Infromator';
import { SaveLoadGameWindow } from '../SaveLoadGameWindow/SaveLoadGameWindow';
import { PlayerEditor } from '../StateEditor/StateEditor/StateEditor';
import { GameStarter } from './GameStarter';
import { useStyles } from './styles';

const displayTestInfo = () => {
    displayInfo({
        title: 'Sample infromation',
        message: 'This is a message that should read like it was something interesting'
    })
}

const displayTestWarn = () => {
    displayWarning({
        title: 'Sample warning',
        message: 'This is a message that should read like it was something worring'
    })
}

const displayTestError = () => {
    displayError({
        title: 'Sample error',
        message: 'This is a message that should read like it was something really bad'
    })
}

const logSubscribtions = () => {
    const informator = new Informator();
    informator.logSubscribtions();
}

const moveYellowPlayer = () => {
    Commander.movePlayer(YELLOW)
}

const GameGuts = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {Component: StateEditor, setOpen: openStateEditor, setIsOpen: setIsOpenStateEditor} = useModal(PlayerEditor)
    const {Component: SaveGameDialog, setOpen: openSaveGameWindow, setIsOpen: setIsOpenSaveGameDialog} = useModal(SaveLoadGameWindow)
    return (
        <div className = {classes.screen}>
            <InformationStack />
            <nav className={classes.navigations}>
                <Button 
                    action = {() => setThemeName(DARK_THEME.name)}
                    label = {DARK_THEME.name}
                />
                <Button 
                    action = {() => setThemeName(GREY_THEME.name)}
                    label = {GREY_THEME.name}
                />
                <Button
                    action = {moveYellowPlayer}
                    label = {'Move yellow'}
                />
                <Button
                    action = {openStateEditor}
                    label = {'State Editor'}
                />
                <Button
                    action = {displayTestInfo}
                    label = {'Test info'}
                />
                <Button
                    action = {displayTestWarn}
                    label = {'Test warn'}
                />
                <Button
                    action = {displayTestError}
                    label = {'Test error'}
                />
                <Button
                    action = {logSubscribtions}
                    label = {'Log subscribtions'}
                />
                <Button
                    action = {openSaveGameWindow}
                    label = {'Save game'}
                    colorVariant = {ButtonColorScheme.success}
                />
                <Report/>
            </nav>

            {StateEditor ? StateEditor: null}
            {SaveGameDialog ? SaveGameDialog: null}
            <GameStarter/>
        </div>
    )
}

const Game = () => {
    return (
        <GameInformator>
            <GameGuts />
        </GameInformator>
    )
}

export default Game;

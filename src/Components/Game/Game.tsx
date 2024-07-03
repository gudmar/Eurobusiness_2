import { CurrentLanguageContext } from '../../Contexts/CurrentLanguage/CurrentLanguage';
import { GameInformator } from '../../Contexts/GameInformator.ts/GameInformator';
import { useThemesAPI } from '../../Contexts/ThemeContext';
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
import { SelectLanguage } from '../SelectLanguage/SelectLanguage';
import { PlayerEditor } from '../StateEditor/StateEditor/StateEditor';
import { GameStarter } from './GameStarter';
import { useStyles } from './styles';

import { Game as GameLogic } from '../../Logic/Game/Game';
import { useEffect, useState } from 'react';
import Shutter from '../Shutter/Shutter';
import { getGameState } from '../../Functions/PersistRetrieveGameState/utils';

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

const nextMove = async (lock: (isLocked: boolean) => void) => {
    lock(true)
    const isDone = await Commander.tick();
    lock(!isDone);
}

const logGameSaveState = () => {
    const state = getGameState();
    console.log('Game save state is: ', state)
}

const GameGuts = () => {
    const { theme, setThemeName } = useThemesAPI();
    const [ isMoving, setIsMoving ] = useState<boolean>(false)
    const classes = useStyles(theme as any);
    const {Component: StateEditor, setOpen: openStateEditor, setIsOpen: setIsOpenStateEditor} = useModal(PlayerEditor)
    const {Component: SaveGameDialog, setOpen: openSaveGameWindow, setIsOpen: setIsOpenSaveGameDialog} = useModal(SaveLoadGameWindow)
    useEffect(() => console.log('Is moving', isMoving), [isMoving])
    return (
        <div className = {classes.screen}>
            <InformationStack />
            <Shutter isVisible={isMoving} message={'Pawn moving'} />
            <nav className={classes.navigations}>
                <SelectLanguage />
                <Button 
                    action = {() => setThemeName(DARK_THEME.name)}
                    label = {DARK_THEME.name}
                />
                <Button 
                    action = {() => setThemeName(GREY_THEME.name)}
                    label = {GREY_THEME.name}
                />
                <Button
                    action = {
                        () => nextMove(setIsMoving)
                    }
                    label = {'Next move'}
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
                <Button
                    action = {GameLogic.log}
                    label = {'Log Game logic'}
                />
                <Button
                    action = {logGameSaveState}
                    label = {'Log game save state'}
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
        <CurrentLanguageContext>
            <GameInformator>
                <GameGuts />
            </GameInformator>
        </CurrentLanguageContext>
    )
}

export default Game;

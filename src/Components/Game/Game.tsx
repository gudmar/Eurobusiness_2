import { useThemesAPI } from '../../Contexts/ThemeContext';
import { useModal } from '../../hooks/useModal';
import { DARK_THEME } from '../../Themes/darkTheme';
import { GREY_THEME } from '../../Themes/greyTheme';
import { Button } from '../Button/Button';
import { InformationStack } from '../Information/Information';
import { Informator } from '../Information/Infromator';
import { PlayerEditor } from '../StateEditor/StateEditor/StateEditor';
import { GameStarter } from './GameStarter';
import { useStyles } from './styles';

const displayTestInfo = () => {
    const informator = new Informator();
    informator.displayInfo({
        title: 'Sample infromation',
        message: 'This is a message that should read like it was something interesting'
    })
}

const displayTestWarn = () => {
    const informator = new Informator();
    informator.displayWarning({
        title: 'Sample warning',
        message: 'This is a message that should read like it was something worring'
    })
}

const displayTestError = () => {
    const informator = new Informator();
    informator.displayError({
        title: 'Sample error',
        message: 'This is a message that should read like it was something really bad'
    })
}

const logSubscribtions = () => {
    const informator = new Informator();
    informator.logSubscribtions();
}


const Game = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme as any);
    const {Component: StateEditor, setOpen: openStateEditor, setIsOpen: setIsOpenStateEditor} = useModal(PlayerEditor)
    return (
        <div className = {classes.screen}>
            <InformationStack />
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

            {StateEditor ? StateEditor: null}
            <GameStarter/>
        </div>
    )
}

export default Game;

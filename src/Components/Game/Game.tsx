import { useEffect } from 'react';
import { useThemesAPI } from '../../Contexts/ThemeContext';
import { Board } from '../Board/Board';
import CommandArea from '../CommandArea/CommandArea';
import { useStyles } from './styles';
// import styles from './styles.module.css'
const Game = () => {
    const { theme, setThemeName } = useThemesAPI();
    const classes = useStyles(theme);
    useEffect(()=>console.log(theme, classes), [theme, classes])
    return (
        <div className = {classes.screen}>
            <button onClick={() => setThemeName('Red')}>redBg</button>
            <button onClick={() => setThemeName('Green')}>greenBg</button>
            <Board></Board>
            <CommandArea></CommandArea>
        </div>
    )
}

export default Game;

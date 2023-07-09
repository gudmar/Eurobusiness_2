import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Game from './Components/Game/Game';
import { ThemeContextProvider } from './Contexts/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Game />
    </ThemeContextProvider>
  </React.StrictMode>
);

reportWebVitals();

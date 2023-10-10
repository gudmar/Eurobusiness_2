import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Game from './Components/Game/Game';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { FieldLocationContextProvider } from './Contexts/fieldLocation/useFieldLocation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <FieldLocationContextProvider>
        <Game />
      </FieldLocationContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

reportWebVitals();

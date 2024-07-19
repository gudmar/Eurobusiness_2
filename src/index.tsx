import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Game from './Components/Game/Game';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { FieldLocationContextProvider } from './Contexts/fieldLocation/useFieldLocation';
import CleaningProvider from './Contexts/CleaningContext/CleaningContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CleaningProvider>
        <FieldLocationContextProvider>
          <Game />
        </FieldLocationContextProvider>
      </CleaningProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

reportWebVitals();

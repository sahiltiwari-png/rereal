import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Joga from '../src/components/Joga.tsx'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
     {/* <Joga initialMessages={[{ id: 1, text: "Hello 👋" }]} /> */}
  </StrictMode>
);

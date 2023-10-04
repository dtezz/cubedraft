import React from 'react';
import { render, createRoot } from 'react-dom/client';
import App from './components/app.jsx';
import './style.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);

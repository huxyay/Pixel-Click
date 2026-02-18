import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  // If a crash occurs during mount, display it on screen for debugging
  console.error("Application failed to mount:", error);
  rootElement.innerHTML = `
    <div style="padding: 2rem; color: #7f1d1d; background-color: #fef2f2; border: 2px solid #ef4444; border-radius: 0.5rem; font-family: sans-serif; max-width: 600px; margin: 2rem auto;">
      <h2 style="margin-top: 0; font-weight: bold;">Application Error</h2>
      <p>The application failed to start. This is usually due to a missing dependency or configuration error.</p>
      <pre style="background: rgba(0,0,0,0.05); padding: 1rem; overflow-x: auto; border-radius: 0.25rem;">${error instanceof Error ? error.message : String(error)}</pre>
    </div>
  `;
}
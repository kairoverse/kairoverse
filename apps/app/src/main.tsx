import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (process.env['NODE_ENV'] !== 'production') root.render(<App />);
else
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

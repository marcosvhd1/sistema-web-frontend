import { ColorModeScript, theme } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Contexts/AuthProvider';


const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AuthProvider>
      <App />
    </AuthProvider>
  </>,
);



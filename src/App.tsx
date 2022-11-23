import { ChakraProvider } from '@chakra-ui/react';

import MainRoutes from './Routes/Route';
import { theme } from './styles/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainRoutes />
    </ChakraProvider>
  );
}

export default App;

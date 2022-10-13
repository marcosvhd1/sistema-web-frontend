import { ChakraProvider } from "@chakra-ui/react"

import MainRoutes from "./Routes/MainRoutes";
import { theme } from "./styles/theme";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainRoutes />
    </ChakraProvider>
  )
}

export default App;
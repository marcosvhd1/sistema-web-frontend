import { Flex, LightMode, useMediaQuery } from "@chakra-ui/react";

import fundo from '../../assets/fundo.jpg';

import { LogoCubo } from "../../components/Images/LogoCubo";
import { LoginForm } from "./components/LoginForm";
import { InfoLogin } from "./components/LoginInfoList";
import { Plantext } from "./components/LoginPlansText";
import { TextLogo } from "./components/LoginTextLogo";

export function Login() {
  const [isMinWidth] = useMediaQuery('(min-width: 950px)')

  return (
    <LightMode>
      <Flex
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
        bgImage={fundo}
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="cover"
      >
        <Flex
          align="center"
          w={isMinWidth ? { sm: "70%", md: "60%", lg: "50%" } : "40%"}
          h={{ sm: "80%", md: "75%", lg: "60%" }}
          bg="whiteAlpha.700"
          position="absolute"
          borderRadius={10}
          boxShadow="0px 0px 10px 2px 	#696969"
        >
          <Flex
            w="100%"
            h="100%"
            justify={isMinWidth ? "space-between" : "center"}
          >
            {isMinWidth ?
              <Flex
                w="50%"
                direction="column"
                align="center"
                justify="center"
              >
                <TextLogo />
                <InfoLogin />
              </Flex> : null}
            <Flex
              w={isMinWidth ? "50%" : "100%"}
              p="4"
              justify="center"
              align="center"
              direction="column"
            >

              <LogoCubo />
              <LoginForm />
              <Plantext />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </LightMode>
  )
}
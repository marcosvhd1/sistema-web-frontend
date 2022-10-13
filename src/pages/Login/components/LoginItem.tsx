import { Flex, Icon, Text } from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc"

interface LoginItemProps {
  description: string;
}

export function LoginItem({ description }: LoginItemProps) {
  return (
    <Flex align="center" p={2}>
      <Icon as={FcApproval} marginRight="1" />
      <Text
        fontSize={15}
        fontFamily="Poppins"
        color="gray.700" 
      >
        {description}
      </Text>
    </Flex>
  )
}
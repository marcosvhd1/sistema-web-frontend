import { Flex, FormLabel } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormContainerProps {
  label: string;
  children: ReactNode;
}

export function FormContainer({ label, children }: FormContainerProps) {
  return (
    <Flex direction="column"  mt="4">
      <FormLabel>{label}</FormLabel>
      {children}
    </Flex>
  )
}
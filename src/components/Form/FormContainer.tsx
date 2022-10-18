import { ReactNode } from "react";
import { FieldError } from "react-hook-form"
import { Flex, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

interface FormContainerProps {
  label: string;
  children: ReactNode;
  error?: FieldError;
  isRequired?: boolean
  width?: string
}

export function FormContainer({ label, children, error, width = "100%", isRequired = false }: FormContainerProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} w={`${width}`}>
      <Flex direction="column" mt="4">
        <FormLabel>{label}</FormLabel>
        {children}
        {!!error && (
          <FormErrorMessage>{error.message}</FormErrorMessage>
        )}
      </Flex>
    </FormControl>
  )
}
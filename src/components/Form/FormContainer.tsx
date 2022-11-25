import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { Flex, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react';

interface FormContainerProps {
  label: string;
  children: ReactNode;
  error?: FieldError;
  isRequired?: boolean
  width?: string
  align?: string
}

export function FormContainer({ label, children, error, align, width = '100%', isRequired = false }: FormContainerProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} w={`${width}`}>
      <Flex direction="column" align={`${align}`} mt="2">
        <Text fontSize="sm" fontWeight='medium'>{label}</Text>
        {children}
        {!!error && (
          <FormErrorMessage>{error.message}</FormErrorMessage>
        )}
      </Flex>
    </FormControl>
  );
}

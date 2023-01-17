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
  mt?: string
  mr?: string
  hidden?: boolean
}

export function FormContainer({ label, children, error, align, width = '100%', isRequired = false, mr, hidden, mt = '2', }: FormContainerProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} w={`${width}`} visibility={`${hidden ? 'hidden' : 'visible'}`}>
      <Flex direction="column" align={`${align}`} mt={`${mt}`} mr={`${mr}`}>
        <Text fontSize="sm" fontWeight='medium'>{label}</Text>
        {children}
        {!!error && (
          <FormErrorMessage>{error.message}</FormErrorMessage>
        )}
      </Flex>
    </FormControl>
  );
}

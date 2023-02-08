import { InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MoneyAddonProps {
  children: ReactNode;
}

export function MoneyAddon({ children }: MoneyAddonProps) {
  return (
    <InputGroup>
      <InputLeftAddon>
        R$
      </InputLeftAddon>
      {children}
    </InputGroup>
  );
}

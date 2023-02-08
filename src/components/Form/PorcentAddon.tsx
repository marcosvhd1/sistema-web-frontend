import { InputGroup, InputRightAddon } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PorcentAddonProps {
  children: ReactNode;
}

export function PorcentAddon({ children }: PorcentAddonProps) {
  return (
    <InputGroup>
      {children}
      <InputRightAddon>
        %
      </InputRightAddon>
    </InputGroup>
  );
}

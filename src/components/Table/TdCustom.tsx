import { Td } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TdCustomProps {
  children: ReactNode;
  style?: React.CSSProperties
}

export function TdCustom({ children, style }: TdCustomProps) {
  return (
    <Td 
      overflow="hidden" 
      textOverflow="ellipsis" 
      whiteSpace="nowrap"
      maxWidth="2rem"
      fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}
      style={style}
    >
      {children}
    </Td>
  );
}
import { Button, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface FormButtonProps {
  w?: string;
  label: string;
  icon: IconType;
  variant?: string;
  colorScheme?: string;
}

export function FormButton({ w, label, variant, colorScheme, icon }: FormButtonProps) { 
  return (
    <Button
      w={`${w}`}
      variant={`${variant}`}
      colorScheme={`${colorScheme}`}
      fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}
    >
      <Icon as={icon} mr={2}/>
      {label}
    </Button>
  );
}

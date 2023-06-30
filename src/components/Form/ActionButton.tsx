import { Button, Icon, Tooltip, useColorMode } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface ActionButtonProps {
  label: string;
  icon: IconType;
  variant?: string;
  action: () => void;
  colorScheme: string;
  disabled?: boolean;
}

export function ActionButton({ label, variant = 'ghost', colorScheme, icon, action, disabled = false }: ActionButtonProps) {
  const { colorMode } = useColorMode();
  
  return (
    <Tooltip label={`${label}`} placement="auto-start" hasArrow bg={`${colorScheme}.300`}>
      <Button
        w="2rem"
        disabled={disabled}
        variant={`${variant}`}
        onClick={() => action()}
        colorScheme={`${colorScheme}`}
        fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}
      >
        <Icon color={colorMode === 'light' ? `${colorScheme}.400` : `${colorScheme}.300`} as={icon} />
      </Button>
    </Tooltip>
  );
}

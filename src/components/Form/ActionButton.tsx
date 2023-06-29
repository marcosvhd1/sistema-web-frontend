import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface ActionButtonProps {
  label: string;
  icon: IconType;
  variant?: string;
  action: () => void;
  colorScheme: string;
}

export function ActionButton({ label, variant = 'ghost', colorScheme, icon, action }: ActionButtonProps) {
  return (
    <Tooltip label={`${label}`} placement="auto-start" hasArrow bg={`${colorScheme}.300`}>
      <Button
        w="2rem"
        variant={`${variant}`}
        onClick={() => action()}
        colorScheme={`${colorScheme}`}
        fontSize={{ base: '.8rem', md: '.8rem', lg: '1rem' }}
      >
        <Icon color={`${colorScheme}.300`} as={icon} />
      </Button>
    </Tooltip>
  );
}

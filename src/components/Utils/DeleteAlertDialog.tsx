import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Icon } from '@chakra-ui/react';
import { useRef } from 'react';
import { FiCheck, FiSlash } from 'react-icons/fi';

interface AlertDialogProps {
  id: number;
  deleteFunction: (id: number) => void
  label: string
  isOpen: boolean
  onClose: () => void
  colorScheme?: string;
}

export function DeleteAlertDialog({ id, deleteFunction, label, isOpen, onClose, colorScheme = 'red'}: AlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Deseja {colorScheme == 'green' ? 'emitir' : 'excluir'} {label.toUpperCase() === 'MARCA' ||  label.toUpperCase() === 'NFE' ? 'a' : 'o'} {label}?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Essa ação não poderá ser desfeita.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Flex justify="space-between" w="100%">
            <Button onClick={() => deleteFunction(id)} colorScheme={`${colorScheme}`}>
              <Icon as={FiCheck} mr={1} />
              Confirmar
            </Button>
            <Button ref={cancelRef} onClick={onClose} ml={3}>
              <Icon as={FiSlash} mr={1} />
              Cancelar
            </Button>
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

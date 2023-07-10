import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Icon } from '@chakra-ui/react';
import { useRef } from 'react';
import { FiSend, FiSlash, FiTrash2 } from 'react-icons/fi';

interface AlertDialogProps {
  id: number;
  deleteFunction: (id: number) => void
  label: string
  isOpen: boolean
  disabled?: boolean
  onClose: () => void
  colorScheme?: string;
}

export function DeleteAlertDialog({ id, deleteFunction, label, isOpen, disabled = false, onClose, colorScheme = 'red'}: AlertDialogProps) {
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
        <AlertDialogBody>
          Essa ação não poderá ser desfeita.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Flex justify="space-between" w="100%">
            <Button onClick={() => deleteFunction(id)} colorScheme={`${colorScheme}`} disabled={disabled}>
              <Icon as={colorScheme == 'green' ? FiSend : FiTrash2} mr={2} />
              {colorScheme == 'green' ? 'Emitir' : 'Excluir'}
            </Button>
            <Button onClick={onClose} ref={cancelRef}><Icon as={FiSlash} mr={2}/>Fechar</Button>
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

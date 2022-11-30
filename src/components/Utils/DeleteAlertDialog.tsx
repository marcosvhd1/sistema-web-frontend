import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex } from '@chakra-ui/react';
import { useRef } from 'react';

interface AlertDialogProps {
  id: number;
  deleteFunction: (id: number) => void
  label: string
  isOpen: boolean
  onClose: () => void
}

export function DeleteAlertDialog({ id, deleteFunction, label, isOpen, onClose }: AlertDialogProps) {
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
        <AlertDialogHeader>Deseja Excluir {label.toUpperCase() === 'MARCA' ? 'a' : 'o'} {label}?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Essa ação não poderá ser desfeita.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Flex justify="space-between" w="100%">
            <Button onClick={() => deleteFunction(id)} colorScheme='red'>Sim, Excluir {label}</Button>
            <Button ref={cancelRef} onClick={onClose} ml={3}>
              Não, cancelar
            </Button>
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

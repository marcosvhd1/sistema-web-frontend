import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Icon, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { FcHighPriority } from "react-icons/fc";
import { useAlertClientContext } from "../../Contexts/AlertDialog/AlertClientContext"
import { ApiException } from "../../services/api/ApiException";
import { ClientService } from "../../services/api/clientes/ClientService";

interface AlertDialogProps {
  id: number;
  getClients: () => void;
}

export function DeleteAlertDialog({ id, getClients }: AlertDialogProps) {
  const { isOpen, onClose } = useAlertClientContext()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const toast = useToast()


  const HandleDeleteClient = (clientId: number) => {
    ClientService.deleteById(clientId)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message);
        } else {
          toast({
            title: 'Operação concluída.',
            description: "Cliente excluido com sucesso.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          getClients()
        }
      })
    onClose()
  }
  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Deseja Excluir o Cliente?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Essa ação não poderá ser desfeita.

          </AlertDialogBody>
          <AlertDialogFooter>
            <Flex justify="space-between" w="100%">
              <Button onClick={() => HandleDeleteClient(id)} colorScheme='red'>
                Sim, Excluir o cliente
              </Button>
              <Button ref={cancelRef} onClick={onClose} ml={3}>
                Não, cancelar
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
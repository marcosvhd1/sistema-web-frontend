import { useContext } from "react"
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

import { useSidebarDrawer } from "../../Contexts/SidebarDrawerContext";
import { SizeContext } from "../../Contexts/SizeContext"

import { SidebarNav } from "./SidebarNav"


export function Sidebar() {
  const { smSize } = useContext(SizeContext)
  const { isOpen, onClose } = useSidebarDrawer()


  if (!smSize[0]) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} isFullHeight size="xs">
        <DrawerOverlay>
          <DrawerContent >
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <SidebarNav />
  )
}
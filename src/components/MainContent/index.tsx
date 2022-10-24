import { ReactNode, useContext } from "react"
import { Grid, GridItem } from "@chakra-ui/react"

import { SidebarContext } from "../../Contexts/SidebarContext"
import { SizeContext } from "../../Contexts/SizeContext"

import { Footer } from "../Footer"
import { Header } from "../Header"
import { Sidebar } from "../Sidebar"

interface MainContentProps {
  children: ReactNode
}


export default function MainContent({ children }: MainContentProps) {
  const { navSize } = useContext(SidebarContext)
  const { smSize } = useContext(SizeContext)


  return (
   <Grid
     templateAreas={`
      "nav header"
      "nav main"
      "nav footer"`}
     gridTemplateRows={'7vh 1fr 5vh'}
     gridTemplateColumns={!smSize[0] ? "0 1fr" : navSize == "small" ? '4vw 1fr' : '14vw 1fr'}
     h='100vh'
   >
     <GridItem area={'header'}>
       <Header />
     </GridItem>
     <GridItem area={'nav'}>
        <Sidebar />
     </GridItem>
     <GridItem area={'main'} boxShadow="0 0 12px 1px rgba(0, 0, 0, 0.15) inset" overflowY="auto">
      {children}
     </GridItem>
     <GridItem area={'footer'}>
       <Footer />
     </GridItem>
   </Grid>
  )
}
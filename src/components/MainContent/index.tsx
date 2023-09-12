import { Grid, GridItem } from '@chakra-ui/react';
import { ReactNode, useContext } from 'react';

import { SidebarContext } from '../../Contexts/SidebarContext';
import { SizeContext } from '../../Contexts/SizeContext';

import { ChangePasswordModal } from '../ChangePassword';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

interface MainContentProps {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const { navSize } = useContext(SidebarContext);
  const { smSize } = useContext(SizeContext);

  return (
    <Grid
      templateAreas={`
      "nav header"
      "nav main"
      "nav footer"`}
      gridTemplateRows={'7vh 1fr 5vh'}
      gridTemplateColumns={!smSize[0] ? '0 1fr' : navSize == 'small' ? '4vw 1fr' : '14vw 1fr'}
      h='100vh'
      transition='grid-template-columns 0.5s ease-in-out'
    >
      <GridItem area={'header'}>
        <Header />
      </GridItem>
      <GridItem area={'nav'} boxShadow="0 0 0 0.5px rgba(0, 0, 0, 0.15)">
        <Sidebar />
      </GridItem>
      <GridItem 
        area={'main'} 
        overflowY="auto"
        boxShadow="0 0 6px 0.5px rgba(0, 0, 0, 0.15) inset"
      >
        {children}
      </GridItem>
      <GridItem area={'footer'}>
        <Footer />
      </GridItem>
      <ChangePasswordModal />
    </Grid>
  );
}

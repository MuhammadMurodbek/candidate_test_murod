import { Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DarkModeIconButton from './components/dark.mode/dark.mode.icon.button';
import { ColumnType } from './utils/enums';
import { ModalCalendar } from './components/calendar';
import Column from './components/column/Column';

function App() {
  return (
    <main>
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        shadow="md"
      >
        <ModalCalendar />
        <Heading
          fontSize={{ base: '2xl' }}
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Dashboard
        </Heading>
        <DarkModeIconButton />
      </Flex>

      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 16, md: 4 }}
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.BLOCKED} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </main>
  );
}

export default App;

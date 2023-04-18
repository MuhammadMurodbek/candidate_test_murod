import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import useColumnDrop from '../../hooks/useColumnDrop';
import useColumnTasks from '../../hooks/useColumnTasks';
import { ColumnType } from '../../utils/enums';
import Task from '../tasks/Task';
import { ModalTodos } from '../modal.todos';
import { useTodoModalDisclosure } from '../../hooks/useTodoModal';

const ColumnColorScheme: Record<ColumnType, string> = {
  todo: 'gray',
  in_progress: 'blue',
  blocked: 'red',
  completed: 'green',
};

function Column({ column }: { column: ColumnType }) {
  const disclosure = useTodoModalDisclosure();
  const {
    tasks,
    addEmptyTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
    updateTask,
    updatedTasks,
  } = useColumnTasks(column, disclosure);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks =
    tasks?.length &&
    tasks?.map((task: any, index: number) => (
      <Task
        key={task?.id}
        task={task}
        index={index}
        onDropHover={swapTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
        updatedTasks={updatedTasks}
      />
    ));
  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        variant="solid"
        onClick={disclosure.onOpen}
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
      />
      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>
      <ModalTodos todo={addEmptyTask} {...disclosure} />
    </Box>
  );
}

export default Column;

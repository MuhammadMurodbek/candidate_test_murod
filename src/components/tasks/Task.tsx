import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, ScaleFade, useDisclosure } from '@chakra-ui/react';
import _ from 'lodash';
import { memo } from 'react';
import { useTaskDragAndDrop } from '../../hooks/useTaskDragAndDrop';
import { TaskModel } from '../../utils/models';
import { AutoResizeTextarea } from '../auto.resize.textarea';
import { ModalTodos } from '../modal.todos';
import { AxiosResponse } from 'axios';
import { ConfirmModal } from '../modal.confirmation';

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
  updatedTasks: ({
    id,
    payload,
  }: {
    id: number | string;
    payload: any;
  }) => Promise<AxiosResponse<any, any>>;
};

function Task({
  index,
  task,
  onUpdate,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
  updatedTasks,
}: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
    { task, index: index },
    handleDropHover,
  );
  const disclosure = useDisclosure();
  const disclosureConfirm = useDisclosure();

  const handleDeleteClick = () => {
    disclosureConfirm.onOpen();
  };

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w={200}
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        opacity={isDragging ? 0.5 : 1}
      >
        <IconButton
          position="absolute"
          top={0}
          right={0}
          zIndex={100}
          aria-label="delete-task"
          size="md"
          colorScheme="solid"
          color={'gray.700'}
          icon={<DeleteIcon />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleDeleteClick}
        />
        <IconButton
          position="absolute"
          top={5}
          right={0}
          zIndex={100}
          aria-label="update-task"
          size="md"
          colorScheme="solid"
          color={'gray.700'}
          icon={<EditIcon />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={disclosure.onOpen}
        />
        <AutoResizeTextarea
          value={task.title}
          fontWeight="semibold"
          cursor="inherit"
          border="none"
          p={0}
          resize="none"
          maxH={200}
          focusBorderColor="none"
          color="gray.700"
          // onChange={handleTitleChange}
        />
        <AutoResizeTextarea
          value={task?.description}
          fontWeight="semibold"
          fontSize={12}
          cursor="inherit"
          border="none"
          p={0}
          resize="none"
          maxH={200}
          focusBorderColor="none"
          color="gray.500"
        />
      </Box>
      <ModalTodos task={task} todo={updatedTasks} {...disclosure} />
      <ConfirmModal
        todo={() => handleDelete(task.id)}
        text="Are you sure you want to delete"
        {...disclosureConfirm}
      />
    </ScaleFade>
  );
}
export default memo(Task, (prev, next) => {
  if (
    _.isEqual(prev.task, next.task) &&
    _.isEqual(prev.index, next.index) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover &&
    prev.onUpdate === next.onUpdate
  ) {
    return true;
  }

  return false;
});

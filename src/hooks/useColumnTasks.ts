import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { pickChakraRandomColor, statusText, swap } from '../utils/helpers';
import { debug } from '../utils/logging';
import { TDisclosure, TUpdatedTask, TaskModel } from '../utils/models';
import useTaskCollection from './useTaskCollection';
import {
  addSchema,
  deleteSchema,
  getSchemas,
  updateSchema,
} from '../service/queries';
import { useQueryHook } from './useQueries';
import { useMutationHook } from './useMutations';

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column: ColumnType, disclosure: TDisclosure) {
  const { data: response, refetch: refetchSchemas } = useQueryHook(
    'getTasks',
    getSchemas,
    ({ data }: { data: any[] }) => {
      return {
        todo: data?.filter((item: any) => item.column === 'todo'),
        in_progress: data?.filter((item: any) => item.column === 'in_progress'),
        blocked: data?.filter((item: any) => item.column === 'blocked'),
        completed: data?.filter((item: any) => item.column === 'completed'),
      };
    },
  );
  const refetchSchema = () => {
    refetchSchemas();
    disclosure.onClose();
  };
  const { mutateAsync: addTaskRequest } = useMutationHook(
    addSchema,
    refetchSchema,
    statusText.add,
  );
  const { mutateAsync: deleteTaskRequest } = useMutationHook(
    deleteSchema,
    refetchSchema,
    statusText.deleted,
  );
  const { mutateAsync: updateTaskRequest } = useMutationHook(
    (payload: any) => updateSchema(payload),
    refetchSchema,
    statusText.update,
  );
  const [tasks, setTasks] = useTaskCollection();

  const addEmptyTask = useCallback(
    (data: any) => {
      debug(`Adding new empty task to ${column} column`);
      addTaskRequest({
        id: uuidv4(),
        color: pickChakraRandomColor('.300'),
        column,
        ...data,
      });
    },
    [column],
  );

  const deleteTask = useCallback(
    (id: TaskModel['id']) => {
      debug(`Removing task ${id}..`);
      deleteTaskRequest(id);
    },
    [column],
  );

  const updateTask = useCallback(
    (id: TaskModel['id'], updatedTask: Omit<Partial<TaskModel>, 'id'>) => {
      debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`);
    },
    [column],
  );
  const updatedTasks = ({ id, payload }: TUpdatedTask) => {
    updateTaskRequest({ id, payload });
  };

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel['id']) => {
      if (response) {
        const fromColumnTasks = response[from];
        const movingTask = fromColumnTasks.find((task: any) => task.id === id);
        movingTask.column = column;
        updatedTasks({ id: id, payload: movingTask });
      }
    },
    [column, response],
  );

  const swapTasks = useCallback(
    (i: number, j: number) => {
      debug(`Swapping task ${i} with ${j} in ${column} column`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks],
  );

  return {
    tasks: response && response[column],
    addEmptyTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
    updatedTasks,
  };
}

export default useColumnTasks;

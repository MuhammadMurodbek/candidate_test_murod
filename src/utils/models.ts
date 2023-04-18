import { ColumnType } from './enums';

export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;
  color: string;
  description?: string;
}

export interface DragItem {
  index: number;
  id: TaskModel['id'];
  from: ColumnType;
}
export interface TUpdatedTask {
  id: number | string;
  payload: any;
}
export interface TQueryHook {}

export interface TDisclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

export interface TFullCalendar {
  data: any;
  update: (e: any) => void;
  disclosure: TDisclosure;
}

export interface TConfirmModal {
  todo: () => void;
  isOpen: boolean;
  onClose: () => void;
  text: string;
}
export interface TModalTodos {
  task?: TaskModel;
  isOpen: boolean;
  onClose: () => void;
  todo: any;
}

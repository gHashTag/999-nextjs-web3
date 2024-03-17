// Определение типа статуса задачи
export type TaskStatus = 1 | 2 | 3 | 4;

export type StatusMap = {
  [key: string]: number;
};
// Использование Record для BoardItem
export type BoardItem = Record<TaskStatus, Task[]>;

export type TasksArray = Task[];

export interface DropResult {
  draggableId: string;
  type: string;
  reason: string;
  source: {
    index: number;
    droppableId: string;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
}

export interface Task {
  id: string;
  title?: string;
  description?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  status?: TaskStatus;
  due_date?: string;
  priority?: number;
  assigned_to?: AssignedUser[];
  labels?: string[];
  completed_at?: string;
  is_archived?: boolean;
}

// Если assigned_to использует jsonb для хранения нескольких назначений
export interface AssignedUser {
  user_id: string; // UUID назначенного пользователя
  // Дополнительные поля, если необходимо
}

export interface BoardData {
  title: string;
  id: string;
  cards?: Task[];
}

export type Board = {
  [key: string]: Task[];
};

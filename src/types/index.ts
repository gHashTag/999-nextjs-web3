// Определение типа статуса задачи
export type TaskStatus = "Backlog" | "In Progress" | "In Review" | "Completed";

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
  id: number;
  user_id: string;
  created_at: string;
  updated_at?: string;
  title: string;
  description?: string;
  status: string;
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

export interface BoardColumn {
  name: string;
  items: Task[];
}

export type BoardData = BoardColumn[];

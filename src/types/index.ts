export interface BoardItem {
  [status: string]: {
    id: number;
    title: string;
    description: string;
    status: string;
    user_id: number;
    created_at: string;
  }[];
}

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
  user_id: number;
  created_at: string;
  title: string;
  description: string;
  status: string;
}

export interface BoardColumn {
  name: string;
  items: Task[];
}

export type BoardData = BoardColumn[];

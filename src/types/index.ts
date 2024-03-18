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

export type RecordingAsset = {
  asset: {
    account_id: string;
    app_id: string;
    duration: number;
    email: string | null;
    id: number;
    metadata_id: string;
    metadata_timestamp: string;
    recording_id: string;
    room_id: string;
    room_name: string;
    session_id: string;
    summary_json_asset_id: string;
    summary_json_path: string;
    summary_json_presigned_url: string;
    summary_short: string;
    transcript_json_asset_id: string;
    transcript_json_path: string;
    transcript_json_presigned_url: string;
    transcript_srt_asset_id: string;
    transcript_srt_path: string;
    transcript_srt_presigned_url: string;
    transcript_txt_asset_id: string;
    transcript_txt_path: string;
    transcript_txt_presigned_url: string;
    transcription: string;
    transcription_id: string;
  };
};

export interface Columns {
  name: String;
  color: String;
  id: number;
  taskList: Task[];
}

export interface Task {
  name: String;
  id: number;
}
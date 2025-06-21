export type TaskType = {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  projectId: string;
  priority?: string;
  dueDate?: string;
  // assignee?: string;
  // project?: string;
  // priority?: 'low' | 'medium' | 'high';
  // organisation?: string;
  // createdBy?: string;
  labelId?: string;
  createdAt?: string;
  // updatedAt?: string;
};
export interface EventsCardProps {
  title: string;
  assignee?: string;
  status: string;
  id: string | number;
  event: any;
}

export enum TaskStatus {
  BACKLOG = 'backlog',
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  IN_REVIEW = 'in-review',
  DONE = 'done',
  CANCELED = 'canceled',
}

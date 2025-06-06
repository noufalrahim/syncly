export type EventType = {
  start: Date | string | undefined;
  end: Date | string | undefined;
  title: string;
  project: string | undefined;
  assignee: string | undefined;
  status: string;
  id: number | string | undefined;
};

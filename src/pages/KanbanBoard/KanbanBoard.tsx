import { AppBar } from "@/components/AppBar";
import { Board } from "@/components/KanbanComponents";

export default function KanbanBoard() {
  return (
    <div className="h-screen w-full">
      <AppBar title="Kanban" description="Manage all your tasks here" />
      <Board />
    </div>
  );
}

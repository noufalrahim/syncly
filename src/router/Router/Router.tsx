import { Routes, Route, Navigate } from 'react-router-dom';
import { Board } from '@/pages/Board';
import { UrlEnum } from '@/types';
// import { MindMap } from '@/components/MindMap';

export default function Router() {

  return (
    <Routes>
      <Route path={UrlEnum.kanban} element={<Board />} />
      {/* <Route path={SCHEDULER_PATH} element={<Scheduler />} />
      <Route path={TABLE_PATH} element={<TaskList />} /> */}
      {/* <Route path={MIND_MAP_PATH} element={<MindMap />} /> */}
      <Route path="*" element={<Navigate to={''} />} />
    </Routes>
  );
}

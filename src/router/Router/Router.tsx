import { Routes, Route, Navigate } from 'react-router-dom';
import { Board } from '@/pages/Board';
import { UrlEnum } from '@/types';
import { Notes } from '@/pages/Notes';
import { ProjectSettings } from '@/pages/Projects/Settings';
// import { MindMap } from '@/components/MindMap';

export default function Router() {

  return (
    <Routes>
      <Route path={UrlEnum.project} element={<Board />} />
      <Route path={UrlEnum.notes} element={<Notes />} />
      <Route path={UrlEnum.projectSettings} element={<ProjectSettings />}/>
      {/* <Route path={SCHEDULER_PATH} element={<Scheduler />} />
      <Route path={TABLE_PATH} element={<TaskList />} /> */}
      {/* <Route path={MIND_MAP_PATH} element={<MindMap />} /> */}
      <Route path="*" element={<Navigate to={''} />} />
    </Routes>
  );
}

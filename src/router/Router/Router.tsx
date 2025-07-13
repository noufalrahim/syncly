import { Routes, Route, Navigate } from 'react-router-dom';
import { Board } from '@/pages/Board';
import { UrlEnum } from '@/types';
import { Notes } from '@/pages/Notes';
import { ProjectSettings } from '@/pages/Projects/Settings';
import { Auth } from '@/pages/Auth';
import { Layout } from '@/components/Layout';
// import { MindMap } from '@/components/MindMap';

export default function Router() {

  return (
    <Routes>
      <Route path={UrlEnum.home} element={<Layout><div></div></Layout>} />
      <Route path={UrlEnum.login} element={<Auth />} />
      <Route path={UrlEnum.project} element={
        <Layout>
          <Board />
        </Layout>
      } />
      <Route path={UrlEnum.notes} element={<Layout><Notes /></Layout>} />
      <Route path={UrlEnum.projectSettings} element={<Layout><ProjectSettings /></Layout>} />
      {/* <Route path={SCHEDULER_PATH} element={<Scheduler />} />
      <Route path={TABLE_PATH} element={<TaskList />} /> */}
      {/* <Route path={MIND_MAP_PATH} element={<MindMap />} /> */}
      <Route path="*" element={<Navigate to={''} />} />
    </Routes>
  );
}

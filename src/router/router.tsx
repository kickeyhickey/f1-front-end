import type { JSX } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import '../theme/variables.css';
import Login from '../pages/login/login.page';
import { UserPage } from '../pages/user/user.page';
import { RacePage } from '../pages/race/race.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import ProtectedRoutes from './protected-routes/protected-routes.component';

export default function Router(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        {/* TODO setup protected routes */}
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/race" element={<RacePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

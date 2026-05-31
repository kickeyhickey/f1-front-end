import type { JSX } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { Home } from '../pages/home/Home';
import SignInPage from '../../app/routes/sign-in';
import SignUpPage from '../../app/routes/sign-up';
import '../theme/variables.css';
import Login from '../pages/login/login.page';

export default function Router(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </HashRouter>
  );
}

import type { JSX } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { Home } from '../pages/home/Home';
import '../theme/variables.css';

export default function Router(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

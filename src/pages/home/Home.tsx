import type { JSX } from 'react';
import MainPage from '../../components/main-page/main-page.component';
import MainTable from '../../components/table/main-table.component';

export function Home(): JSX.Element {
  return (
    <MainPage>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainTable />
      </div>
    </MainPage>
  );
}

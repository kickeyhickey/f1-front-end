import { Cell, Column, Row, Table, TableBody, TableHeader } from 'react-aria-components';
import style from './main-table.module.css';

export default function MainTable({ data }: { data: any[] }) {
  console.warn('driversdata', data);

  return (
    <Table className={style.wrapper} aria-label="Files" treeColumn="name">
      <TableHeader>
        <Column id="name">Name</Column>
        <Column id="birthday">Birthday</Column>
        <Column id="nationality">Nationality</Column>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          return (
            <Row id={item.id} className={style.tableRow}>
              <Cell>{`${item.name} ${item.surname}`}</Cell>
              <Cell>{item.birthday}</Cell>
              <Cell>{item.nationality}</Cell>
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
}

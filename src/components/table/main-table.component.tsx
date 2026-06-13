import { Cell, Column, Row, Table, TableBody, TableHeader } from 'react-aria-components';
import style from './main-table.module.css';

interface TableValueTypes {
  value: string;
  label: string;
}

interface MainTableProps {
  data: any[];
  headerTitles: TableValueTypes[];
}

export default function MainTable({ data, headerTitles }: MainTableProps) {
  return (
    <Table className={style.wrapper} aria-label="Files" treeColumn="name">
      <TableHeader className={style.tableHeader}>
        {headerTitles.map((header) => {
          return (
            <Column className={style.headerColumn} id={header.value}>
              {header.label}
            </Column>
          );
        })}
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          return (
            <Row id={item.id}>
              <Cell className={style.tableColumn}>{`${item.name} ${item.surname}`}</Cell>
              <Cell className={style.tableColumn}>{item.birthday}</Cell>
              <Cell className={style.tableColumn}>{item.nationality}</Cell>
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
}

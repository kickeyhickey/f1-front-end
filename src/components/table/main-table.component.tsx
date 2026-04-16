import {
  Cell,
  Collection,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from 'react-aria-components';
import style from './main-table.module.css';

const rows = [
  {
    id: '1',
    title: 'Documents',
    type: 'Directory',
    date: '10/20/2025',
    children: [
      {
        id: '2',
        title: 'Project',
        type: 'Directory',
        date: '8/2/2025',
        children: [
          { id: '3', title: 'Weekly Report', type: 'File', date: '7/10/2025', children: [] },
          { id: '4', title: 'Budget', type: 'File', date: '8/20/2025', children: [] },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Photos',
    type: 'Directory',
    date: '2/3/2026',
    children: [
      { id: '6', title: 'Image 1', type: 'File', date: '1/23/2026', children: [] },
      { id: '7', title: 'Image 2', type: 'File', date: '2/3/2026', children: [] },
    ],
  },
];

export default function MainTable() {
  return (
    <Table className={style.wrapper} aria-label="Files" treeColumn="name">
      <TableHeader>
        <Column id="name" isRowHeader>
          Name
        </Column>
        <Column id="type">Type</Column>
        <Column id="date">Date Modified</Column>
      </TableHeader>
      <TableBody items={rows}>
        {function renderItem(item) {
          return (
            <Row id={item.id}>
              <Cell>{item.title}</Cell>
              <Cell>{item.type}</Cell>
              <Cell>{item.date}</Cell>
              {/* recursively render children */}
              <Collection items={item.children}>{renderItem}</Collection>
            </Row>
          );
        }}
      </TableBody>
    </Table>
  );
}

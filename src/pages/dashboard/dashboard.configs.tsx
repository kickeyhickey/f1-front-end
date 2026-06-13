import {
  COLUMN_TYPE,
  type ColumnsOptionTypes,
  type TableColumnTypes,
} from '../../utilities/constatnts';

export const headerTitles = [
  { label: 'Name', value: 'name' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Nationality', value: 'nationality' },
];

export interface DeviceColumnTypes extends TableColumnTypes {
  id: string;
  width?: number;
  options?: ColumnsOptionTypes[];
  filter?: boolean;
  isSort?: boolean;
  type?: string;
  format?: (arg: any) => any;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
  className?: string;
}

export const DASHBOARD_COLUMNS: DeviceColumnTypes[] = [
  {
    id: 'name',
    label: 'Name',
    width: 50,
    type: COLUMN_TYPE.STRING,
  },
  {
    id: 'birthday',
    label: 'Birthday',
    width: 50,
    type: COLUMN_TYPE.STRING,
  },
  {
    id: 'nationality',
    label: 'Nationality',
    width: 50,
    type: COLUMN_TYPE.STRING,
  },
];

// TODO - replicate administreation page column config with values

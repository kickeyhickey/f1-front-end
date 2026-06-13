export interface ColumnTypes {
  STRING: string;
  OPTION: string;
  DATE: string;
  NUMBER: string;
}

export const COLUMN_TYPE: ColumnTypes = {
  STRING: 'string',
  OPTION: 'option',
  DATE: 'date',
  NUMBER: 'number',
};

export interface ColumnsOptionTypes {
  label: string;
  // TODO fix value type
  value: any;
}

export interface TableColumnTypes {
  id: string;
  label: string;
}

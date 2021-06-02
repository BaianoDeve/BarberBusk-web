import 'rsuite/dist/styles/rsuite-default.css';

import { Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

const TableComponent = ({
  data,
  config,
  actions,
  content,
  onRowClick,
  loading,
}) => {
  return (
    <Table loading={loading} height={400} data={data} onRowClick={onRowClick}>
      {config.map((c) => (
        <Column
          flexGrow={!c.width ? 1 : 0}
          width={c.width}
          aling="center"
          fixed={c.fixed}
        >
          <HeaderCell>{c.label}</HeaderCell>
          {!c.content ? (
            <Cell dataKey={c.key} />
          ) : (
            <Cell>{(item) => c.content(item)}</Cell>
          )}
        </Column>
      ))}
      <Column width={150} fixed="right">
        <HeaderCell>Ações</HeaderCell>
        <Cell>{(item) => actions(item)}</Cell>
      </Column>
    </Table>
  );
};

export default TableComponent;

import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { columns, tableData, tableHeaderColor } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log(tableData);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {columns !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={classes.tableCell + ' ' + classes.tableHeadCell}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            return (
              <TableRow key={row.id} className={classes.tableBodyRow}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ])
};

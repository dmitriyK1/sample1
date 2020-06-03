import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { EnhancedTableHead } from './DataTableHeader';
import { EnhancedTableToolbar } from './DataTableToolbar';
import {
  filterHiddenCells,
  getComparator,
  isEditButtonClicked,
  stableSort,
} from './dataTableUtils';

const { arrayOf, bool, number, string, shape, func } = PropTypes;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const DataTable = props => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoadingItems, setLoadingItems] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const deselectAll = () => setSelected([]);

  const handleClick = (event, row) => {
    if (!props.editable) {
      return;
    }

    if (isEditButtonClicked(event.target)) {
      props.onEditClick(row);
      return;
    }

    const selectedIndex = selected.findIndex(
      selectedRow => selectedRow.id === row.id,
    );
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    if (isLoadingItems) {
      return;
    }

    const currentItemsCount = (newPage + 1) * rowsPerPage;
    const isNavigatingForward = newPage > page;
    const isLoadedAllItems = props.totalCount === props.rows.length;

    if (isNavigatingForward && !isLoadedAllItems) {
      setLoadingItems(true);

      props
        .loadMore({ start: currentItemsCount, num: rowsPerPage })
        .finally(() => setLoadingItems(false));
    }

    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = row =>
    selected.findIndex(selectedRow => {
      if (row.id) {
        return selectedRow.id === row.id;
      }

      return selectedRow.name === row.name;
    }) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.totalCount - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {props.editable && (
          <EnhancedTableToolbar
            addButtonTitle={props.addButtonTitle}
            deleteButtonTitle={props.deleteButtonTitle}
            selectedItems={selected}
            onAddClick={props.onAddClick}
            onDeleteClick={props.onDeleteClick}
            deselectAll={deselectAll}
          />
        )}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              headCells={filterHiddenCells(props.headCells)}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id || row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="default">
                        {props.editable && (
                          <>
                            <Button>edit</Button>
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </>
                        )}
                      </TableCell>
                      {props.headCells.map(cell =>
                        cell.hidden ? null : (
                          <TableCell key={cell.id} padding="none">
                            {row[cell.id]}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={props.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

DataTable.propTypes = {
  editable: bool,
  addButtonTitle: string,
  deleteButtonTitle: string,
  totalCount: number.isRequired,
  rows: arrayOf(PropTypes.object),
  headCells: arrayOf(
    shape({
      id: string.isRequired,
      label: string.isRequired,
    }),
  ),
  loadMore: func.isRequired,
  onAddClick: func,
  onDeleteClick: func,
};

export { DataTable };

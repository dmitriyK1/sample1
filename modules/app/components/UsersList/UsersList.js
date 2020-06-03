import PropTypes from 'prop-types';
import React from 'react';

import { DataTable } from '../../../common/components/DataTable';
import { Time } from '../Time';

const { arrayOf, shape, string, number, func } = PropTypes;

const headCells = [
  {
    id: 'id',
    label: 'id',
    hidden: true,
  },
  {
    id: 'firstName',
    label: 'First Name',
    hidden: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    hidden: true,
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'dateCreated',
    label: 'Date Created',
  },
  {
    id: 'dateModified',
    label: 'Date Modified',
  },
];

const mapItemsToRows = items => {
  return items.map(item => ({
    id: item.userid,
    firstName: item.namefirst,
    lastName: item.namelast,
    name: `${item.namefirst} ${item.namelast}`,
    email: item.email,
    dateCreated: <Time timeStamp={item.datecreated} />,
    dateModified: <Time timeStamp={item.datemodified} />,
  }));
};

const UsersList = React.memo(props => {
  return (
    <DataTable
      editable
      addButtonTitle="Add user"
      deleteButtonTitle="Delete"
      rows={mapItemsToRows(props.items)}
      headCells={headCells}
      totalCount={props.totalCount}
      loadMore={props.loadMore}
      onAddClick={props.onUserAdd}
      onEditClick={props.onUserUpdate}
      onDeleteClick={props.onUserDelete}
    />
  );
});

UsersList.propTypes = {
  totalCount: number,
  items: arrayOf(
    shape({
      company: string,
      datecreated: number,
      datemodified: number,
      email: string,
      namefirst: string,
      namelast: string,
      userid: string,
    }),
  ),
  loadMore: func.isRequired,
  onUserAdd: func.isRequired,
  onUserUpdate: func.isRequired,
  onUserDelete: func.isRequired,
};

export { UsersList };

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from '../../../common/components/DataTable';

const { arrayOf, number, shape, string, func } = PropTypes;

const headCells = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'url',
    label: 'Url',
  },
];

const mapItemsToRows = items => {
  return items.map(item => ({
    id: item.externalcompanyid,
    name: item.name,
    url: item.url1,
  }));
};

const ManufacturersList = memo(props => {
  return (
    <DataTable
      rows={mapItemsToRows(props.items)}
      headCells={headCells}
      totalCount={props.totalCount}
      loadMore={props.loadMore}
    />
  );
});

ManufacturersList.propTypes = {
  totalCount: number,
  items: arrayOf(
    shape({
      address: string,
      city: string,
      countryid: string,
      description: string,
      email: string,
      externalcompanyid: number,
      name: string,
      phone: string,
      state: string,
      url1: string,
      url2: string,
      zip: string,
    }),
  ),
  loadMore: func,
};

export { ManufacturersList };

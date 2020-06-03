import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { DataTable } from '../../../common/components/DataTable';
import { Time } from '../Time';

const { any, arrayOf, bool, number, shape, string, func } = PropTypes;

const headCells = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Title',
  },
  {
    id: 'price',
    label: 'Price',
  },
  {
    id: 'dateModified',
    label: 'Date Modified',
  },
];

const mapItemsToRows = items => {
  return items.map(item => ({
    id: item.productid,
    name: item.title,
    price: item.moneyfinalprice,
    dateModified: <Time timeStamp={item.datemodified} />,
  }));
};

const ProductsList = memo(props => {
  return (
    <DataTable
      rows={mapItemsToRows(props.items)}
      headCells={headCells}
      totalCount={props.totalCount}
      loadMore={props.loadMore}
    />
  );
});

ProductsList.propTypes = {
  totalCount: number,
  items: arrayOf(
    shape({
      active: bool,
      activepos: bool,
      barcode: any,
      datemodified: number,
      manufacturerid: number,
      moneyfinalprice: string,
      moneyprice: string,
      moneypricein: string,
      moneypriceorg: string,
      productid: number,
      sku: string,
      stockallowbackorder: bool,
      stockcountenable: bool,
      title: string,
      variant: arrayOf(any),
      variantparentid: number,
      vatid: number,
    }),
  ),
  loadMore: func,
};

export { ProductsList };

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingView } from '../../../common/components/LoadingView';
import { ManufacturersList } from '../../components/ManufacturersList';
import {
  getAllManufacturersSelector,
  getManufacturersTotalCountSelector,
} from '../../store/reducers/manufacturersSlice';
import { getManufacturersThunk } from '../../store/actions/manufacturersThunks';

export default () => {
  const dispatch = useDispatch();
  const items = useSelector(getAllManufacturersSelector);
  const totalCount = useSelector(getManufacturersTotalCountSelector);
  const loadMore = useCallback(
    options =>
      dispatch(
        getManufacturersThunk({ pagination: options, incrementalLoad: true }),
      ),
    [dispatch],
  );

  useEffect(() => {
    dispatch(getManufacturersThunk());
  }, [dispatch]);

  return items ? (
    <ManufacturersList
      items={items}
      totalCount={totalCount}
      loadMore={loadMore}
    />
  ) : (
    <LoadingView />
  );
};

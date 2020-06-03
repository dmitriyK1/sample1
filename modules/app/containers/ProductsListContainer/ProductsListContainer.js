import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingView } from '../../../common/components/LoadingView';
import { ProductsList } from '../../components/ProductsList';
import {
  getAllProductsSelector,
  getProductsTotalCountSelector,
} from '../../store/reducers/productsSlice';
import { getProductsThunk } from '../../store/actions/productsThunks';

export default () => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProductsSelector);
  const totalCount = useSelector(getProductsTotalCountSelector);
  const loadMore = useCallback(
    options =>
      dispatch(
        getProductsThunk({ pagination: options, incrementalLoad: true }),
      ),
    [dispatch],
  );

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return products ? (
    <ProductsList
      items={products}
      totalCount={totalCount}
      loadMore={loadMore}
    />
  ) : (
    <LoadingView />
  );
};

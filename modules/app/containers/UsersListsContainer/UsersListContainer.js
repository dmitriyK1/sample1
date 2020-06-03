import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingView } from '../../../common/components/LoadingView';
import { UsersList } from '../../components/UsersList';
import {
  showAddUserModalAction,
  showDeleteUserModalAction,
  showUpdateUserModalAction,
} from '../../store/actions/actions';
import {
  getAllUsersSelector,
  getUsersTotalCountSelector,
} from '../../store/reducers/usersSlice';
import { getUsersThunk } from '../../store/actions/usersThunks';

export default () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsersSelector);
  const totalCount = useSelector(getUsersTotalCountSelector);
  const loadMore = useCallback(
    options =>
      dispatch(getUsersThunk({ pagination: options, incrementalLoad: true })),
    [dispatch],
  );

  const onUserAdd = useCallback(() => dispatch(showAddUserModalAction()), [
    dispatch,
  ]);

  const onUserUpdate = useCallback(
    ({ dateCreated, dateModified, ...user }) =>
      dispatch(showUpdateUserModalAction(user)),
    [dispatch],
  );

  const onUserDelete = useCallback(
    (userIds, onDeleteCallback) =>
      dispatch(showDeleteUserModalAction(userIds, onDeleteCallback)),
    [dispatch],
  );

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return users ? (
    <UsersList
      items={users}
      totalCount={totalCount}
      loadMore={loadMore}
      onUserAdd={onUserAdd}
      onUserUpdate={onUserUpdate}
      onUserDelete={onUserDelete}
    />
  ) : (
    <LoadingView />
  );
};

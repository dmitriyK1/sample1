import React from 'react';
import { useSelector } from 'react-redux';

import { Notification } from '../../../common/components/Notification';
import { useHideNotifications } from '../../../common/hooks/useHideNotifications';
import {
  notificationMessageSelector,
  notificationTypeSelector,
} from '../../../common/store/notificationsSlice';

export const NotificationsRoot = () => {
  const notificationType = useSelector(notificationTypeSelector);
  const message = useSelector(notificationMessageSelector);
  const onClose = useHideNotifications();

  return Boolean(notificationType) ? (
    <Notification
      isOpen={Boolean(notificationType)}
      type={notificationType}
      message={message}
      onClose={onClose}
    />
  ) : null;
};

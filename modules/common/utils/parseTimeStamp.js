export const parseTimeStamp = timeStamp => {
  const date = new Date(timeStamp * 1000);

  const time = date.toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return {
    time,
    day,
    month,
    year,
  };
};

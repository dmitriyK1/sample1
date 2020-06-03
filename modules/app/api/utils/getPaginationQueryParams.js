export const getPaginationQueryParams = options => {
  return String(
    new URLSearchParams({ start: options.start, num: options.num }),
  );
};

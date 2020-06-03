export const mapUsersFromApi = data => ({
  totalCount: data.totalcount,
  items: data.items,
});

export const isApiError = response => {
  if (Array.isArray(response)) {
    return response.some(item => item.errortext);
  }

  return response && Boolean(response.errortext);
};

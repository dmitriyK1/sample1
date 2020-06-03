import { authHeader, proxyUrl, apiUrl } from '../../../config';

export const baseApiUrl = `${proxyUrl}${apiUrl}`;

export const headers = new Headers({
  Authorization: `Basic ${authHeader}`,
});

export const defaultPaginationOptions = { start: 0, num: 10 };

export const getRequestConfig = {
  headers,
  method: 'GET',
};

export const postRequestConfig = { headers, method: 'POST' };
export const deleteRequestConfig = { headers, method: 'DELETE' };
export const updateRequestConfig = { headers, method: 'PUT' };

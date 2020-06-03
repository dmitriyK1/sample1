import {
  baseApiUrl,
  defaultPaginationOptions,
  getRequestConfig,
} from './config';
import { getPaginationQueryParams } from './utils/getPaginationQueryParams';

const apiUrl = new URL(`${baseApiUrl}/manufacturers.json`);

export const getAllManufacturers = async (
  options = defaultPaginationOptions,
) => {
  apiUrl.search = getPaginationQueryParams({
    start: options.start,
    num: options.num,
  });

  const response = await fetch(apiUrl, getRequestConfig);
  return await response.json();
};

import {
  baseApiUrl,
  defaultPaginationOptions,
  deleteRequestConfig,
  getRequestConfig,
  postRequestConfig,
  updateRequestConfig,
} from './config';
import { getPaginationQueryParams } from './utils/getPaginationQueryParams';
import { mapUserToApi } from './dataMappers/mapUserToApi';

const usersApiUrl = new URL(`${baseApiUrl}/users.json`);
const getUserApiUrl = userId => new URL(`${baseApiUrl}/users/${userId}.json`);

export const getAllUsers = async (options = defaultPaginationOptions) => {
  usersApiUrl.search = getPaginationQueryParams({
    start: options.start,
    num: options.num,
  });

  const response = await fetch(usersApiUrl, getRequestConfig);
  return await response.json();
};

export const getSingleUser = async userId => {
  const response = await fetch(getUserApiUrl(userId), {
    ...getRequestConfig,
  });
  return await response.json();
};

export const createUser = async newUser => {
  const response = await fetch(usersApiUrl, {
    ...postRequestConfig,
    body: JSON.stringify(mapUserToApi(newUser)),
  });
  return await response.json();
};

export const deleteUser = async userId => {
  const response = await fetch(getUserApiUrl(userId), {
    ...deleteRequestConfig,
  });
  return await response.json();
};

export const updateUser = async ({ userid, ...user }) => {
  const response = await fetch(getUserApiUrl(userid), {
    ...updateRequestConfig,
    body: JSON.stringify(mapUserToApi(user)),
  });
  return await response.json();
};

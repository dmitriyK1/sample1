export const mapUserToApi = user => ({
  namefirst: user.firstName,
  namelast: user.lastName,
  email: user.email,
});

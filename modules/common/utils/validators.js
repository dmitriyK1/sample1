const regName = /^[a-zA-Z]+$/;

const regEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const nameValidator = name => regName.test(name);
export const emailValidator = email => regEmail.test(email);

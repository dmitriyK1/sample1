export const hasFalsyValues = object => {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      if (!object[key]) return true;
    }
  }

  return false;
};

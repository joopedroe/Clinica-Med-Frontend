export const logged = () => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    // eslint-disable-next-line no-console
    console.log(token);
    return true;
  }
  return false;
};
export const logout = () => {
  const token = localStorage.removeItem('token');
  if (token !== null) {
    return false;
  }
  return true;
};

export const isAdmin = () => {
  const type = localStorage.getItem('Type_user');
  if (type !== 'admin') {
    return false;
  }
  return true;
};

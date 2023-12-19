export const makeHashPassword = (password, salt = 10) => {
  return bcryptjs.hashSync(password, salt);
};

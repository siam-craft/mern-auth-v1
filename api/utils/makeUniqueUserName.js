export const makeUniqueUserName = (username) => {
  return (
    username.split(" ").join("").toLowerCase() +
    Math.floor(Math.random() * 1000).toString()
  );
};

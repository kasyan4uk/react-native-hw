export const isBtnDisable = (form) => {
  return Object.values({ ...form, avatarUrl: 'default' }).some(
    (item) => item == false
  );
};

module.exports = (ext) => {
  const validTypes = [".jpg", ".jpeg", ".png"];

  return validTypes.indexOf(ext) === -1 ? false : true;
};

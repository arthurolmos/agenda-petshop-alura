const fs = require("fs");
const path = require("path");
const validation = require("../../validations/uploadFile");

module.exports = (oldfilePath, filePath, fileName, cb) => {
  const ext = path.extname(filePath);

  const valid = validation(ext);

  if (!valid) {
    console.log("Tipo de arquivo invalido!");
    const err = "Tipo de arquivo invalido!";
    cb(err);
  } else {
    const newPath = path.resolve(
      __dirname,
      "..",
      "..",
      "assets",
      `${Date.now()}-${fileName}${ext}`
    );

    fs.createReadStream(filePath).pipe(
      fs.createWriteStream(newPath).on("finish", () => {
        try {
          if (oldfilePath) {
            fs.rm(oldfilePath, () => cb(false, newPath));
          } else {
            cb(false, newPath);
          }
        } catch (err) {
          cb(err);
        }
      })
    );
  }
};

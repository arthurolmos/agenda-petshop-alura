const convertStringToDate = require("../utils/convertStringToDate");
const getDateNow = require("../utils/getDateNow");
const connection = require("../infrastructure/db/connection");
const uploadFile = require("../infrastructure/upload/uploadFile");
const repo = require("../repositories/pet");
const removeFile = require("../infrastructure/upload/removeFile");
const swapFiles = require("../infrastructure/upload/swapFiles");
// const validate = require("../validations/attendance");

class Attendance {
  index() {
    return repo.index().then((results) => results);
  }

  findById(id) {
    return repo.findById(id).then((results) => {
      const attendance = results[0];
      return attendance;
    });
  }

  create(pet) {
    return new Promise((resolve, reject) => {
      uploadFile(pet.image, pet.name, (err, newPath) => {
        if (err) {
          reject(err);
        } else {
          const createdAt = getDateNow();

          const values = {
            name: pet.name,
            image: newPath,
            createdAt,
            updatedAt: createdAt,
          };

          return repo.create(values).then((results) => {
            const id = results.insertId;

            resolve({ ...pet, id });
          });
        }
      });
    });
  }

  update(id, values) {
    const updatedAt = getDateNow();

    if (values.image) {
      return new Promise((resolve, reject) => {
        this.findById(id).then((results) => {
          const pet = results;
          const path = pet.image;

          const name = values.name ? values.name : pet.name;

          return swapFiles(path, values.image, name, (err, newPath) => {
            if (err) {
              reject(err);
            } else {
              const data = { name, image: newPath, updatedAt };

              return repo.update(id, data).then((results) => {
                resolve({ ...data, id });
              });
            }
          });
        });
      });
    } else {
      const data = { ...values, updatedAt };

      return repo.update(id, data).then((results) => {
        return { ...data, id };
      });
    }
  }

  delete(id, res) {
    return new Promise((resolve, reject) => {
      this.findById(id).then((result) => {
        const pet = result;
        const path = pet.image;

        return removeFile(path, (err) => {
          if (err) {
            return reject(err);
          } else {
            return repo.delete(id).then((results) => {
              resolve({ id });
            });
          }
        });
      });
    });
  }
}

module.exports = new Attendance();

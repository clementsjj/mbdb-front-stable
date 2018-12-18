import axios from 'axios';
export const getBathrooms = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://mbdb-node.herokuapp.com/bathrooms/getvalidatedbathrooms`)
      .then(data => {
        resolve({ bathrooms: data.data });
      })
      .catch(err => {
        reject(err);
      });
  });
};

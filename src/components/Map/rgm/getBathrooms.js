import axios from 'axios';
export const getBathrooms = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://mbdb-node.herokuapp.com/bathrooms/getallbathrooms`)
      .then(data => {
        console.log('GET request sent. Return: ', data);
        console.log('Clean Data: ', data.data);
        resolve({ bathrooms: data.data });
      })
      .catch(err => {
        reject(err);
      });
  });
};

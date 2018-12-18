export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    const geolocation = navigator.geolocation;

    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
      },
      () => {
        let defaultLocation = {};
        defaultLocation.lat = 40.7308;
        defaultLocation.lng = -73.9973;
        reject(defaultLocation);
      }
    );
  });
};

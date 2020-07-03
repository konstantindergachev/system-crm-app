const setAuthToken = token => {
  let myHeaders = new Headers();
  if (token) {
    //Apply to every request
    myHeaders.append('Authorization', token);
  } else {
    //Delete auth header
    myHeaders.delete('Authorization');
  }
};

export default setAuthToken;

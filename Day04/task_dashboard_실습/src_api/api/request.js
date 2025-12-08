const request = async (url, method, data) => {
  const response = await axios({
    url,
    method,
    data,
  });
  return response.data;
};

export default request;
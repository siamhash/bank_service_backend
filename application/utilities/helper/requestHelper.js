const axios = require('axios');

const postRequest = async ({ url, data, headers }) => {
    try {
        const response = await axios({
            url: `${url}`,
            method: 'post',
            data,
            headers: headers || {
                'cache-control': 'no-cache',
            },
        });
        return response;
    } catch (error) {
        const { response } = error;
        if (!response) {
            return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
        }
        const { response: { status, data: responseData } } = error;
        if (status === 404) {
            return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
        }
        if (status === 400) {
            const { details, error: err } = responseData;
            if (details) {
            return { errors: details };
            }
            if (err) {
            return { error: responseData };
            }
            return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
        }
        return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
    }
};
  
const getRequest = async ({ url, params, headers }) => {
    try {
      const response = await axios({
        url: `${url}`,
        method: 'get',
        params,
        headers,
      });
      return response;
    } catch (error) {
      const { response: { status } } = error || { response: {} };
  
      if (status === 404) {
        return { errors: [ { name: 'server', message: 'Resources are not available.' } ] };
      }
  
      return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time.' } ] };
    }
};

module.exports = {
    postRequest,getRequest
}
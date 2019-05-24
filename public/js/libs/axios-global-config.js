axios.defaults.baseURL = '//' + window.api_host + '/api/';
axios.defaults.headers.common['accessToken'] = window.accessToken;
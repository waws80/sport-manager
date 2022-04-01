"use strict";

import Vue from 'vue';
import axios from "axios";
import router from "@/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.headers.common['id'] = localStorage.id;
axios.defaults.headers.common['deviceInfo'] = "sport-manager-client";

let config = {
  baseURL: "http://localhost:8080/sport",
  timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
  crossOriginIsolated: true,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    axios.defaults.headers.common['id'] = localStorage.id;
    axios.defaults.headers.common['deviceInfo'] = "sport-manager-client";
      console.log("interceptor-id", localStorage.id);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
      if (error.response.status === 403 || error.response.status === 401){
          router.replace('/login');
          console.log('------------');
      }
    // Do something with response error
    return Promise.reject(error);
  }
);

// eslint-disable-next-line no-unused-vars
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;

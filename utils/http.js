/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 * 
  import http from '@/http'

  http.request(url:'user/list',method:'GET').then((res)=>{
    console.log(JSON.stringify(res))
  })
  http.get('user/list').then((res)=>{
    console.log(JSON.stringify(res))
  })
  http.get('user/list', {status: 1}).then((res)=>{
    console.log(JSON.stringify(res))
  })
  http.post('user', {id:1, status: 1}).then((res)=>{
    console.log(JSON.stringify(res))
  })
  http.put('user/1', {status: 2}).then((res)=>{
    console.log(JSON.stringify(res))
  })
  http.delete('user/1').then((res)=>{
    console.log(JSON.stringify(res))
  }) 
*/
import { getToken } from "@/utils/auth";
import store from "@/store";

import { router, whiteListRoutes } from "@/router";

export function getBaseUrl() {
  let baseUrl = "/api";
  // baseUrl = uni.getStorageSync(`api_base_url`) || baseUrl;
  return baseUrl;
}

export const configBaseUrls = [
  {
    name: "dev",
    url: "http://localhost:8080/second-calendar",
  },
];

const http = {
  config: {
    baseUrl: getBaseUrl(),
    header: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {},
    config: {},
    method: "GET",
    dataType: "json",
    responseType: "text",
    timeout: 100000,
    success() {},
    fail() {},
    complete() {},
  },
  // jumpLoginFlag: false,
  showLoadingAmount: 0,

  setBaseUrl(baseUrl) {
    this.config.baseUrl = baseUrl;
    uni.setStorageSync(`api_base_url`, baseUrl);
  },
  getBaseUrl() {
    return getBaseUrl();
  },

  // 请求拦截器
  requestInterceptor(config) {
    config.requestId = new Date().getTime();

    this.addHeader(config);
    this.formatUrl(config);
    this.clearConfig(config);

    if (config.config.loading) {
      this.showLoadingAmount++;
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
    }

    return config;
  },

  // 返回拦截器
  responseInterceptor(response, resolve, reject) {
    let { config, data } = response;
    if (config.config.loading) {
      this.showLoadingAmount--;
      if (this.showLoadingAmount <= 0) {
        uni.hideLoading();
      }
    }

    if (response.statusCode === 200) {
      if (data.code === 401) {
        // if (this.jumpLoginFlag) {
        //   return reject();
        // }
        // this.jumpLoginFlag = true;
        store.dispatch("user/resetState").then((_) => {
          setTimeout(() => {
            if (!whiteListRoutes.includes(router.currentRoute.name)) {
              router.$lockStatus = false;
              router.replaceAll({
                name: "login",
              });
            }
            // this.jumpLoginFlag = false;
          }, 1500);
          reject();
        });
        return;
      } else {
        return resolve(data);
      }
    } else {
      uni.showToast({
        icon: "none",
        title: (data && data.msg) || "系统错误",
      });
      return reject(data);
    }
  },
  addHeader(config) {
    const timestamp = +new Date();
    config.header["timestamp"] = timestamp;
    config.header["token"] = getToken() || "tourist";
    config.header["x-client-type"] = "app";
  },
  formatUrl(config) {
    const isAbsoluteUrl = /(http|https):\/\/([\w.]+\/?)\S*/.test(config.url);
    config.url = isAbsoluteUrl
      ? config.url
      : config.baseUrl +
        (config.url.startsWith("/") ? config.url : "/" + config.url);
  },
  clearConfig(obj) {
    if (!(typeof obj === "object")) {
      return;
    }
    for (let key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] === null || obj[key] === undefined)
      ) {
        delete obj[key];
      }
    }
  },
  request(options, removeApiPrefix) {
    if (!options) {
      options = {};
    }
    options.baseUrl =
      options.baseUrl ||
      (!removeApiPrefix
        ? this.config.baseUrl
        : this.config.baseUrl.replace(/\/api$/, ""));
    options.dataType = options.dataType || this.config.dataType;
    options.responseType = options.responseType || this.config.responseType;
    options.url = options.url || "";
    options.data = options.data || {};
    options.header = options.header || this.config.header;
    options.method = (options.method || this.config.method).toUpperCase();
    options.config = { ...this.config.config, ...(options.config || {}) };

    //TODO 数据签名
    /* 
    _token = {'token': getStorage(STOREKEY_LOGIN).token || 'undefined'},
    _sign = {'sign': sign(JSON.stringify(options.data))}
    options.header = Object.assign({}, options.header, _token,_sign) 
    */

    return new Promise((resolve, reject) => {
      let _config = Object.assign({}, this.config, options);

      _config.complete = (response) => {
        response.config = _config;
        this.responseInterceptor(response, resolve, reject);
      };

      // _config 直接修改对象
      this.requestInterceptor(_config);
      uni.request(_config);
    });
  },

  get(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = "GET";
    return this.request(options);
  },

  post(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = "POST";
    return this.request(options);
  },

  put(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = "PUT";
    return this.request(options);
  },

  delete(url, data, options) {
    if (!options) {
      options = {};
    }
    options.url = url;
    options.data = data;
    options.method = "DELETE";
    return this.request(options);
  },
};

export function get(url, params) {
  return http.get(url, params).then((response) => response.data);
}

export function post(url, data) {
  return http.post(url, data || {}).then((response) => response.data);
}

export default http;

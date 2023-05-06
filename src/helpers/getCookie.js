import Api from "./api";

export default function getCookie() {
  return Api.get('/api/csrf-cookie')
};

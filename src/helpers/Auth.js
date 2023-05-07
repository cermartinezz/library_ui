import Cookies from "js-cookie";
import Api from "./api";
import getCookie from "./getCookie";

export default {

  async fetchUser() {
    try {
      await getCookie();

      let token = Cookies.get('token');

      let response = await Api.get('/auth/user',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      let {user} = response.data.result;

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.log(error.response.data.message)
    }

  },

  async readUser() {
    const token = Cookies.get('token')
    if(!token){
      localStorage.removeItem('user');
      return null;
    }else{
      let authUser = JSON.parse(localStorage.getItem('user'));

      if(authUser == null){
        let user = await this.fetchUser();
        return user;
      }else{
        return authUser
      }
    }
  }
};
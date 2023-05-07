import Cookies from "js-cookie";
import Api from "./api";
import getCookie from "./getCookie";

export default {

  async fetchUser() {
    try {
      console.log('--------------------------------------------')
      console.log('fetching user')

      await getCookie();

      let token = Cookies.get('token');
      console.log("token",token)

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
      console.log('no hay token se borra todo')
      localStorage.removeItem('user');
      return null;
    }else{
      let authUser = JSON.parse(localStorage.getItem('user'));
      console.log('Hay token asi que hay que ver si hay usuario')

      if(authUser == null){
        console.log('No hay user en el storage hay que ontenerlo')
        let user = await this.fetchUser();
        console.info('este es el user despues del fetchuser ', user);
        return user;
      }else{
        console.log('si habia user este es => ', authUser)
        return authUser
      }
    }
  }
};
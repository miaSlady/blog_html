import {myAxios} from '@/assets/js/axios.js';


//获取用户信息
export function GetUserinfo() {
  return myAxios('get', '/user/getUserinfo', {})
}
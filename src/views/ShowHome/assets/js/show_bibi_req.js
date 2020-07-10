import {myAxios} from '@/assets/js/axios.js';

//获取bibi列表
export function GetBibi(params) {
  return myAxios('get', '/bibi/getBibi', params)
}  
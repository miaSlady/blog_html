//接口前缀
export const BASEURL='http://127.0.0.1:3000';//自己的
// export const IMGURL='http://localhost:80';//图片服务器地址

//验证码
export const CODEURL=BASEURL+'/login/code';

//时间日期转化器
export const CUSTOMDATE = (now)=>{
  now=new Date(now);
  var year=now.getFullYear();
  var month=now.getMonth()+1>9 ? now.getMonth()+1 : '0'+(now.getMonth()+1);
  var date=now.getDate()>9? now.getDate() : '0'+now.getDate();
  var hour=now.getHours()>9 ? now.getHours() : '0'+now.getHours();
  var minute=now.getMinutes()>9 ? now.getMinutes() : '0'+now.getMinutes();
  var second=now.getSeconds()>9 ? now.getSeconds() : '0'+now.getSeconds();
  return year+"/"+month+"/"+date+" "+hour+":"+minute+":"+second;
};

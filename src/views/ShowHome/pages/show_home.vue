<template>
<div class="show_home">
  <Header/>
  <div class="content">
    <div class="left">
      <router-view/>
    </div>
    <div class="right">
      <p class="avatar" :style="{backgroundImage:'url('+userInfo.imgurl+')'}"/>
      <p class="name">{{userInfo.name}}</p>
      <p class="slogan">{{userInfo.slogan}}</p>
      <ul class="tags">
        <li v-for="(v,i) in userInfo.tags" :key="i">{{v}}</li>
      </ul>
      <div class="socialAccount">
        <span class="line"></span>
        <span class="text">社交账号</span>
      </div>
      <ul class="iconList">
        <li v-for="(v,i) in accountList" :key="i" @click="jump(v.link)" >
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{v.value}}</span>
            </template>
            <a-icon :type="v.icon"/>
          </a-tooltip>
        </li>
      </ul>
    </div>
  </div>
  <footer>
    <p>系统由 Vue+Node+Antd Vue驱动</p>
    <p>Mia.com</p>
  </footer>
</div>
</template>

<script>
import {BASEURL} from '@/assets/js/config'
import {GetUserinfo} from '../assets/js/show_home_req.js'
import Header from '@/components/show_home/header'
export default {
  components:{
    Header
  },
  data (){
    return {
      accountList:[
        {
          icon:'github',
          name:'github:',
          field:'github',
          value:'github:巴拉拉巴拉',
          link:'balabala'
        },
        {
          icon:'weibo-circle',
          name:'微博:',
          field:'weibo',
          value:'微博:巴拉拉巴拉',
          link:'balabala'
        },
        {
          icon:'wechat',
          name:'微信:',
          field:'wechat',
          value:'微信:巴拉拉巴拉',
          link:'balabala'
        },
        {
          icon:'qq',
          name:'qq:',
          field:'qq',
          value:'qq:巴拉拉巴拉',
          link:'balabala'
        },
      ],
      userInfo:{},
      
    };
  },
  methods:{
    //获取用户信息
    getUserinfo(){
      GetUserinfo().then(msg=>{
        if(msg.code==200){
          let data=msg.data,accountList=this.accountList;
          data.tags=data.tags.split(",");
          data.imgurl=BASEURL+data.imgurl;
          accountList.forEach((v,i)=>{
            var link=data[v.field]
            v.value=v.name+'\n'+link;
            v.link=link;
          })
          this.userInfo=data;
          this.accountList=accountList;
        }
      })
    },
    //页面跳转
    jump(link){
      if(link) window.open(link); 
    },
  },
  mounted(){
    this.getUserinfo();
  },
}

</script>
<style lang='less' scoped src="../assets/css/show_home.less"/>
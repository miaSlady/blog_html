<template>
<div class="show_home">
  <Header/>
  <div class="content">
    <div class="left">
      <router-view/>
    </div>
    <div class="right">
      <p class="avatar" />
      <p class="name">米牙</p>
      <p class="slogan">专注前端开发吼吼</p>
      <ul class="tags">
        <li v-for="(v,i) in tags" :key="i">{{v}}</li>
      </ul>
      <div class="socialAccount">
        <span class="line"></span>
        <span class="text">社交账号</span>
      </div>
      <ul class="iconList">
        <li v-for="(v,i) in accountList" :key="i" @click="jump(link)" >
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
import Header from '@/components/show_home/header'
export default {
  components:{
    Header
  },
  data (){
    return {
      tags:['嘻嘻','吃货','臭美','你猜','愉快玩耍','猜猜猜','pljj','sqgg','咻咻咻','技术咖'],
      accountList:[
        {
          icon:'github',
          value:'github:巴拉拉巴拉',
          link:'balabala'
        },
        {
          icon:'weibo-circle',
          value:'微博:巴拉拉巴拉',
          link:'balabala'
        },
        {
          icon:'wechat',
          value:'微信:巴拉拉巴拉',
          link:'balabala'
        },
        {
          icon:'qq',
          value:'qq:巴拉拉巴拉',
          link:'balabala'
        },
      ],
      
    };
  },
  methods:{

  },
  mounted(){

  },
}

</script>
<style lang='less' scoped src="../assets/css/show_home.less"/>
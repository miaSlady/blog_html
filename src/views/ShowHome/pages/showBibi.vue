<template>
<div class="showBibi">
  <div class="breadcrumb">
    <div>
      <a-breadcrumb>
        <a-breadcrumb-item href="/">
          <a-icon type="home" />
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          逼逼叨
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
  <ul class="content">
    <li v-for="(item,i) in bibiData" :key="i" @click="openLink(item.link)"> 
      <img :src="item.img">
      <p>{{item.name}}</p>
    </li>
  </ul>
</div>
</template>

<script>
import {GetBibi} from '../assets/js/show_bibi_req'
import {BASEURL} from '@/assets/js/config.js'
export default {
  data (){
    return {
      img:BASEURL+'/upload/img1.jpg',
      bibiData:[],
    };
  },
  methods:{
    //获取逼逼叨列表
    getBibiList(){
      GetBibi({type:2}).then(msg=>{
        if(msg.code==200){
          let data=msg.data.list;
          data.forEach(v=>{
            v.img=BASEURL+v.imgurl;
          });
          this.bibiData=data;
        }
      })
    },
    //新开逼逼叨视频
    openLink(link){
      window.open(link);
    },

  },
  mounted(){
    this.getBibiList();
  },
}

</script>
<style lang='less' scoped  src="../assets/css/showBibi.less"/>
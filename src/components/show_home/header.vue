<template>
<div>
  <header>
    <div class="header">
      <div class="left">
        <span class="name">米牙</span>
        <span class="slogan">专注前端开发吼吼</span>
      </div>
      <div class="right">
        <ul>
          <li v-for="(v,i) in menu" :key="i" @click="jumpUrl(v.link)"> 
            <a-icon :type="v.icon" />
            {{v.name}}
          </li>
        </ul>
      </div>
    </div>
  </header>
</div>
</template>

<script>
export default {
  data (){
    return {
      menu:[
        {
          name:'博客首页',
          icon:'home',
          link:'/blogHome',
        },
        {
          name:'视频教程',
          icon:'play-square',
          link:'/showVideoCourse',
        },
        {
          name:'逼逼叨',
          icon:'message',
          link:'/showBibi',
        },
        {
          name:'图说生活',
          icon:'smile',
          link:'/showLife',
        },
      ],
    };
  },
  methods:{
    jumpUrl(link){
      this.$router.push(link);
    },
  },
  mounted(){},
}

</script>
<style lang='less' scoped>
header{
  position: fixed;
  top:0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: #fff;
  .header{
    margin:0 auto;
    height: 60px;
    line-height: 60px;
    width: 1100px;
    display: flex;
    justify-content: space-between;
    &>.left{
      .name{
        font-size: 24px;
        color: #1890ff;
        margin-right: 5px;
      }
      .slogan{
        color: #999;
        font-size: 10px;
      }
    }
    &>.right{
      ul{
        li{
          cursor: pointer;
          display: inline-block;
          margin-right: 60px;
          color:#999;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
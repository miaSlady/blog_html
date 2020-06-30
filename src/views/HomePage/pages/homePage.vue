<template>
<div class="homePage">
  <div class="changeBox">
    <ul>
      <li @click="jumpPage(1)">个人博客展示页</li>
      <li @click="jumpPage(2)">个人博客后台页</li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data (){
    return {
    };
  },
  methods:{
    //页面跳转
    jumpPage(type){
      let origin=location.origin;
      if(type==1){
        location.href=origin+"/showPage.html"
      }else{
        location.href=origin+"/backgroundPage.html"
      }
    },
  },
  mounted(){},
}

</script>
<style lang='less' src="../assets/css/homePage.less" scoped />
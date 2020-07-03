<template>
<div>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      class="mySide"
    >
      <div class="logo">
        <span v-show="!collapsed">个人博客后台系统</span>
      </div>
      <a-menu
        :default-selected-keys="defaultKey"
        :default-open-keys="defaultOpenKey"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        @click="handleClick"
      >
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="form" /><span>个人中心</span></span>
          <a-menu-item key="/personal_center">
            个人设置
          </a-menu-item>
          <a-menu-item key="/test">
            base64上传
          </a-menu-item>
        </a-sub-menu>  
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="form" /><span>功能模块</span></span>
          <a-menu-item key="/home">
            首页设置
          </a-menu-item>
          <a-menu-item key="/videoCourse">
            视频教程
          </a-menu-item>
          <a-menu-item key="/bibi">
            逼逼叨
          </a-menu-item>
          <a-menu-item key="/life">
            图说生活
          </a-menu-item>
        </a-sub-menu>  
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="myHeader" style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <router-view/>
    </a-layout>
    
  </a-layout>
  

</div>
</template>

<script>
export default {
  data (){
    return {
      collapsed: false,
      defaultKey:[this.$route.meta.menuPath],
      defaultOpenKey:[this.$route.meta.openKey],

    };
  },
  methods: {
    handleClick (e) {
      var nowPath=this.$route.path,toPath=e.key;
      console.log(11,nowPath,toPath);
      if(nowPath==toPath) return;
      console.log(33);
      this.$router.push(toPath);
    },
    

  },
  mounted(){
    console.log('meta11',this.$route.meta);
  },
}

</script>
<style lang='less' src="../assets/css/back_home.less" scoped />

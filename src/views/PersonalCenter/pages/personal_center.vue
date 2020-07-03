<template>
<div class="personalCenter">
  <div class="contentBox">
    <p class="title">个人信息设置</p>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="姓名" required>
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="slogan" required>
        <a-input v-model="form.slogan" />
      </a-form-model-item>
      <a-form-model-item label="标签" required>
        <div v-for="(v,i) in form.tags" :key="i">
          <a-row :gutter="24">
            <a-col :span="17">
              <a-input v-model="form.tags[i]" />
            </a-col>
            <a-col  :span="1"></a-col>
            <a-col :span="6">
              <a-button type="primary" @click="handleTags(i)">
                {{i==0 ? '添加' :'删除'}}
              </a-button>
            </a-col>
          </a-row>
        </div>
      </a-form-model-item>
      <a-form-model-item label="头像上传" required>
        <a-upload
          name="uploadImg"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :action="uploadUrl"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="form.img" :src="form.img" alt="avatar" />
          <div v-else>
            <a-icon :type="loadingUploadImg ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="github链接" required>
        <a-input v-model="form.github" />
      </a-form-model-item>
      <a-form-model-item label="微博链接" required>
        <a-input v-model="form.weibo" />
      </a-form-model-item>
      <a-form-model-item label="微信链接" required>
        <a-input v-model="form.wechat" />
      </a-form-model-item>
      <a-form-model-item label="qq链接" required>
        <a-input v-model="form.qq" />
      </a-form-model-item>
    </a-form-model> 
    <div class="submit">
      <a-button  type="primary" @click="handleSubmit">提交</a-button>
    </div>
  </div>
</div>
</template>

<script>
import {GetUserinfo,SubmitUserinfo} from '../assets/js/getData'
import {BASEURL} from '@/assets/js/config'
export default {
  data (){
    return {
      uploadUrl:BASEURL+'/upload/img',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: null,
        slogan: null,
        tags:[''],
        imgurl:null,     
        img:null,
        github:null,
        weibo:null,
        wechat:null,
        qq:null,
      },//
      loadingUploadImg: false,
    };
  },
  methods:{
    /**
     * 表单
     */
    //获取用户信息
    getUserInfo(){
      GetUserinfo().then(msg=>{
        if(msg.code==200){
          let data={...msg.data};
          data.tags=data.tags ? data.tags.split(",") : [""];
          data.img=data.imgurl ? BASEURL+data.imgurl : '';
          this.form=data;
        }
      })
    },
    //提交
    handleSubmit(){
      // function aa(obj){
      //   for(var i in obj){
      //     if(i!='tags' && !obj[i])  return false
      //     if(i=='tags' && !obj[i].length) return false
      //   }
      //   return true
      // }
      // if(!aa(this.form)) return this.$message.error("请填写必填项");
      let params={...this.form};
      params.tags=params.tags.join(",");
      SubmitUserinfo({...params}).then(msg=>{
        if(msg.code==200){
          this.$message.success("提交成功");
          this.getUserInfo();
        }
      })
      
    },
    //标签（新增、删除）
    handleTags(i){
      let {tags}=this.form;
      if(tags.length>9) return this.$message.error("最多添加10个标签");
      if(i==0){
        this.form.tags.push("");
      } else{
        this.form.tags.splice(i,1);
      }
    },
    /**
     * 图片上传
     */
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loadingUploadImg = true;
        return;
      }
      if (info.file.status === 'done') {
        this.loadingUploadImg = false;
        var response=info.file.response;
        if(response.code==200){
          this.form.imgurl=response.data.path;
          this.form.img=BASEURL+this.form.imgurl;
        }else{
          this.$message.error("上传失败")
        }
        
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('上传的图片必须为png或jpg');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图片大小不得超过2MB');
      }
      return isJpgOrPng && isLt2M;
    },
  },
  mounted(){
    this.getUserInfo();
  },
}

</script>
<style lang='less' scoped src="../assets/css/personal_center.less"/>
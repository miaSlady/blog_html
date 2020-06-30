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
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loadingUploadImg ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="github链接">
        <a-input v-model="form.github" />
      </a-form-model-item>
      <a-form-model-item label="微博链接">
        <a-input v-model="form.weibo" />
      </a-form-model-item>
      <a-form-model-item label="微信链接">
        <a-input v-model="form.wechat" />
      </a-form-model-item>
      <a-form-model-item label="qq链接">
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
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data (){
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: null,
        slogan: null,
        tags:[''],
        imageUrl:null
      },
      loadingUploadImg: false,
    };
  },
  methods:{
    /**
     * 表单
     */
    //提交
    handleSubmit(){

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
        getBase64(info.file.originFileObj, imageUrl => {
          this.form.imageUrl = imageUrl;
          this.loadingUploadImg = false;
        });
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
  mounted(){},
}

</script>
<style lang='less' scoped src="../assets/css/personal_center.less"/>
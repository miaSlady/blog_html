<template>
<div>
  <h4>上传base64图片</h4>
  <input type="file" @change="Preview($event)" accept="image/*" ref="showinput">
  <div>图片名字：{{imgName}}</div>
  <img :src="imgData" alt="">
  <a-button  type="primary" @click="handleSubmit">上传</a-button>

</div>
</template>

<script>
import {SubmitBaseImg} from '../assets/js/getData'
export default {
  data (){
    return {
      imgName:'',
      imgData:'',
    };
  },
  methods:{
    Preview(ev){
        // const self=this;
        const file=ev.target.files[0];
        this.imgName=file.name;
        console.log('图片文件',ev.target.files);
        this.imgObj=ev.target.files[0];
        let obj=new FileReader();
        obj.readAsDataURL(file);
        // obj.onload=function(){
        //   self.img=obj.result;
        // }
        obj.onload=()=>{
            this.picReduce(obj.result,base64=>{
                this.imgData=base64
            });
        };
    },
    // 图片压缩
    picReduce(picObj,callback){
        let img = new Image();
        img.src=picObj;
        img.onload=()=>{
            const w=img.width;
            const h=img.height;
            const scale = w/h;
            const max_w=w>1080?1080:w;
            const max_h=h*max_w/w;
            let canvas=document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            canvas.width=max_w;
            canvas.height=max_h;
            ctx.drawImage(img,0,0,max_w,max_h);
            var base64 = canvas.toDataURL('image/jpeg', 0.7);
            callback(base64)
        }
    },
    handleSubmit(){
      SubmitBaseImg({imgData:this.imgData,imgName:this.imgName}).then(msg=>{
        if(msg.code==200){

        }
      })
    },
  },
  mounted(){},
}

</script>
<style lang='less' scoped>
</style>
<template>
<div>
  <h4>上传base64图片</h4>
  <input type="file" @change="Preview($event)" accept="image/*" ref="showinput">
  <div>图片名字：{{imgName}}</div>
  <img :src="imgData" alt="">
  <a-button  type="primary" @click="handleSubmit">上传</a-button>
  <h4>数字动画1</h4>
  <div>{{num}}</div>
  <a-button  type="primary" @click="handleAnimation">切换动画1</a-button>
  <h4>数字动画2</h4>
  <div class="box">
    <div style="border: 1px yellow solid" class="block" v-for="(list,i) in listAll" :key="i">
      <div v-bind:class="[roll, rollList[list.length]]">
        <div v-for="number in list">{{number}}</div>
      </div>
    </div>
  </div>
  {{listAll}}
  <a-button  type="primary" @click="handleAnimation2">切换动画2</a-button>

</div>
</template>

<script>
import {SubmitBaseImg} from '../assets/js/getData'
export default {
  data (){
    return {
      imgName:'',
      imgData:'',
      num:5155,

      init:5155,
      listAll:[],
    };
  },
  methods:{
    /**
     * 数字动画2
    **/
    // 获得变化前字符串和变化后字符串,可从后台获取
    getNumber(){
      console.log(this.init);
      let random=Math.floor(Math.random() * (100000- 1) + 1);
      this.prev=this.addZero(this.init,10);
      this.next=this.addZero(this.init+random,10);
      this.init+=random;
    },
    // 对数字补零成字符串
    addZero(num, n) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    // 对变化前后字符串的各字符变化过程进行填充处理
    getData() {
      this.listAll=[];
      let prevArray = this.prev.split("");
      let nextArray = this.next.split("");

      let listInit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      for(let i=0;i<prevArray.length;i++){
        let prevNumber = parseInt(prevArray[i]);
        let nextNumber = parseInt(nextArray[i]);
        let start = -1;
        let end = -1;

        for (let j = 0; j < listInit.length; j++) {
          if (listInit[j] === prevNumber) {
            start = j;
          }
          if (start !== -1 && listInit[j] === nextNumber) {
            end = j;
            break;
          }
        }
        this.listAll.push(listInit.slice(start, end + 1));
      }
    },
    run() {
      this.getNumber();
    },
    handleAnimation2(){
      this.run();
    },
    //定时任务刷新
    // setTimer() {
    //   this.run();
    //   setInterval(() => {
    //     setTimeout(this.run, 0);
    //   }, 1000 * 4)
    // },
    /**
     * 数字动画1
    **/
    handleAnimation(){
      let num=this.num-10 ,that=this;
      for(let i=0;i<11;i++){
          setTimeout((function(i){
            return function() {
              that.num=num+i;
            }
          })(i),i*100)
        
      }

    },
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
  mounted(){
    this.run();
    this.getData();
  },
}

</script>
<style lang='less' scoped>
.box {
    background: green;
    display: inline-flex;
    height: 100px
  }

  .block {
    height: 100px;
    width: 100px;
    color: white;
    text-align: center;
    overflow: hidden;
  }

  .roll div {
    font-size: 80px;
    line-height: 100px;
  }

  .roll_1 {
    -webkit-animation: roll_1 3s forwards; /* Safari 与 Chrome */
  }

  /*省略roll_2——roll_8*/

  .roll_9 {
    -webkit-animation: roll_9 3s forwards; /* Safari 与 Chrome */
  }

  @-webkit-keyframes roll_1 /* Safari 与 Chrome */
  {
    0% {
      transform: translate3d(0, 0px, 0);
    }
    100% {
      transform: translate3d(0, -100px, 0);
    }
  }

   /*省略roll_2——roll_8*/

  @-webkit-keyframes roll_9 /* Safari 与 Chrome */
  {
    0% {
      transform: translate3d(0, 0px, 0);
    }
    100% {
      transform: translate3d(0, -900px, 0);
    }
  }
</style>
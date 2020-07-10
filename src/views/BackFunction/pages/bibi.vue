<template>
<div class="bibi">
  <div class="content">
    <div class="btnBox">
      <a-button class="btn" type="primary" @click="handleTable(1)">新增</a-button>
      <a-button class="btn" type="primary" @click="handleTable(2)">删除</a-button>
    </div>
    <a-table 
    class="table"
    :columns="columns" 
    :data-source="tableData" 
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :pagination="false" 
    :loading="loadingTable"
    >
      <a slot="img" slot-scope="img">
        <span class="img">
          <img :src="img" alt="">
        </span>
        <!-- <div class="img" :style="{background:'url('+img+') no-repeat',backgroundSize:'cover'}"></div> -->
      </a>
      <a slot="isShow" slot-scope="isShow">
        <span> {{isShow==1 ? '是' : '否'}} </span>
      </a>
      <a slot="action" slot-scope="text">
        <span class="marginRight" style="margin-left:10px" @click="handleShow(text)">{{text.isShow==1 ? '隐藏' :'显示'}}</span>
        <span @click="handleUpdate(text)">修改</span>
      </a>
    </a-table>
    <div v-if="pagenation.total" class="pagination">
      <a-pagination :pageSize="pagenation.size" v-model="pagenation.current" :total="pagenation.total" show-less-items @change="handleCurrentChange"/>
    </div>
  </div>
  
  <!-- 弹框==》新增、修改 逼逼叨 -->
  <a-modal 
    okText="确认"
    cancelText="取消"
    :width="popAdd.width"
    :title="popAdd.title"
    v-model="popAdd.show"
    @ok="handleAdd">
      <p>
        <span>标题：</span>
        <a-input v-model="popAdd.name" placeholder="请输入标题"  style="width: 250px"/>
      </p>
      <p>
        <span>链接：</span>
        <a-input v-model="popAdd.link" placeholder="请输入标题"  style="width: 250px"/>
      </p>
      <div>
        <span>图片：</span>
        <div style="margin:0 50px">
          <a-upload
            name="uploadImg"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="uploadUrl"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="popAdd.img" :src="popAdd.img" alt="avatar" />
            <div v-else>
              <a-icon :type="loadingUploadImg ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </div>
      </div>
      <p>
        <span>是否展示：</span>
        <a-switch :checked="popAdd.isShow" @change="handleIsShowChange" />
      </p>
  </a-modal>
</div>
</template>

<script>
import {GetBibi,AddBibi,UpdateBibi,DeleteBibi,isShowBibi} from '../assets/js/getData'
import {BASEURL,CUSTOMDATE} from '@/assets/js/config.js'
const columns = [
  { title: '标题', dataIndex: 'name', key: 'name'},
  { title: '链接', dataIndex: 'link', key: 'link'},
  { title: '生成时间', dataIndex: 'time', key: 'time' },
  { title: '是否显示', dataIndex: 'isShow',scopedSlots: { customRender: 'isShow' } },
  { title: '封面', dataIndex: 'img', key: 'img',scopedSlots: { customRender: 'img' }  },
  {
    title: '操作',
    key: 'operation',
    width: 120,
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  data (){
    return {
      columns,
      pagenation:{
        total:100,
        current:1,
        size:5
      },
      loadingTable:false,
      selectedRowKeys:[],
      tableData:[],

      popAdd:{},
      loadingUploadImg:false,
      uploadUrl:BASEURL+'/upload/img',

    };
  },
  methods:{
    /**
     * 弹框==》新增、修改逼逼叨
     */
    /**
     * 图片上传
     */
    //1新增  2删除 3修改
    handleTable(type){//1 新增  2删除
      if(type==1){
        this.popAdd={
          type:1,
          title:'新增逼逼叨',
          show:true,
          width:400,
          height:350,
          isShow:true,
        };
      }else if(type==2){
        let keys=this.selectedRowKeys;
        if(!keys.length) return this.$message.error("请勾选需要删除的文件");
        DeleteBibi({bids:keys.join(",")}).then(msg=>{
          if(msg.code==200){
            this.selectedRowKeys=[];
            this.getBibiList();
          }
        })
      }
    },
    //修改
    handleUpdate(text){
      this.popAdd={
        type:2,
        title:'新增逼逼叨',
        show:true,
        width:400,
        height:350,
        ...text
      };
    },
    //提交新增
    handleAdd(){
      let {type}=this.popAdd;
      let isShow=Boolean(this.popAdd.isShow);
      if(type==1){//新增
        AddBibi({...this.popAdd,isShow}).then(msg=>{
          if(msg.code==200){
            this.$message.success("新增成功")
            this.getBibiList();
            this.popAdd={};
          } 
        })
      }else{//修改
        UpdateBibi({...this.popAdd,isShow}).then(msg=>{
          if(msg.code==200){
            this.$message.success("修改成功")
            this.getBibiList();
            this.popAdd={};
          } 
        })
      }
    },
    //上传
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loadingUploadImg = true;
        return;
      }
      if (info.file.status === 'done') {
        this.loadingUploadImg = false;
        var response=info.file.response;
        if(response.code==200){
          this.popAdd.imgurl=response.data.path;
          this.popAdd.img=BASEURL+this.popAdd.imgurl;
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
    
    /**
     * 表格内部操作
     */
    handleIsShowChange(v){
      this.popAdd.isShow=v;
      console.log('表格内部操作',v);
    },
    //获取逼逼叨列表
    getBibiList(){
      let {current,size}=this.pagenation;
      this.loadingTable=true;
      GetBibi({current,size,type:1}).then(msg=>{
        this.loadingTable=false;
        if(msg.code==200){
          let data=msg.data.list;
          if(!data.length && this.pagenation.current>1){
            this.pagenation.current--;
            return this.getBibiList();
          }
          data.forEach(v => {
            v.time=CUSTOMDATE(v.createTime)
            v.isShow=Boolean(v.isShow)
            v.key=v.bid;
            v.img=BASEURL+v.imgurl;
          });
          this.tableData=[...data];
          this.pagenation.total=msg.data.total;
        }
      }).catch(err=>{
        this.loadingTable=false;
      })
    },
    //显示、隐藏
    handleShow(val){
      let isShow=val.isShow==1?0:1;
      isShowBibi({bid:val.bid,isShow}).then(msg=>{
        if(msg.code==200){
          val.isShow=isShow
          this.$forceUpdate();
        }
      })
    },
     //表格多选
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    /**
     * 分页
     */
    //分页
    handleCurrentChange(pageNumber) {
      this.pagenation.current=pageNumber;
      this.getBibiList();
    },


  },
  mounted(){
    this.getBibiList();
  },
}

</script>
<style lang='less' scoped src="../assets/css/bibi.less"/>
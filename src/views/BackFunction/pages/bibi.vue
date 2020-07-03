<template>
<div class="bibi">
  <div class="content">
    <div>
      <a-button type="primary" @click="handleTable(1)">新增</a-button>
      <a-button type="primary" @click="handleTable(2)">删除</a-button>
    </div>
    <a-table 
    :columns="columns" 
    :data-source="tableData" 
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :pagination="false" 
    :loading="loadingTable"
    >
      <a slot="state" slot-scope="imgurl">
        <div>图片，哈哈哈</div>
      </a>
      <a slot="action" slot-scope="text">
        <span style="margin-left:10px" @click="handleShow(text.isShow)">显示</span>
        <span @click="handleChange(text)">修改</span>
      </a>
    </a-table>
    <div v-if="pagenation.total" class="pagination">
      <a-pagination v-model="pagenation.current" :total="pagenation.total" show-less-items @change="handleCurrentChange"/>
    </div>
  </div>
  
</div>
</template>

<script>
const columns = [
  { title: '标题', dataIndex: 'name', key: 'name'},
  { title: '链接', dataIndex: 'link', key: 'link'},
  { title: '生成时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '是否显示', dataIndex: 'isShow', key: 'isShow' },
  { title: '封面', dataIndex: 'imgurl', key: 'imgurl',scopedSlots: { customRender: 'imgurl' }  },
  {
    title: '操作',
    key: 'operation',
    width: 100,
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
        size:10
      },
    };
  },
  methods:{
    /**
     * 表格外部操作
     */
    handleTable(type){//1 新增  2删除
      
    },
    /**
     * 表格内部操作
     */
    //显示、隐藏
    handleShow(isShow){

    },
    //修改
    handleChange(){

    },
    /**
     * 分页
     */
    //分页
    handleCurrentChange(pageNumber) {
      this.pagenation.current=pageNumber;
      // let params={
      //   current:pageNumber || this.pagenation.current,
      //   size:10,
      //   classid:this.classid
      // };
      // this.getTableList(params);
    },


  },
  mounted(){

  },
}

</script>
<style lang='less' scoped src="../assets/css/bibi.less"/>
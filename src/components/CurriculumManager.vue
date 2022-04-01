<template>
  <div class="user-layout">

    <Form ref="searchForm" :model="searchForm" inline class="user-form">
      <FormItem prop="user">
        <Input type="text" v-model="searchForm.cname" placeholder="课程名">
        </Input>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit(searchForm)">查询</Button>
        &nbsp;
        <Button type="primary" @click="addModal = true">添加</Button>
      </FormItem>
    </Form>

<!--    add-->

    <Modal
        v-model="addModal">

      <p slot="header" style="color:#006688;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>添加课程</span>
      </p>

      <Form :model="addForm" :label-width="80">
        <FormItem label="课程名称" prop="name">
          <Input v-model="addForm.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="课程标签" prop="tip">
          <Input v-model="addForm.tip" placeholder="请输入标签"></Input>
        </FormItem>
        <FormItem label="课程类别" prop="type">
          <Select v-model="addForm.type" placeholder="请选择类别">
            <Option value="跑步">跑步</Option>
            <Option value="骑行">骑行</Option>
            <Option value="跳绳">跳绳</Option>
            <Option value="健身操">健身操</Option>
            <Option value="瑜伽">瑜伽</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="视频时长" prop="duration">
          <Input v-model="addForm.duration" type="text" placeholder="请输入视频时长，单位：秒" number></Input>
        </FormItem>
        <FormItem label="视频介绍">
          <Input v-model="addForm.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入课程介绍..."></Input>
        </FormItem>
        <Upload
            :before-upload="handleUploadThumb"
            action="">
          <Button icon="ios-cloud-upload-outline">选择图片上传</Button>
        </Upload>
        <div v-if="addForm.thumb.length > 0" style="color: #42b983">图片已上传</div>
        <div v-if="addForm.imageFile !== null">
          上传图片: {{ addForm.imageFile.name }}
          <Button @click="uploadThumb" :loading="addForm.imageLoadingStatus">
            {{ addForm.imageLoadingStatus ? '上传中' : '点击上传图片' }}
          </Button>
        </div>

        <Upload
            :before-upload="handleUploadVideo"
            action="">
          <Button icon="ios-cloud-upload-outline">选择视频上传</Button>
        </Upload>
        <div v-if="addForm.video.length > 0" style="color: #42b983">视频已上传</div>
        <div v-if="addForm.videoFile !== null">
          上传视频: {{ addForm.videoFile.name }}
          <Button @click="uploadVideo" :loading="addForm.videoLoadingStatus">
            {{ addForm.videoLoadingStatus ? '上传中' : '点击上传视频' }}
          </Button>
        </div>

      </Form>

      <div slot="footer">
        <Button type="info" size="large" long :loading="modal_loading" @click="addHttp">添加</Button>
      </div>


    </Modal>

<!--edit-->

    <Modal
        v-model="editModal">

      <p slot="header" style="color:#006688;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>修改课程</span>
      </p>

      <Form :model="editForm" :label-width="80">
        <FormItem label="课程标签" prop="tip">
          <Input v-model="editForm.tip" placeholder="请输入标签"></Input>
        </FormItem>
        <FormItem label="课程类别" prop="type">
          <Select v-model="editForm.type" placeholder="请选择类别">
            <Option value="跑步">跑步</Option>
            <Option value="骑行">骑行</Option>
            <Option value="跳绳">跳绳</Option>
            <Option value="健身操">健身操</Option>
            <Option value="瑜伽">瑜伽</Option>
            <Option value="其他">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="视频介绍">
          <Input v-model="editForm.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入课程介绍..."></Input>
        </FormItem>

      </Form>

      <div slot="footer">
        <Button type="info" size="large" long :loading="editModal_loading" @click="editHttp">修改</Button>
      </div>

    </Modal>


<!--    delete-->

    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>是否确认删除当前课程？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="delHttp">删除</Button>
      </div>
    </Modal>


    <Table border :columns="columns" :data="data" :height="tableHeight" class="user-table" no-data-text="暂无课程">

      <template slot-scope="{ row }" slot="thumb">
        <img :src="'http://localhost:8080/sport/resources/img/' + row.thumb" style="height: 56px; width: 56px"/>
      </template>

      <template slot-scope="{ row }" slot="video">
        <Button type="warning" size="small" shape="circle" @click="showVideo(row.video)">预览视频</Button>
      </template>

      <template slot-scope="{ row }" slot="content">
        <div @click="showDetail(row.content)" class="curriculum-content"><strong>{{ row.content }}</strong></div>
      </template>

      <template slot-scope="{ row }" slot="duration">
        <div @click="showDetail(row.content)" class="curriculum-content">{{ row.duration + '秒' }}</div>
      </template>


      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="showEditModal(index)">
          修改
        </Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="showDeleteModal(row.id)">
          删除
        </Button>
      </template>

    </Table>


  </div>
</template>

<script>

export default {

  data(){
    return{
      searchForm:{
        cname:""
      },
      addModal: false,
      modal_loading: false,

      editModal: false,
      editModal_loading: false,

      deleteModal: false,

      addForm:{
        name: "",
        tip: "",
        type: "",
        duration: 0,
        content: "",
        thumb: "",
        video:"",
        imageFile: null,
        imageLoadingStatus: false,

        videoFile: null,
        videoLoadingStatus: false,
      },
      editForm:{
        id: -1,
        tip: "",
        type: "",
        content:"",
      },

      deleteId: -1,
      tableHeight: '500px',
      columns: [
        {
          title: '编号',
          width: 80,
          key: 'id'
        },
        {
          title: '图像',
          slot: 'thumb',
          key: 'thumb',
          width: 100,
        },
        {
          title: '视频',
          slot: 'video',
          width: 100,
          key: 'video'
        },
        {
          title: '课程名称',
          width: 180,
          key: 'cname'
        },
        {
          title: '课程介绍',
          slot: 'content',
          key: 'content',
        },
        {
          title: '课程标签',
          width: 180,
          key: 'tip'
        },
        {
          title: '时长',
          width: 100,
          slot: 'duration',
          key: 'duration'
        },
        {
          title: '分类',
          width: 80,
          key: 'type'
        },
        {
          title: '操作',
          width: 140,
          slot: 'action',
        }
      ],
      data: [],
      srcData:[],
    }
  },

  created() {
    this.findAllData();
  },

  mounted() {
    this.tableHeight = (document.getElementsByClassName('user-layout')[0].clientHeight - document.getElementsByClassName('user-form')[0].clientHeight) - 56;
  },

  methods:{

    handleSubmit(data){
      if (data.cname.length === 0){
        this.data = this.srcData;
      }else {
        console.log(data.cname);
        var find = this.srcData.find((item, index, arr) => {
          console.log(index, arr);
          return item.cname.includes(data.cname);
        });
        if (find){
          this.data = [];
          this.data.push(find);
        }else {
          this.data = [];
        }

      }
    },

    handleUploadThumb(file){
      this.addForm.imageFile = file;
      return false;
    },

    handleUploadVideo(file){
      this.addForm.videoFile = file;
      return false;
    },


    uploadThumb(){
      this.addForm.imageLoadingStatus = true;
      let param = new FormData()       // 创建form对象
      param.append('file', this.addForm.imageFile)       // 通过append向form对象添加数据
      param.append("type", "IMAGE"); // 添加form表单中其他数据
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }

      this.axios.post("file/upload",param, config)
      .then(response=>{
        if (response.status === 200){
          this.addForm.imageFile = null;
          this.addForm.thumb = response.data[0];
        }else {
          this.$Message.error(response.data);
        }
      }).catch(error=>{
        this.$Message.error(error.response.data);
      }).finally(()=>{
        this.addForm.imageLoadingStatus = false;
      });

    },


    uploadVideo(){
      this.addForm.videoLoadingStatus = true;
      let param = new FormData()       // 创建form对象
      param.append('file', this.addForm.videoFile)       // 通过append向form对象添加数据
      param.append("type", "MEDIA"); // 添加form表单中其他数据
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }

      this.axios.post("file/upload",param, config)
          .then(response=>{
            if (response.status === 200){
              this.addForm.videoFile = null;
              this.addForm.video = response.data[0];
            }else {
              this.$Message.error(response.data);
            }
          }).catch(error=>{
        this.$Message.error(error.response.data);
      }).finally(()=>{
        this.addForm.videoLoadingStatus = false;
      });

    },

    addHttp(){

      if (this.addForm.video.length === 0){
        this.$Message.error('请上传视频');
        return;
      }

      if (this.addForm.thumb.length === 0){
        this.$Message.error('请上传图片');
        return;
      }

      this.modal_loading = true;

      this.axios({
        url:'curriculum/add',
        method: 'POST',
        params:{
          thumb: this.addForm.thumb,
          video: this.addForm.video,
          cname: this.addForm.name,
          tip: this.addForm.tip,
          type: this.addForm.type,
          duration: this.addForm.duration,
          content: this.addForm.content
        }

      }).then(response=>{
        if (response.status === 200){
          this.addModal = false;
          this.$Message.success('添加成功');
          this.findAllData();
        }else {
          this.$Message.error('添加失败');
        }

      }).catch(error=>{
        this.$Message.error('添加失败');
        console.log(error.response.data);
      }).finally(()=>{
        this.modal_loading = false;
      });

    },

    findAllData(){
      //获取所有信息
      this.axios.get("curriculum/find")
          .then(response=>{
            if (response.status !== 200){
              return;
            }
            this.data = response.data;
            this.srcData = this.data;
          })
          .catch(error=>{
            console.log(error.response)
          })
          .finally(()=>{
            console.log("finish")
          });
    },

    showEditModal(index){
      const  item = this.data[index];
      this.editForm.id = item.id;
      this.editForm.tip = item.tip;
      this.editForm.type = item.type;
      this.editForm.content = item.content;
      this.editModal = true;
    },

    editHttp(){

      this.modal_loading = true;

      this.axios({
        url:'curriculum/update',
        method: 'PUT',
        params:{
          id: this.editForm.id,
          tip: this.editForm.tip,
          type: this.editForm.type,
          content: this.editForm.content
        }

      }).then(response=>{
        if (response.status === 200){
          this.editModal = false;
          this.$Message.success('修改成功');
          this.findAllData();
        }else {
          this.$Message.error('修改失败');
        }

      }).catch(error=>{
        this.$Message.error('修改失败');
        console.log(error.response.data);
      }).finally(()=>{
        this.modal_loading = false;
      });

    },



    showDeleteModal(id){

      this.deleteId = id;
      this.deleteModal = true;
    },


    delHttp(){
      if (this.deleteId === -1){
        return;
      }

      this.axios({
        url: 'curriculum/delete',
        method:'delete',
        params:{
          id: this.deleteId,
        }

      }).then(response=>{
        if (response.status !== 200){
          this.$Message.error('删除失败');
          return;
        }
        this.deleteId = -1;
        this.findAllData();
      }).catch(error=>{
        console.log(error.response)
        this.$Message.error('删除失败');
      })
      .finally(()=>{
        console.log("finish")
        this.deleteModal = false;
      });

    },

    showDetail(content){

      this.$Modal.info({
        title: "课程介绍",
        content: content
      });
    },

    showVideo(video){

      this.$Modal.info({
        title: "课程介绍",
        content: '<video width="320" height="240" controls>' +
            '<source src=' + "http://localhost:8080/sport/resources/media/" + video + ' type="video/mp4">' +
            '</video>'
      });

    }

  }

}
</script>

<style scoped>

.user-layout{

  width: 100%;
  height: 100%;
}

.user-form{
  margin-top: 16px;
  margin-left: 16px;
  width: 100%;
  text-align: left;
  height: auto;
}
.user-table{
  margin-left: 16px;
  margin-right: 16px;
}
.curriculum-content{
  width:200px; /*假设，5个字符的宽度是50*/
  white-space:nowrap; /*禁止换行*/
  text-overflow:ellipsis; /*文本超出隐藏*/
  -o-text-overflow:ellipsis;/*跟上面一样，只是为了兼容其他浏览器*/
  overflow: hidden; /*隐藏，跟text-overflow配合使用*/
}

</style>
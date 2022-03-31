<template>
 <div class="user-layout">

   <Form ref="searchForm" :model="searchForm" inline class="user-form">
     <FormItem prop="user">
       <Input type="text" v-model="searchForm.username" placeholder="用户名">
       </Input>
     </FormItem>
     <FormItem>
       <Button type="primary" @click="handleSubmit(searchForm)">查询</Button>
     </FormItem>
   </Form>


   <Table border :columns="columns" :data="data" :height="tableHeight" class="user-table" no-data-text="暂无用户">

     <template slot-scope="{ row }" slot="avatar">
       <img :src="'http://localhost:8080/sport/resources/avatar/' + row.avatar" style="height: 56px; width: 56px"/>
     </template>

     <template slot-scope="{ row }" slot="sex">
       <strong>{{ row.sex === 0? '男' : '女'  }}</strong>
     </template>

     <template slot-scope="{ row }" slot="birthDate">
       <strong>{{ new Date(row.birthDate).getFullYear() + "-" + (new Date(row.birthDate).getMonth() + 1) + "-" + new Date(row.birthDate).getDate() }}</strong>
     </template>

     <template slot-scope="{ row, index }" slot="status">
       <Button :type="row.status === 0? 'primary' : 'error'" size="small" style="margin-right: 5px" @click="editStatus(index)">
         <strong>{{ row.status === 0? '正常' : '封禁'  }}</strong>
       </Button>
     </template>

     <template slot-scope="{ row }" slot="action">
       <Button type="primary" shape="circle" size="small" style="margin-right: 5px" @click="goSportPage(row.id)">
         运动数据
       </Button>
     </template>

   </Table>


 </div>
</template>

<script>
import router from "@/router";

export default {
  name: "UserManager",

  data(){
    return{
      searchForm:{
        username:""
      },
      avatarUrl: this.resourceAvatar,
      tableHeight: '500px',
      columns: [
        {
          title: '头像',
          slot: 'avatar',
          key: 'avatar'
        },
        {
          title: '昵称',
          key: 'nickname'
        },
        {
          title: '手机号',
          key: 'phoneNumber'
        },
        {
          title: '性别',
          slot: 'sex',
          key: 'sex'
        },
        {
          title: '出生日期',
          slot: 'birthDate',
          key: 'birthDate'
        },
        {
          title: '状态',
          slot: 'status',
          key: 'status'
        },
        {
          title: '操作',
          slot: 'action',
        }
      ],
      data: [],
      srcData:[],
    }
  },

  created() {
    //获取所有用户信息
    this.axios.get("user/allUser")
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

  mounted() {
    this.tableHeight = (document.getElementsByClassName('user-layout')[0].clientHeight - document.getElementsByClassName('user-form')[0].clientHeight) - 56;
  },

  methods:{

    handleSubmit(data){
      if (data.username.length === 0){
        this.data = this.srcData;
      }else {
        console.log(data.username);
        var find = this.srcData.find((item, index, arr) => {
          console.log(index, arr);
          return item.nickname.includes(data.username);
        });
        if (find){
          this.data = [];
          this.data.push(find);
        }else {
          this.data = [];
        }

      }
    },

    editStatus(index){
      const item = this.data[index];
      let s = 0;
      if (item.status === 0){
        s = 1;
      }else {
        s = 0;
      }
      this.axios({
        url: 'user/status',
        method:'put',
        params:{
          status: s,
          userId: item.id,
        }

      }).then(response=>{
        if (response.status !== 200){
          return;
        }
        this.data[index].status = s;
      })
          .catch(error=>{
            console.log(error.response)
          })
          .finally(()=>{
            console.log("finish")
          });
    },
    goSportPage(userId){
      console.log(userId);
      router.push({path:'/sport', query:{id: userId}});
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

</style>
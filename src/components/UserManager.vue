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


   <Table border :columns="columns1" :data="data1" :height="tableHeight" class="user-table"></Table>


 </div>
</template>

<script>
export default {
  name: "UserManager",

  data(){
    return{
      searchForm:{
        username:""
      },
      tableHeight: '500px',
      columns1: [
        {
          title: '头像',
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
          key: 'sex'
        },
        {
          title: '出生日期',
          key: 'birthDate'
        },
        {
          title: '状态',
          key: 'status'
        }
      ],
      data1: [
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
        {
          avatar: 'adsads',
          nickname: 'John Brown',
          phoneNumber: 1819999887678,
          sex: '男',
          birthDate: '2016-10-03',
          status:'正常'
        },
      ]
    }
  },

  created() {
    //获取所有用户信息
    this.axios.get("user/allUser")
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
      .finally(()=>{
        console.log("finish")
    });
  },

  mounted() {
    this.tableHeight = (document.getElementsByClassName('user-layout')[0].clientHeight - document.getElementsByClassName('user-form')[0].clientHeight) - 56;
    console.log(this.tableHeight);
  },

  methods:{

    handleSubmit(data){
      console.log(data);
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
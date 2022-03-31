<template>
  <div class="user-layout">

    <Table border :columns="columns" :data="data" :height="tableHeight" class="user-table" no-data-text="暂无运动数据">

    </Table>


  </div>
</template>

<script>

export default {
  name: "UserManager",

  data(){
    return{
      tableHeight: '500px',
      columns: [
        {
          title: '总距离',
          slot: 'mileage',
          key: 'mileage'
        },
        {
          title: '时长',
          key: 'duration'
        },
      ],
      data: [],
      srcData:[],
    }
  },

  created() {
    //获取所有用户信息
    console.log(this.$route.query.id);
    this.axios.get("sport/search?userId="+this.$route.query.id)
        .then(response=>{
          if (response.status !== 200){
            return;
          }
          console.log(response.data)
          this.data = response.data;
        })
        .catch(error=>{
          console.log(error.response)
        })
        .finally(()=>{
          console.log("finish")
        });
  },

  mounted() {
    //this.tableHeight = (document.getElementsByClassName('user-layout')[0].clientHeight - document.getElementsByClassName('user-form')[0].clientHeight) - 56;
  },

  methods:{


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
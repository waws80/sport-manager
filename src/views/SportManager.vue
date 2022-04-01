<template>
  <div class="sport-layout">

    <div class="sport-override">

      <Card style="width:350px" bordered dis-hover :style="{width: '100%'}">
        <p slot="title">
          <Icon type="ios-card"></Icon>
          总览
        </p>

        <div><strong>总长度：{{this.totalMileage}}千米</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>总时长：{{this.totalDuration}}秒</strong></div>
      </Card>

    </div>

    <Table border :columns="columns" :data="data" :height="tableHeight" class="sport-table" no-data-text="暂无运动数据">

      <template slot-scope="{ row }" slot="mileage">
        <strong>{{ row.mileage + '千米' }}</strong>
      </template>

      <template slot-scope="{ row }" slot="duration">
        <strong>{{ row.duration + '秒' }}</strong>
      </template>

      <template slot-scope="{ row }" slot="time">
        <strong>{{ new Date(row.createTime).getFullYear() +
        "-" + (new Date(row.createTime).getMonth() + 1) +
        "-" + new Date(row.createTime).getDate() +
        " " + new Date(row.createTime).getHours() +
        ":" + new Date(row.createTime).getMinutes() +
        ":" + new Date(row.createTime).getSeconds() }}</strong>
      </template>

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
          title: '运动编号',
          key: 'id',
        },
        {
          title: '总距离',
          slot: 'mileage',
          key: 'mileage'
        },
        {
          title: '时长',
          slot: 'duration',
          key: 'duration'
        },
        {
          title: '时间',
          slot:'time',
          key:'createTime'
        }
      ],
      data: [],
      totalMileage: 0,
      totalDuration:0
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
          this.data = response.data;
          for (let i = 0; i < this.data.length; i++) {
            const item = this.data[i];
            this.totalMileage += item.mileage;
            this.totalDuration += item.duration;
          }
        })
        .catch(error=>{
          console.log(error.response)
        })
        .finally(()=>{
          console.log("finish")
        });
  },

  mounted() {
    const clientW = document.getElementsByClassName("sport-layout")[0].clientWidth;
    document.getElementsByClassName('sport-override')[0].style.width = (clientW - 96) + "px";
    this.tableHeight = (document.getElementsByClassName('sport-layout')[0].clientHeight
        - document.getElementsByClassName('sport-override')[0].clientHeight) - 78;
  },

  methods:{


  }

}
</script>

<style scoped>

.sport-layout{
  width: 100%;
  height: 100%;
}

.sport-override{
  margin: 24px 48px;
  background-color: #42b983;
}

.user-form{
  margin-top: 16px;
  margin-left: 16px;
  width: 100%;
  text-align: left;
  height: auto;
}
.sport-table{
  margin-left: 24px;
  margin-right: 24px;
  overflow: scroll;
}

</style>
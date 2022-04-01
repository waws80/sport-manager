<template>

  <div class="login-container">

    <Spin size="large" class="loading" fix v-if="spinShow"></Spin>

    <Form ref="formCustom" :model="formCustom" :label-width="80" class="login-form" v-if="loginForm">
      <div class="login-title">运动管理系统</div>

      <FormItem label="账号" prop="adminName">
        <Input type="text" v-model="formCustom.username"></Input>
      </FormItem>
      <FormItem label="密码" prop="passwd">
        <Input type="password" v-model="formCustom.passwd"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit(formCustom)" v-if="status === 0">登录</Button>
        <Button @click="handleRegister(formCustom)" style="margin-left: 8px" v-if="status === 1">注册</Button>
      </FormItem>
    </Form>

  </div>

</template>

<script>
import router from "@/router";

export default {

  name: 'LoginView',

  data () {
    return {
      spinShow: true,
      loginForm: false,
      status: 1,
      formCustom: {
        passwd: '',
        username: '',
      }
    }
  },
  created() {

    this.axios.get("/admin/checkStatus").then(response =>{
      console.log("success", response);
      if (response.status === 200 && response.data.status === 0){
        this.status = 0;
      }
    }).catch(error =>{
      console.log(error);
    }).finally(()=>{
      this.spinShow = false;
      this.loginForm = true;
    });


  },
  methods: {

    handleSubmit (data) {

      this.axios({
        url: "/admin/login",
        method: 'POST',
        params: {
          username: data.username,
          pwd: data.passwd
        }
      }).then(response =>{
        console.log("success", response);
        if (response.status === 200){
          this.status = 0;
          const that = this;
          localStorage.id = response.data.id;
          setTimeout(function (){
            that.$Message.success("登录成功");
            router.replace('/')
          },500)
        }
      }).catch(error =>{
        console.log(error);
        this.$Message.error("登录失败，请稍后再试");
      }).finally(()=>{
        this.spinShow = false;
        this.loginForm = true;
      });

    },
    handleRegister (data) {
      this.spinShow = true;
      this.axios({
        url: "/admin/register",
        method: 'POST',
        params: {
          username: data.username,
          pwd: data.passwd
        }
      }).then(response =>{
        console.log("success", response);
        if (response.status === 200){
          this.status = 0;
          this.$Message.success("注册成功，请登录");
          this.formCustom.username = "";
          this.formCustom.passwd = "";
        }
      }).catch(error =>{
        console.log(error);
        this.$Message.error("注册失败，请稍后再试");
      }).finally(()=>{
        this.spinShow = false;
        this.loginForm = true;
      });
    }
  }
}
</script>

<style scoped>

.loading{
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid #eee;
}

.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  position: absolute;
}

/* 标题 */
.login-title {
  color: #303133;
  margin-bottom: 30px;
  font-size: large;
  font-weight: bold;
  text-align: center;
}

</style>
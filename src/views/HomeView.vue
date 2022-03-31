<template>
  <div class="layout">
    <Layout>
      <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed" class="home-slide">
        <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="1-1">
            <Icon type="ios-people" />
            <router-link to ='/home/user'>用户管理</router-link>
<!--            <span>用户管理</span>-->
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="ios-book" />
<!--            <span>课程管理</span>-->
            <router-link to ='/home/curriculum'>课程管理</router-link>
          </MenuItem>
        </Menu>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Header class="layout-header-bar">
          <strong>运动管理系统</strong>
        </Header>
        <Content :style="{margin: '16px', background: '#fff', minHeight: '220px'}">
          <router-view/>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import router from "@/router";

export default {
  name: 'HomeView',
  // components: {
  //   HelloWorld
  // }

  data () {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  created() {

    //判断是否登录
    if (this.Utils.iskLogin(function (){
      console.log("去登录");
      router.replace("login");
      //this.router.replace("login");
    })){
      if (this.$route.path !== '/home/user'){
        this.$router.push('/home/user')
      }
    }

  }

}
</script>

<style>


.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.layout-header-bar{
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}

.ivu-layout{

  height: 100%;
}

</style>

<template>
  <div id="app" :style="{height: height, marginTop: 0}">
    <router-view/>
  </div>
</template>

<script>

export default {
  data(){
    return {
      height : window.innerHeight + 'px',
    }
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <home-page/>
  </div>
</template>

<script>
import homePage from './components/homePage'

export default {
  name: 'app',
  data() {
    return {
      timer: undefined,
      imgs: [require('./assets/01.png'),require('./assets/02.png'),require('./assets/03.png')],
    }
  },
  computed: {

  },
  components: {
    homePage
  },
  created() {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body, html{
  height: 100%;
}
body {
  background-attachment: fixed;
  background-size: cover;
  background-image: url('./assets/01.png');
}
</style>

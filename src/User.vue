<template>
  <div id="app">
    <v-app>
      <page-header />
        <v-content>
          <v-container fluid>
            <router-view></router-view>
          </v-container>
        </v-content>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header'

export default {
  name: 'app',
  components: {
    PageHeader
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

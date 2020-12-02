<template>
  <div class="home">
    <headNav></headNav>
    <router-view></router-view>
  </div>
</template>

<script>
import headNav from '../components/headNav'
export default {
  name: 'Layout',
  components: {
    headNav
  }
}
</script>

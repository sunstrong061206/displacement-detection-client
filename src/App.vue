<template>
  <div id="app">
    <Space class="space" />
    <Act class="act" />
  </div>
</template>

<script>
import Space from '@/components/Space.vue'
import Act from '@/components/Act.vue'
export default {
  name: 'App',
  components: {
    Space,
    Act,
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  background-color: #eeeeee;
  position: relative;
}
.act {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

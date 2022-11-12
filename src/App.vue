<template>
  <div id="app">
    <Space class="space" />
    <Act class="act" />
    <InfoTable class="info-table" />
  </div>
</template>

<script>
import Space from '@/components/Space.vue'
import Act from '@/components/Act.vue'
import InfoTable from '@/components/InfoTable.vue'
export default {
  name: 'App',
  components: {
    Space,
    Act,
    InfoTable,
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
  top: 50px;
  left: 0;
}
.info-table {
  position: absolute;
  top: 80px;
  right: 30px;
}
</style>

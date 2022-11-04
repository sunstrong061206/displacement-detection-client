<template>
  <button @click="addCylinderGeometry">添加圆柱体</button>
</template>

<script>
import { FakeAPI } from '@/api/request.js'
export default {
  data() {
    return {}
  },
  methods: {
    addCylinderGeometry() {
      FakeAPI().then((resp) => {
        this.$bus.$emit('drawCylinderList', resp.data.value.result.data)
      })
    },
  },
}
</script>

<style></style>

<template>
  <button @click="addCylinderGeometry">添加圆柱体</button>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    addCylinderGeometry() {
      console.log('点击事件')
      this.$bus.$emit('drawCylinder', 0, 0, 400, 0, 0)
    },
  },
}
</script>

<style></style>

<template>
  <div class="container">
    <el-table :data="tableData">
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column prop="xPosition" label="x"> </el-table-column>
      <el-table-column prop="yPosition" label="y"> </el-table-column>
      <el-table-column prop="zPosition" label="z"> </el-table-column>
      <el-table-column prop="inclinationAngle" label="倾斜角(°)">
      </el-table-column>
      <el-table-column prop="azimuthAngle" label="方位角(°)"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: null,
    }
  },
  methods: {
    updateInfoTable(tableData) {
      this.tableData = tableData.reverse().map((item) => {
        for (let key in item) {
          item[key] = parseFloat(item[key]).toFixed(2)
        }

        return item
      })
    },
  },
  mounted() {
    this.$bus.$on('updateInfoTable', this.updateInfoTable)
  },
}
</script>

<style scoped>
.container {
  width: 500px;
}
</style>

<template>
  <el-dialog
    title="历史老旧工业区块改造进度表"
    :visible="visible"
    width="100%"
    fullscreen
    :before-close="handleClose">
    <div class="handle-box">
      <el-select v-model="datetime" placeholder="请选择历史时间" @change="getProcessHistoryList">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.FAddTime"
          :value="item.FAddTime"
        >
        </el-option>
      </el-select>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="FAgencyName"
        label="县(市区)"
        fixed
        align="center"
        header-align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="TotalCount"
        label="年度改造任务数（个）"
        fixed
        align="center"
        header-align="center"
        width="80">
      </el-table-column>
      <el-table-column label="整体(或大部分)拆除退出工业用途" header-align="center">
        <el-table-column
          prop="Change1Status1"
          label="已启动(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change1Status2"
          label="已签约(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change1Status3"
          label="已拆除(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change1Status4"
          label="已开工(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change1Status5"
          label="已完工(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change1Area1"
          label="已拆除面积(万㎡)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change1Area2"
          label="其中违法建筑面积(万㎡)"
          align="center"
          header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="整体(或大部分)拆除重建用于工业" header-align="center">
        <el-table-column
          prop="Change2Status1"
          label="已启动(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change2Status2"
          label="已签约(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change2Status3"
          label="已拆除(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change2Status4"
          label="已开工(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change2Status5"
          label="已完工(个)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change2Area1"
          label="已拆除面积(万㎡)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change2Area2"
          label="其中违法建筑面积(万㎡)"
          align="center"
          header-align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="综合整治(含部分拆除)用于产业提升或转型" header-align="center">
        <el-table-column
          prop="Change3Status0"
          label="整治中"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change3Status2"
          label="已整治"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change3Area1"
          label="已拆除面积(万㎡)"
          align="center"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="Change3Area2"
          label="已整治面积(万㎡)"
          align="center"
          header-align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'historyProgress',
  data () {
    return {
      datetime: '',
      options: [],
      tableData: [],
      tableNewData: [],
      loading: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:visible', false)
      done()
    },
    getProcessHistoryTimeArray () {
      this.$axios.post('Statistical/GetProcessHistoryTimeArray', {
        curr: 1,
        pageSize: 20
      })
        .then((response) => {
          // console.log(response.data)
          this.options = [].concat(response.data.object)
        })
    },
    getProcessHistoryList (val) {
      this.loading = true
      this.$axios.get('Statistical/GetProcessHistoryList', {
        params: {
          FTime: val
        }
      })
        .then((response) => {
          this.loading = false
          // console.log(response.data)
          this.tableData = [].concat(response.data.object)
        })
    }
  },
  created () {
    this.getProcessHistoryTimeArray()
  }
}
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }
</style>

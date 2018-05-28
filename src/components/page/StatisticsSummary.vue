<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, i) in breadcrumb" :key="i"><i class="el-icon-menu" v-if="i === 0"></i> {{item}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-date-picker
        class="handle-select"
        v-model="FYear"
        align="right"
        type="year"
        value-format="yyyy"
        placeholder="起始年度"
        :blur="search"
        size="small">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="search" size="small">查询</el-button>
      <el-button type="primary" icon="el-icon-download" @click="getExcel" size="small">下载</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="FAreaName"
        label="区块名称"
        align="center"
        header-align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="FAgencyName"
        label="县(市区)"
        align="center"
        header-align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="FOccupy"
        label="总占地"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FTotalAcreage"
        label="总建筑面积"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FNonConBuildingArea"
        label="其中违建面积"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FEVName"
        label="市定改造方式"
        align="center"
        header-align="center"
        width="310">
      </el-table-column>
      <el-table-column
        prop="FTownChangeType"
        label="县市区自定改造方式"
        align="center"
        header-align="center"
        width="130">
      </el-table-column>
      <el-table-column
        prop="FEVName1"
        label="改造后用途"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FTotalInvestAmount"
        label="拟投资额"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FAfterChangeArea"
        label="改造后建筑面积"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FChangeBeginDate"
        label="拟启动时间"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FChangeEndDate"
        label="拟完成时间"
        align="center"
        header-align="center">
      </el-table-column>
      <el-table-column
        prop="FProgress"
        label="目前进度"
        align="center"
        header-align="center"
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '../../assets/js/date'
import fileDownload from 'js-file-download'
export default {
  data () {
    return {
      breadcrumb: [],
      tableData: [],
      loading: true,
      FYear: formatDate(new Date(), 'yyyy')
    }
  },
  methods: {
    /**
     * 获取面包屑
     */
    getBreadcrumb () {
      let blist = JSON.parse(sessionStorage.getItem('breadcrumb'))
      this.breadcrumb = [].concat(blist)
    },
    getList () {
      let self = this
      this.loading = true
      this.$axios.get('Statistical/GetOldCityAllData', {
        params: {
          FYear: this.FYear
        }
      })
        .then(function (response) {
          let data = response.data
          self.loading = false
          if (data.code === 1) {
            self.tableData = [].concat(data.object)
          } else {
            self.$message.error(data.message)
          }
        })
        .catch(function (error) {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    /**
     * 搜索事件
     */
    search () {
      this.getList()
    },
    getExcel () {
      let self = this
      this.$axios.get('Statistical/GetOldCityAllExcel', {
        params: {
          FYear: this.FYear
        },
        responseType: 'blob'
      })
        .then(function (response) {
          // self.download(response.data)
          // let fileName = response.headers['content-disposition'].match(/fushun(\S*)xls/)[0]
          let fileName = '老旧工业区块' + Number(self.FYear) + '-' + (Number(self.FYear) + 2) + '三年改造汇总表.xls'
          fileDownload(response.data, fileName)
        })
        .catch(function (error) {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    download (data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'excel.xls')

      document.body.appendChild(link)
      link.click()
    }
  },
  created () {
    this.getList()
    this.getBreadcrumb()
  }
}
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-input {
    width: 200px;
    display: inline-block;
  }
</style>

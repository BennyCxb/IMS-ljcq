<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, i) in breadcrumb" :key="i"><i class="el-icon-menu" v-if="i === 0"></i> {{item}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <transition name="slide-fade">
      <historyProgress :visible.sync="historyVisible"></historyProgress>
    </transition>
    <template>
      <h3 class="table-title">全市老旧工业区块改造累计进度表</h3>
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
        <el-button type="primary" icon="el-icon-download" @click="getExcel" size="small">导出并下载</el-button>
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
          label="三年改造任务数（个）"
          fixed
          align="center"
          header-align="center"
          width="120">
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
    </template>
    <!--<hr/>-->
    <template>
      <h3 class="table-title">{{NewFYear}}年度老旧工业区块改造进度表</h3>
      <div class="handle-box">
        <el-date-picker
          class="handle-select"
          v-model="NewFYear"
          align="right"
          type="year"
          value-format="yyyy"
          placeholder="起始年度"
          :blur="search"
          :clearable="false"
          size="small">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchNew" size="small">查询</el-button>
        <el-button type="primary" icon="el-icon-download" @click="getExcelNew" size="small">导出并下载</el-button>
        <el-button type="primary" icon="el-icon-document" @click="saveProcessData" size="small">保存进度表</el-button>
        <el-button type="primary" icon="el-icon-view" @click="historyVisible = true" size="small">查看历史进度表</el-button>
      </div>
      <el-table
        :data="tableNewData"
        v-loading="loadingNew"
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
          label="年度计划数（个）"
          fixed
          align="center"
          header-align="center"
          width="120">
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
    </template>
  </div>
</template>

<script>
import { formatDate } from '../../assets/js/date'
import fileDownload from 'js-file-download'
import historyProgress from './HistoryProgress'
export default {
  components: {
    historyProgress
  },
  data () {
    return {
      historyVisible: false,
      breadcrumb: [],
      tableData: [],
      tableNewData: [],
      loading: true,
      loadingNew: true,
      FYear: formatDate(new Date(), 'yyyy'),
      NewFYear: formatDate(new Date(), 'yyyy')
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
      if (!this.FYear) {
        self.$message({
          message: '请选择起始年份',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      this.$axios.get('Statistical/GetOldCityChangeProgressDataByAgency', {
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
     * 获取指定年度进度数据
     */
    getNewList () {
      let self = this
      if (!this.FYear) {
        self.$message({
          message: '请选择起始年份',
          type: 'warning'
        })
        return false
      }
      this.loadingNew = true
      this.$axios.get('Statistical/GetOldCityChangeProgressDataByAgencyNew', {
        params: {
          FYear: this.NewFYear
        }
      })
        .then(function (response) {
          let data = response.data
          self.loadingNew = false
          if (data.code === 1) {
            self.tableNewData = [].concat(data.object)
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
    searchNew () {
      this.getNewList()
    },
    getExcel () {
      let self = this
      this.$axios.get('Statistical/GetOldCityChangeProgressExcelByAgency', {
        params: {
          FYear: this.FYear
        },
        responseType: 'blob'
      })
        .then((response) => {
          // self.download(response.data)
          // let fileName = response.headers['content-disposition'].match(/fushun(\S*)xls/)[0]
          let fileName = `${this.FYear}-${Number(self.FYear) + 2}三年全市老旧工业区块改造进度表.xls`
          fileDownload(response.data, fileName)
        })
        .catch(function (error) {
          console.log(error)
          self.$alert('导出失败', '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    getExcelNew () {
      let self = this
      this.$axios.get('Statistical/GetOldCityChangeProgressExcelByAgencyNew', {
        params: {
          FYear: this.NewFYear
        },
        responseType: 'blob'
      })
        .then((response) => {
          // self.download(response.data)
          // let fileName = response.headers['content-disposition'].match(/fushun(\S*)xls/)[0]
          let fileName = `${this.FYear}年度全市老旧工业区块改造进度表.xls`
          fileDownload(response.data, fileName)
        })
        .catch(function (error) {
          console.log(error)
          self.$alert('导出失败', '温馨提示', {
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
    },
    /**
     * 保存历史进度表
     */
    saveProcessData () {
      this.$axios.get('Statistical/SaveProcessDataStatistical', {
        params: {
          FYear: this.FYear
        },
        responseType: 'blob'
      })
        .then((response) => {
          console.log(response)
          this.$message({
            message: '保存成功',
            type: 'succese'
          })
        })
    }
  },
  created () {
    this.getList()
    this.getNewList()
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

  .table-title {
    padding: 10px;
    text-align: center;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

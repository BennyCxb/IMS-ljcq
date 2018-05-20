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
        placeholder="年度"
        size="small">
      </el-date-picker>
      <el-select v-model="FAgencyValue" class="handle-select" placeholder="行政区划" @change="getCounty" clearable size="small">
        <el-option
          v-for="item in adlist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      <el-select v-model="FTownValue" class="handle-select" placeholder="乡镇街道" clearable size="small">
        <el-option
          v-for="item in countyOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          {{ item.label }}
        </el-option>
      </el-select>
      <el-select v-model="FCityChangeType" placeholder="市级整改方式" clearable size="small">
        <el-option v-for="(item, i) in cityTypeOptions" :key="i" :label="item.FName" :value="item.FValue"></el-option>
      </el-select>
      <!--<el-date-picker-->
        <!--v-model="FChangeDate"-->
        <!--type="daterange"-->
        <!--align="right"-->
        <!--size="small"-->
        <!--unlink-panels-->
        <!--range-separator="至"-->
        <!--start-placeholder="拟开始日期"-->
        <!--end-placeholder="拟结束日期"-->
        <!--:picker-options="pickerOptions2">-->
      <!--</el-date-picker>-->
      <!--<el-select v-model="FStatus" placeholder="状态" class="handle-select mr10" clearable size="small">-->
        <!--<el-option v-for="(item, i) in statusOptions" :key="i" :label="item.FName" :value="item.FValue"></el-option>-->
      <!--</el-select>-->
      <el-input v-model="FAreaName" placeholder="区块名称" class="handle-input mr10" size="small"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addProblem" v-if="FLevel !== 2" size="small">新增改造</el-button>
    </div>
    <el-table v-loading="loading" :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange"
              stripe size="mini">
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column prop="FYear" label="年度" sortable width="120">
      </el-table-column>
      <el-table-column prop="FAreaName" label="区块名称">
      </el-table-column>
      <el-table-column prop="FAgencyName" label="行政区划">
      </el-table-column>
      <el-table-column prop="FTownName" label="乡镇街道">
      </el-table-column>
      <el-table-column prop="FCityChangeType" label="整改方式" width="280">
      </el-table-column>
      <el-table-column prop="FAfterChange" label="改造后用途">
      </el-table-column>
      <!--<el-table-column prop="FStatus" label="状态">-->
      <!--</el-table-column>-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">查看
          </el-button>
          <el-button size="small" type="danger" v-if="((FLevel === 3 || FLevel === 4) && scope.row.FStatus === '待整改') || FLevel === 1 || FLevel === 2"
                     @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="search"
        @current-change="handleCurrentChange"
        :current-page="cur_page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'
// import { formatDate } from '../../assets/js/date'

export default {
  computed: {
    data () {
      return this.tableData
    },
    FLevel () {
      let FLevel = Number(localStorage.getItem('FLevel'))
      return FLevel || 4
    }
  },
  data () {
    return {
      editFid: '',
      billTypeID: '',
      tableData: [],
      cur_page: 1,
      pageSize: 2,
      total: 1,
      multipleSelection: [],
      FYear: null,
      FAgencyValue: '',
      FTownValue: '',
      FCityChangeType: '',
      FTownChangeType: '',
      FAfterChange: '',
      FChangeDate: [],
      FChangeBeginDate: '',
      FChangeEndDate: '',
      FAreaName: '',
      FStatus: '',
      del_list: [],
      is_search: false,
      adlist: [],
      countyOptions: [],
      cityTypeOptions: [],
      countyTypeOptions: [],
      statusOptions: [],
      proAddShow: false,
      breadcrumb: [],
      loading: true,
      defaultDate: new Date(),
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.getBillTypeId()
    this.getBreadcrumb()

    this.getAdcd()
    this.getCounty()
    this.getCityChangeType()
    this.getCountyChangeType()
    this.getStatusData()
    this.getData()
  },
  methods: {
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    },
    getStatus (urlStr) {
      let urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    },
    /**
     * 获取BiilTypeID
     */
    getBillTypeId () {
      this.FBillTypeID = this.$route.params.btid
    },
    /**
     * 获取面包屑
     */
    getBreadcrumb () {
      let blist = JSON.parse(sessionStorage.getItem('breadcrumb'))
      this.breadcrumb = [].concat(blist)
    },
    /**
     * 获取行政区划
     */
    getAdcd () {
      let self = this
      this.$axios.get('Common/GetAgencyList')
        .then(function (response) {
          let data = response.data
          let adcdlist = []
          let FAgencyValue = localStorage.getItem('FAgencyValue')
          if (FAgencyValue !== 'null') {
            let item = _.find(data.object, {FValue: FAgencyValue})
            adcdlist.push({
              value: Number(item.FValue),
              label: item.FName
            })
          } else {
            _.each(data.object, (obj) => {
              adcdlist.push({
                value: Number(obj.FValue),
                label: obj.FName
              })
            })
          }
          self.adlist = [].concat(adcdlist)
        })
        .catch(function (error) {
          console.log(error)
          self.$message.error(error.message)
        })
    },
    /**
     * 获取乡镇街道
     */
    getCounty () {
      let self = this
      this.FTownValue = ''
      this.$axios.get('Common/GetStreetListByAgency', {
        params: {
          AgencyValue: this.FAgencyValue
        }
      })
        .then(response => {
          let data = response.data
          let countyList = []
          _.each(data.object, (obj) => {
            countyList.push({
              value: Number(obj.FValue),
              label: obj.FName
            })
          })
          self.countyOptions = [].concat(countyList)
        })
        .catch(error => {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    /**
     * 获取市级改造方案
     */
    getCityChangeType () {
      let self = this
      this.$axios.get('Common/GetEnumList', {
        params: {
          EnumType: '按台州市办法分类'
        }
      })
        .then(response => {
          let data = response.data
          self.cityTypeOptions = [].concat(data.object)
        })
        .catch(error => {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    /**
     * 获取县级改造方案
     */
    getCountyChangeType () {
      let self = this
      this.$axios.get('Common/GetEnumList', {
        params: {
          EnumType: '按县市区自定义分类'
        }
      })
        .then(response => {
          let data = response.data
          self.countyTypeOptions = [].concat(data.object)
        })
        .catch(error => {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    /**
     * 获取状态
     */
    getStatusData () {
      let self = this
      this.$axios.get('Common/GetEnumList', {
        params: {
          EnumType: '审核状态'
        }
      })
        .then(response => {
          let data = response.data
          self.statusOptions = [].concat(data.object)
        })
        .catch(error => {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    /**
     * 获取列表
     */
    getData () {
      let self = this
      // let beginDate = ''
      // let endDate = ''
      // if (this.FChangeDate) {
      //   if (this.FChangeDate.length) {
      //     beginDate = formatDate(this.FChangeDate[0], 'yyyy-MM-dd')
      //     endDate = formatDate(this.FChangeDate[1], 'yyyy-MM-dd')
      //   }
      // }
      this.loading = true
      this.$axios.post('OldCity/GetList', {
        curr: this.cur_page,
        pageSize: this.pageSize,
        FBillTypeID: this.FBillTypeID,
        FAgencyValue: this.FAgencyValue,
        FTownValue: this.FTownValue,
        FCityChangeType: this.FCityChangeType,
        FTownChangeType: this.FTownChangeType,
        // FChangeBeginDate: beginDate,
        // FChangeEndDate: endDate,
        FAreaName: this.FAreaName,
        FStatus: this.FStatus,
        FYear: this.FYear,
        strSortFiled: '',
        strSortType: ''
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            self.loading = false
            self.tableData = data.object
            self.total = data.page ? data.page.totalRecords : 0
          } else {
            self.$message.error(data.message)
          }
        })
        .catch(error => {
          console.log(error)
          self.loading = false
          self.$message.error(error.message)
        })
    },
    /**
     * 搜索事件
     */
    search () {
      this.is_search = true
      this.handleCurrentChange(1)
      // this.getData()
    },
    formatter (row, column) {
      return row.address
    },
    /**
     * 修改信息触发
     */
    handleEdit (index, row) {
      this.editProblem(row.FID)
      let blist = [].concat(this.breadcrumb)
      blist.push('查看改造信息')
      sessionStorage.setItem('breadcrumb', JSON.stringify(blist))
      this.$router.push({path: this.$route.fullPath + '/info-' + row.FID})
    },
    /**
     * 删除信息触发
     */
    handleDelete (index, row) {
      let self = this
      this.$confirm('确认删除？')
        .then(_ => {
          self.$axios.get('OldCity/DeleteOldCity', {
            params: {
              FID: row.FID
            }
          })
            .then(function (response) {
              let data = response.data
              if (data.code === 1) {
                self.$message.error('删除成功！')
                self.getData()
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
        })
        .catch(error => {
          console.log(error)
          self.$message.error(error.message)
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    /**
     * 新增改造信息
     */
    addProblem () {
      // this.proAddShow = true
      let blist = [].concat(this.breadcrumb)
      blist.push('新增改造信息')
      sessionStorage.setItem('breadcrumb', JSON.stringify(blist))
      this.editFid = ''
      // console.log(this.$route.fullPath)
      this.$router.push({path: this.$route.fullPath + '/info'})
    },
    /**
     * 修改问题点位
     */
    editProblem (fid) {
      this.proAddShow = true
      this.editFid = fid
    },
    /**
     * 关闭问题信息框
     */
    closePro: function (msg) {
      this.proAddShow = msg
      this.getData()
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      this.getStatus(this.$route.path)
      this.getBillTypeId()
      this.getBreadcrumb()
      this.getData()
    }
  }
}
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 200px;
    display: inline-block;
  }
</style>

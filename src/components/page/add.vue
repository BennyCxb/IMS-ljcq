<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, i) in breadcrumb" :key="i"><i class="el-icon-menu" v-if="i === 0"></i>
          {{item}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--<div class="form-box">-->
      <el-form :model="form"
               :rules="rules"
               :disabled="isDisabled"
               ref="probForm"
               class="demo-form-inline">
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <h3>基本信息</h3>
              <hr/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="区块名称" :label-width="formLabelWidth" prop="FPorjectName">
              <el-input v-model="form.FAreaName" placeholder="请输入项目名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行政区划" :label-width="formLabelWidth" prop="FAgencyValue">
              <el-select v-model="form.FAgencyValue" @change="getCounty">
                <el-option
                  v-for="(item,i) in adcdOptions"
                  :key="i"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="乡镇街道" :label-width="formLabelWidth" prop="FTwon">
              <el-select v-model="form.FTownValue">
                <el-option
                  v-for="(item,i) in countyOptions"
                  :key="i"
                  :label="item.FName"
                  :value="item.FValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="详细地址" :label-width="formLabelWidth" prop="FMileage">
              <el-input v-model="form.FPosition" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="主要产业" :label-width="formLabelWidth" prop="FLength">
              <el-input v-model="form.FIndustry" placeholder="请输入主要产业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业家数" :label-width="formLabelWidth" prop="FLength">
              <el-input v-model="form.FEntrepreneurCount" placeholder="请输入企业家数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总占地(万㎡)" :label-width="formLabelWidth" prop="FInvestment">
              <el-input v-model="form.FOccupy" placeholder="请输入投资金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总建筑面积(万㎡)" :label-width="formLabelWidth" prop="FInvestment">
              <el-input v-model="form.FTotalAcreage" placeholder="请输入投资金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="违建面积(万m²)" :label-width="formLabelWidth" prop="FAcreage">
              <el-input v-model="form.FNonConBuildingArea" placeholder="请输入利用面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责单位" :label-width="formLabelWidth" prop="FAccountabilityUnit">
              <el-input v-model="form.FRespLeader" placeholder="请输入负责单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人" :label-width="formLabelWidth" prop="FLiablePerson">
              <el-input v-model="form.FLinkMan" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式" :label-width="formLabelWidth" prop="FMobile">
              <el-input v-model="form.FLinkMobile" placeholder="请输入联系方式"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="改造前区块情况简介" :label-width="formLabelWidth" prop="FSynopsis">
              <el-input v-model="form.FRemark"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入项目简介"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地图定位" :label-width="formLabelWidth" prop="FGPS">
              <el-input v-model="form.FGPS" @focus="openMap" prefix-icon="el-icon-location"
                        placeholder="点击选择定位"></el-input>
              <mapSelect :mapShow="mapSelectShow" @selectMap="closeMap" @selectPosition="setPosition"></mapSelect>
              <div class="amap-page-container">
              <el-amap vid="position" :zoom="zoom" :center="center" class="amap-demo">
                <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :vid="index"></el-amap-marker>
              </el-amap>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <h3>改造信息</h3>
              <hr/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="改造方式(按台州市办法分类)" :label-width="formLabelWidth" prop="FPorjectName">
              <el-select v-model="form.FAgencyValue">
                <el-option
                  v-for="(item,i) in cityTypeOptions"
                  :key="i"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="改造方式(按县市区自定义分类)" :label-width="formLabelWidth" prop="FAgencyValue">
              <el-select v-model="form.FAgencyValue"
                         filterable
                         allow-create
                         default-first-option>
                <el-option
                  v-for="(item,i) in countyTypeOptions"
                  :key="i"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="改造后用途" :label-width="formLabelWidth" prop="FTwon">
              <el-select v-model="form.FAgencyValue">
                <el-option
                  v-for="(item,i) in purposeOptions"
                  :key="i"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟总投资额(万元)" :label-width="formLabelWidth" prop="FMileage">
              <el-input v-model="form.address" placeholder="请输入拟总投资额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="改造后总建筑面积(㎡)" :label-width="formLabelWidth" prop="FPorjectName">
              <el-input v-model="form.address" placeholder="请输入改造后总建筑面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟启动时间" :label-width="formLabelWidth" prop="FAgencyValue">
              <el-date-picker
                v-model="form.month"
                type="month"
                placeholder="选择年度月份">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟完成时间" :label-width="formLabelWidth" prop="FTwon">
              <el-date-picker
                v-model="form.month"
                type="month"
                placeholder="选择年度月份">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="改造方案简介" :label-width="formLabelWidth" prop="FSynopsis">
              <el-input v-model="form.FSynopsis"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入改造方案简介"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item, i) in files" :key="i">
          <el-col :span="24" v-if="item.type === 'img'">
            <el-form-item :label="item.label" :label-width="formLabelWidth">
              <el-upload
                :ref="'upload' + i"
                :action="url"
                :headers="headers"
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :data="item.data"
                :file-list="item.fileList"
                :beforeUpload="beforeAvatarUpload"
                :on-success="uploadSuccess"
                :on-change="onFilesChange"
                accept="image/*"
                multiple>
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3MB</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <hr/>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-else-if="item.type === 'file'">
            <el-col :span="12">
              <el-form-item :label="item.label" :label-width="formLabelWidth">
                <el-upload
                  class="upload-demo"
                  drag
                  :ref="'upload' + i"
                  :action="url"
                  :headers="headers"
                  :auto-upload="false"
                  :data="item.data"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-change="onFilesChange"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-cloak>
        <el-button @click="handleClose">关 闭</el-button>
        <el-button type="primary" @click="isDisabled = !isDisabled" v-if="isEdit && submitPossession && isDisabled">编 辑</el-button>
        <el-button @click="resetForm('probForm')" v-if="!isEdit && !form.FStatus && !isDisabled">重置</el-button>
        <el-button type="primary" @click="submit('probForm')" v-if="!form.FStatus && !isDisabled">保 存</el-button>
        <el-button type="primary" @click="submitAudit" v-if="isEdit && submitPossession && isDisabled">整改完成</el-button>
        <el-button type="primary" @click="openAudit" v-if="isEdit && auditPossession && isDisabled">立即审核</el-button>
        <problem-audit :dialogAudit="dialogAuditShow" :auditData="auditData" @closeAudit="closeAudit" @closePro="closePro"></problem-audit>
      </div>
    </div>
  <!--</div>-->
</template>
<script>
import mapSelect from './MapSelect.vue'
import problemAudit from './ProblemAudit.vue'
import {formatDate} from '../../assets/js/date.js'
import _ from 'lodash'

export default {
  components: {
    problemAudit,
    mapSelect
  },
  computed: {
    url () {
      return this.$axios.defaults.baseURL + 'Files/UploadFileForQiNiu'
    },
    headers () {
      return {
        Authorization: 'Bearer ' + this.$cookies.get('TZManage')
      }
    },
    auditData () {
      let data = {
        FBillTypeID: this.billTypeId,
        FID: this.fid,
        FCheckLevel: this.form.FCheckLevel
      }
      return JSON.stringify(data)
    }
  },
  data () {
    return {
      breadcrumb: [],
      formLabelWidth: '130px',
      isEdit: false,
      isDisabled: false,
      mapSelectShow: false,
      dialogAuditShow: false,
      filesChange: false,
      form: {
        FBillTypeID: null,
        FAreaName: '',
        FAgencyValue: '',
        FTownValue: '',
        FPosition: '',
        FGPS: '',
        FIndustry: '',
        FEntrepreneurCount: '',
        FOccupy: '',
        FTotalAcreage: '',
        FNonConBuildingArea: '',
        FAccountabilityUnit: '',
        FRespLeader: '',
        FLinkMan: '',
        FLinkMobile: '',
        FRemark: ''
      },
      zoom: 14,
      center: [121.420866, 28.655815],
      markers: [
        {
          position: [121.420866, 28.655815]
        }
      ],
      files: [
        {
          label: '改造前影像图',
          type: 'img',
          data: {},
          fileList: []
        },
        {
          label: '效果图',
          type: 'img',
          data: {},
          fileList: []
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      adcdOptions: [],
      countyOptions: [],
      cityTypeOptions: [
        {
          value: 1,
          label: '整体(大部分)拆后退出工业用途'
        },
        {
          value: 2,
          label: '整体(大部分)拆后重建用于工业'
        },
        {
          value: 3,
          label: '综合整治(含部分拆除)用于产业提升或转型'
        }
      ],
      countyTypeOptions: [
        {
          value: 1,
          label: '“退”(拆后退出)'
        },
        {
          value: 2,
          label: '"转"(退二进三)'
        },
        {
          value: 3,
          label: '"改"(退二优二)'
        },
        {
          value: 4,
          label: '"聚"(小微园区)'
        }
      ],
      purposeOptions: [
        {
          value: 1,
          label: '复绿复耕'
        },
        {
          value: 2,
          label: '退二进三'
        },
        {
          value: 3,
          label: '退二优二'
        },
        {
          value: 4,
          label: '建小微园区'
        },
        {
          value: 5,
          label: '其他'
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleClose () {
      this.$confirm('确认取消？')
        .then(_ => {
          this.$emit('closeProAdd', false)
        })
        .catch(_ => {
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 获取面包屑
     */
    getBreadcrumb () {
      let blist = JSON.parse(sessionStorage.getItem('breadcrumb'))
      this.breadcrumb = [].concat(blist)
      this.form.FBillTypeID = Number(this.$route.params.btid)
    },
    openMap () {
      this.mapSelectShow = true
    },
    /**
     * 关闭地图
     */
    closeMap (msg) {
      this.mapSelectShow = msg
    },
    setPosition (msg) {
      this.form.FGPS = msg.lng + ',' + msg.lat
      this.center = [].concat([msg.lng, msg.lat])
      this.markers = [].concat({
        position: [msg.lng, msg.lat]
      })
    },
    getAdcd () {
      let self = this
      this.$axios.get('Common/GetAgencyList')
        .then(response => {
          let data = response.data
          let adcdlist = []
          let FAgencyValue = localStorage.getItem('FAgencyValue')
          if (FAgencyValue !== 'null') {
            let item = _.find(data.object, {FValue: FAgencyValue})
            self.form.FAgencyValue = Number(item.FValue)
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
          self.adcdOptions = [].concat(adcdlist)
        })
        .catch(error => {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    getCounty () {
      let self = this
      this.form.FTownValue = ''
      this.$axios.get('Common/GetStreetListByAgency', {
        params: {
          AgencyValue: this.form.FAgencyValue
        }
      })
        .then(response => {
          let data = response.data
          self.countyOptions = [].concat(data.object)
        })
        .catch(error => {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    /**
     * 获取问题详情
     */
    getInfo () {
      let self = this
      this.$axios.get('LoanApply/GetApplyInfo', {
        params: {
          FID: this.fid
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            let obj = data.object
            self.form = obj
            self.getAttachTypeList(obj.FID)
          } else {
            self.$message({
              message: data.message,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
          self.$message.error(error.message)
        })
    },
    /**
     * 提交数据
     */
    submit (formName) {
      let self = this
      if (self.form.isSubmited === false) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = self.form
            if (self.isEdit) {
              data.FID = self.form.FID
            }
            this.$axios.post('OldCity/SaveOldCity', data)
              .then(response => {
                let data = response.data
                if (data.code === 1) {
                  self.form.FID = data.object
                  self.form.isSubmited = true
                  self.getAttachTypeList(self.form.FID, true)
                  if (!self.filesChange) {
                    self.$message({
                      message: self.isEdit ? '修改成功' : '新增成功！',
                      type: 'success'
                    })
                    self.$emit('closeProAdd', false)
                  }
                } else {
                  self.$message({
                    message: data.message,
                    type: 'warning'
                  })
                }
              })
              .catch(error => {
                console.log(error)
                self.$message.error(error.message)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        self.submitUpload()
      }
    },
    getAttachTypeList (FLoanID, isUpload) {
      let self = this
      this.$axios.get('Files/GetAttachTypeList', {
        params: {
          FBillTypeID: self.billTypeId
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            var switchFiles = (obj, index) => {
              self.files[index].data.FLoanID = FLoanID
              self.files[index].data.AttachType = obj.FID
              self.files[index].data.FBillTypeID = Number(self.billTypeId)
              if (!isUpload) {
                self.files[index].fileList = []
                self.getFilesUrl(self.files[index], obj.FID)
              }
            }
            _.each(data.object, obj => {
              switch (obj.FName) {
                case '创建（利用）前照片':
                  switchFiles(obj, 0)
                  break
                case '创建（利用）规划设计效果图':
                  switchFiles(obj, 1)
                  break
                case '创建（利用）中照片':
                  switchFiles(obj, 2)
                  break
                case '创建（利用）后照片':
                  switchFiles(obj, 3)
                  break
                case '创建报告（文件形式）':
                  switchFiles(obj, 4)
                  break
              }
            })
            if (isUpload) {
              self.submitUpload()
            }
          } else {
            self.$message({
              message: data.message,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
          self.$message.error(error.message)
        })
    },
    /**
     * 获取整改照片地址
     */
    getFilesUrl: function (files, FAttachType) {
      let self = this
      this.$axios.get('Files/GetFilesUrl', {
        params: {
          FAttachType: FAttachType,
          FLoanID: this.fid,
          FBillTypeID: this.billTypeId
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            _.each(data.object, function (obj) {
              files.fileList.push({
                name: obj.FileName,
                url: obj.FileUrl
              })
            })
          } else {
            self.$message({
              message: data.message,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
          self.$message.error(error.message)
        })
    },
    onFilesChange (file, fileList) {
      this.filesChange = true
    },
    /**
     * 提交照片/文件
     */
    submitUpload () {
      this.$refs.upload0[0].submit()
      this.$refs.upload1[0].submit()
      this.$refs.upload2[0].submit()
      this.$refs.upload3[0].submit()
      this.$refs.upload4[0].submit()
    },
    beforeAvatarUpload (file) {
      var testmsg = file.type.substring(0, file.type.lastIndexOf('/') + 1)
      const extension = testmsg === 'image/'
      const isLt2M = file.size / 1024 / 1024 < 3
      if (!extension) {
        this.$message({
          message: '上传文件只能是图片文件!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 3MB!',
          type: 'warning'
        })
      }
      return extension && isLt2M
    },
    uploadSuccess (response, file, fileLis) {
      let self = this
      let data = response
      // console.log(response)
      if (data.code === 1) {
        this.form.isSubmited = false
        this.filesChange = false
        this.$message({
          message: self.isEdit !== '' ? '修改成功' : '新增成功！',
          type: 'success'
        })
        this.$emit('closeProAdd', false)
      } else {
        this.$message({
          message: data.message,
          type: 'warning'
        })
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleError () {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
    },
    submitAudit () {
      let self = this
      this.$axios.post('LoanApply/SubmitSJApply', {
        FBillTypeID: self.billTypeId,
        FID: self.form.fid
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            self.$message({
              message: '提交审核成功',
              type: 'success'
            })
            this.$emit('closeProAdd', false)
          } else {
            self.$message({
              message: data.message,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
          self.$message.error(error.message)
        })
    },
    openAudit () {
      this.dialogAuditShow = true
    },
    closeAudit (msg) {
      this.dialogAuditShow = false
    },
    closePro (msg) {
      console.log(msg)
      location.reload()
    },
    formatDatetime (row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created () {
    this.getBreadcrumb()
    this.getAdcd()
  },
  props: ['fid', 'billTypeId']
}
</script>

<style scoped>
  #amapDemo, .amap-demo {
    height: 300px;
  }

  .search-box {
    position: absolute !important;
    top: 25px;
    left: 20px;
  }

  .amap-page-container {
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }

  .toolbar {
    margin-top: 10px;
  }
</style>

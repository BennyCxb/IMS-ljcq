<template>
  <div class="table" v-loading.lock="Loading">
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
               ref="oldForm"
               size="small"
               class="demo-form-inline demo-ruleForm">
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
            <el-form-item label="区块名称" :label-width="formLabelWidth" prop="FAreaName">
              <el-input v-model="form.FAreaName" placeholder="请输入区块名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行政区划" :label-width="formLabelWidth" prop="FAgencyValue">
              <el-select v-model="form.FAgencyValue" @change="getCounty" placeholder="请选择行政区划">
                <el-option
                  v-for="(item, i) in adcdOptions"
                  :key="i"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="乡镇街道" :label-width="formLabelWidth" prop="FTownValue">
              <el-select v-model="form.FTownValue" placeholder="请选择乡镇街道">
                <el-option
                  v-for="(item, i) in countyOptions"
                  :key="i"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="详细地址" :label-width="formLabelWidth" prop="FPosition">
              <el-input v-model="form.FPosition" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="主要产业" :label-width="formLabelWidth" prop="FIndustry">
              <el-input v-model="form.FIndustry"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业家数" :label-width="formLabelWidth" prop="FEntrepreneurCount">
              <el-input v-model="form.FEntrepreneurCount">
                <template slot="suffix">万㎡</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总占地" :label-width="formLabelWidth" prop="FOccupy">
              <el-input v-model="form.FOccupy">
                <template slot="suffix">万㎡</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总建筑面积" :label-width="formLabelWidth" prop="FTotalAcreage">
              <el-input v-model="form.FTotalAcreage">
                <template slot="suffix">万㎡</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="违建面积" :label-width="formLabelWidth" prop="FNonConBuildingArea">
              <el-input v-model="form.FNonConBuildingArea">
                <template slot="suffix">万㎡</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="责任领导" :label-width="formLabelWidth" prop="FRespLeader">
              <el-input v-model="form.FRespLeader"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人" :label-width="formLabelWidth" prop="FLinkMan">
              <el-input v-model="form.FLinkMan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式" :label-width="formLabelWidth" prop="FLinkMobile">
              <el-input v-model="form.FLinkMobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="改造前区块情况简介" :label-width="formLabelWidth" prop="FRemark">
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
            <el-form-item label="市级改造方式" :label-width="formLabelWidth" prop="FCityChangeType">
              <el-select v-model="form.FCityChangeType" placeholder="请选择市级改造方式">
                <el-option
                  v-for="(item,i) in cityTypeOptions"
                  :key="i"
                  :label="item.FName"
                  :value="item.FValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="县级改造方式" :label-width="formLabelWidth" prop="FTownChangeType">
              <el-select v-model="form.FTownChangeType"
                         value-key="label"
                         filterable
                         allow-create
                         default-first-option>
                <el-option
                  v-for="(item,i) in countyTypeOptions"
                  :key="i"
                  :label="item.FName"
                  :value="item.FValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="改造后用途" :label-width="formLabelWidth" prop="FAfterChange">
              <el-select v-model="form.FAfterChange" placeholder="请选择改造后用途">
                <el-option
                  v-for="(item,i) in purposeOptions"
                  :key="i"
                  :label="item.FName"
                  :value="item.FValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟总投资额" :label-width="formLabelWidth" prop="FTotalInvestAmount">
              <el-input v-model="form.FTotalInvestAmount">
                <template slot="suffix">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="改造后总建筑面积" :label-width="formLabelWidth" prop="FAfterChangeArea">
              <el-input v-model="form.FAfterChangeArea">
                <template slot="suffix">万㎡</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟启动时间" :label-width="formLabelWidth" prop="FChangeBeginDate">
              <el-date-picker
                v-model="form.FChangeBeginDate"
                type="month"
                placeholder="请选择拟启动时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟完成时间" :label-width="formLabelWidth" prop="FChangeEndDate">
              <el-date-picker
                v-model="form.FChangeEndDate"
                type="month"
                placeholder="请选择拟完成时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="改造方案简介" :label-width="formLabelWidth" prop="FChangeRemark">
              <el-input v-model="form.FChangeRemark"
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
        <el-row v-if="isEdit">
          <el-col :span="24">
            <el-form-item>
              <h3>审核历史</h3>
              <hr/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-table
                :data="auditList"
                max-height="250"
                size="mini"
                style="width: 100%">
                <el-table-column
                  prop="FAddTime"
                  label="日期"
                  width="180"
                  :formatter="formatDatetime">
                </el-table-column>
                <el-table-column
                  prop="FLevelName"
                  label="事件"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="FName"
                  label="操作用户"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="FRemark"
                  label="结果">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="el-footer" v-cloak>
        <el-button @click="handleClose">返 回</el-button>
        <el-button @click="cancelEdit" v-if="isEdit && submitPossession && !isDisabled">取消编辑</el-button>
        <el-button type="warning" @click="isDisabled = !isDisabled" v-if="isEdit && submitPossession && isDisabled">编 辑</el-button>
        <el-button @click="resetForm('oldForm')" v-if="!isEdit && !form.FStatus && !isDisabled">重置</el-button>
        <el-button type="primary" @click="submit('oldForm')" v-if="!form.FStatus && !isDisabled">保 存</el-button>
        <el-button type="primary" @click="submitAudit" v-if="isEdit && submitPossession && isDisabled">改造完成</el-button>
        <el-button type="primary" @click="openAudit" v-if="isEdit && auditPossession && isDisabled">立即审核</el-button>
        <el-button type="success" @click="dialogProgress" v-if="isDisabled">查看改造进度</el-button>
        <problem-audit :dialogAudit="dialogAuditShow" :auditData="auditData" @closeAudit="closeAudit" @closePro="closePro"></problem-audit>
      </div>
    <transform-progress1 :dialogProgress1="dialogProgress1Show" :FLoanID="form.FID" :submitPossession="submitPossession" @closeProgress1="closeProgress1"></transform-progress1>
    <transform-progress2 :dialogProgress2="dialogProgress2Show" :FLoanID="form.FID" :submitPossession="submitPossession" @closeProgress2="closeProgress2"></transform-progress2>
  </div>
  <!--</div>-->
</template>
<script>
import mapSelect from './MapSelect.vue'
import problemAudit from './ProblemAudit.vue'
import transformProgress1 from './TransformProgress1.vue'
import transformProgress2 from './TransformProgress2.vue'
import {formatDate} from '../../assets/js/date.js'
import _ from 'lodash'

export default {
  components: {
    problemAudit,
    transformProgress1,
    transformProgress2,
    mapSelect
  },
  computed: {
    url () {
      return this.$axios.defaults.baseURL + 'Files/UploadFileForQiNiu'
    },
    headers () {
      return {
        Authorization: 'Bearer ' + this.$cookies.get('TZOldManage')
      }
    },
    auditData () {
      let data = {
        FBillTypeID: this.form.FBillTypeID,
        FID: this.form.FID,
        FCheckLevel: this.form.FCheckLevel
      }
      return JSON.stringify(data)
    }
  },
  data () {
    return {
      breadcrumb: [],
      formLabelWidth: '130px',
      Loading: false,
      isEdit: false,
      isDisabled: false,
      isSubmited: false,
      mapSelectShow: false,
      dialogAuditShow: false,
      dialogProgress1Show: false,
      dialogProgress2Show: false,
      filesChange: false,
      submitPossession: false,
      auditPossession: false,
      auditList: [],
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
        FRespLeader: '',
        FLinkMan: '',
        FLinkMobile: '',
        FRemark: '',
        FCityChangeType: '',
        FTownChangeType: '',
        FAfterChange: '',
        FTotalInvestAmount: '',
        FAfterChangeArea: '',
        FChangeBeginDate: '',
        FChangeEndDate: '',
        FChangeRemark: ''
      },
      zoom: 14,
      center: [121.420866, 28.655815],
      markers: [],
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
        FAreaName: [
          {required: true, message: '请输入区块名称', trigger: 'blur'}
        ],
        FAgencyValue: [
          {type: 'string', required: true, message: '请选择行政区划', trigger: 'blur'}
        ],
        FTownValue: [
          {type: 'string', required: true, message: '请选择乡镇街道', trigger: 'blur'}
        ],
        FPosition: [
          {required: true, message: '请输入详细地址', trigger: 'blur'}
        ],
        FGPS: [
          {required: false, message: '请选择定位', trigger: 'blur'}
        ],
        FIndustry: [
          {required: false, message: '请选择主要产业', trigger: 'blur'}
        ],
        FInvestment: [
          {required: false, message: '请输入投资金额', trigger: 'blur'}
        ],
        FEntrepreneurCount: [
          {required: false, message: '请输入企业家数', trigger: 'blur'}
        ],
        FOccupy: [
          {required: false, message: '请输入总占地', trigger: 'blur'}
        ],
        FTotalAcreage: [
          {required: false, message: '请输入总建筑面积', trigger: 'blur'}
        ],
        FNonConBuildingArea: [
          {required: false, message: '请输入违建面积', trigger: 'blur'}
        ],
        FRespLeader: [
          {required: false, message: '请输入负责单位', trigger: 'blur'}
        ],
        FLinkMan: [
          {required: false, message: '请输入联系人', trigger: 'blur'}
        ],
        FLinkMobile: [
          {required: false, message: '请输入联系方式', trigger: 'blur'}
        ],
        FRemark: [
          {required: true, message: '请输入改造前区块情况简介', trigger: 'blur'}
        ],
        FCityChangeType: [
          {type: 'number', required: true, message: '请选择市级改造方式', trigger: 'change'}
        ],
        FTownChangeType: [
          {required: false, message: '请选择县级改造方式', trigger: 'change'}
        ],
        FChangeBeginDate: [
          {required: true, message: '请选择拟启动日期', trigger: 'change'}
        ],
        FChangeEndDate: [
          {required: true, message: '请选择拟完成日期', trigger: 'change'}
        ],
        FAfterChange: [
          {type: 'number', required: true, message: '请选择改造后用途', trigger: 'change'}
        ],
        FTotalInvestAmount: [
          {required: false, message: '请输入拟投资总金额', trigger: 'blur'}
        ],
        FAfterChangeArea: [
          {required: false, message: '请输入改造后总建筑面积', trigger: 'blur'}
        ],
        FChangeRemark: [
          {required: true, message: '请输入改造方案简介', trigger: 'blur'}
        ]
      },
      adcdOptions: [],
      countyOptions: [],
      cityTypeOptions: [],
      countyTypeOptions: [],
      purposeOptions: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    openLoading () {
      this.Loading = true
      setTimeout(() => {
        this.Loading = false
      }, 1000)
    },
    reload () {
      if (this.isEdit) {
        this.isDisabled = true
        // this.getBreadcrumb()
        // this.getAdcd()
        // this.getCityChangeType()
        // this.getCountyChangeType()
        // this.getPurpose()
        this.getInfo()
      } else {
        this.isDisabled = true
        let path = this.$route.fullPath.split('/info')[0]
        this.$router.push({path: path + '/info-' + this.form.FID})
        this.getInfo()
      }
    },
    closeInfo () {
      let blist = this.breadcrumb
      blist.pop()
      sessionStorage.setItem('breadcrumb', JSON.stringify(blist))
      let path = this.$route.fullPath
      path = path.substring(0, path.indexOf('/info'))
      this.$router.push({path: path})
    },
    cancelEdit () {
      this.isDisabled = true
      this.getInfo()
    },
    handleClose () {
      this.$confirm('确定返回？')
        .then(_ => {
          this.closeInfo()
        })
        .catch(_ => {
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
      // console.log(this.$route)
      let fid = this.$route.params.infoid
      if (fid) {
        this.isEdit = true
        this.isDisabled = true
        this.form.FID = fid
        this.getInfo()
      } else {
        this.isEdit = false
      }
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
      this.markers = [].concat([{
        position: [msg.lng, msg.lat]
      }])
    },
    /**
     * 获取行政区划
     */
    getAdcd () {
      let self = this
      this.$axios.get('Common/GetAgencyList')
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            let adcdlist = []
            let FAgencyValue = localStorage.getItem('FAgencyValue')
            if (FAgencyValue !== 'null') {
              let item = _.find(data.object, {FValue: FAgencyValue})
              self.form.FAgencyValue = item.FValue
              adcdlist.push({
                value: item.FValue,
                label: item.FName
              })
            } else {
              _.each(data.object, (obj) => {
                adcdlist.push({
                  value: obj.FValue,
                  label: obj.FName
                })
              })
            }
            self.adcdOptions = [].concat(adcdlist)
            if (!self.isEdit) self.getCounty()
          } else {
            self.$message({
              message: data.object,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          console.log(error)
          self.$alert(error.message, '温馨提示', {
            confirmButtonText: '确定'
          })
        })
    },
    /**
     * 获取乡镇街道
     */
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
          let countyList = []
          _.each(data.object, (obj) => {
            countyList.push({
              value: obj.FValue,
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
     * 获取改造后用途
     */
    getPurpose () {
      let self = this
      this.$axios.get('Common/GetEnumList', {
        params: {
          EnumType: '改造后用途'
        }
      })
        .then(response => {
          let data = response.data
          self.purposeOptions = [].concat(data.object)
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
      this.getAuditList()
      this.$axios.get('OldCity/GetOldCity', {
        params: {
          FID: this.form.FID
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            let obj = data.object
            let position = obj.FGPS
            let FTownValue = obj.FTownValue
            self.form = obj
            if (position) {
              self.markers = [].concat([{
                position: position.split(',')
              }])
            }
            self.getAttachTypeList(obj.FID)
            self.getCounty()
            self.form.FTownValue = FTownValue
            self.getSubmitPossession()
            self.getAuditPossession()
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
      if (self.isSubmited === false) {
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
                  self.isSubmited = true
                  self.getAttachTypeList(self.form.FID, true)
                  if (!self.filesChange) {
                    self.$message({
                      message: self.isEdit ? '修改成功' : '新增成功！',
                      type: 'success'
                    })
                    self.reload()
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
          FBillTypeID: self.form.FBillTypeID
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            var switchFiles = (obj, index) => {
              self.files[index].data.FLoanID = FLoanID
              self.files[index].data.AttachType = obj.FID
              self.files[index].data.FBillTypeID = Number(self.form.FBillTypeID)
              if (!isUpload) {
                self.files[index].fileList = []
                self.getFilesUrl(self.files[index], obj.FID)
              }
            }
            _.each(data.object, obj => {
              switch (obj.FName) {
                case '改造前影像图':
                  switchFiles(obj, 0)
                  break
                case '效果图':
                  switchFiles(obj, 1)
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
          FLoanID: this.form.FID,
          FBillTypeID: this.form.FBillTypeID
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
      let data = response
      // console.log(response)
      if (data.code === 1) {
        this.isDisabled = true
        this.isSubmited = false
        this.filesChange = false
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.reload()
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
    getAuditList () {
      let self = this
      this.$axios.get('Flow/GetCheckList', {
        params: {
          FLoanID: this.form.FID,
          FBillTypeID: this.form.FBillTypeID
        }
      })
        .then(response => {
          let data = response.data
          // console.log(data)
          if (data.code === 1) {
            self.auditList = [].concat(data.object)
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
     * 提交审核
     */
    submitAudit () {
      let self = this
      this.$axios.post('Flow/SubmitApply', {
        FBillTypeID: self.form.FBillTypeID,
        FID: self.form.FID
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            self.$message({
              message: '提交改造成功',
              type: 'success'
            })
            self.reload()
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
     * 打开审核
     */
    openAudit () {
      this.dialogAuditShow = true
    },
    closeAudit (msg) {
      this.dialogAuditShow = false
    },
    /**
     * 判断改造方式打开改造进度
     */
    dialogProgress () {
      let type = Number(this.form.FCityChangeType)
      // console.log(type)
      if (type === 1 || type === 2) {
        this.openProgress1()
      } else if (type === 3) {
        this.openProgress2()
      } else {
        this.$message.error('请选择改造方式')
      }
    },
    openProgress1 () {
      this.dialogProgress1Show = true
    },
    closeProgress1 (msg) {
      this.dialogProgress1Show = false
    },
    openProgress2 () {
      this.dialogProgress2Show = true
    },
    closeProgress2 (msg) {
      this.dialogProgress2Show = false
    },
    closePro (msg) {
      this.reload()
    },
    // 编辑、提交整改权限
    getSubmitPossession () {
      let FLevel = Number(localStorage.getItem('FLevel'))
      if (FLevel === 1) {
        if (this.form.FStatus === 0) {
          this.submitPossession = true
        } else {
          this.submitPossession = false
        }
      } else if (FLevel === 3 && this.form.FStatus === 0) {
        this.submitPossession = true
      } else if (FLevel === 4 && this.form.FStatus === 0) {
        this.submitPossession = true
      } else {
        this.submitPossession = false
      }
    },
    // 审核整改权限
    getAuditPossession () {
      let FLevel = Number(localStorage.getItem('FLevel'))
      if (FLevel === 1 || FLevel === 2) {
        if (this.form.FStatus === 1) {
          this.auditPossession = true
        } else {
          this.auditPossession = false
        }
      } else {
        this.auditPossession = false
      }
    },
    formatDatetime (row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created () {
    this.openLoading()
    this.getBreadcrumb()
    this.getAdcd()
    this.getCityChangeType()
    this.getCountyChangeType()
    this.getPurpose()
  }
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

  .el-footer {
    text-align: right;
  }

  .el-input__suffix {
    transform: translateX(0px);
  }
</style>

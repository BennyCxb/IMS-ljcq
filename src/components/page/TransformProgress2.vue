<template>
  <div v-if="dialogProgress2">
    <el-form class="demo-form-inline demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <h3>改造进度</h3>
            <hr/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-collapse v-model="activeNames" accordion v-loading="Loading">
      <div class="add-enterprise" v-if="forms.length === 0">
        <div class="el-upload__tip text-center">您还未添加企业信息，请添加！</div>
      </div>
      <el-collapse-item v-for="(form, index) in forms"
                        :key="index"
                        :title="form.FCompanyName"
                        :name="index + 1"
                        v-else>
        <el-form :model="form"
                 class="demo-form-inline demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称" :label-width="formLabelWidth" prop="FCompanyName">
                <el-input v-model="form.FCompanyName" placeholder="请输入企业名称" :disabled="isDisabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="改造类型" :label-width="formLabelWidth" prop="date">
                <el-select v-model="form.FReadyType" placeholder="请选择" :disabled="isDisabled">
                  <el-option
                    v-for="item in btOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="form.FReadyType ? '整治建筑面积': '拆除建筑面积'" :label-width="formLabelWidth" prop="date">
                <el-input v-model="form.FReadyArea" placeholder="请输入改造建筑面积" :disabled="isDisabled">
                  <template slot="suffix">万㎡</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :disabled="isDisabled">
            <el-col :span="8">
              <el-form-item :label="form.FReadyType ? '整治开始时间': '拆除开始时间'" :label-width="formLabelWidth" prop="date">
                <el-date-picker
                  v-model="form.FDoingTime"
                  type="date"
                  :disabled="isDisabled"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="form.FReadyType ? '整治结束时间': '拆除结束时间'" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.FDoneTime"
                  type="date"
                  :disabled="isDisabled"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="danger" icon="el-icon-delete" v-if="(FLevel === 1 || FLevel === 3) && submitPossession" @click="enterpriseDelete(form)">删除</el-button>
                <el-button type="success" @click="" v-if="submitPossession && isDisabled">上报信息</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-for="(item, i) in form.files" :key="i">
              <el-form-item :label="item.label" :label-width="formLabelWidth">
                <el-upload
                  :ref="'upload' + i"
                  :action="url"
                  :headers="headers"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :data="item.data"
                  :file-list="item.fileList"
                  :uploadSuccess="uploadSuccess"
                  :beforeUpload="beforeAvatarUpload"
                  :disabled="isDisabled"
                  accept="image/*"
                  multiple>
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3MB</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <div class="add-enterprise text-center" v-if="submitPossession && !isDisabled">
        <el-button type="primary" icon="el-icon-plus" size="mini" round @click="enterpriseAdd">新增企业</el-button>
      </div>
    </el-collapse>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返 回</el-button>
      <el-button type="danger" @click="cancelEdit" v-if="submitPossession && !isDisabled">取消编辑</el-button>
      <el-button type="primary" @click="isDisabled = !isDisabled" v-if="submitPossession && isDisabled">编 辑</el-button>
      <el-button type="success" @click="enterpriseUpdate" v-if="submitPossession && !isDisabled">保 存</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  computed: {
    url () {
      return this.$axios.defaults.baseURL + 'Files/UploadFileForQiNiu'
    },
    headers () {
      return {
        Authorization: 'Bearer ' + this.$cookies.get('TZOldManage')
      }
    },
    FLevel () {
      return Number(localStorage.getItem('FLevel'))
    }
  },
  data () {
    return {
      isDisabled: true,
      Loading: false,
      activeNames: 0,
      FBillTypeID: this.$route.params.btid,
      type: 1,
      btOptions: [
        {
          label: '拆除',
          value: 0
        },
        {
          label: '整治',
          value: 1
        }
      ],
      // tOptions: [
      //   {
      //     label: '拆除中',
      //     value: 0
      //   },
      //   {
      //     label: '整治中',
      //     value: 1
      //   }
      // ],
      // atOptions: [
      //   {
      //     label: '已拆除',
      //     value: 0
      //   },
      //   {
      //     label: '整治完成',
      //     value: 1
      //   }
      // ],
      forms: [],
      attachTypeList: [null, null],
      formLabelWidth: '120px',
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
      this.isDisabled = true
      this.getInfo()
    },
    handleClose () {
      this.$confirm('确定返回？')
        .then(_ => {
          this.$emit('closeProgress2')
        })
        .catch(_ => {
        })
    },
    cancelEdit () {
      this.isDisabled = true
      this.getInfo()
    },
    /**
     * 新增企业
     */
    enterpriseAdd () {
      let self = this
      let num = this.forms.length + 1
      let formData = {
        FLoanID: this.FLoanID,
        FCompanyName: '企业' + num,
        FReadyType: 0,
        FReadyArea: '',
        FDoingType: '',
        FDoingTime: '',
        FDoneType: '',
        FDoneTime: ''
      }
      this.activeNames = num
      this.$axios.post('OldCity/AddSingleOldCityExtend3', formData)
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            formData.FID = data.object
            formData.files = [{
              label: '改造中照片',
              data: {
                AttachType: self.attachTypeList[0],
                FBillTypeID: 2000012,
                FLoanID: self.FLoanID
              },
              fileList: []
            },
            {
              label: '改造后照片',
              data: {
                AttachType: self.attachTypeList[1],
                FBillTypeID: 2000012,
                FLoanID: self.FLoanID
              },
              fileList: []
            }]
            self.forms.push(formData)
            self.$message({
              message: '新增企业成功！',
              type: 'success'
            })
          } else {
            self.$message.error(data.object)
            self.forms.pop()
          }
        })
        .catch(error => {
          // console.log(error)
          self.$message.error(error.message)
        })
    },
    /**
     * 删除企业
     */
    enterpriseDelete (item) {
      let self = this
      this.$confirm('确定删除' + item.FCompanyName + '？')
        .then(_ => {
          this.$axios.get('OldCity/DeleteCityExtend3', {
            params: {
              FID: item.FID,
              FLoanID: this.FLoanID
            }
          })
            .then(response => {
              let data = response.data
              // console.log(data)
              if (data.code === 1) {
                self.$message({
                  message: '删除成功！',
                  type: 'success'
                })
                self.getInfo()
              } else {
                self.$message({
                  message: data.message,
                  type: 'warning'
                })
              }
            })
            .catch(error => {
              // console.log(error)
              self.$message.error(error.message)
            })
        })
        .catch(_ => {
        })
    },
    /**
     * 修改企业
     */
    enterpriseUpdate () {
      let self = this
      this.$axios.post('OldCity/SaveOldCityExtend3', this.forms)
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            self.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.reload()
          } else {
            self.$message.error(data.object)
            self.forms.pop()
          }
        })
        .catch(error => {
          // console.log(error)
          self.$message.error(error.message)
        })
    },
    getAttachTypeList () {
      let self = this
      this.$axios.get('Files/GetAttachTypeList', {
        params: {
          FBillTypeID: this.$route.params.btid
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            self.attachTypeList = []
            _.each(data.object, obj => {
              switch (obj.FName) {
                case '企业拆除中照片':
                  self.attachTypeList.push(obj.FID)
                  break
                case '企业已拆除照片':
                  self.attachTypeList.push(obj.FID)
                  break
              }
            })
            self.getInfo()
          } else {
            self.$message({
              message: data.message,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          // console.log(error)
          self.$message.error(error.message)
        })
    },
    getInfo () {
      let self = this
      this.forms = []
      this.$axios.get('OldCity/GetOldCityExtend3List', {
        params: {
          FLoanID: this.FLoanID
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            _.each(data.object, function (obj) {
              let item = obj
              item.files = [
                {
                  label: '改造中照片',
                  data: {
                    AttachType: self.attachTypeList[0],
                    FBillTypeID: 2000012,
                    FLoanID: obj.FID
                  },
                  fileList: []
                },
                {
                  label: '改造后照片',
                  data: {
                    AttachType: self.attachTypeList[1],
                    FBillTypeID: 2000012,
                    FLoanID: obj.FID
                  },
                  fileList: []
                }
              ]
              self.forms.push(item)
              let files = self.forms[self.forms.length - 1].files
              self.getFilesUrl(files[0])
              self.getFilesUrl(files[1])
            })
          } else {
            self.$message({
              message: data.message,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          // console.log(error)
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
          FAttachType: files.data.AttachType,
          FLoanID: files.data.FLoanID,
          FBillTypeID: files.data.FBillTypeID
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
          // console.log(error)
          self.$message.error(error.message)
        })
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
      if (data.code !== 1) {
        this.$message({
          message: data.message,
          type: 'warning'
        })
      }
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
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
    }
  },
  props: ['dialogProgress2', 'FLoanID', 'submitPossession'],
  watch: {
    dialogProgress2 (curVal) {
      if (curVal) {
        this.openLoading()
        this.getAttachTypeList()
      } else {
        this.forms = []
      }
    }
  }
}
</script>

<style scoped>
  /*.el-collapse {*/
    /*border-top: 0px solid #ebeef5;*/
  /*}*/

  .add-enterprise {
    padding: 10px;
  }

  .text-center {
    text-align: center;
  }

  .dialog-footer {
    margin-top: 10px;
    text-align: right;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>

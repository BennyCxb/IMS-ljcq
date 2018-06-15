<template>
  <div v-if="dialogProgress1">
    <el-row>
      <el-col :span="24">
        <el-form>
          <el-form-item>
            <h3>改造进度</h3>
            <hr/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item :title="form.title" :name="index" v-for="(form, index) in forms" :key="index">
        <el-form :model="form"
                 size="small"
                 class="demo-form-inline demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.FTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  :disabled="form.isDisabled"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.label1">
              <el-form-item :label="form.label1" :label-width="formLabelWidth">
                <el-input v-model="form.FArea1" :disabled="form.isDisabled">
                  <template slot="suffix">万㎡</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="form.label2">
              <el-form-item :label="form.label2" :label-width="formLabelWidth">
                <el-input v-model="form.FArea2" :disabled="form.isDisabled">
                  <template slot="suffix">万㎡</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item, i) in form.files" :key="i">
            <el-col :span="24" v-if="item.type === 'img'">
              <el-form-item :label="item.label" :label-width="formLabelWidth">
                <el-upload
                  :ref="'upload' + i"
                  :action="url"
                  :headers="headers"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :data="item.data"
                  :file-list="item.fileList"
                  :beforeUpload="beforeAvatarUpload"
                  :disabled="form.isDisabled"
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
            <el-col :span="24" v-else-if="item.type === 'file'">
              <el-form-item :label="item.label" :label-width="formLabelWidth">
                <el-col :span="12">
                  <el-upload
                    class="upload-demo"
                    drag
                    :ref="'upload' + i"
                    :action="url"
                    :headers="headers"
                    :data="item.data"
                    :disabled="form.isDisabled"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </el-col>
                <el-col :span="12">
                  <el-table
                    :data="item.fileList"
                    max-height="300"
                    size="mini"
                    style="width: 100%">
                    <el-table-column
                      prop="name"
                      label="文件名">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="操作"
                      width="180">
                      <template slot-scope="scope">
                        <el-button size="small" icon="el-icon-download" title="下载"
                                   @click="download(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="small" icon="el-icon-delete" type="danger" title="删除" v-if="!form.isDisabled && (index >= state || FLevel === 1 || FLevel === 2)"
                                   @click="deleteFiles(scope.row.id, scope.$index, item.fileList)">
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <div class="dialog-footer" v-if="index >= state">
            <el-button type="danger" @click="cancelEdit(form)" v-if="!form.isDisabled">取消编辑</el-button>
            <el-button type="primary" @click="edit(form)" v-if="form.isDisabled">编 辑</el-button>
            <el-button type="success" @click="submit(form)" v-if="!form.isDisabled">保 存</el-button>
            <el-button type="success" @click="submitProgress(form)" v-if="form.isDisabled && FLevel != 2 && FLevel !== 4">上报信息</el-button>
          </div>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返 回</el-button>
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
    }
  },
  data () {
    let self = this
    return {
      dialogFormVisible: false,
      Loading: false,
      activeNames: 0,
      state: 0,
      type: 1,
      FLevel: Number(localStorage.getItem('FLevel')),
      FBillTypeID: 2000011,
      forms: [
        {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 1,
          FTime: '',
          isDisabled: true,
          title: '已启动',
          label1: '',
          label2: '',
          files: [
            {
              label: '方案',
              type: 'file',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            },
            {
              label: '照片',
              type: 'img',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            }
          ]
        },
        {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 2,
          FTime: '',
          isDisabled: true,
          title: '已签约',
          label1: '',
          label2: '',
          files: [
            {
              label: '协议',
              type: 'file',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            },
            {
              label: '照片',
              type: 'img',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            }
          ]
        },
        {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 3,
          FTime: '',
          isDisabled: true,
          title: '已拆除',
          label1: '拆除总建筑面积',
          label2: '其中违建面积',
          files: [
            {
              label: '照片',
              type: 'img',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            }
          ]
        },
        {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 4,
          FTime: '',
          isDisabled: true,
          title: '已开工',
          label1: '',
          label2: '',
          files: [
            {
              label: '建设工程规划许可证',
              type: 'file',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            },
            {
              label: '照片',
              type: 'img',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            }
          ]
        },
        {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 5,
          FTime: '',
          isDisabled: true,
          title: '已完工',
          label1: '总建筑面积',
          label2: '总占地面积',
          files: [
            {
              label: '照片',
              type: 'img',
              data: {
                AttachType: '',
                FBillTypeID: 2000011,
                FLoanID: ''
              },
              fileList: []
            }
          ]
        }
      ],
      pickerOptions1: {
        disabledDate (time) {
          if (self.form[0].FTime && !self.form[3].FTime) {
            return time.getTime() < new Date(self.form[0].FTime)
          } else if (!self.form[0].FTime && self.form[2].FTime) {
            return time.getTime() > new Date(self.form[2].FTime)
          } else if (self.form[0].FTime && self.form[2].FTime) {
            return time.getTime() < new Date(self.form[0].FTime) || time.getTime() > new Date(self.form[2].FTime)
          } else {
            return false
          }
        }
      },
      pickerOptions2: {
        disabledDate (time) {
          if (self.form[1].FTime && !self.form[3].FTime) {
            return time.getTime() < new Date(self.form[1].FTime)
          } else if (!self.form[1].FTime && self.form[3].FTime) {
            return time.getTime() > new Date(self.form[3].FTime)
          } else if (self.form[1].FTime && self.form[3].FTime) {
            return time.getTime() < new Date(self.form[1].FTime) || time.getTime() > new Date(self.form[3].FTime)
          } else {
            return false
          }
        }
      },
      pickerOptions3: {
        disabledDate (time) {
          if (self.form[2].FTime && !self.form[3].FTime) {
            return time.getTime() < new Date(self.form[2].FTime)
          } else if (!self.form[2].FTime && self.form[4].FTime) {
            return time.getTime() > new Date(self.form[4].FTime)
          } else if (self.form[2].FTime && self.form[4].FTime) {
            return time.getTime() < new Date(self.form[2].FTime) || time.getTime() > new Date(self.form[4].FTime)
          } else {
            return false
          }
        }
      },
      pickerOptions4: {
        disabledDate (time) {
          return time.getTime() < new Date(self.form[3].FTime)
        }
      },
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
          this.$emit('closeProgress1', false)
        })
        .catch(_ => {
        })
    },
    edit (obj) {
      obj.isDisabled = false
    },
    cancelEdit (obj) {
      obj.isDisabled = true
      this.getInfo()
    },
    /**
     * 获取改造进度信息
     */
    getInfo () {
      var self = this
      this.$axios.get('OldCity/GetOldCityExtend12List', {
        params: {
          FLoanID: this.FLoanID
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            self.state = Number(data.message) || 0
            self.activeNames = self.state
            // let flag = true
            data.object.forEach((obj, index) => {
              if (self.forms[index].FStatu === obj.FStatu) {
                // if (self.state === index) {
                //   flag = false
                // }
                self.forms[index].FArea1 = obj.FArea1
                self.forms[index].FArea2 = obj.FArea2
                self.forms[index].FID = obj.FID
                self.forms[index].FLoanID = obj.FLoanID
                self.forms[index].FStatus = obj.FStatus
                self.forms[index].FTime = obj.FTime
                self.forms[index].isDisabled = true
                _.each(self.forms[index].files, file => {
                  file.data.FLoanID = obj.FLoanID
                })
              }
            })
            self.getAttachTypeList()
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
            var switchFiles = (obj, index1, index2) => {
              self.forms[index1].files[index2].data.AttachType = obj.FID
              self.forms[index1].files[index2].fileList = []
              self.getFilesUrl(self.forms[index1].files[index2], obj.FID)
            }
            _.each(data.object, obj => {
              switch (obj.FName) {
                case '已启动方案':
                  switchFiles(obj, 0, 0)
                  break
                case '已启动照片':
                  switchFiles(obj, 0, 1)
                  break
                case '已签约协议':
                  switchFiles(obj, 1, 0)
                  break
                case '已签约照片':
                  switchFiles(obj, 1, 1)
                  break
                case '已拆除照片':
                  switchFiles(obj, 2, 0)
                  break
                case '已开工建设工程规划许可证':
                  switchFiles(obj, 3, 0)
                  break
                case '已开工照片':
                  switchFiles(obj, 3, 1)
                  break
                case '已完工照片':
                  switchFiles(obj, 4, 0)
                  break
              }
            })
            // console.log(self.files)
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
          FLoanID: this.FLoanID,
          FBillTypeID: this.FBillTypeID
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            _.each(data.object, function (obj) {
              files.fileList.push({
                id: obj.FID,
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
     * 提交
     */
    submit (form) {
      let self = this
      this.$axios.post('OldCity/SaveOldCityExtend12', form)
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            form.isDisabled = true
            self.$message({
              message: '保存成功！',
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
          // console.log(error)
          self.$message.error(error.message)
        })
    },
    submitProgress (form) {
      let self = this
      if (!this.FStatus) {
        self.$message({
          message: '请先上报改造前基本信息和改造信息',
          type: 'warning'
        })
        return false
      }
      this.$confirm('上报信息将无法修改，确定上报信息？')
        .then(_ => {
          this.$axios.get('OldCity/SubmitOldCityExtend12', {
            params: {
              FID: form.FID
            }
          })
            .then(response => {
              let data = response.data
              if (data.code === 1) {
                self.getInfo()
                self.$message({
                  message: '上报成功',
                  type: 'success'
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
        })
        .catch(_ => {
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
    handleRemove (file, fileList) {
      this.deleteFiles(file.id)
    },
    deleteFiles (id, index, fileList) {
      let self = this
      this.$axios.get('Files/DeleteFile', {
        params: {
          FID: id
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            if (index) {
              fileList.splice(index, 1)
            }
            self.$message({
              message: '删除附件成功',
              type: 'success'
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
    download (index, obj) {
      let filename = obj.name.split('.')[0]
      var $a = document.createElement('a')
      $a.setAttribute('href', obj.url)
      $a.setAttribute('download', filename)
      var evObj = document.createEvent('MouseEvents')
      evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null)
      $a.dispatchEvent(evObj)
    }
  },
  props: ['dialogProgress1', 'FLoanID', 'FStatus'],
  watch: {
    dialogProgress1 (curVal) {
      if (curVal) {
        this.openLoading()
        this.getInfo()
      }
    }
  }
}
</script>

<style scoped>
  .dialog-footer {
    margin-top: 10px;
    text-align: right;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>

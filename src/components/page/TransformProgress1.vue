<template>
  <el-dialog title="改造进度" :visible.sync="dialogProgress1" :before-close="handleClose" width="80%">
    <el-form :model="form"
             :disabled="isDisabled"
             ref="form"
             size="small"
             class="demo-form-inline demo-ruleForm" v-loading="Loading">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item title="已启动" name="1">
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date1">
            <el-date-picker
              v-model="form[0].FTime"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="item.sign === 0">
        <el-col :span="24" v-if="item.type === 'img'">
          <el-form-item :label="item.label" :label-width="formLabelWidth">
            <el-upload
              :ref="'upload' + i"
              :action="url"
              :headers="headers"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :data="item.data"
              :file-list="item.fileList"
              :beforeUpload="beforeAvatarUpload"
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
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
        </el-collapse-item>
        <el-collapse-item title="已签约" name="2">
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date1">
            <el-date-picker
              v-model="form[1].FTime"
              type="date"
              :picker-options="pickerOptions1"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="item.sign === 1">
        <el-col :span="24" v-if="item.type === 'img'">
          <el-form-item :label="item.label" :label-width="formLabelWidth">
            <el-upload
              :ref="'upload' + i"
              :action="url"
              :headers="headers"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :data="item.data"
              :file-list="item.fileList"
              :beforeUpload="beforeAvatarUpload"
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
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
        </el-collapse-item>
        <el-collapse-item title="已拆除" name="3">
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form[2].FTime"
              type="date"
              :picker-options="pickerOptions2"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆除总建筑面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[2].FArea1" placeholder="请输入拆除总建筑面积">
              <template slot="suffix">万㎡</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中违建面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[2].FArea2">
              <template slot="suffix">万㎡</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="item.sign === 2">
        <el-col :span="24" v-if="item.type === 'img'">
          <el-form-item :label="item.label" :label-width="formLabelWidth">
            <el-upload
              :ref="'upload' + i"
              :action="url"
              :headers="headers"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :data="item.data"
              :file-list="item.fileList"
              :beforeUpload="beforeAvatarUpload"
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
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
        </el-collapse-item>
        <el-collapse-item title="已开工" name="4">
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form[3].FTime"
              type="date"
              :picker-options="pickerOptions3"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="item.sign === 3">
        <el-col :span="24" v-if="item.type === 'img'">
          <el-form-item :label="item.label" :label-width="formLabelWidth">
            <el-upload
              :ref="'upload' + i"
              :action="url"
              :headers="headers"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :data="item.data"
              :file-list="item.fileList"
              :beforeUpload="beforeAvatarUpload"
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
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-table
                :data="item.fileList"
                max-height="300"
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
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
        </el-collapse-item>
        <el-collapse-item title="已完工" name="5">
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form[4].FTime"
              type="date"
              :picker-options="pickerOptions4"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总建筑面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[4].FArea1">
              <template slot="suffix">万㎡</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总占地面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[4].FArea2">
              <template slot="suffix">万㎡</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="item.sign === 4">
        <el-col :span="24" v-if="item.type === 'img'">
          <el-form-item :label="item.label" :label-width="formLabelWidth">
            <el-upload
              :ref="'upload' + i"
              :action="url"
              :headers="headers"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :data="item.data"
              :file-list="item.fileList"
              :beforeUpload="beforeAvatarUpload"
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
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-table
                :data="item.fileList"
                max-height="300"
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
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
      <el-button @click="cancelEdit" v-if="submitPossession && !isDisabled">取消编辑</el-button>
      <el-button type="warning" @click="isDisabled = !isDisabled" v-if="submitPossession && isDisabled">编 辑</el-button>
      <el-button type="primary" @click="submit('form')" v-if="submitPossession && !isDisabled">保 存</el-button>
    </div>
  </el-dialog>
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
      isDisabled: true,
      activeNames: 1,
      type: 1,
      FBillTypeID: 2000011,
      form: {
        0: {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 1,
          FTime: ''
        },
        1: {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 2,
          FTime: ''
        },
        2: {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 3,
          FTime: ''
        },
        3: {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 4,
          FTime: ''
        },
        4: {
          FArea1: '',
          FArea2: '',
          FID: '',
          FLoanID: '',
          FStatus: 1,
          FTime: ''
        }
      },
      files: [
        {
          sign: 0,
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
          sign: 0,
          label: '照片',
          type: 'img',
          data: {
            AttachType: '',
            FBillTypeID: 2000011,
            FLoanID: ''
          },
          fileList: []
        },
        {
          sign: 1,
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
          sign: 1,
          label: '照片',
          type: 'img',
          data: {
            AttachType: '',
            FBillTypeID: 2000011,
            FLoanID: ''
          },
          fileList: []
        },
        {
          sign: 2,
          label: '照片',
          type: 'img',
          data: {
            AttachType: '',
            FBillTypeID: 2000011,
            FLoanID: ''
          },
          fileList: []
        },
        {
          sign: 3,
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
          sign: 3,
          label: '照片',
          type: 'img',
          data: {
            AttachType: '',
            FBillTypeID: 2000011,
            FLoanID: ''
          },
          fileList: []
        },
        {
          sign: 4,
          label: '照片',
          type: 'img',
          data: {
            AttachType: '',
            FBillTypeID: 2000011,
            FLoanID: ''
          },
          fileList: []
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
      this.$confirm('确定关闭？')
        .then(_ => {
          this.$emit('closeProgress1', false)
        })
        .catch(_ => {
        })
    },
    cancelEdit () {
      this.isDisabled = true
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
            self.form[0] = data.object
            data.object.forEach((obj, index) => {
              self.form[index] = obj
              _.each(self.files, file => {
                if (file.sign === index) {
                  file.data.FLoanID = obj.FLoanID
                }
              })
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
          console.log(error)
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
            var switchFiles = (obj, index) => {
              self.files[index].data.AttachType = obj.FID
              self.files[index].fileList = []
              self.getFilesUrl(self.files[index], obj.FID)
            }
            _.each(data.object, obj => {
              switch (obj.FName) {
                case '已启动方案':
                  switchFiles(obj, 0)
                  break
                case '已启动照片':
                  switchFiles(obj, 1)
                  break
                case '已签约协议':
                  switchFiles(obj, 2)
                  break
                case '已签约照片':
                  switchFiles(obj, 3)
                  break
                case '已开工建设工程规划许可证':
                  switchFiles(obj, 4)
                  break
                case '已开工照片':
                  switchFiles(obj, 5)
                  break
                case '已完工照片':
                  switchFiles(obj, 6)
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
    submit (formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = self.form
          let tmp = []
          _.each(data, obj => {
            tmp.push(obj)
          })
          // console.log(tmp)
          this.$axios.post('OldCity/SaveOldCityExtend12', tmp)
            .then(response => {
              let data = response.data
              if (data.code === 1) {
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
              console.log(error)
              self.$message.error(error.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
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
  props: ['dialogProgress1', 'FLoanID', 'submitPossession'],
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

</style>

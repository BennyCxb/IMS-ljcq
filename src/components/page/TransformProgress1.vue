<template>
  <el-dialog title="改造进度" :visible.sync="dialogProgress" :before-close="handleClose" width="80%">
    <el-form :model="form"
             :disabled="isDisabled"
             class="demo-form-inline demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <h3>已启动</h3>
            <hr/>
          </el-form-item>
        </el-col>
      </el-row>
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
      <el-row v-for="(item, i) in files" :key="i" v-if="i <= 1">
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
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <h3>已签约</h3>
            <hr/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date1">
            <el-date-picker
              v-model="form[1].FTime"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="i > 1 && i <= 3">
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
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <h3>已拆除</h3>
            <hr/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form[2].FTime"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆除总建筑面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[2].FArea1" placeholder="请输入拆除总建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中违建面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[2].FArea2" placeholder="请输入其中违建面积"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="i === 4">
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
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <h3>已开工</h3>
            <hr/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form[3].FTime"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="i === 5">
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
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <h3>已完工</h3>
            <hr/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form[4].FTime"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总建筑面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[4].FArea1" placeholder="请输入总建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总占地面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form[4].FArea2" placeholder="请输入总占地面积"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="i === 6">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  computed: {
    url () {
      return this.$axios.defaults.baseURL + 'Files/UploadFileForQiNiu'
    },
    headers () {
      return {
        Authorization: 'Bearer ' + this.$cookies.get('TZManage')
      }
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      isDisabled: false,
      isUpload: false,
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
          label: '方案',
          type: 'file',
          data: {},
          fileList: []
        },
        {
          label: '照片',
          type: 'img',
          data: {},
          fileList: []
        },
        {
          label: '协议',
          type: 'file',
          data: {},
          fileList: []
        },
        {
          label: '照片',
          type: 'img',
          data: {},
          fileList: []
        },
        {
          label: '照片',
          type: 'img',
          data: {},
          fileList: []
        },
        {
          label: '照片',
          type: 'img',
          data: {},
          fileList: []
        },
        {
          label: '照片',
          type: 'img',
          data: {},
          fileList: []
        }
      ],
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleClose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('closeProgress', false)
        })
        .catch(_ => {
        })
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
            })
            self.getAttachTypeList()
            console.log(self.form)
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
    getAttachTypeList (FLoanID, isUpload) {
      let self = this
      this.$axios.get('Files/GetAttachTypeList', {
        params: {
          FBillTypeID: self.FBillTypeID
        }
      })
        .then(response => {
          let data = response.data
          if (data.code === 1) {
            console.log(data)
            // var switchFiles = (obj, index) => {
            //   self.files[index].data.FLoanID = FLoanID
            //   self.files[index].data.AttachType = obj.FID
            //   self.files[index].data.FBillTypeID = Number(self.FBillTypeID)
            //   if (!isUpload) {
            //     self.files[index].fileList = []
            //     self.getFilesUrl(self.files[index], obj.FID)
            //   }
            // }
            // _.each(data.object, obj => {
            //   switch (obj.FName) {
            //     case '改造前影像图':
            //       switchFiles(obj, 0)
            //       break
            //     case '效果图':
            //       switchFiles(obj, 1)
            //       break
            //   }
            // })
            // if (isUpload) {
            //   self.submitUpload()
            // }
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
    submit () {

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
      let self = this
      let data = response
      // console.log(response)
      if (data.code === 1) {
        this.isSubmited = false
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
    }
  },
  props: ['dialogProgress', 'FLoanID'],
  watch: {
    dialogProgress (curVal) {
      if (curVal) {
        this.getInfo()
      }
    }
  }
}
</script>

<style scoped>

</style>

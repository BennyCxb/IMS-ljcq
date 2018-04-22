<template>
  <el-dialog title="改造进度" :visible.sync="dialogProgress" :before-close="handleClose" width="80%">
    <el-form :model="form"
             :disabled="isDisabled"
             class="demo-form-inline demo-ruleForm">
      <div>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <h3>企业</h3>
            <hr/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业名称" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form.FPosition" placeholder="请输入企业名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拟改造类型" :label-width="formLabelWidth" prop="date">
            <el-select v-model="form.FPosition" placeholder="请选择">
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
          <el-form-item label="拟改造面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form.FPosition" placeholder="请输入拟拆除或拟整治建筑面积"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="改造中类型" :label-width="formLabelWidth" prop="date">
            <el-select v-model="form.FPosition" placeholder="请选择">
              <el-option
                v-for="item in tOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="i === 1">
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="改造后类型" :label-width="formLabelWidth" prop="date">
            <el-select v-model="form.FPosition" placeholder="请选择">
              <el-option
                v-for="item in atOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, i) in files" :key="i" v-if="i === 1">
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
      </el-row>
      </div>
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
      type: 1,
      btOptions: [
        {
          label: '拟拆除',
          value: 0
        },
        {
          label: '拟整治',
          value: 1
        }
      ],
      tOptions: [
        {
          label: '拆除中',
          value: 0
        },
        {
          label: '整治中',
          value: 1
        }
      ],
      atOptions: [
        {
          label: '已拆除',
          value: 0
        },
        {
          label: '整治完成',
          value: 1
        }
      ],
      form: {
        date1: '',
        date2: '',
        date3: '',
        date4: '',
        date5: ''
      },
      files: [
        {
          label: '改造中照片',
          type: 'img',
          data: {},
          fileList: []
        },
        {
          label: '改造后照片',
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
    },
  },
  props: ['dialogProgress']
}
</script>

<style scoped>

</style>

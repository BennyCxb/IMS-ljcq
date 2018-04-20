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
          <el-form-item label="时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
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
              v-model="form.date2"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
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
              v-model="form.date3"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆除总建筑面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form.FPosition" placeholder="请输入拆除总建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其中违建面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form.FPosition" placeholder="请输入其中违建面积"></el-input>
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
              v-model="form.date4"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
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
              v-model="form.date5"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总建筑面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form.FPosition" placeholder="请输入总建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总占地面积" :label-width="formLabelWidth" prop="date">
            <el-input v-model="form.FPosition" placeholder="请输入总占地面积"></el-input>
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      isDisabled: false,
      type: 1,
      form: {
        date1: '',
        date2: '',
        date3: '',
        date4: '',
        date5: ''
      },
      files: [],
      formLabelWidth: '120px'
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
    }
  },
  props: ['dialogProgress']
}
</script>

<style scoped>

</style>

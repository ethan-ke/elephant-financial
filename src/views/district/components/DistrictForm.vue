<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-form ref="postForm" :model="postForm" :rules="rules" label-width="120px">
          <el-form-item label="地区名称" prop="name">
            <el-input v-model="postForm.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createDistrict, getData, updateDistrict } from '@/api/district'

export default {
  name: 'DistrictForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '地区名称不可为空!', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    onSubmit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            updateDistrict(this.postForm.id, this.postForm).then(response => {
              this.loading = true
              this.$notify({
                title: '成功',
                message: response.message,
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.$router.push('/district/index')
            })
          } else {
            createDistrict(this.postForm).then(response => {
              this.loading = true
              this.$notify({
                title: '成功',
                message: response.message,
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.$router.push('/district/index')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchData(id) {
      getData(id).then(response => {
        this.postForm = response.data
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

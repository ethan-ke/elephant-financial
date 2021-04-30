<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-form ref="postForm" :model="postForm" :rules="rules" label-width="120px">
          <el-form-item label="所属地区" prop="name">
            <el-select v-model="postForm.district_id" placeholder="请选择" class="width-100">
              <el-option
                v-for="item in districts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="员工名称" prop="name">
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
import { createStaff, getData, updateStaff } from '@/api/staff'
import { getList as getDistrictList } from '@/api/district'

export default {
  name: 'StaffForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        name: '',
        district_id: null
      },
      districts: null,
      rules: {
        name: [{ required: true, message: '员工名称不可为空!', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    getDistrictList().then(response => {
      this.districts = response.data
    })
  },
  methods: {
    onSubmit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            updateStaff(this.postForm.id, this.postForm).then(response => {
              this.loading = true
              this.$notify({
                title: '成功',
                message: response.message,
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.$router.push('/staff/index')
            })
          } else {
            createStaff(this.postForm).then(response => {
              this.loading = true
              this.$notify({
                title: '成功',
                message: response.message,
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.$router.push('/staff/index')
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

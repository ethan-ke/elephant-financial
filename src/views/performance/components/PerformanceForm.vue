<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-form ref="postForm" :model="postForm" :rules="rules" label-width="120px">
          <el-form-item label="姓名" prop="name">
            <el-select v-model="value" placeholder="请选择" class="width-100">
              <el-option
                v-for="item in staff"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="name">
            <el-input v-model="postForm.name"/>
          </el-form-item>
          <el-form-item label="人数" prop="name">
            <el-input v-model="postForm.name"/>
          </el-form-item>
          <el-form-item label="提成率" prop="name">
            <el-select v-model="value" placeholder="请选择" class="width-100">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否开班" prop="name">
            <el-radio-group v-model="postForm.status">
              <el-radio :label="3">开班</el-radio>
              <el-radio :label="6">未开班</el-radio>
            </el-radio-group>
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
import { getList as staffList } from '@/api/staff'

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
      },
      options: [{
        value: '0.01'
      }, {
        value: '0.03'
      }],
      value: '',
      staff: null
    }
  },
  created() {
    staffList().then(response => {
      this.staff = response.data
    })
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
              this.$router.push('/product/index')
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
              this.$router.push('/product/index')
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

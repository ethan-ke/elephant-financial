<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-form ref="postForm" :model="postForm" :rules="rules" label-width="120px">
          <el-form-item label="姓名" prop="staff_id">
            <el-select v-model="postForm.staff_id" placeholder="请选择" class="width-100">
              <el-option
                v-for="item in staff"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="postForm.price" />
          </el-form-item>
          <el-form-item label="人数" prop="number">
            <el-input v-model="postForm.number" />
          </el-form-item>
          <el-form-item label="提成率" prop="commission_rate">
            <el-select v-model="postForm.commission_rate" placeholder="请选择" class="width-100">
              <el-option
                v-for="item in commission_rate"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否开班" prop="status">
            <el-radio-group v-model="postForm.status">
              <el-radio :label="1">开班</el-radio>
              <el-radio :label="2">未开班</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="postForm.remark" />
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
import { createPerformance, getData, updatePerformance } from '@/api/performance'
import { getList as staffList } from '@/api/staff'

export default {
  name: 'PerformanceForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        staff_id: null,
        price: null,
        number: null,
        commission_rate: null,
        remark: null,
        status: 2
      },
      rules: {
        price: [{ required: true, message: '单价不可为空!', trigger: 'blur' }],
        number: [{ required: true, message: '人数不可为空!', trigger: 'blur' }]
      },
      commission_rate: [0.01, 0.02, 0.03],
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
            updatePerformance(this.postForm.id, this.postForm).then(response => {
              this.loading = true
              this.$notify({
                title: '成功',
                message: response.message,
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.$router.push('/performance/index')
            })
          } else {
            createPerformance(this.postForm).then(response => {
              this.loading = true
              this.$notify({
                title: '成功',
                message: response.message,
                type: 'success',
                duration: 2000
              })
              this.loading = false
              this.$router.push('/performance/index')
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

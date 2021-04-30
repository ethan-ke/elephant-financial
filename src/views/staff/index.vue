<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="所属地区">
        <template slot-scope="scope">
          {{ scope.row.district.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" plain size="mini" @click="redirectToProductEdit(row.id)">
            编辑
          </el-button>
          <el-button size="mini" plain type="danger" @click="handleDestroy(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, destroy } from '@/api/staff'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleDestroy(row, index) {
      destroy(row.id).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功!',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    redirectToProductEdit(id) {
      console.log(id)
      this.$router.push('/staff/edit/' + id)
    }
  }
}
</script>

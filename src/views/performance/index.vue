<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入关键字" style="width: 200px;" class="filter-item mr-1" :disabled="true" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" disabled>
        搜索
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload"
      >
        导出
      </el-button>
    </div>
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
          {{ scope.row.staff_name }}
        </template>
      </el-table-column>
      <el-table-column label="单价" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="提成率" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.commission_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="未开班" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pending }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已开班" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.start }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="110" align="center">
        <template slot-scope="{row}">
          <span>{{ row.salary }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="400">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" plain size="mini" @click="redirectToEdit(row.id)">
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
import { getList, destroy, exportPerformance } from '@/api/performance'
import waves from '@/directive/waves' // waves directive
export default {
  directives: { waves },
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
      downloadLoading: false,
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
        this.list = response.data.data
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
    redirectToEdit(id) {
      console.log(id)
      this.$router.push('/performance/edit/' + id)
    },
    handleDownload() {
      this.downloadLoading = true
      exportPerformance().then(res => {
        window.open(res.data.url, '_blank')
      })
      this.downloadLoading = false
    }
  }
}
</script>
<style>
.filter-container {
  margin-bottom: 1rem;
}

.mr-1 {
  margin-right: 1rem;
}
</style>.

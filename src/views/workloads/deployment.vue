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
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="命名空间" width="120">
        <template slot-scope="scope">
          {{ scope.row.NameSpace }}
        </template>
      </el-table-column>
      <el-table-column label="名字" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-html="getStatus(scope.row.IsComplete)"></span>
          <span v-if="!scope.row.IsComplete" class="is-red">{{ scope.row.Message }}</span>
        </template>
      </el-table-column>
      <el-table-column label="镜像" width="300" align="center">
        <template slot-scope="scope">
          <p style="margin: 0px!important;">{{ scope.row.Images }}</p>
          <p class="is-border" style="margin: 0px!important;">
            <span>{{ scope.row.Replicas[0] }}</span>/
            <span class="is-greed">{{ scope.row.Replicas[1] }}</span>/
            <span class="is-red">{{ scope.row.Replicas[2] }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="创建时间" width="170" align="center">
        <template slot-scope="scope">
          {{ scope.row.CreateTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getList} from '@/api/deploypments'
import {NewClient} from '@/utils/ws.js'

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
      listLoading: true,
      wsClient: null,
    }
  },
  created() {
    this.fetchData()
    this.wsClient = NewClient()
    this.wsClient.onmessage = (e) => {
      if (e.data !== 'ping') {
        const object = JSON.parse(e.data)
        if (object.type === 'Deployments') {
          this.list = object.result.data
          this.$forceUpdate()
        }
      }
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    getStatus(isComplete) {
      if (isComplete) {
        return "<p class='is-greed'>Active</p>"
      }
      return "<p class='is-red'>Waiting</p>"
    },
  }
}
</script>

<style>
.is-red {
  color: red;
}

.is-greed {
  color: green;
}

.is-border {
  font-weight: bold
}
</style>

<template>
  <div class="app-container">
    命名空间
    <el-select v-model="currentNS" placeholder="请选择" @change="onSelectedDrug">
      <el-option
        v-for="item in nsOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
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
      <el-table-column align="center" label="名字" width="120">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.CreateTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getIngressList} from "@/api/ingress";
import {NewClient} from '@/utils/ws.js'
import {getNSList} from "@/api/ns";

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
      currentNS: null,
      nsOptions: [{
        value: 'all-namespaces',
        label: 'all-namespaces'
      }],
      ns: null,
    }
  },
  created() {
    this.initNSList()
    this.fetchData('')
    this.wsClient = NewClient()
    this.wsClient.onmessage = (e) => {
      if (e.data !== 'ping') {
        const object = JSON.parse(e.data)
        if (object.type === 'Ingress') {
          if (this.currentNS === 'all-namespaces' || this.currentNS === null) {
            this.currentNS = 'all-namespaces'
            this.fetchData(this.currentNS)
          } else if (object.data.ns === this.currentNS) {
            this.list = object.data.data
          }
          this.$forceUpdate()
        }
      }
    }
  },
  methods: {
    fetchData(ns) {
      this.listLoading = true
      getIngressList(ns).then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    },
    initNSList() {
      getNSList().then(response => {
        const nss = response.data
        console.log(nss)
        this.nsOptions = [{
          value: 'all-namespaces',
          label: 'all-namespaces'
        }]
        nss.forEach(ns => {
          this.nsOptions.push({
            value: ns,
            label: ns
          })
        })
        console.log(this.nsOptions)
      })
    },
    getStatus(isComplete) {
      if (isComplete) {
        return "<p class='is-greed'>Active</p>"
      }
      return "<p class='is-red'>Waiting</p>"
    },
    onSelectedDrug(val) {
      this.fetchData(val)
    },
  }
}
</script>

<style>
.is-red {
  color: red;
}

.is-green {
  color: green;
}

.is-border {
  font-weight: bold
}
</style>

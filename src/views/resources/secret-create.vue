<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本配置</span>
        <el-form :inline="true">
          <el-form-item label="密文名称">
            <el-input v-model="Name"></el-input>
          </el-form-item>
          <el-form-item label="命名空间">
            <el-select v-model="NameSpace">
              <el-option v-for="ns in nslist "
                         :label="ns"
                         :value="ns"/>
            </el-select>
          </el-form-item>
          <el-form-item label="密文类型">
            <el-select v-model="currentCom">
              <el-option v-for="com in comList "
                         :label="com.key"
                         :value="com.value"/>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <Component :is="currentCom" v-bind:Name="Name" v-bind:NameSpace="NameSpace" ></Component>
<!--    <Opaque v-bind:Name="Name" v-bind:NameSpace="NameSpace"></Opaque>-->
  </div>
</template>

<script>
import {getNSList} from '@/api/ns'

export default {
  data() {
    return {
      Name: "",
      NameSpace: "",
      nslist: [],
      comList: [
        {"key": "自定义类型", "value": "Opaque"},
        {"key": "TLS", "value": "TLS"}
      ],
      currentCom: "Opaque",
    }
  },
  created() {
    getNSList().then(rsp => {
      this.nslist = rsp.data
    })

  },
  components: {
    Opaque: () => import('./secret-create-opaque'),
    TLS: () => import('./secret-create-tls')
  }
}

</script>

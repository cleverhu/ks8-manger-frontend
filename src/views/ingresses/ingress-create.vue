<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本配置</span>
      </div>
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input v-model="name" placeholder="ingress名称"></el-input>
        </el-form-item>
        <el-form-item label="命名空间">
          <el-input v-model="namespace" placeholder="如default"></el-input>
        </el-form-item>

      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>规则</span>
      </div>
      <el-form v-model="rules" v-for="(rule,ruleindex) in rules">
        <el-form :inline="true">
          <el-form-item label="域名">
            <el-input v-model="rule.host" placeholder="填写域名"></el-input>
          </el-form-item>
          <el-button type="primary" @click="addPathCfg(ruleindex)">+</el-button>
        </el-form>
        <template v-for="(pathcfg,pathindex) in rule.paths">
          <el-form :inline="true">
            <el-form-item label="Path">
              <el-input v-model="pathcfg.path" placeholder="Path"></el-input>
            </el-form-item>
            <el-form-item label="服务名">
              <el-input v-model="pathcfg.svc_name" placeholder="填写Service Name"></el-input>
            </el-form-item>
            <el-form-item label="端口">
              <el-input v-model="pathcfg.port" placeholder="填写服务端口"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-show="pathindex>0" type="primary" @click="rmPathCfg(ruleindex,pathindex)">-</el-button>
            </el-form-item>
          </el-form>
        </template>

      </el-form>

    </el-card>

    <div style="text-align: center;margin-top: 20px">
      <el-button type="primary" @click="postNew()">保存</el-button>
    </div>
  </div>
</template>
<script>
import {createIngress} from '@/api/ingress'

export default {
  data() {
    return {
      name: "",
      namespace: "",
      rules: [
        {host: "", paths: [{path: "", svc_name: "", port: "80"}]}
      ]
    }
  },
  methods: {
    // 新增path 配置
    addPathCfg(index) {
      this.rules.forEach((rule, ruleindex) => {
        if (ruleindex === index) {
          rule.paths.push({path: "", svc_name: "", port: "80"})
        }
      })
    },
    // 删除path 配置
    rmPathCfg(ruleIndex, pathIndex) {
      this.rules.forEach((rule, ruleindex) => {
        if (ruleindex === ruleIndex) {
          rule.paths.forEach((path, pathindex) => {
            if (pathindex === pathIndex) {
              rule.paths.splice(pathindex, 1)
            }
          })
        }
      })
    },
    postNew() {
      const data = {Name: this.name, Namespace: this.namespace, Rules: this.rules}
      createIngress(data)
        .then((rsp) => {
          console.log(rsp.data)
        })
    }
  }

}

</script>

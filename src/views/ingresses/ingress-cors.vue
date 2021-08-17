<template>
  <div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span @click="show=!show">跨域设置</span>
      </div>
      <div v-show="show">
        <el-form  :model="corsConfig" label-width="80px">
          <el-form-item label="启用">
            <el-switch v-model="corsConfig.enable_cors"></el-switch>
          </el-form-item>
          <el-form-item label="允许来源">
             <el-input style="width:150px" v-model="corsConfig.cors_allow_origin"></el-input>
          </el-form-item>
          <el-form-item label="请求方法">
            <el-input style="width:450px" v-model="corsConfig.cors_allow_methods"></el-input>
          </el-form-item>
          <el-form-item label="允许头">
            <el-input   v-model="corsConfig.cors_allow_headers"></el-input>
          </el-form-item>
          <el-form-item label="暴露头(JS可访问)">
            <el-input   v-model="corsConfig.cors_expose_headers"></el-input>
          </el-form-item>
          <el-form-item label="允许凭据">
            <el-switch v-model="corsConfig.cors_allow_credentials"></el-switch>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        show: false,
        corsConfig:{
          cors_allow_origin: '*',
          enable_cors: false,
          cors_allow_methods: 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
          cors_allow_headers: 'Content-Type,AccessToken,X-CSRF-Token, Authorization, Token',
          cors_expose_headers: '',
          cors_allow_credentials: false
        }
      }
    },
    methods:{
      output(){
        const prefix='nginx.ingress.kubernetes.io'
        let result =''
        if(this.corsConfig.enable_cors){
            for(let key in this.corsConfig){
              let newKey=key.replace('_','-')
              if(this.corsConfig[key]!==''){
                result +=prefix+"/"+newKey+":"+this.corsConfig[key]+';'
              }
            }
            return result
        }
        return ''
      }
    }
  }
</script>

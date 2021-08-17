import request from '@/utils/request'

//获取所有 svc 列表
export function getSecretsList(ns) {
  return request({
    url: '/secrets?namespace=' + ns,
    method: 'get'
  })
}

export function rmSecret(ns,name) {
  return request({
    url: '/secrets?namespace='+ns +'&name='+name,
    method: 'delete',
  })
}

export function createSecret(data) {
  return request({
    url: '/secrets',
    method: 'post',
    data
  })
}

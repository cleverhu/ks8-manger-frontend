import request from '@/utils/request'

export function getIngressList(ns) {
  return request({
    url: '/ingress?namespace=' + ns,
    method: 'get'
  })
}

export function createIngress(data) {
  return request({
    url: '/ingress',
    method: 'post',
    data
  })
}

export function rmIngress(ns,name) {
  return request({
    url: '/ingress?namespace'+ns +'&name='+name,
    method: 'delete',
  })
}


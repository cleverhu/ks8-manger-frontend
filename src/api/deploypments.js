import request from '@/utils/request'

export function getDeploymentsList(ns) {
  return request({
    url: '/deployments?namespace=' + ns,
    method: 'get'
  })
}

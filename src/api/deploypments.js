import request from '@/utils/request'

export function getList() {
  return request({
    url: '/v1/deployments',
    method: 'get'
  })
}

import request from '@/utils/request'

export function getNSList() {
  return request({
    url: '/ns',
    method: 'get'
  })
}

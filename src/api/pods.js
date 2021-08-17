import request from '@/utils/request'

export function getPodsList(ns) {
  return request({
    url: '/pods?namespace=' + ns,
    method: 'get'
  })
}

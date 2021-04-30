import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'performance',
    method: 'get',
    params
  })
}
export function getData(id) {
  return request({
    url: 'performance/' + id,
    method: 'get'
  })
}
export function createPerformance(data) {
  return request({
    url: 'performance',
    method: 'post',
    data
  })
}
export function updatePerformance(id, data) {
  return request({
    url: 'performance/' + id,
    method: 'put',
    data
  })
}
export function destroy(id) {
  return request({
    url: 'performance/' + id,
    method: 'delete'
  })
}
export function exportPerformance() {
  return request({
    url: 'export',
    method: 'get'
  })
}

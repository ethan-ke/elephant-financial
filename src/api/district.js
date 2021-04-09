import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'district',
    method: 'get',
    params
  })
}
export function getData(id) {
  return request({
    url: 'district/' + id,
    method: 'get'
  })
}
export function createDistrict(data) {
  return request({
    url: 'district',
    method: 'post',
    data
  })
}
export function updateDistrict(id, data) {
  return request({
    url: 'district/' + id,
    method: 'put',
    data
  })
}
export function destroy(id) {
  return request({
    url: 'district/' + id,
    method: 'delete'
  })
}

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'staff',
    method: 'get',
    params
  })
}
export function getData(id) {
  return request({
    url: 'staff/' + id,
    method: 'get'
  })
}
export function createStaff(data) {
  return request({
    url: 'staff',
    method: 'post',
    data
  })
}
export function updateStaff(id, data) {
  return request({
    url: 'staff/' + id,
    method: 'put',
    data: JSON.stringify(data)
  })
}
export function destroy(id) {
  return request({
    url: 'staff/' + id,
    method: 'delete'
  })
}

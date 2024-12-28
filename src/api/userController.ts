// @ts-ignore
/* eslint-disable */
import request from '../plugins/request.ts'

/** 新增用户-管理员权限 POST /api/user/add */
export async function addUserUsingPost(body: API.DTO2, options?: { [key: string]: any }) {
  return request<API.ResponseResultBoolean_>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取当前登录用户 GET /api/user/current */
export async function getCurrentUserUsingGet(options?: { [key: string]: any }) {
  return request<API.ResponseResultVO_>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 删除用户-批量删除 DELETE /api/user/delete */
export async function deleteUserUsingDelete(body: number[], options?: { [key: string]: any }) {
  return request<API.ResponseResultBoolean_>('/api/user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据id获取用户信息 GET /api/user/id/${param0} */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ResponseResultUser_>(`/api/user/id/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 查询用户列表 POST /api/user/list */
export async function listUserUsingPost(body: API.DTO1, options?: { [key: string]: any }) {
  return request<API.ResponseResultPageVO_>('/api/user/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户登录 POST /api/user/login */
export async function doLoginUsingPost(body: API.DTO4, options?: { [key: string]: any }) {
  return request<API.ResponseResultVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 退出登录 POST /api/user/logout */
export async function doLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.ResponseResultBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  })
}

/** 用户注册 POST /api/user/register */
export async function registerUserUsingPost(body: API.DTO3, options?: { [key: string]: any }) {
  return request<API.ResponseResultLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改用户 POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseResultBoolean_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

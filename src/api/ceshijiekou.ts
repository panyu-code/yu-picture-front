// @ts-ignore
/* eslint-disable */
import axios from '@/plugins/axios.ts'

/** 测试异常 GET /api/test/error */
export async function errorUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultString_>('/api/test/error', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 测试Hello GET /api/test/hello */
export async function helloUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultString_>('/api/test/hello', {
    method: 'GET',
    ...(options || {}),
  })
}

// @ts-ignore
/* eslint-disable */
import request from '../plugins/request.ts'

/** 删除图片 DELETE /api/picture/delete/${param0} */
export async function deletePictureUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePictureUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ResponseResultBoolean_>(`/api/picture/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 编辑图片（给用户使用） POST /api/picture/edit */
export async function editPictureUsingPost(
  body: API.PictureEditDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseResultBoolean_>('/api/picture/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 根据 id 获取图片详细信息（仅管理员可用） GET /api/picture/get/${param0} */
export async function getPictureByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ResponseResultPicture_>(`/api/picture/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 根据 id 获取图片（封装类） GET /api/picture/get/vo/${param0} */
export async function getPictureVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPictureVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ResponseResultPictureVO_>(`/api/picture/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 分页获取图片列表（仅管理员可用） POST /api/picture/list/page */
export async function listPictureByPageUsingPost(body: API.DTO, options?: { [key: string]: any }) {
  return request<API.ResponseResultPagePicture_>('/api/picture/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页获取图片列表（封装类） POST /api/picture/list/page/vo */
export async function listPictureVoByPageUsingPost(
  body: API.DTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseResultPagePictureVO_>('/api/picture/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取图片标签和分类列表 GET /api/picture/tag_category */
export async function listPictureTagCategoryUsingGet(options?: { [key: string]: any }) {
  return request<API.ResponseResultPictureTagCategoryVO_>('/api/picture/tag_category', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 更新图片（仅管理员可用） POST /api/picture/update */
export async function updatePictureUsingPost(
  body: API.PictureUpdateDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseResultBoolean_>('/api/picture/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 图片上传 POST /api/picture/upload */
export async function uploadPictureUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPictureUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.ResponseResultPictureVO_>('/api/picture/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}
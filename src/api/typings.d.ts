declare namespace API {
  type deletePictureUsingDELETEParams = {
    /** id */
    id: number
  }

  type DTO = {
    category?: string
    /** 当前页号 */
    current?: number
    format?: string
    height?: number
    id?: number
    introduction?: string
    name?: string
    /** 当前页码 */
    pageSize?: number
    scale?: number
    searchText?: string
    size?: number
    tags?: string[]
    userId?: number
    width?: number
  }

  type DTO1 = {
    createTimeRange?: string[]
    /** 当前页号 */
    current?: number
    nickname?: string
    /** 当前页码 */
    pageSize?: number
    username?: string
  }

  type DTO2 = {
    /** 用户名 */
    username?: string
  }

  type DTO3 = {
    /** 密码 */
    password?: string
    /** 确认密码 */
    rePassword?: string
    /** 用户名 */
    username?: string
  }

  type DTO4 = {
    /** 密码 */
    password?: string
    /** 用户名 */
    username?: string
  }

  type getPictureByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getPictureVOByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id: number
  }

  type PagePicture_ = {
    current?: number
    pages?: number
    records?: Picture[]
    size?: number
    total?: number
  }

  type PagePictureVO_ = {
    current?: number
    pages?: number
    records?: PictureVO[]
    size?: number
    total?: number
  }

  type PageVO_ = {
    current?: number
    pages?: number
    records?: VO1[]
    size?: number
    total?: number
  }

  type Picture = {
    category?: string
    createTime?: string
    format?: string
    height?: number
    id?: number
    introduction?: string
    isDelete?: number
    name?: string
    scale?: number
    size?: number
    tags?: string
    updateTime?: string
    url?: string
    userId?: number
    width?: number
  }

  type PictureEditDTO = {
    category?: string
    id?: number
    introduction?: string
    name?: string
    tags?: string[]
  }

  type PictureTagCategoryVO = {
    categoryList?: string[]
    tagList?: string[]
  }

  type PictureUpdateDTO = {
    category?: string
    id?: number
    introduction?: string
    name?: string
    tags?: string[]
  }

  type PictureVO = {
    category?: string
    createTime?: string
    format?: string
    height?: number
    id?: number
    introduction?: string
    name?: string
    scale?: number
    size?: number
    tags?: string[]
    updateTime?: string
    url?: string
    user?: VO
    userId?: number
    width?: number
  }

  type ResponseResultBoolean_ = {
    code?: number
    data?: boolean
    msg?: string
    timestamp?: number
  }

  type ResponseResultLong_ = {
    code?: number
    data?: number
    msg?: string
    timestamp?: number
  }

  type ResponseResultPagePicture_ = {
    code?: number
    data?: PagePicture_
    msg?: string
    timestamp?: number
  }

  type ResponseResultPagePictureVO_ = {
    code?: number
    data?: PagePictureVO_
    msg?: string
    timestamp?: number
  }

  type ResponseResultPageVO_ = {
    code?: number
    data?: PageVO_
    msg?: string
    timestamp?: number
  }

  type ResponseResultPicture_ = {
    code?: number
    data?: Picture
    msg?: string
    timestamp?: number
  }

  type ResponseResultPictureTagCategoryVO_ = {
    code?: number
    data?: PictureTagCategoryVO
    msg?: string
    timestamp?: number
  }

  type ResponseResultPictureVO_ = {
    code?: number
    data?: PictureVO
    msg?: string
    timestamp?: number
  }

  type ResponseResultString_ = {
    code?: number
    data?: string
    msg?: string
    timestamp?: number
  }

  type ResponseResultUser_ = {
    code?: number
    data?: User
    msg?: string
    timestamp?: number
  }

  type ResponseResultVO_ = {
    code?: number
    data?: VO
    msg?: string
    timestamp?: number
  }

  type testDownloadFileUsingGETParams = {
    /** filepath */
    filepath?: string
  }

  type uploadPictureUsingPOSTParams = {
    /** pictureId */
    pictureId?: number
  }

  type User = {
    age?: number
    avatar?: string
    createTime?: string
    email?: string
    gender?: number
    id?: number
    isDelete?: number
    nickname?: string
    password?: string
    phone?: string
    role?: number
    updateTime?: string
    username?: string
  }

  type UserUpdateDTO = {
    age?: number
    avatar?: string
    email?: string
    gender?: number
    id?: number
    nickname?: string
    phone?: string
    username?: string
  }

  type VO = {
    /** 年龄 */
    age?: number
    /** 头像 */
    avatar?: string
    /** 创建时间 */
    createTime?: string
    /** 邮箱 */
    email?: string
    /** 性别 1：男  0：女 */
    gender?: number
    /** 主键 */
    id?: number
    /** 昵称 */
    nickname?: string
    /** 手机号 */
    phone?: string
    /** 角色 1：管理员  2：普通用户 */
    role?: number
    /** 用户名 */
    username?: string
  }

  type VO1 = {
    /** 年龄 */
    age?: number
    /** 头像 */
    avatar?: string
    /** 创建时间 */
    createTime?: string
    /** 邮箱 */
    email?: string
    /** 性别 1：男  0：女 */
    gender?: number
    /** 主键 */
    id?: number
    /** 昵称 */
    nickname?: string
    /** 手机号 */
    phone?: string
    /** 角色 1：管理员  2：普通用户 */
    role?: number
    /** 用户名 */
    username?: string
  }
}

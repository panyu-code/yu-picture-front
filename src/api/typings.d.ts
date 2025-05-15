declare namespace API {
  type deletePictureUsingDELETEParams = {
    /** id */
    id: number
  }

  type DTO = {
    /** id */
    id?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 状态：0-待审核, 1-通过, 2-拒绝 */
    reviewStatus?: number
  }

  type DTO2 = {
    /** 分类 */
    category?: string
    /** 创建时间范围 */
    createTimeRange?: string[]
    /** 当前页号 */
    current?: number
    /** 图片格式 */
    format?: string
    /** 图片高度 */
    height?: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 当前页码 */
    pageSize?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 状态：0-待审核; 1-通过; 2-拒绝 */
    reviewStatus?: number
    /** 审核人 id */
    reviewerId?: number
    /** 图片比例 */
    scale?: number
    /** 搜索词（同时搜名称、简介等） */
    searchText?: string
    /** 文件体积 */
    size?: number
    /** 标签 */
    tags?: string[]
    /** 用户 id */
    userId?: number
    /** 图片宽度 */
    width?: number
  }

  type DTO3 = {
    /** 用户名 */
    username?: string
  }

  type DTO4 = {
    /** 年龄 */
    age?: number
    /** 头像 */
    avatar?: string
    /** 邮箱 */
    email?: string
    /** 性别 */
    gender?: number
    /** 用户id */
    id?: number
    /** 昵称 */
    nickname?: string
    /** 手机号 */
    phone?: string
    /** 用户名 */
    username?: string
  }

  type DTO5 = {
    /** 创建时间范围 */
    createTimeRange?: string[]
    /** 当前页号 */
    current?: number
    /** 昵称 */
    nickname?: string
    /** 当前页码 */
    pageSize?: number
    /** 用户名(账号) */
    username?: string
  }

  type DTO6 = {
    /** 密码 */
    password?: string
    /** 确认密码 */
    rePassword?: string
    /** 用户名 */
    username?: string
  }

  type DTO7 = {
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

  type PageVO_ = {
    current?: number
    pages?: number
    records?: VO[]
    size?: number
    total?: number
  }

  type PageVO2 = {
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
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    scale?: number
    size?: number
    tags?: string
    updateTime?: string
    url?: string
    userId?: number
    username?: string
    width?: number
  }

  type Pinyin__ = {
    /** 分类 */
    category?: string
    /** id */
    id?: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 标签 */
    tags?: string[]
  }

  type Pinyin_2 = {
    /** 分类 */
    category?: string
    /** id */
    id?: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 标签 */
    tags?: string[]
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

  type ResponseResultPageVO_ = {
    code?: number
    data?: PageVO_
    msg?: string
    timestamp?: number
  }

  type ResponseResultPageVO2 = {
    code?: number
    data?: PageVO2
    msg?: string
    timestamp?: number
  }

  type ResponseResultPicture_ = {
    code?: number
    data?: Picture
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

  type ResponseResultVO2 = {
    code?: number
    data?: VO2
    msg?: string
    timestamp?: number
  }

  type ResponseResultVO3 = {
    code?: number
    data?: VO3
    msg?: string
    timestamp?: number
  }

  type uploadPictureByUrlUsingPOSTParams = {
    /** pictureId */
    pictureId?: number
    /** url */
    url?: string
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

  type VO = {
    /** 分类 */
    category?: string
    /** 创建时间 */
    createTime?: string
    /** 图片格式 */
    format?: string
    /** 图片高度 */
    height?: number
    /** id */
    id?: number
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 图片比例 */
    scale?: number
    /** 文件体积 */
    size?: number
    /** 标签 */
    tags?: string[]
    /** 更新时间 */
    updateTime?: string
    /** 图片 url */
    url?: string
    user?: VO3
    /** 用户 id */
    userId?: number
    /** 图片宽度 */
    width?: number
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

  type VO2 = {
    /** 分类列表 */
    categoryList?: string[]
    /** 标签列表 */
    tagList?: string[]
  }

  type VO3 = {
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

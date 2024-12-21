declare namespace API {
  type DTO = {
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

  type getUserByIdUsingGETParams = {
    /** id */
    id: number
  }

  type PageVO_ = {
    current?: number
    pages?: number
    records?: VO[]
    size?: number
    total?: number
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

  type ResponseResultPageVO_ = {
    code?: number
    data?: PageVO_
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
    data?: VO1
    msg?: string
    timestamp?: number
  }

  type ResponseResultVoid_ = {
    code?: number
    msg?: string
    timestamp?: number
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

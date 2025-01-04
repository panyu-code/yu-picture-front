/**
 * 当前登录用户
 */
export const CURRENT_USER = 'user'
export const EXPIRE_TIME = new Date().getTime() + 24 * 60 * 60 * 1000
export const COOKIE_EXPIRES = 'cookieExpires'
export const PIC_REVIEW_STATUS_ENUM = {
  REVIEWING: 0,
  PASS: 1,
  REJECT: 2,
}

export const PIC_REVIEW_STATUS_MAP = {
  0: '待审核',
  1: '通过',
  2: '拒绝',
}

export const PIC_REVIEW_STATUS_OPTIONS = Object.keys(PIC_REVIEW_STATUS_MAP).map((key) => {
  return {
    label: PIC_REVIEW_STATUS_MAP[key],
    value: key,
  }
})

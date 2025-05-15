import { saveAs } from 'file-saver'
import { COOKIE_EXPIRES, CURRENT_USER } from '@/constant'

/**
 * 格式化文件大小
 * @param size
 */
export const formatSize = (size?: number) => {
  if (!size) return '未知'
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  return (size / (1024 * 1024)).toFixed(2) + ' MB'
}

/**
 * 下载图片
 * @param url 图片下载地址
 * @param fileName 要保存为的文件名
 */
export function downloadImage(url?: string, fileName?: string) {
  if (!url) {
    return
  }
  saveAs(url)
}

export const startExpirationChecker = () => {
  const checkExpiration = () => {
    const expiresTime = localStorage.getItem(COOKIE_EXPIRES);
    if (expiresTime) {
      const now = new Date().getTime();
      // 如果当前时间超过了过期时间
      if (now > parseInt(expiresTime)) {
        // 清除所有本地存储的数据
        localStorage.clear();
        // 可以选择重定向到登录页
        window.location.href = 'user/login';
      }
    }
  };
  // 每分钟检查一次
  setInterval(checkExpiration, 60000);
  // 立即执行一次检查
  checkExpiration();
};

// 检查是否登录
export const checkLogin = () => {
  const expiresTime = localStorage.getItem(COOKIE_EXPIRES);
  const userInfo = localStorage.getItem(CURRENT_USER);
  if (!expiresTime || !userInfo) {
    return false;
  }
  const now = new Date().getTime();
  if (now > parseInt(expiresTime)) {
    localStorage.clear();
    return false;
  }
  return true;
};

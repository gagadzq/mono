export const formatDate = (date: Date | null, fmt: string = 'yyyy-MM-dd HH:mm:ss') => {
  if (!date || date == null) return null
  if (typeof date === 'string') {
    return date
  }

  const o: {
    [key: string]: number
  } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    const value = o[k]
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? '' + value : (('00' + value).substr(('' +value).length)))
    }
  }
  return fmt
}
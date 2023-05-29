import { fromMarkdown } from 'mdast-util-from-markdown'
import { traverse } from 'md-ast-traverse'

/**
 * @description 对象转换成 url 的参数形式
 */
export const getUrlParams = (params: {
  [key: string]: string | number | undefined
}):string => {
  let paramStr = '';
  Object.keys(params)
    .forEach((item) => {
      if (paramStr === '') {
        paramStr = `${item}=${params[item]}`;
      } else {
        paramStr = `${paramStr}&${item}=${params[item]}`;
      }
    });
  return paramStr;
}

/**
 * @description 时间转换
 */
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

/**
 * @description markdown 总结
 */
export const markdownSummary = (content: string) => {
  const ast = fromMarkdown(content)
  let resContent = ''
  traverse(ast, {
    text: (path) => {
      resContent += path.node.value
    }
  })
  return resContent
}
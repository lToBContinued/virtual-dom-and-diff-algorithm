import vnode from './vnode.js'

/**
 * @description
 * h函数低配版，也就是调用的时候必须是下面三种之一：
 * 形态①：h('div', {}, '文字')
 * 形态②：h('div', {}, [])
 * 形态③：h('div', {}, h())
 * @param {string} sel 标签名
 * @param {object} data 标签名
 * @param {string | array | function} c 标签名
 */
export default function (sel, data, c) {
  // 检查参数格式
  if (arguments.length !== 3) throw new Error('h函数必须传入三个参数，因为这是低配版')
  // 检查参数c的类型
  if (typeof c === 'string' || typeof c === 'number') {
    // 说明在调用形态①
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 形态②
    let children = []
    c.forEach((item, i) => {
      if (!(typeof item === 'object' && item.hasOwnProperty('sel'))) throw new Error('传入的数组参数中，有项不是h函数')
      // 收集 children
      children.push(c[i])
    })
    // 循环结束，说明 children 收集完毕，此时返回虚拟节点，它有 children 属性
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 形态③
    // 即传入的c是唯一的children
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    if (arguments.length !== 3) throw new Error('传入第三个参数类型不对')
  }
}

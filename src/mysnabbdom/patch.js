import vnode from './vnode.js'
import createElement from './createElement.js'

/**
 * @description
 * @param {object | Element | HTMLElement} oldVnode 老节点
 * @param {object} newVnode 老节点
 */
export default function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数是DOM节点，还是vnode节点
  if (oldVnode['sel'] === '' || oldVnode['sel'] === undefined) {
    // 传入的第一个参数是 DOM 节点，要把它包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode['sel'] === newVnode['sel'] && oldVnode['data']['key'] === newVnode['data']['key']) {
    // 新老节点是同一个节点的情况下：
    console.log('>>>>> file: patch.js ~ method: patch <<<<<\n', '是同一个节点')
    // 判断新旧vnode是否是同一个对象
    if (oldVnode === newVnode) return
    // 判断新vnode有没有text属性
    if ((newVnode.text !== undefined && newVnode.children === undefined) || newVnode.children.length === 0) {
      // 新vnode有text属性（新vnode有children）
      if (oldVnode.text !== newVnode.text) {
        // 新的vnode中的text和老的vnode中的text不同，直接让新的text写入老的elm即可
        // 如果老的elm中是children，那么也会立即消失掉
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      // 新vnode没有text属性（新vnode有children）
      if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
        // 老vnode有children，此时是最复杂的情况
      } else {
        // 老vnode没有children，新vnode有children
        // 清空老的节点的内容
        oldVnode.elm.innerText = ''
        // 遍历新vnode的子节点，循环上树
        newVnode.children.forEach((vnode) => {
          let dom = createElement(vnode)
          oldVnode.elm.appendChild(dom)
        })
      }
    }
  } else {
    // 新老节点不是同一个节点的情况下：
    let newVnodeElm = createElement(newVnode)
    // 插入到老节点之前
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}

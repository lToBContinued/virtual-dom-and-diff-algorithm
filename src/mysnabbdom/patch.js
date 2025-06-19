import vnode from './vnode.js'
import createElement from './createElement.js'
import patchVNode from './patchVNode'

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
    patchVNode(oldVnode, newVnode)
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

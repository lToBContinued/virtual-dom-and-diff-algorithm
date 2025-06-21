import createElement from './createElement.js'
import updateChildren from './updateChildren.js'

/**
 * @description 对比同一个虚拟节点下的子节点（text、h()、或是子节点数组）并更新旧节点内容
 * @param {object} newVnode 新的虚拟节点
 * @param {object} oldVnode 老的虚拟节点
 */
export default function patchVNode(oldVnode, newVnode) {
  // 新老节点是同一个节点的情况下：
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
      // 老vnode有children，新vnode也有children，此时是最复杂的情况
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 老vnode没有children，新vnode有children
      // 清空老的节点的内容
      oldVnode.elm.innerText = ''
      // 遍历新vnode的子节点，循环上树
      newVnode.children.forEach((chNode) => {
        let dom = createElement(chNode)
        oldVnode.elm.appendChild(dom)
      })
    }
  }
}

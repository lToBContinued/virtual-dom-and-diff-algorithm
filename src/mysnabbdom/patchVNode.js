import createElement from './createElement'

/**
 * @description
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
      // 老vnode有children，此时是最复杂的情况
      let un = 0 // 所有未处理节点的开头
      newVnode.children.forEach((newChNode) => {
        // 取出一个新vnode的子节点后，再次遍历oldVnode的children
        // 看有没有老的子节点中的vnode和新的这个子节点完全相同（key和sel都相同）
        let isExit = false
        oldVnode.children.forEach((oldChNode) => {
          if (oldChNode.data.key === newChNode.data.key && oldChNode.sel === newChNode.sel) {
            isExit = true
          }
        })
        if (!isExit) {
          console.log('>>>>> file: patchVNode.js ~ method:  <<<<<\n', un)
          let dom = createElement(newChNode)
          newChNode.elm = dom
          if (un < oldVnode.children.length) {
            oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
          } else {
            oldVnode.elm.appendChild(dom)
          }
        } else {
          // 让处理的节点指针下移
          un++
        }
      })
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

import patchVNode from './patchVNode.js'
import createElement from './createElement.js'

/**
 * @description 判断两个虚拟节点是否为相同节点
 * @param {object} vnode1
 * @param {object} vnode2
 * @return {boolean} true-是 false-不是
 */
function checkSameVnode(vnode1, vnode2) {
  return vnode1.sel === vnode2.sel && vnode1.key === vnode2.key
}

/**
 * @description 更新子节点
 * @param {HTMLElement} parentElm 旧父节点
 * @param {Array<object>} oldCh 旧子节点
 * @param {Array<object>} newCh 新子节点
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0 // 旧前
  let newStartIdx = 0 // 旧前
  let oldEndIdx = oldCh.length - 1 // 旧后
  let newEndIdx = newCh.length - 1 // 新后
  let oldStartVnode = oldCh[0] // 旧前节点
  let oldEndVnode = oldCh[oldEndIdx] // 旧后节点
  let newStartVnode = newCh[0] // 新前节点
  let newEndVnode = newCh[newEndIdx] // 新后节点
  let keyMap = null
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先略过已经加undefined标记的节点
    if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前和旧前
      console.log('>>>>> file: updateChildren.js ~ method: updateChildren <<<<<\n', '①命中')
      patchVNode(oldStartVnode, newStartVnode) // 更新旧节点内容
      oldStartVnode = oldCh[++oldStartIdx] // 旧前指针后移
      newStartVnode = newCh[++newStartIdx] // 新前指针后移
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后
      console.log('>>>>> file: updateChildren.js ~ method: updateChildren <<<<<\n', '②命中')
      oldEndVnode = oldCh[--oldEndIdx] // 旧后指针前移
      newEndVnode = newCh[--newEndIdx] // 新后指针前移
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前
      // 此种情况命中了，要让旧前指向的节点，移动到旧后之后
      console.log('>>>>> file: updateChildren.js ~ method: updateChildren <<<<<\n', '③命中')
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      // 新前与旧后
      // 此种情况命中了，要让旧后指向的节点，移动到旧前之前
      console.log('>>>>> file: updateChildren.js ~ method: updateChildren <<<<<\n', '④命中')
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 四种都没有命中
      if (!keyMap) {
        keyMap = {}
        // 创建keyMap映射对象
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key
          if (key !== undefined) {
            keyMap[key] = i
          }
        }
      }
      // 寻找当前这项（newStartIdx）这项在keyMap中的映射的位置序号
      const idxInOld = keyMap[newStartVnode.key]
      if (idxInOld === undefined) {
        // 如果idxInOld是undefined，就说明它是一个全新的项，此时插入就可以了
        // 被加入的项（就是被newStartVnode这项）现在不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else {
        // 如果不是undefined，表示这不是一个新的项，而是要移动
        const elmToMove = oldCh[idxInOld]
        patchVNode(elmToMove, newStartVnode)
        // 把这项设置为undefined，表示这项已经处理完了
        oldCh[idxInOld] = undefined
        // 移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  // 继续查看有没有剩余节点
  if (newStartIdx <= newEndIdx) {
    // 循环结束了，新前还是比新后小（新节点中还有节点没有处理完），新增新前指针和新后指针之间（包括指针所指）的节点的情况
    // 遍历newCh，添加到老的没有处理的之前
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx < oldEndIdx) {
    // 循环结束了，旧前还是比旧后小（旧节点中还有节点没有处理完），删除旧前指针和旧后指针之间（包括指针所指）的节点的情况
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}

/**
 * @description 真正创建节点。将vnode创建为dom，但是是孤儿节点，不进行插入
 * @param {object} vnode 虚拟节点
 */
export default function createElement(vnode) {
  // 创建一个DOM节点，这个节点现在还是孤儿节点
  let domNode = document.createElement(vnode['sel'])
  // 判断有子节点还是有文本
  if (vnode['text'] !== '' && (vnode['children'] === undefined || vnode['children'].length === 0)) {
    // 内部是文字
    domNode.innerText = vnode['text']
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 当子节点是数组的时候，需要递归创建数组中每一个子节点的dom
    vnode.children.forEach((ch) => {
      // 创建出当前这个children的DOM，一旦调用createElement意味着：
      // 创建出DOM了，并且它的elm属性指向了创建出的DOM，但是还没有上树，是一个孤儿节点
      const chDom = createElement(ch)
      // 上树
      domNode.appendChild(chDom)
    })
  }
  // 补充elm属性
  vnode.elm = domNode
  // elm属性是一个纯dom对象
  return vnode.elm
}

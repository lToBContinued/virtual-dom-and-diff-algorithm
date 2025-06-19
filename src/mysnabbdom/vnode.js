/**
 * @description 将传入的参数拼成一个对象
 * @param {string | undefined} sel 标签名
 * @param {any | undefined} data 数据
 * @param {array | undefined} children 子节点
 * @param {string | undefined} text 文本
 * @param {Element | Text | undefined} elm 元素
 * @returns {object} 虚拟节点
 */
export default function (sel, data, children, text, elm) {
  return { sel, data, children, text, elm }
}

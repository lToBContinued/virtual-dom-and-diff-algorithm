import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

let myVnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
])
// 第一次上树
patch(container, myVnode1)
// 新节点
let myVnode2 = h('ul', {}, [
  h('li', { key: 'E' }, 'E'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'A' }, 'A'),
])
btn.onclick = () => {
  patch(myVnode1, myVnode2)
}

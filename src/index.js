import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

let myVnode1 = h('section', {}, '我是老DOM，我就是一个破文字，我没有子节点')
// 第一次上树
patch(container, myVnode1)
// 新节点
let myVnode2 = h('section', {}, [h('p', {}, 'A'), h('p', {}, 'B'), h('p', {}, 'C')])
btn.onclick = () => {
  patch(myVnode1, myVnode2)
}

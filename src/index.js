import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const container = document.getElementById('container')
let myVnode1 = h('div', { key: 'A' }, [h('p', {}, 'A'), h('p', {}, 'B'), h('p', {}, 'C'), h('p', {}, 'D')])
// myVnode1 = h('h1', { key: 'A' }, '你好')
console.log('>>>>> file: index.js ~ method:  <<<<<\n', myVnode1)
patch(container, myVnode1)

let myVnode2 = h('section', {}, [h('h1', {}, '我是新的h1'), h('h1', {}, '我是新的h2')])
const btn = document.getElementById('btn')
btn.onclick = () => {
  patch(myVnode1, myVnode2)
}

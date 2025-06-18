import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const container = document.getElementById('container')
const myVnode1 = h('h1', { key: 'A' }, '你好')
console.log('>>>>> file: index.js ~ method:  <<<<<\n', myVnode1)
patch(container, myVnode1)

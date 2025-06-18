import h from './mysnabbdom/h.js'

const myVnode1 = h('div', {}, [
  h('p', {}, '哈哈'),
  h('p', {}, '嘻嘻'),
  h('p', {}, '呵呵'),
  h('p', {}, h('span', {}, 'A')),
])
const myVnode2 = h('ul', {}, [
  h('li', {}, '苹果'),
  h('li', {}, '西瓜'),
  h('li', {}, [h('div', {}, [h('div', {}, '哈哈'), h('div', {}, '嘻嘻')])]),
  h('li', {}, h('p', {}, '火龙果')),
])
console.log('>>>>> file: index.js ~ method:  <<<<<\n', myVnode2)

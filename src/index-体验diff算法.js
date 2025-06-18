import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import { h } from 'snabbdom/h' // helper function for creating vnodes

// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])
const container = document.getElementById('container')
const btn = document.getElementById('btn')
const vnode1 = h('div', {}, [
  h('p', { key: 'A' }, 'A'),
  h('p', { key: 'B' }, 'B'),
  h('p', { key: 'C' }, 'C'),
  h('p', { key: 'D' }, 'D'),
])
patch(container, vnode1)

const vnode2 = h('div', {}, [
  h('p', { key: 'B' }, 'B'),
  h('p', { key: 'A' }, 'A'),
  h('p', { key: 'D' }, 'D'),
  h('p', { key: 'C' }, 'C'),
])
// 点击按钮时，将vnode1变为vnode2
btn.onclick = () => {
  patch(vnode1, vnode2)
}

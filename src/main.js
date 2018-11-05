import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource)


Vue.component('test-component', {
    template: '#test--component',
    props: ['testprop']
})

var list = {
    items: [
        {
            title: 'This is a title',
            status: true
        }, {
            title: 'Here is another',
            status: false
        }
    ]
}

new Vue({
  el: '#app',
  render: h => h(App)
})

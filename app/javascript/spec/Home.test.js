import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '../src/components/Home.vue'
import BootstrapVue from "bootstrap-vue"

describe('Home.vue', () => {
  test('test attribute and class', () => {
    const localVue = createLocalVue();
    localVue.use(BootstrapVue);

    const wrapper = shallowMount(Home, {
     localVue
    });
    const dom = wrapper.find('.card')

    console.log(dom.html())
    expect(dom.html()).toBe(
`<div class="card">
  <div style="text-align: center;">
    publish posts count<br>
    <h1 style="display: inline-block;"></h1>
  </div>
</div>`)
  })
})

// describe('Just try if it works', () => {
//   test('the very first test', () => {
//     console.log('Done')
//   })
// })

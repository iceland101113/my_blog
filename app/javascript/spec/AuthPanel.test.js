import { mount, shallowMount } from '@vue/test-utils'
import AuthPanel from '../src/components/AuthPanel.vue'

describe('AuthPanel.vue', () => {
  test('test attribute and class', () => {
    const wrapper = shallowMount(AuthPanel);
    expect(wrapper.html()).toBe(
`<div class="auth-panel"><br> <input type="email" name="email" id="email" placeholder="Email Address"> <br> <input type="password" name="password" id="password" placeholder="Password"> <button type="button" class="btn btn-secondary">Sign Up</button></div>`)
  })
})

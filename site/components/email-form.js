var html = require('choo/html')

module.exports = form

function form (state) {
  return html`
    <form 
      method="post" 
      action="https://www.getdrip.com/forms/802069488/submissions" 
      class="flex flex-column flex-row-l" 
      data-drip-embedded-form="802069488">
      <input type="email" 
        placeholder="What's your email?" 
        id="drip-email" 
        name="fields[email]" 
        class="b--gray mr2 mv2 pa2 flex-auto br0 b--solid" 
        value=""/>
      <input type="submit" 
        value=${state.cta}
        name="submit" 
        class=" ma2 pv2 ph3 bw0 bg-dark-gray white pointer bw1 ba b--dark-gray  br0" 
        data-drip-attribute="sign-up-button"/>
    </form>`
}

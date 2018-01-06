var html = require('choo/html')

module.exports = form

function form (state) {
  var classes = themes(state.theme)
  return html`
    <form 
      method="post" 
      action="https://www.getdrip.com/forms/802069488/submissions" 
      class="flex ${state.orientation || 'flex-row'}" 
      data-drip-embedded-form="802069488">
      <input type="email" 
        placeholder="What's your email?" 
        id="drip-email" 
        name="fields[email]" 
        class="mh2 mv2 pa2 flex-auto br0 b--solid ${classes.input}"  
        value=""/>
      <input type="submit" 
        value=${state.cta}
        name="submit" 
        class="ma2 pv2 ph3 bw0 pointer bw1 ba br0 grow ${classes.button}" 
        data-drip-attribute="sign-up-button"/>
    </form>`
}

function themes (theme = 'dark') {
  return {
    light: {
      input: 'b--white',
      button: 'bg-white dark-gray b--white'
    },
    dark: {
      input: 'b--gray',
      button: 'bg-dark-gray white b--dark-gray'
    }
  }[theme]
}

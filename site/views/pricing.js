var html = require('choo/html')
var ov = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')
var emailForm = require('../components/email-form')

module.exports = wrapper(pricing, { footer: false })

function pricing (state, emit) {
  return html`
    <div>
      <div class="pa3 pa4-ns white bg--black min-vh-100 flex justify-center">
        <div class="w10 flex flex-column justify-start items-center mb5 pb5">
          <div class="fw5 f2 mb2 tac">${state.page.subtitle}</div>
          <div class="mv3 w-100 w-80-m w-60-l tac">
            ${format(state.page.text)}
          </div>
          ${emailForm({
            cta: state.page.cta,
            orientation: 'flex-column',
            theme: 'light'
          })}
     
          ${social(state, emit)}
        </div>
      </div>
    </div>`
}

function social (state, emit) {
  var networks = ov(state.content.networks || {})

  return html`
    <div class="tac mt5">
      <div class="mv2">
        ${networks.map(icon)}
      </div>
      © 2017 Vibedrive
    </div>`

  function icon (state) {
    return html`
      <a href=${state.link} class="no-underline" target="_new">
        <img src="/${state.icon}-light.svg" class="w2 h2 mh2" title=${state.name} />
      </a>
    `
  }
}

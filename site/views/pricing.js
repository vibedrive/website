var html = require('choo/html')
var ov = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')
var emailForm = require('../components/email-form')

module.exports = wrapper(pricing, { footer: false })

function pricing (state, emit) {
  return html`
    <div>
      <div class="bg--black white vh-100 x p1 justify-center items-start">
        <div class="w10 flex flex-column justify-start items-center mb5 pb5">
          <div class="fw5 f2 mb4 tac">${state.page.subtitle}</div>
          <div class="mv3 w-60 tac">
            ${format(state.page.text)}
          </div>
          <div class="w-30 mt2 mb5">
            ${emailForm({
              cta: state.page.cta,
              orientation: 'flex-column',
              theme: 'light'
            })}
          </div>

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

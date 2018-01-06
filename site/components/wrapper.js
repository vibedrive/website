var html = require('choo/html')
var ov = require('object-values')
var path = require('path')
var format = require('./format')
var emailForm = require('./email-form')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <main>
        <div class="bg--black c12 p1 x xjc">
          <div class="w10 x xjb">
            ${logo(state)}
            ${navigation({
              active: state.page ? state.page.path : '',
              links: state.content ? state.content.children : { }
            })}
          </div>
        </div>
        ${view(state, emit)}
        ${footer(state, emit)}
      </main>
    `
  }
}

function logo (state, emit) {
  return html` 
    <a href="/"><img class="" src=${state.content.image} style="width: 10rem"></img></a>
  `
}

function navigation (state, emit) {
  var active = state.active || ''
  var links = ov(state.links) || [ ]

  return html`
    <div class="x xjc ffmono">
      ${links.map(link)}
    </div>
  `

  function link (link) {
    var activeClass = isActive(link.dirname) ? 'fwb' : ''
    return html`
      <div class="p0-5 ${activeClass}">
        <a href="${link.url}">${link.title || link.dirname}</a>
      </div>
    `
  }

  function isActive (pathLink) {
    return active
      .split(path.sep)
      .filter(str => str)[0] ===
      path.basename(pathLink)
  }
}

function footer (state, emit) {
  return html`
    <div class="c12 p2 tcgrey x xjc item-start">
      <div class="w10 x xjb pt1 bt1">
        <div class="w-60 gray">
          ${emailForm({ cta: state.content.subscribecta })}
          ${format(state.content.subscribetext)}
        </div>
        ${social(state, emit)}
      </div>
    </div>
  `
}

function social (state, emit) {
  var networks = Object.values(state.content.networks || {})

  return html`
    <div class="gray">
      <div>
        ${networks.map(icon)}
      </div>
      © 2017 Vibedrive Labs
    </div>`

  function icon (state) {
    return html`
      <a href=${state.link} target="_new">
        <img src=${state.icon} class="w2 h2 mh1" title=${state.name} />
      </a>
    `
  }
}

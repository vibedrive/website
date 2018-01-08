var html = require('choo/html')
var ov = require('object-values')
var path = require('path')
var format = require('./format')
var social = require('./social')
var emailForm = require('./email-form')

module.exports = wrapper

function wrapper (view, opts = {}) {
  return function (state, emit) {
    return html`
      <main class="">
        <nav id="navbar" class="pa3 pa4-ns bg--black flex justify-center ">
          <div class="w10 flex justify-between">
            ${logo(state)}
            ${navigation({
              active: state.page ? state.page.path : '',
              links: state.content ? state.content.children : { }
            })}
          </div>
        </nav>
        ${view(state, emit)}
        ${opts.footer === false ? '' : footer(state, emit)}
      </main>
    `
  }
}

function logo (state, emit) {
  return html` 
    <a href="/">
      <img class="" src="/${state.content.image}" style="width: 10rem" />    
    </a>
  `
}

function navigation (state, emit) {
  var active = state.active || ''
  var links = ov(state.links) || [ ]

  return html`
    <div class="flex-ns dn justify-center ">
      ${links.map(link)}
      <div class="pt0 ml3">
       <a class="mv1 pv2 ph3 bg-white black dib no-underline" href="https://my.vibedrive.co">Login</a>
      </div>
    </div>
  `

  function link (link) {
    var activeClass = isActive(link.dirname) ? 'fwb' : ''
    return html`
      <div class="pt2 mt1 mh3 ${activeClass}">
        <a class="no-underline" href="${link.url}">${link.title || link.dirname}</a>
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
    <div class="pa3 pa4-ns flex justify-center">
      <div class="w10">
        <div class="w-100 w-60-l pr4-l fl-ns gray">
          ${emailForm({ cta: state.content.subscribecta })}
          ${format(state.content.subscribetext)}
        </div>
        <div class="w-100 w-40-l pl4-l fl-ns tl tr-l">
          ${social(state, emit)}
        </div>      
      </div>  
    </div>
  `
}

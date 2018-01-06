var html = require('choo/html')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(home)

function home (state, emit) {
  return html`
    <div>
      <div class="bg--black white x p1 xjc">
        <div class="w10">
          <div class="fw5 f2 mb4 w-50">${state.page.subtitle}</div>
          <div class="x xac mv3">
            <div class="xa w-40 pr5">${format(state.page.text)}</div>
            <div class="xa w-60 pl5">
              ${format(state.page.text2)}
              <a href="/pricing" class="mv3 bg-white black pv2 ph3 dib grow no-underline">
                ${state.page.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="x xw p1 mt2 justify-center">
        <div class="w10 pv3">

          <p class="fw5 f2 mb4">${state.page.text3}</p>

          <div class="flex flex-row">
            <div class="w-50 pr4">${format(state.page.text4)}</div>
            <div class="w-50 pl4">
              <ul class="list">
                <li class="flex flex-row mv3 items-center">
                  <div class="w2 h2 bg-light-gray mr2"></div>
                  <div>OS X / macOS 10.8 and higher</div>
                </li>
                <li class="flex flex-row mv3 items-center">
                  <div class="w2 h2 bg-light-gray mr2"></div>
                  <div>Microsoft Windows 7 and higher</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`
}

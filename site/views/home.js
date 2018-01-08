var html = require('choo/html')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(home)

function home (state, emit) {
  return html`
    <div>
      <div class="pa3 pa4-ns bg--black white flex justify-center">
        <div class="w10">
          <div class="fw5 f2 mb4 mw6">
            ${format(state.page.subtitle)}
          </div>
          <div class="xa w-100 w-50-m fl-ns w-40-l pr5-l pr4-m ">
            ${format(state.page.text)}
          </div>
          <div class="xa w-100 w-50-m fl-ns w-60-l pl5-l pl4-m">
            ${format(state.page.text2)}
            <a href="/pricing" class="mv3 bg-white black pv2 ph3 dib grow no-underline">
              ${state.page.cta}
            </a>
          </div>
        </div>
      </div>
      <div class="pa3 pa4-ns flex xw mt2 justify-center">
        <div class="w10 pv3">

          <h2 class="f2 fw5 mb4">
            ${state.page.text3}
          </h2>
          <div class="w-100 w-50-ns pr3-m pr4-l fl-ns">
            ${format(state.page.text4)}
          </div>
          <div class="w-100 w-50-ns pl3-m pl4-l fl-ns">
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
    </div>`
}

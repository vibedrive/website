var html = require('choo/html')

module.exports = social

function social (state, emit) {
  var networks = Object.values(state.content.networks || {})

  return html`
    <div class="gray">
      <div>
        ${networks.map(icon)}
      </div>
      © 2017 Vibedrive
    </div>`

  function icon (state) {
    return html`
      <a href=${state.link} target="_new">
        <img src="${state.icon}.svg" class="w2 h2 mh1" title=${state.name} />
      </a>
    `
  }
}

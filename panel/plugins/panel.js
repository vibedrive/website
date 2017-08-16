var xhr = require('xhr')
var xtend = require('xtend')
var path = require('path')

module.exports = panel

function panel (state, emitter) {
  state.panel = {
    changes: { },
    loading: false
  }

  emitter.on(state.events.PANEL_UPDATE, onUpdate)
  emitter.on(state.events.PANEL_SAVE, onSave)
  emitter.on(state.events.PANEL_CANCEL, onCancel)
  emitter.on(state.events.PANEL_LOADING, onLoading)
  emitter.on(state.events.PANEL_REMOVE, onRemove)
  emitter.on(state.events.PANEL_PAGE_ADD, onPageAdd)
  emitter.on(state.events.PANEL_FILE_ADD, onFileAdd)

  function onUpdate (data) {
    if (!data || !data.path) return

    state.panel.changes[data.path] = xtend(
      state.panel.changes[data.path],
      data.data
    )

    emitter.emit(state.events.RENDER)
  }

  function onSave (data) {
    // temp have to past page state until we can query
    // path against state.content obj
    if (!data.page || !data.path || !data.file) {
      alert('hold on')
    }

    emitter.emit(state.events.PANEL_LOADING, { loading: true })
    emitter.emit(state.events.RENDER)

    xhr.put({
      uri: 'http://localhost:8082/update',
      body: xtend(data),
      json: true
    }, function (err, resp, body) {
      if (err) alert(err.message)
      emitter.emit(state.events.PANEL_LOADING, { loading: false })
      emitter.emit(state.events.RENDER)
    })    
  }

  function onCancel (data) {
    if (data.path) {
      delete state.panel.changes[data.path]
      emitter.emit(state.events.RENDER)
    }
  }

  function onLoading (data) {
    if (data.loading !== undefined) {
      state.panel.loading = data.loading
    }
  }

  function onPageAdd (data) {
    if (!data.view || !data.path || !data.title) {
      return alert('Missing data')
    }

    emitter.emit(state.events.PANEL_LOADING, { loading: true })
    emitter.emit(state.events.RENDER)

    xhr.put({
      uri: 'http://localhost:8082/add',
      body: data,
      json: true
    }, function (err, resp, body) {
      if (err) {
        alert(err.message)
      } else {
        emitter.emit(state.events.REPLACESTATE, data.path)
      }
      
      emitter.emit(state.events.PANEL_LOADING, { loading: false })
      emitter.emit(state.events.RENDER)
    })  
  }

  function onRemove (data) {
    if (!data.path) {
      return alert('Missing data')
    }

    emitter.emit(state.events.PANEL_LOADING, { loading: true })
    emitter.emit(state.events.RENDER)

    xhr.put({
      uri: 'http://localhost:8082/remove',
      body: data,
      json: true
    }, function (err, resp, body) {
      if (err) {
        alert(err.message)
      } else {
        emitter.emit(state.events.REPLACESTATE, path.join(data.path, '../'))
      }
      
      emitter.emit(state.events.PANEL_LOADING, { loading: false })
      emitter.emit(state.events.RENDER)
    })  
  }

  function onFileAdd (data) {
    if (!data.path || !data.filename || !data.result) {
      return alert('Missing data')
    }

    emitter.emit(state.events.PANEL_LOADING, { loading: true })
    emitter.emit(state.events.RENDER)

    xhr.put({
      uri: 'http://localhost:8082/add-file',
      body: data,
      json: true
    }, function (err, resp, body) {
      if (err) {
        alert(err.message)
      } else {
        emitter.emit(state.events.REPLACESTATE, '?')
      }
      
      emitter.emit(state.events.PANEL_LOADING, { loading: false })
      emitter.emit(state.events.RENDER)
    })  
  }
}

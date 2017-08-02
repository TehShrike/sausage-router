var EventEmitter = require('eventemitter3')

module.exports = function SausageLocation(root) {
	var emitter = new EventEmitter()
	var last = ''
	root = root || ''

	window.addEventListener('popstate', function() {
		if (last !== emitter.get()) {
			last = emitter.get()
			emitter.emit('hashchange')
		}
	})

	function stateChange(functionName, newPath) {
		if (last !== newPath) {
			history[functionName]({}, '', joinPath(root, newPath))
			last = newPath
			emitter.emit('hashchange')
		}
	}

	emitter.go = function(newPath) {
		stateChange('pushState', newPath)
	}

	emitter.replace = function(newPath) {
		stateChange('replaceState', newPath)
	}
	emitter.get = get

	return emitter
}

function get() {
	return decodeURI(window.location.pathname) + window.location.search
}

function joinPath(first, second) {
	var slashlessFirst = trimSlashes(first)
	var slashlessSecond = trimSlashes(second)

	if (slashlessFirst && slashlessSecond) {
		return '/' + slashlessFirst + '/' + slashlessSecond
	} else if (slashlessFirst) {
		return '/' + slashlessFirst
	} else {
		return '/' + slashlessSecond
	}
}

function trimSlashes(pathChunk) {
	return pathChunk.replace(/^\/|\/$/g, '')
}

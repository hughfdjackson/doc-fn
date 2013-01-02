var trim = function(s){ return s.trim() }

var getDoc = function(fn) {
  var xs = fn.toString().match(/\/{3}(.+)/g)
  return xs?  xs.map(trim).join('\n').replace(/^\/{3}\s?/mg, '')
  :           'No documentation provided.'
}

var doc = function(fn){
    fn.doc = getDoc(fn)
    return fn
}

module.exports = doc

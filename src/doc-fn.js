var doccomment = /^function\s+[^{]+{((?:\s*\/{3}.+)+)/
var docprefix  = /^\s*\/{3}\s?/gm

var getDoc = function(fn) {
  var match = fn.toString().match(doccomment)
  return match?  match[1].replace(docprefix, '')
  :              'No documentation provided.'
}

var doc = function(fn){
    fn.doc = getDoc(fn)
    return fn
}

module.exports = doc

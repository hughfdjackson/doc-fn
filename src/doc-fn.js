var doc_comment = /^function\s+[^{]+{((?:\s*\/{3}.+)+)/
var doc_surroundings  = /(^\s*\/{3}\s?)|(\s+$)/gm

var getDoc = function(fn) {
  var match = fn.toString().match(doc_comment)
  return match?  match[1].replace(doc_surroundings, '')
  :              'No documentation provided.'
}

var doc = function(fn){
    fn.doc = getDoc(fn)
    return fn
}

module.exports = doc

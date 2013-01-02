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

doc.merge = function(o){
    if ( ! Object.defineProperty ) return o
    Object.defineProperty(o, 'doc', { get: function(){ return getDoc(this) } })
    return o
}

module.exports = doc

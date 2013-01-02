var doc_comment = /^function\s+[^{]+{((?:\s*\/{3}.+)+)/
var doc_surroundings  = /(^\s*\/{3}\s?)|(\s+$)/gm

var getDoc = function(fn) {
  var match = fn.toString().match(doc_comment)
  return match?  match[1].replace(doc_surroundings, '')
              :  null
}

var doc = function(fn){
    /// signature: function -> function
    /// mutates a function to add a doc property, which includes all comments starting with `///`
    /// at the top of a function
    fn.doc = getDoc(fn)
    return fn
}
doc(doc)

doc.merge = doc(function(o){
    /// signature: object -> object
    /// adds a getter to put the .doc property on all inhereting functions
    /// example: doc.merge(Function.prototype) // adds .doc to all functions
    if ( ! Object.defineProperty ) return o
    Object.defineProperty(o, 'doc', { get: function(){ return getDoc(this) } })
    return o
})


module.exports = doc

var doc_comment = /^function\s+[^{]+{((?:\s*\/{3}.+)+)/
var doc_surroundings  = /(^\s*\/{3}\s?)|(\s+$)/gm
var section = /.+:.+/g
var sectionGroups = /(.+):(.+)/

var getDoc = function(fn) {
  var match = fn.toString().match(doc_comment)
  return match?  match[1].replace(doc_surroundings, '')
              :  null
}

var getDocs = function(docStr){
    var sections = docStr.match(section)
    if ( !sections ) return {}
    return sections.reduce(function(docs, section){
        var s = sectionGroups.exec(section)
        docs[s[1].trim()] = s[2].trim()
        return docs
    }, {})
}

var doc = function(fn){
    /// signature: function -> function
    /// mutates a function to add a doc property, which includes all comments starting with `///`
    /// at the top of a function.
    /// also adds a .docs property, containing a map of 'section names' to 'vals', for every line
    /// with the format '/// section name: value'
    fn.doc = getDoc(fn)
    if ( fn.doc ) fn.docs = getDocs(fn.doc)
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

var a = require('assert'),
    doc = require('../')

suite('doc')

test('dogfooding', function(){
    a.notEqual(doc.doc, null)
})

test('it should extract the /// comments and assign it to the .doc property - and mutate!', function(){
    var inc = function(a){
        /// foo 
        /// bar    
        return a + 1
    }
     
    doc(inc)
    a.equal(inc.doc, 'foo\nbar')
})

test('it should only consider /// comments at the beginning of the function body.', function() {
    var k = doc(function(a) {
        /// The constant function.
        function _K() {
            /// Returns a.
            return a
        }
    })

    a.equal(k.doc, 'The constant function.')
})


test('.doc should be null if there are no ///s', function(){
    var inc = doc(function(a){
        return a + 1
    })

    a.equal(inc.doc, null)
})

test('.docs holds normal docs in a body, and foo: bar in .foo', function(){
    var inc = doc(function(a){
        /// signature: a -> a
        /// description: increments a number.
        return a + 1
    })

    a.equal(inc.docs.signature, 'a -> a')
    a.equal(inc.docs.description, 'increments a number.')
    a.equal(inc.doc, 'signature: a -> a\ndescription: increments a number.')
})

suite('merge')

test('dogfooding', function(){
    a.notEqual(doc.merge.doc, null)
})

test('it should set a getter', function(){
    if ( ! Object.defineProperty ) return
    
    var fn = function(){
        /// hey there sorella, what's it like in lispycity
    }

    doc.merge(fn)
   
    a.equal(fn.doc, "hey there sorella, what's it like in lispycity")
})


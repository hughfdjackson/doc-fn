var a = require('assert'),
    doc = require('../')

suite('doc')

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
    var k = function(a) {
        /// The constant function.
        function _K() {
            /// Returns a.
            return a
        }
    }
    doc(k)
    a.equal(k.doc, 'The constant function.')
})


test('it should return "No documentation provided." if no triple-comments', function(){
    var inc = function(a){
        return a + 1
    }

    doc(inc)
    a.equal(inc.doc, "No documentation provided.")
})

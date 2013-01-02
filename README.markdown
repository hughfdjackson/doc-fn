# doc-fn

Adds 'docstring' style comments to functions, accessible programmatically.

## Why

Firing up a REPL and finding documentation at your fingertips is an awesome experience in languages like python or clojure.  Let's get some goodness into javascript

## Example

```javascript
var doc = require('doc-fn')

var inc = doc(function(a){
    /// signature: number -> number
    /// takes a number, and returns that number + 1
    return a + 1
})

console.log(inc.doc)
/* console output: 
    signature: number -> number
    takes a number, and returns that number + 1
*/
```

## API 

#### doc (fn) -> fn

mutates a function to add a doc property, which includes all comments starting with `///` at the top of a function.
Also adds a .docs property, containing a map of 'section names' to 'vals', for every line with the format '/// section name: value'.

```javascript

var inc = doc(function(){
    /// signature: number -> number
    /// takes a number, and returns that number + 1
    return a + 1
})

console.log(inc.doc)
/* console output: 
    signature: number -> number
    takes a number, and returns that number + 1
*/

console.log(inc.docs.signature)
// console output: number -> number 
```

#### doc.merge (object) -> object

adds a getter to put the .doc property on all inhereting functions

```javascript
doc.merge(Function.prototype) // adds .doc to all functions
```

## Install 

`npm install doc-fn`

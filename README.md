# _js

By: Stella Marie

Small experiments in Javascript

## Description

**Code Abstracting** (folder): Use of js minified and fuckified, determining file size
- fuckified code works in browser
- cannot mix fuckified code and regular code
- fuckified increased file size by 25x

**This in Event Listening:** Use of this in referring an element in an attached event listener
- cannot use this
- use e.target

**This in Object:** Use of this in referring functions in objects
```js
const a = {
    val: 1,
    getValue: function() { return this.val },
    getValue() { return this.val }
}
```
- cannot use () => {}, even if (val = this.val) => {}
- cannost use nested function to get parent-sibling

**Extracting This:** Extending 'this in object' by extracting value
```js
const a = (val = 1) => ({
    get() { return this._val || val },
    set(val) { this._val = val},
    extract() {
        const { _val } = this
        return _val
    }
})

const proto = a()
```
- object factory and prototype are interchangeable here

**Use Object in Args:**
```js
const a = ({
    rand = len => Math.floor(Math.random() * len),
    get = arr => arr[rand(arr.length)],
    arr = [2,3,4]
} = {}) => get(arr)

const proto = a()
const proto2 = a({ arr: [5, 6, 7] })
```

**This in Prototype:**
```js
const a = {
    val: 2,
    getValue: function() { return this.val }
}

const b = function(val) {
    this.__val = val
}
b.prototype.get = function() {
    const { __val } = this
    return __val
}
b.prototype.isEqual = function(b) {
    const { __val } = b
    return this.__val === __val
}
```
- cannot use arrow function in prototype for this

**Return Function in Constructor**
```js
const a = function(val = 2) {
    let __val = val
    return function(fn = state => state) {
        __val = fn(__val)
        return () => ({ val: __val })
    }
}
const proto = new a()
proto().val
proto(fn).val
```
- cannot change this.__val by closure
- can change let __val

**Return This in Constructor**
```js
const a = function(val = 2) {
    return function(fn = state => state) {
        if (!this.__val)
            this.__val = val
        this.__val = fn(this.__val)
        return () => ({ val: this.__val })
    }
}

const proto = new a()
proto(fn).val
proto.call(this, fn).val
```

**Set Canvas Order**
- change canvas size resets canvas

### Not Started

**Get Vowel Count**
**Asynchronous JS**
**Conditionals Performance**
**Calling in Test**
**Testing JS**
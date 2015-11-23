var r = require("ramda")
var assoc = r.assoc
  head = r.head
  reduce = r.reduce,
  toPairs = r.toPairs,
  last = r.last,
  is = r.is,
  isNil = r.isNil

var redact = function(obj, pair) {
  var value = last(pair)
  var key = head(pair)

  if (is(Object, value)) {
    return assoc(key, recursivelyRedact(value), obj)
  }

  if (isNil(value)) {
    return assoc(key, "null", obj)
  }

  return assoc(key, typeof(value), obj)
}

var recursivelyRedact = function(obj) {
  return reduce(redact, {}, toPairs(obj))
}

module.exports = recursivelyRedact

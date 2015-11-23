var assert = require("assert")

var redact = require("./index")

describe("redact", function() {
  it("removes sensistive data from flat object", function() {
    var test = {a: "foo", b: "bar"}
    var result = redact(test)

    assert.deepEqual(result, {a: "string", b: "string"})
  })

  it("removes sensistive numbers from flat object", function() {
    var test = {a: 111, b: 222}
    var result = redact(test)

    assert.deepEqual(result, {a: "number", b: "number"})
  })

  it("handles nulls", function() {
    var test = {a: null}
    var result = redact(test)

    assert.deepEqual(result, {a: "null"})
  })

  it("removes sensistive data from nested object", function() {
    var test = {a: "foo", b: "bar", c: {inner: "foo"}}
    var result = redact(test)

    assert.deepEqual(result, {a: "string", b: "string", c: {inner: "string"}})
  })

  it("removes sensistive data from object with an array", function() {
    var test = {a: "foo", b: [{a: "foo"}, {b: "foo"}]}
    var result = redact(test)

    assert.deepEqual(result, {a: "string", b: [{a: "string"}, {b: "string"}]})
  })
})

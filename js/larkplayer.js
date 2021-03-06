(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.larkplayer = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function find(array, predicate, context) {
  if (typeof Array.prototype.find === 'function') {
    return array.find(predicate, context);
  }

  context = context || this;
  var length = array.length;
  var i;

  if (typeof predicate !== 'function') {
    throw new TypeError(predicate + ' is not a function');
  }

  for (i = 0; i < length; i++) {
    if (predicate.call(context, array[i], i, array)) {
      return array[i];
    }
  }
}

module.exports = find;

},{}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],4:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection)
    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = includes;

},{}],6:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = values;

},{}],7:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],8:[function(require,module,exports){
(function (global){
/*!
 * weakmap-polyfill v2.0.0 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2016 polygon planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */

(function(self) {
  'use strict';

  if (self.WeakMap) {
    return;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var defineProperty = function(object, name, value) {
    if (Object.defineProperty) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  self.WeakMap = (function() {

    // ECMA-262 23.3 WeakMap Objects
    function WeakMap() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }

      defineProperty(this, '_id', genId('_WeakMap'));

      // ECMA-262 23.3.1.1 WeakMap([iterable])
      if (arguments.length > 0) {
        // Currently, WeakMap `iterable` argument is not supported
        throw new TypeError('WeakMap iterable is not supported');
      }
    }

    // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)
    defineProperty(WeakMap.prototype, 'delete', function(key) {
      checkInstance(this, 'delete');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];
      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }

      return false;
    });

    // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)
    defineProperty(WeakMap.prototype, 'get', function(key) {
      checkInstance(this, 'get');

      if (!isObject(key)) {
        return void 0;
      }

      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return entry[1];
      }

      return void 0;
    });

    // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)
    defineProperty(WeakMap.prototype, 'has', function(key) {
      checkInstance(this, 'has');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return true;
      }

      return false;
    });

    // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)
    defineProperty(WeakMap.prototype, 'set', function(key, value) {
      checkInstance(this, 'set');

      if (!isObject(key)) {
        throw new TypeError('Invalid value used as weak map key');
      }

      var entry = key[this._id];
      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }

      defineProperty(key, this._id, [key, value]);
      return this;
    });


    function checkInstance(x, methodName) {
      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
        throw new TypeError(
          methodName + ' method called on incompatible receiver ' +
          typeof x
        );
      }
    }

    function genId(prefix) {
      return prefix + '_' + rand() + '.' + rand();
    }

    function rand() {
      return Math.random().toString().substring(2);
    }


    defineProperty(WeakMap, '_polyfill', true);
    return WeakMap;
  })();


  function isObject(x) {
    return Object(x) === x;
  }

})(
  typeof self !== 'undefined' ? self :
  typeof window !== 'undefined' ? window :
  typeof global !== 'undefined' ? global : this
);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = evented;

var _dom = require('../utils/dom');

var DOM = _interopRequireWildcard(_dom);

var _events = require('./events');

var Events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

/**
 * @file Events
 * @author yuhui06
 * @date 2017/11/3
 *       2018/4/27 ????????????
 */

function evented() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var eventBusKey = DOM.isEl(target.el) ? target.el : DOM.createElement('div');

    target.on = function (eventName, fn) {
        Events.on(eventBusKey, eventName, fn);
    };

    target.off = function (eventName, fn) {
        Events.off(eventBusKey, eventName, fn);
    };

    target.one = function (eventName, fn) {
        Events.one(eventBusKey, eventName, fn);
    };

    target.trigger = function (eventName, initialDict) {
        Events.trigger(eventBusKey, eventName, initialDict);
    };
}

},{"../utils/dom":23,"./events":10}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.on = on;
exports.off = off;
exports.one = one;
exports.trigger = trigger;

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

require('weakmap-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var onceMap = new WeakMap();

/**
 * ????????????
 *
 * @param {Element} el ?????????????????? DOM ??????
 * @param {string} eventName ?????????
 * @param {Function} fn ????????????
 * @param {(Object|boolean)=} options ????????????????????????????????????????????? false
 *                   @https://dom.spec.whatwg.org/#dictdef-eventlisteneroptions ?????????????????????
 */
/**
 * @file Events
 * @author yuhui06
 * @date 2017/11/3
 *       2018/4/27 ?????? CustomEvent ?????? Events ??????
 *       2019/3/7 ?????? one ??????????????? off ???????????? one ???????????????
 */

function on(el, eventName, fn) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    el.addEventListener(eventName, fn, options);
}

/**
 * ????????????
 *
 * @param {Element} el ?????????????????? DOM ??????
 * @param {string} eventName ?????????
 * @param {Function} fn ?????????????????????
 * @param {(Object|boolean)=} options ????????????????????????
 */
function off(el, eventName, fn) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (onceMap.has(fn)) {
        var executeOnlyOnce = onceMap.get(fn);
        el.removeEventListener(eventName, executeOnlyOnce, options);
    }

    el.removeEventListener(eventName, fn, options);
}

/**
 * ???????????????????????????????????????
 *
 * @param {Element} el ?????????????????? DOM ??????
 * @param {string} eventName ?????????
 * @param {Function} fn ????????????
 * @param {(Object|boolean)=} options ????????????????????????????????????????????? false
 */
function one(el, eventName, fn) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    function executeOnlyOnce() {
        fn();
        off(el, eventName, executeOnlyOnce, options);
    }

    if (onceMap.has(fn)) {
        on(el, eventName, onceMap.get(fn), options);
    } else {
        onceMap.set(fn, executeOnlyOnce);
        on(el, eventName, executeOnlyOnce, options);
    }
}

/**
 * ????????????
 *
 * @param {Element} el ?????????????????????
 * @param {string} eventName ?????????
 * @param {Object=} initialDict ???????????????????????????
 * @param {boolean} initialDict.bubbles ????????????????????? false
 * @param {boolean} initialDict.cancelable ???????????????????????? true
 * @param {Mixed} initialDict.detail ?????????????????????????????????????????? null
 */
function trigger(el, eventName) {
    var initialDict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    initialDict = (0, _objectAssign2['default'])({
        bubbles: false,
        cancelable: true,
        detail: null
    }, initialDict);

    // for IE9/10/11
    var event = _document2['default'].createEvent('CustomEvent');
    event.initCustomEvent(eventName, initialDict.bubbles, initialDict.cancelable, initialDict.detail);

    el.dispatchEvent(event);
}

},{"global/document":3,"object-assign":7,"weakmap-polyfill":8}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _events = require('../events/events');

var Events = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @const ??????????????? fullscreen api
 */
/**
 * @file ??? fullscreen api ???????????????
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/8
 * @desc
 *    1) ??????????????????????????????????????? video ?????????????????????????????? video ?????????????????? pc ?????????????????????????????????
 *    2) ?????????????????????????????????????????????????????????????????????????????? ios safari???IE9???
 *
 * @see https://fullscreen.spec.whatwg.org/
 * @see https://developers.google.com/web/fundamentals/native-hardware/fullscreen/?hl=zh-cn
 * @see https://github.com/sindresorhus/screenfull.js/blob/gh-pages/readme.md
 */

var API = [
// ideal api
['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
// New WebKit
['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
// Old WebKit (Safari 5.1)
['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

var browserApi = {};

API.forEach(function (value, index) {
    if (value && value[1] in _document2['default']) {
        value.forEach(function (val, i) {
            browserApi[API[0][i]] = val;
        });
    }
});

exports['default'] = {
    requestFullscreen: function requestFullscreen(el) {
        el[browserApi.requestFullscreen]();
    },
    exitFullscreen: function exitFullscreen() {
        _document2['default'][browserApi.exitFullscreen]();
    },
    fullscreenElement: function fullscreenElement() {
        return _document2['default'][browserApi.fullscreenElement];
    },
    fullscreenEnabled: function fullscreenEnabled() {
        return _document2['default'][browserApi.fullscreenEnabled];
    },
    isFullscreen: function isFullscreen() {
        return !!this.fullscreenElement();
    },
    fullscreenchange: function fullscreenchange(callback) {
        Events.on(_document2['default'], browserApi.fullscreenchange, callback);
    },
    fullscreenerror: function fullscreenerror(callback) {
        Events.on(_document2['default'], browserApi.fullscreenerror, callback);
    },

    // @todo ?????????????????????????????????????????????????????????
    off: function off(type, callback) {
        if (type) {
            if (callback) {
                Events.off(_document2['default'], type, callback);
            } else {
                Events.off(_document2['default'], type);
            }
        } else {
            Events.off(_document2['default'], browserApi.fullscreenchange);
            Events.off(_document2['default'], browserApi.fullscreenerror);
        }
    }
};

},{"../events/events":10,"global/document":3}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;
/**
 * @file html5 video attributes
 * @author yuhui06
 * @date 2018/5/11
 * @see https://www.w3.org/TR/html5/semantics-embedded-content.html#the-media-elements
 * @see https://www.w3.org/TR/html5/semantics-embedded-content.html#the-video-element
 */

var HTML5_WRITABLE_ATTRS = exports.HTML5_WRITABLE_ATTRS = ['src', 'crossOrigin', 'poster', 'preload', 'autoplay', 'loop', 'muted', 'defaultMuted', 'controls', 'controlsList', 'width', 'height', 'playsinline', 'playbackRate', 'defaultPlaybackRate', 'volume', 'currentTime'];

var HTML5_WRITABLE_BOOL_ATTRS = exports.HTML5_WRITABLE_BOOL_ATTRS = ['autoplay', 'loop', 'muted', 'defaultMuted', 'controls', 'playsinline'];

var HTML5_READONLY_ATTRS = exports.HTML5_READONLY_ATTRS = ['error', 'currentSrc', 'networkState', 'buffered', 'readyState', 'seeking', 'duration', 'paused', 'played', 'seekable', 'ended', 'videoWidth', 'videoHeight'];

exports['default'] = [].concat(HTML5_WRITABLE_ATTRS, HTML5_READONLY_ATTRS);

},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;
/**
 * @file html5 video events
 * @author yuhui06
 * @date 2018/5/10
 * @see https://www.w3.org/TR/html5/semantics-embedded-content.html#media-elements-event-summary
 */

exports['default'] = ['loadstart', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing', 'waiting', 'seeking', 'seeked', 'ended', 'durationchange', 'timeupdate', 'progress', 'play', 'pause', 'ratechange', 'resize', 'volumechange'];

},{}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

var _dom = require('../utils/dom');

var DOM = _interopRequireWildcard(_dom);

var _toTitleCase = require('../utils/to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

var _normalizeSource = require('../utils/normalize-source');

var _normalizeSource2 = _interopRequireDefault(_normalizeSource);

var _evented = require('../events/evented');

var _evented2 = _interopRequireDefault(_evented);

var _html5Attrs = require('./html5-attrs');

var _html5Attrs2 = _interopRequireDefault(_html5Attrs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file html5 video api proxy
                                                                                                                                                           * @author yuhui06(yuhui06@baidu.com)
                                                                                                                                                           * @date 2017/11/6
                                                                                                                                                           * @see https://html.spec.whatwg.org/#event-media-emptied
                                                                                                                                                           * @see https://www.w3.org/TR/html5/embedded-content-0.html#attr-media-src
                                                                                                                                                           */

var Html5 = function () {
    function Html5(player, options) {
        _classCallCheck(this, Html5);

        this.player = player;
        this.options = options;
        this.el = this.options.el;

        (0, _evented2['default'])(this, { eventBusKey: this.el });
        this.proxyWebkitFullscreen();
    }

    Html5.prototype.dispose = function dispose() {
        Html5.disposeMediaElement(this.el);
    };

    Html5.prototype.proxyWebkitFullscreen = function proxyWebkitFullscreen() {
        var _this = this;

        if (!('webkitDisplayingFullscreen' in this.el)) {
            return;
        }

        var endFn = function endFn() {
            this.trigger('fullscreenchange', { detail: { isFullscreen: false } });
        };

        var beginFn = function beginFn() {
            if ('webkitPresentationMode' in this.el && this.el.webkitPresentationMode !== 'picture-in-picture') {

                this.one('webkitendfullscreen', endFn);
                this.trigger('fullscreenchange', { detail: { isFullscreen: true } });
            }
        };

        // @todo ???????????????????????? this
        beginFn = beginFn.bind(this);
        endFn = endFn.bind(this);

        this.on('webkitbeginfullscreen', beginFn);
        this.on('dispose', function () {
            _this.off('webkitbeginfullscreen', beginFn);
            _this.off('webkitendfullscreen', endFn);
        });
    };

    Html5.prototype.supportsFullScreen = function supportsFullScreen() {
        // return this.el.webkitSupportsFullscreen;

        if (typeof this.el.webkitEnterFullScreen === 'function') {
            var userAgent = _window2['default'].navigator && _window2['default'].navigator.userAgent || '';

            // Seems to be broken in Chromium/Chrome && Safari in Leopard
            if (/Android/.test(userAgent) || !/Chrome|Mac OS X 10.5/.test(userAgent)) {
                return true;
            }
        }

        return false;
    };

    Html5.prototype.enterFullScreen = function enterFullScreen() {
        if (typeof this.el.webkitEnterFullScreen === 'function') {
            this.el.webkitEnterFullScreen();
        }
    };

    Html5.prototype.exitFullScreen = function exitFullScreen() {
        if (typeof this.el.webkitExitFullScreen === 'function') {
            // @test
            this.player.removeClass('lark-fullscreen');

            this.el.webkitExitFullScreen();
        }
    };

    Html5.prototype.src = function src(_src) {
        if (_src === undefined) {
            return this.el.currentSrc || this.el.src;
        }

        this.setSrc(_src);
    };

    Html5.prototype.source = function source(_source) {
        if (_source === undefined) {
            var sourceNodeList = DOM.$$('source', this.el);
            var sourceArray = Array.from(sourceNodeList);
            return sourceArray.map(function (value) {
                return {
                    src: value.src,
                    type: value.type
                };
            });
        } else {
            _source = (0, _normalizeSource2['default'])(_source);

            var docFragment = _document2['default'].createDocumentFragment();
            _source.forEach(function (value) {
                var sourceElem = DOM.createElement('source', {
                    src: value.src,
                    type: value.type
                });
                docFragment.appendChild(sourceElem);
            });
            this.el.appendChild(docFragment);
        }
    };

    Html5.prototype.reset = function reset() {
        Html5.resetMediaElement(this.el);
    };

    return Html5;
}();

// HTML5 Support Testing


exports['default'] = Html5;
Html5.TEST_VID = _document2['default'].createElement('video');

/**
 * ?????????????????? HTML5 video
 *
 * @return {boolean} ???????????? HTML5 video
 */
Html5.isSupported = function () {
    try {
        Html5.TEST_VID.volume = 0.5;
    } catch (ex) {
        return false;
    }

    return !!(Html5.TEST_VID && Html5.TEST_VID.canPlayType);
};

/**
 * ???????????????????????????????????????
 *
 * HTML5 api proxy
 *
 * @param {string} type ??????????????????(mimetype)
 * @return {boolean} ????????????
 */
Html5.canPlayType = function (type) {
    return Html5.TEST_VID.canPlayType(type);
};

/**
 * ????????????????????????????????????
 *
 * @return {boolean} ????????????????????????????????????
 */
Html5.canControlPlaybackRate = function () {
    try {
        var playbackRate = Html5.TEST_VID.playbackRate;
        Html5.TEST_VID.playbackRate = playbackRate / 2 + 0.1;
        return playbackRate !== Html5.TEST_VID.playbackRate;
    } catch (ex) {
        return false;
    }
};

Html5.disposeMediaElement = function (el) {
    Html5.resetMediaElement(el);
    el.parentNode && el.parentNode.removeChild(el);
};

Html5.resetMediaElement = function (el) {
    if (!el) {
        return;
    }

    while (el.hasChildNodes()) {
        el.removeChild(el.firstChild);
    }

    el.removeAttribute('src');

    if (typeof el.load === 'function') {
        try {
            el.load();
        } catch (ex) {}
    }
};

// Wrap HTML5 video attributes with a getter 
_html5Attrs2['default'].forEach(function (attr) {
    Html5.prototype[attr] = function () {
        return (0, _lodash2['default'])(_html5Attrs.HTML5_WRITABLE_BOOL_ATTRS, attr) ? this.el[attr] || this.el.hasAttribute(attr) : this.el[attr];
    };
});

// Wrap HTML5 video attributes with a setter on Html5 prototype
_html5Attrs.HTML5_WRITABLE_ATTRS.forEach(function (attr) {
    Html5.prototype['set' + (0, _toTitleCase2['default'])(attr)] = function (value) {
        this.el[attr] = value;
        value === false && this.el.removeAttribute(attr);
    };
});

// Wrap native functions with a function
['pause', 'load', 'play'].forEach(function (prop) {
    Html5.prototype[prop] = function () {
        return this.el[prop]();
    };
});

},{"../events/evented":9,"../utils/dom":23,"../utils/normalize-source":28,"../utils/to-title-case":31,"./html5-attrs":12,"global/document":3,"global/window":4,"lodash.includes":5}],15:[function(require,module,exports){
'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _dom = require('./utils/dom');

var DOM = _interopRequireWildcard(_dom);

var _events = require('./events/events');

var Events = _interopRequireWildcard(_events);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _html = require('./html5/html5');

var _html2 = _interopRequireDefault(_html);

var _component = require('./plugin/component');

var _component2 = _interopRequireDefault(_component);

var _mediaSourceHandler = require('./plugin/media-source-handler');

var _mediaSourceHandler2 = _interopRequireDefault(_mediaSourceHandler);

var _plugin = require('./plugin/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _utils = require('./utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function normalize(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var readyFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    options = (0, _objectAssign2['default'])({ playsinline: true }, options);

    if (typeof el === 'string') {
        el = DOM.$(/^#/.test(el) ? el : '#' + el);
    }
    if (!DOM.isEl(el)) {
        throw new Error('[larkplayer initial error]: el should be an id or DOM element!');
    }
    if (el.tagName.toUpperCase() !== 'VIDEO') {
        var videoEl = DOM.createElement('video', {
            id: el.id + '-video'
        });

        el.appendChild(videoEl);
        el = videoEl;
    }

    return [el, options, readyFn];
} /**
   * @file larkplayer entry
   * @author yuhui06
   * @date 2017/11/7
   */

function larkplayer(el, options, readyFn) {
    return _html2['default'].isSupported() ? new (Function.prototype.bind.apply(_player2['default'], [null].concat(normalize(el, options, readyFn))))() : false;
}

(0, _objectAssign2['default'])(larkplayer, { Events: Events, DOM: DOM, Component: _component2['default'], MediaSourceHandler: _mediaSourceHandler2['default'], Plugin: _plugin2['default'], util: _utils2['default'] });

// @see https://github.com/babel/babel/issues/2724
module.exports = larkplayer;

},{"./events/events":10,"./html5/html5":14,"./player":16,"./plugin/component":17,"./plugin/media-source-handler":18,"./plugin/plugin":21,"./utils/dom":23,"./utils/utils":32,"object-assign":7}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _html = require('./html5/html5');

var _html2 = _interopRequireDefault(_html);

var _html5Events = require('./html5/html5-events');

var _html5Events2 = _interopRequireDefault(_html5Events);

var _html5Attrs = require('./html5/html5-attrs');

var _fullscreen = require('./html5/fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _component = require('./plugin/component');

var _component2 = _interopRequireDefault(_component);

var _mediaSourceHandler = require('./plugin/media-source-handler');

var _mediaSourceHandler2 = _interopRequireDefault(_mediaSourceHandler);

var _plugin = require('./plugin/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _pluginTypes = require('./plugin/plugin-types');

var _pluginTypes2 = _interopRequireDefault(_pluginTypes);

var _events = require('./events/events');

var Events = _interopRequireWildcard(_events);

var _dom = require('./utils/dom');

var DOM = _interopRequireWildcard(_dom);

var _toTitleCase = require('./utils/to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

var _evented = require('./events/evented');

var _evented2 = _interopRequireDefault(_evented);

var _obj = require('./utils/obj');

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

var _computedStyle = require('./utils/computed-style');

var _computedStyle2 = _interopRequireDefault(_computedStyle);

var _featureDetector = require('./utils/feature-detector');

var _featureDetector2 = _interopRequireDefault(_featureDetector);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file Player.js. player initial && api
                                                                                                                                                           * @author yuhui06(yuhui06@baidu.com)
                                                                                                                                                           * @date 2017/11/6
                                                                                                                                                           * @todo ?????? Player ????????????????????????????????????????????????????????????
                                                                                                                                                           */

/**
 * @class
 */
var Player = function () {
    /**
     * ??????????????????????????????
     *
     * @constructor
     *
     * @param {Element|string} tag DOM ???????????? id???????????? video ?????????????????????????????????????????????
     * @param {Object=} options ??????????????????
     * @param {number=} options.height ???????????????
     * @param {number=} options.width ???????????????
     * @param {boolean=} options.loop ??????????????????????????? false
     * @param {boolean=} options.controls ??????????????????????????? false
     * @param {string=} options.controlsList ???????????????????????????????????????????????? nodownload nofullscreen noremoteplayback
     * @param {number=} options.playbackRate ??????????????????????????? 1.0
     * @param {number=} options.defaultPlaybackRate ????????????????????????????????? 1.0
     * @param {number=} options.volume ????????????????????? 1??????????????? 0~1
     * @param {boolean=} options.muted ????????????????????? false
     * @param {boolean=} options.playsinline ????????????????????????????????????????????????????????????????????? true?????? ios10 ?????????????????? ios10 ?????????????????????????????????????????????
     * @param {string=} options.poster ????????????
     * @param {string=} options.preload ?????????????????????????????????????????????????????? 3 ???????????????????????????????????? 3 ??????????????????????????????????????????????????????????????????????????????
     *                                  - auto ?????????????????????
     *                                  - metadata ????????? metadata???????????????????????????????????????
     *                                  - none ???????????????
     * @param {string=} options.src ????????????
     * @param {Array=} options.source ?????? source ???????????? [{src: 'xxx', type: 'xxx'}] ????????????type ??????
     * @param {Function=} ready ???????????????????????????????????????????????????
     */
    function Player(tag, options, readyFn) {
        _classCallCheck(this, Player);

        this.isReady = false;
        this.player = this;
        this.options = options;
        this.tag = tag;
        this.el = this.createEl();
        this.ready(readyFn);

        (0, _evented2['default'])(this, { eventBusKey: this.el });

        this.handleFirstplay = this.handleFirstplay.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
        this.handleFullscreenError = this.handleFullscreenError.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fullWindowOnEscKey = this.fullWindowOnEscKey.bind(this);

        if (_featureDetector2['default'].touch) {
            this.on('touchend', this.handleTouchEnd);
        } else {
            this.on('click', this.handleClick);
        }

        if (!this.tech) {
            this.tech = this.loadTech();
        }

        var src = this.src();
        if (src) {
            // ??????????????????????????????????????????????????? loadstart ??????
            this.handleLateInit(this.tech.el);

            this.callMS(src);
        }

        this.initialUIPlugins();
        this.initialNormalPlugins();
        this.triggerReady();
    }

    Player.prototype.initialNormalPlugins = function initialNormalPlugins() {
        var _this = this;

        this[_pluginTypes2['default'].OTHERS] = {};
        var allPlugins = _plugin2['default'].getAll();
        allPlugins.forEach(function (PluginClass) {
            var name = PluginClass._displayName;
            var pluginInstance = new PluginClass(_this, _this.getPluginOptions(name, _pluginTypes2['default'].OTHERS));
            _this[_pluginTypes2['default'].OTHERS][name] = pluginInstance;
        });
    };

    Player.prototype.initialUIPlugins = function initialUIPlugins() {
        var _this2 = this;

        // @hack ????????? Component.createElement ????????? player
        _component2['default'].player = this;

        this[_pluginTypes2['default'].UI] = {};
        var allPlugins = _component2['default'].getAll();
        allPlugins.forEach(function (PluginClass) {
            var name = PluginClass._displayName;
            var pluginInstance = new PluginClass(_this2, _this2.getPluginOptions(name, _pluginTypes2['default'].UI));
            var el = pluginInstance.el;
            _this2.el.appendChild(el);
            _this2[_pluginTypes2['default'].UI][name] = pluginInstance;
        });
    };

    Player.prototype.getPluginOptions = function getPluginOptions(name, namespace) {
        return this.options && this.options[namespace] && this.options[namespace][name];
    };

    Player.prototype.callMS = function callMS(src) {
        this.disposeMS();

        var HandlerClass = _mediaSourceHandler2['default'].select(src);
        if (HandlerClass) {
            this.MSHandler = new HandlerClass(this, this.getPluginOptions(HandlerClass._displayName, _pluginTypes2['default'].MS));
            this.MSHandler.src(src);

            return true;
        }

        return false;
    };

    Player.prototype.disposeMS = function disposeMS() {
        if (this.MSHandler) {
            this.MSHandler.dispose();
            this.MSHandler = null;
        }
    };

    Player.prototype.ready = function ready(fn) {
        var _this3 = this;

        if (typeof fn !== 'function') {
            return;
        }

        if (this.isReady) {
            setTimeout(function () {
                return fn.call(_this3);
            }, 1);
        } else {
            this.readyQueue = this.readyQueue || [];
            this.readyQueue.push(fn);
        }
    };

    Player.prototype.triggerReady = function triggerReady() {
        var _this4 = this;

        this.isReady = true;

        setTimeout(function () {
            var readyQueue = _this4.readyQueue;
            _this4.readyQueue = [];
            if (readyQueue && readyQueue.length) {
                readyQueue.forEach(function (fn) {
                    fn.call(_this4);
                });
            }

            _this4.trigger('ready');
        }, 1);
    };

    Player.prototype.removeClass = function removeClass(className) {
        return DOM.removeClass(this.el, className);
    };

    Player.prototype.addClass = function addClass(className) {
        return DOM.addClass(this.el, className);
    };

    Player.prototype.hasClass = function hasClass(className) {
        return DOM.hasClass(this.el, className);
    };

    Player.prototype.toggleClass = function toggleClass(className) {
        return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
    };

    /**
     * ???????????????
     *
     */


    Player.prototype.dispose = function dispose() {
        this.trigger('dispose');

        // ??????????????????
        _fullscreen2['default'].off();

        // ?????? MS ??????
        this.disposeMS();

        if (this.tag && this.tag.player) {
            this.tag.player = null;
        }

        if (this.el && this.el.player) {
            this.el.player = null;
        }

        if (this.tech) {
            this.tech.dispose();
        }
    };

    /**
     * ??????????????? DOM ?????? video ????????????????????? div ????????????????????????????????????????????????
     *
     * @private
     * @return {Element} el ????????? DOM
     */


    Player.prototype.createEl = function createEl() {
        var _this5 = this;

        var tag = this.tag;

        // ?????? options ?????? html5 ????????????
        (0, _obj.each)(this.options, function (value, key) {
            if ((0, _lodash2['default'])(_html5Attrs.HTML5_WRITABLE_ATTRS, key) && value) {
                DOM.setAttribute(tag, key, value);
            }
        });

        if (this.options.source) {
            this.ready(function () {
                _this5.source(_this5.options.source);
            });
        }

        // ??????????????????
        var el = DOM.createElement('div', {
            className: 'larkplayer',
            id: tag.id + '-larkplayer'
        });

        DOM.setAttribute(tag, 'tabindex', '-1');

        // ??? el ????????? DOM ???
        if (tag.parentNode) {
            tag.parentNode.insertBefore(el, tag);
        }

        if (tag.hasAttribute('width')) {
            el.style.width = tag.getAttribute('width') + 'px';
            tag.setAttribute('width', '100%');
        }

        if (tag.hasAttribute('height')) {
            el.style.height = tag.getAttribute('height') + 'px';
            tag.setAttribute('height', '100%');
        }

        el.appendChild(tag);

        return el;
    };

    /**
     * ??? video ??????????????????????????????????????? larkplayer???????????????????????????????????????????????????
     *
     * @private
     * @param {Element} el video DOM ??????
     */


    Player.prototype.handleLateInit = function handleLateInit(el) {
        var _this6 = this;

        if (!!el.error) {
            this.ready(function () {
                _this6.trigger('error');
            });
            return;
        }

        // readyState
        // 0 - HAVE_NOTHING
        // ??????????????????????????????????????? networkState ???????????? NETWORK_EMPTY ?????? readyState ?????????????????? HAVE_NOTHING
        // 1 - HAVE_METADATA
        // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        // 2 - HAVE_CURRENT_DATA
        // ????????????????????????????????????????????????????????????????????????
        // HAVE_CURRENT_DATA ??? HAVE_METADATA ???????????????????????????
        // 3 - HAVE_FUTURE_DATA
        // ??????????????????????????????????????????????????????
        // ??????????????????????????????
        // 4 - HAVE_ENOUGH_DATA
        // ????????????????????????????????????????????????????????????????????????

        if (el.networkState === 0 || el.networkState === 3) {
            return;
        }

        // ??? readyState === 0 ????????????loadstart ?????????????????????????????????
        // NetworkState is set synchronously BUT loadstart is fired at the
        // end of the current stack, usually before setInterval(fn, 0).
        // So at this point we know loadstart may have already fired or is
        // about to fire, and either way the player hasn't seen it yet.
        // We don't want to fire loadstart prematurely here and cause a
        // double loadstart so we'll wait and see if it happens between now
        // and the next loop, and fire it if not.
        // HOWEVER, we also want to make sure it fires before loadedmetadata
        // which could also happen between now and the next loop, so we'll
        // watch for that also.
        if (el.readyState === 0) {
            var loadstartFired = false;
            var setLoadstartFired = function setLoadstartFired() {
                loadstartFired = true;
            };

            this.on('loadstart', setLoadstartFired);

            var triggerLoadstart = function triggerLoadstart() {
                if (!loadstartFired) {
                    _this6.trigger('loadstart');
                }
            };

            // ??????????????? loadedmetadata ?????????????????? loadstart ??????
            this.on('loadedmetadata', triggerLoadstart);

            // ?????????????????????????????? loadstart ???????????? ready ???????????? trigger ??????
            this.ready(function () {
                _this6.off('loadstart', setLoadstartFired);
                _this6.off('loadedmetadata', triggerLoadstart);

                if (!loadstartFired) {
                    _this6.trigger('loadstart');
                }
            });

            return;
        }

        var eventsToTrigger = ['loadstart', 'loadedmetadata'];

        if (el.readyState >= 2) {
            eventsToTrigger.push('loadeddata');
        }

        if (el.readyState >= 3) {
            eventsToTrigger.push('canplay');
        }

        if (el.readyState >= 4) {
            eventsToTrigger.push('canplaythrough');
        }

        this.ready(function () {
            eventsToTrigger.forEach(function (event) {
                _this6.trigger(event);
            });
        });
    };

    /**
     * ???????????? Html5 ??????
     *
     * @return {Object} tech Html5 ??????
     *
     * @private
     */


    Player.prototype.loadTech = function loadTech() {
        var _this7 = this;

        this.options.el = this.tag;
        var tech = new _html2['default'](this.player, this.options);

        // ?????? video ???????????????
        _html5Events2['default'].forEach(function (eventName) {
            Events.on(tech.el, eventName, function () {
                _this7.trigger(eventName);
            });
        });

        // ?????? firstPlay ??????
        this.off('play', this.handleFirstplay);
        this.one('play', this.handleFirstplay);

        // ????????????
        Events.on(tech.el, 'fullscreenchange', this.handleFullscreenChange);
        _fullscreen2['default'].fullscreenchange(this.handleFullscreenChange);
        _fullscreen2['default'].fullscreenerror(this.handleFullscreenError);

        return tech;
    };

    /**
     * ??? Html5 ???????????????????????? get ??????
     *
     * @private
     * @param {string} method ?????????????????????
     * @return {Mixed} ????????????????????????
     */


    Player.prototype.techGet = function techGet(method) {
        return this.tech[method]();
    };

    /**
     * ??? Html5 ???????????????????????? set ??????
     *
     * @private
     * @param {string} method ?????????????????????
     * @param {Mixed} val ???????????????????????????
     */


    Player.prototype.techCall = function techCall(method, val) {
        try {
            this.tech[method](val);
        } catch (ex) {
            (0, _log2['default'])(ex);
        }
    };

    /**
     * ?????????????????????????????????
     *
     * @param {number=} value ???????????????????????????????????????
     * @return {number|NaN} ??????????????????????????????????????????
     */


    Player.prototype.width = function width(value) {
        if (value !== undefined) {
            if (/\d$/.test(value)) {
                value = value + 'px';
            }

            this.el.style.width = value;
        } else {
            return parseInt((0, _computedStyle2['default'])(this.el, 'width'), 0);
        }
    };

    /**
     * ?????????????????????????????????
     *
     * @param {number=} value ???????????????????????????????????????
     * @return {number|NaN} ??????????????????????????????????????????
     */


    Player.prototype.height = function height(value) {
        if (value !== undefined) {
            if (/\d$/.test(value)) {
                value = value + 'px';
            }

            this.el.style.height = value;
        } else {
            return parseInt((0, _computedStyle2['default'])(this.el, 'height'), 0);
        }
    };

    // = = = = = = = = = = = = = ???????????? = = = = = = = = = = = = = =

    /**
     * ?????????????????? firstplay ??????
     * ???????????? play ??????????????????????????? firstplay ???????????????????????????????????????
     *
     * @private
     * @fires Player#firstplay
     */


    Player.prototype.handleFirstplay = function handleFirstplay() {
        /**
         * ??????????????????????????????????????????????????????
         *
         * @event Player#firstplay
         */
        this.trigger('firstplay');
    };

    Player.prototype.handleTouchEnd = function handleTouchEnd(event) {
        if (event.target === this.tech.el && this.paused()) {
            this.play();
        }
    };

    /**
     * ?????? fullscreenchange ??????
     *
     * @private
     * @fires Player#fullscreenchange
     */
    // Html5 ?????????????????????????????????????????? extData


    Player.prototype.handleFullscreenChange = function handleFullscreenChange(event) {
        var extData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var data = {};

        // ?????????????????????????????? extData
        if (event.detail && event.detail.isFullscreen !== undefined) {
            this.fullscreenStatus = event.detail.isFullscreen;
        } else if (_fullscreen2['default'].fullscreenEnabled()) {
            // pc ??? fullscreen ??????
            this.fullscreenStatus = _fullscreen2['default'].isFullscreen();
        }

        if (this.isFullscreen()) {
            data.isFullscreen = true;
            this.addClass('lark-fullscreen');
        } else {
            data.isFullscreen = false;
            this.removeClass('lark-fullscreen');
            // lark-fullscreen-adjust ???????????? exitFullscreen ???????????????????????????????????? ESC ????????????????????? exitFullscreen ??????
            this.removeClass('lark-fullscreen-adjust');
        }

        /**
         * ?????????????????????????????????
         *
         * @event Player#fullscreenchange
         * @param {Object} data ?????????????????????
         * @param {boolean} data.isFullscreen ???????????????????????????
         */
        this.trigger('fullscreenchange', { detail: data });
    };

    /**
     * ?????? fullscreenerror ??????
     *
     * @fires Player#fullscreenerror
     * @private
     */


    Player.prototype.handleFullscreenError = function handleFullscreenError() {
        /**
         * ???????????????????????????
         *
         * @event Player#fullscreenerror
         */
        this.trigger('fullscreenerror');
    };

    Player.prototype.handleClick = function handleClick(event) {
        if (event.target === this.tech.el) {
            this.paused() ? this.play() : this.pause();
        }
    };

    // = = = = = = = = = = = = = ?????? api = = = = = = = = = = = = = =

    /**
     * ????????????????????????????????????
     *
     * @return {boolean} ????????????????????????
     */


    Player.prototype.isFullscreen = function isFullscreen() {
        return this.fullscreenStatus || false;
    };

    /**
     * ????????????
     * ???????????????????????????????????????????????????????????????????????????????????? css ?????????????????????
     */


    Player.prototype.requestFullscreen = function requestFullscreen() {
        this.fullscreenStatus = true;

        if (_fullscreen2['default'].fullscreenEnabled()) {
            // ?????? css ???????????? top right bottom left margin ????????? 0
            // ????????????????????????????????????????????????
            this.addClass('lark-fullscreen-adjust');
            _fullscreen2['default'].requestFullscreen(this.el);
        } else if (this.tech.supportsFullScreen()) {
            this.techGet('enterFullScreen');
        } else {
            this.enterFullWindow();
        }
    };

    /**
     * ????????????
     */


    Player.prototype.exitFullscreen = function exitFullscreen() {
        this.fullscreenStatus = false;

        if (_fullscreen2['default'].fullscreenEnabled() && _fullscreen2['default'].isFullscreen()) {
            this.removeClass('lark-fullscreen-adjust');
            _fullscreen2['default'].exitFullscreen();
        } else if (this.tech.supportsFullScreen()) {
            this.techGet('exitFullScreen');
        } else {
            this.exitFullWindow();
        }
    };

    /**
     * ?????? css ????????????????????????????????????????????????
     *
     * @private
     */


    Player.prototype.enterFullWindow = function enterFullWindow() {
        this.addClass('lark-full-window');
        this.trigger('fullscreenchange');
        Events.on(_document2['default'], 'keydown', this.fullWindowOnEscKey);
    };

    Player.prototype.fullWindowOnEscKey = function fullWindowOnEscKey(event) {
        var keyCode = event.keyCode || event.which;
        // Esc ????????? 27
        if (keyCode === 27) {
            this.exitFullWindow();
        }
    };

    /**
     * ????????? css ???????????????????????????
     *
     * @private
     */


    Player.prototype.exitFullWindow = function exitFullWindow() {
        this.removeClass('lark-full-window');
        this.trigger('fullscreenchange');
        Events.off(_document2['default'], 'keydown', this.fullWindowOnEscKey);
    };

    Player.prototype.internalPlay = function internalPlay() {
        var playReturn = this.techGet('play');
        if (playReturn && playReturn.then) {
            playReturn.then(null, function (err) {
                // @todo ??????????????? err ??????????????????
                _log2['default'].error(err);
            });
        }
    };

    /**
     * ????????????
     */


    Player.prototype.play = function play() {
        if (this.MSHandler) {
            this.MSHandler.play();
        } else {
            this.isReady ? this.internalPlay() : this.ready(this.internalPlay);
        }
    };

    /**
     * ????????????
     */


    Player.prototype.pause = function pause() {
        this.techCall('pause');
    };

    /**
     * ???????????????????????????????????????????????????????????????????????????????????????
     */


    Player.prototype.load = function load() {
        this.techCall('load');
    };

    // reset video and ui
    // @todo ???????????? reset ???????????????????????????
    /**
     * ???????????????
     * ????????????????????? src source ????????????????????? UI ??????
     */


    Player.prototype.reset = function reset() {
        this.pause();

        // reset video tag
        this.techCall('reset');

        // reset ui
        this.children.forEach(function (child) {
            child && child.reset && child.reset();
        });
    };

    /**
     * ???????????????????????????
     *
     * @param {number=} seconds ?????????????????????????????????????????????????????????
     * @return {number} ???????????????????????????????????????
     */


    Player.prototype.currentTime = function currentTime(seconds) {
        if (seconds !== undefined) {
            this.techCall('setCurrentTime', seconds);
        } else {
            return this.techGet('currentTime') || 0;
        }
    };

    /**
     * ???????????????????????????
     *
     * @return {number} ????????? - ??????????????? = ???????????????
     */


    Player.prototype.remainingTime = function remainingTime() {
        return this.duration() - this.currentTime();
    };

    /**
     * ??????????????????????????????????????????
     *
     * @return {boolean} ????????????????????????????????????
     */


    Player.prototype.bufferedEnd = function bufferedEnd() {
        var buffered = this.buffered();
        var duration = this.duration();
        if (buffered && duration) {
            return buffered.end(buffered.length - 1) === duration;
        } else {
            return false;
        }
    };

    /**
     * ?????????????????????????????? src ????????????
     *
     * @param {string=} src ???????????? src ?????????????????????
     * @return {string} ???????????????????????????????????? src ??? currentSrc
     */


    Player.prototype.src = function src(_src) {
        if (_src !== undefined) {

            var success = this.callMS(_src);
            if (!success) {
                this.techCall('setSrc', _src);
            }

            // src ?????????????????????????????? firstplay ??????
            // ??? off ?????????????????????
            this.off('play', this.handleFirstplay);
            this.one('play', this.handleFirstplay);

            /**
             * srcchange ?????????
             *
             * @event Player#srcchange
             * @param {string} src ????????????????????????
             */
            this.trigger('srcchange', { detail: _src });
        } else {
            return this.techGet('src');
        }
    };

    /**
     * ??????????????????????????? source
     *
     * @param {Array=} source ??????????????????
     * @return {Array} ????????????????????? source ??????
     */


    Player.prototype.source = function source(_source) {
        if (_source !== undefined) {
            this.techCall('source', _source);
            this.trigger('srcchange', { detail: this.player.src() });
        } else {
            return this.techGet('source');
        }
    };

    return Player;
}();

_html5Attrs.HTML5_WRITABLE_ATTRS.filter(function (attr) {
    return !(0, _lodash2['default'])(['src', 'currentTime', 'width', 'height'], attr);
}).forEach(function (attr) {
    Player.prototype[attr] = function (val) {
        if (val !== undefined) {
            this.techCall('set' + (0, _toTitleCase2['default'])(attr), val);
            this.options[attr] = val;
        } else {
            return this.techGet(attr);
        }
    };
});

_html5Attrs.HTML5_READONLY_ATTRS.forEach(function (attr) {
    Player.prototype[attr] = function () {
        return this.techGet(attr);
    };
});

exports['default'] = Player;

// Generate HTML5_WRITABLE_ATTRS docs
/**
 * @function poster
 * @description ??????????????? poster ??????
 * @memberof Player
 * @instance
 *
 * @param {string=} poster ?????????
 * @return {boolean} ???????????????????????? poster ??????
 */

/**
 * @function preload
 * @description ??????????????? preload ??????
 * @memberof Player
 * @instance
 *
 * @param {string=} preload ????????????????????????????????? none, metadata, auto
 * @return {boolean} ???????????????????????? preload ??????
 */

/**
 * @function autoplay
 * @description ??????????????? autoplay ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} autoplay ??????????????????????????? false????????????????????????????????????????????????????????????
 * @return {boolean} ???????????????????????? autoplay ??????
 */

/**
 * @function loop
 * @description ??????????????? loop ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} loop ??????????????????????????? false
 * @return {boolean} ???????????????????????? loop ??????
 */

/**
 * @function muted
 * @description ??????????????? muted ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} muted ????????????????????? false
 * @return {boolean} ???????????????????????? muted ??????
 */

/**
 * @function defaultMuted
 * @description ??????????????? defaultMuted ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} defaultMuted ??????????????????????????? false
 * @return {boolean} ???????????????????????? defaultMuted ??????
 */

/**
 * @function controls
 * @description ??????????????? controls ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} controls ?????????????????????????????? false
 * @return {boolean} ???????????????????????? controls ??????
 */

/**
 * @function controlsList
 * @description ??????????????? controlsList ??????
 * @memberof Player
 * @instance
 *
 * @param {string=} controlsList ?????????????????????????????????????????? nodownload, nofullscreen, noremoteplayback
 *     ?????? 'nodownload nofullscreen'
 * @return {external:DOMTokenList} ???????????????????????? controlsList ??????
 */

/**
 * @function playsinline
 * @description ??????????????? playsinline ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} playsinline ?????????????????????IOS10 ???????????????????????? true
 * @return {boolean} ???????????????????????? playsinline ??????
 */

/**
 * @function playbackRate
 * @description ??????????????? playbackRate ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} playbackRate ???????????????????????? 1.0
 * @return {boolean} ???????????????????????? playbackRate ??????
 */

/**
 * @function defaultPlaybackRate
 * @description ??????????????? defaultPlaybackRate ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} defaultPlaybackRate ?????????????????????????????? 1.0
 * @return {boolean} ???????????????????????? defaultPlaybackRate ??????
 */

/**
 * @function volume
 * @description ??????????????? volume ??????
 * @memberof Player
 * @instance
 *
 * @param {boolean=} volume ???????????????????????? 1??????????????? 0~1
 * @return {boolean} ???????????????????????? volume ??????
 */

// Generate HTML5_READONLY_ATTRS docs
/**
 * @function error
 * @description ?????? error ??????
 * @memberof Player
 * @instance
 *
 * @return {external:MediaError|null} ??????????????? [MediaError]{@link https://developer.mozilla.org/en-US/docs/Web/API/MediaError} ????????????????????? null
 * @see html spec [mediaerror]{@link https://html.spec.whatwg.org/multipage/media.html#mediaerror} for detail
 */

/**
 * @function currentSrc
 * @description ?????? currentSrc ??????
 * @memberof Player
 * @instance
 *
 * @return {string} ??????????????????
 */

/**
 * @function networkState
 * @description ?????? networkState ??????
 * @memberof Player
 * @instance
 *
 * @return {number} ??????????????????????????????
 * @see https://html.spec.whatwg.org/multipage/media.html#network-states
 */

/**
 * @function buffered
 * @description ?????? buffered ??????
 * @memberof Player
 * @instance
 *
 * @return {external:TimeRanges} ????????????????????????
 */

/**
 * @function readyState
 * @description ?????? readyState ??????
 * @memberof Player
 * @instance
 *
 * @return {number} ?????? readyState ??????
 * @see html spec [dom-media-readystate]{@link https://html.spec.whatwg.org/multipage/media.html#dom-media-readystate} for detail
 */

/**
 * @function seeking
 * @description ?????? seeking ??????
 * @memberof Player
 * @instance
 *
 * @return {boolean} ??????????????????????????????????????????
 */

/**
 * @function duration
 * @description ?????? duration ??????
 * @memberof Player
 * @instance
 *
 * @return {number|NaN} ???????????????
 */

/**
 * @function paused
 * @description ?????? paused ??????
 * @memberof Player
 * @instance
 *
 * @return {boolean} ??????????????????????????????
 */

/**
 * @function played
 * @description ?????? played ??????
 * @memberof Player
 * @instance
 *
 * @return {external:TimeRanges} ????????????????????????????????????????????????????????? A ???????????? B???A B ???????????????????????????????????????
 */

/**
 * @function seekable
 * @description ?????? seekable ??????
 * @memberof Player
 * @instance
 *
 * @return {external:TimeRanges} ????????????????????????????????????
 */

/**
 * @function ended
 * @description ?????? ended ??????
 * @memberof Player
 * @instance
 *
 * @return {boolean} ?????????????????????
 */

/**
 * @function videoWidth
 * @description ?????? videoWidth ??????
 * @memberof Player
 * @instance
 *
 * @return {number|NaN} ???????????????????????????????????????????????????
 */

/**
 * @function videoHeight
 * @description ?????? videoHeight ??????
 * @memberof Player
 * @instance
 *
 * @return {number|NaN} ???????????????????????????????????????????????????
 */

// Generate HTML5_EVENTS docs
/**
 * @event Player#loadstart
 * @description The user agent begins looking for media data
 * @see html spec [event-media-loadstart]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-loadstart} for detail
 */

/**
 * @event Player#suspend
 * @description The user agent is intentionally not currently fetching media data
 * @see html spec [event-media-suspend]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-suspend} for detail
 */

/**
 * @event Player#abort
 * @description The user agent stops fetching the media data before it is completely downloaded, but not due to an error
 * @see html spec [event-media-abort]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-abort} for detail
 */

/**
 * @event Player#error
 * @description An error occurs while fetching the media data or the type of the resource is not supported media format
 * @see html spec [event-media-error]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-error} for detail
 */

/**
 * @event Player#emptied
 * @description A media element whose networkState was previously not in the NETWORK_EMPTY state has just switched to that state
 * @see html spec [event-media-emptied]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-emptied} for detail
 */

/**
 * @event Player#stalled
 * @description The user agent is trying to fetch media data, but data is unexpectedly not forthcoming
 * @see html spec [event-media-stalled]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-stalled} for detail
 */

/**
 * @event Player#loadedmetadata
 * @description The user agent has just determined the duration and dimensions of the media resource and the text tracks are ready
 * @see html spec [event-media-loadedmetadata]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-loadedmetadata} for detail
 */

/**
 * @event Player#loadeddata
 * @description The user agent can render the media data at the current playback position for the first time
 * @see html spec [event-media-loadeddata]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-loadeddata} for detail
 */

/**
 * @event Player#canplay
 * @description The user agent can resume playback of the media data, but estimates that if playback were to be started now, the media resource could not be rendered at the current playback rate up to its end without having to stop for further buffering of content
 * @see html spec [event-media-canplay]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-canplay} for detail
 */

/**
 * @event Player#canplaythrough
 * @description The user agent estimates that if playback were to be started now, the media resource could be rendered at the current playback rate all the way to its end without having to stop for further buffering
 * @see html spec [event-media-canplaythrough]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-canplaythrough} for detail
 */

/**
 * @event Player#playing
 * @description Playback is ready to start after having been paused or delayed due to lack of media data
 * @see html spec [event-media-playing]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-playing} for detail
 */

/**
 * @event Player#waiting
 * @description Playback has stopped because the next frame is not available, but the user agent expects that frame to become available in due course
 * @see html spec [event-media-waiting]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-waiting} for detail
 */

/**
 * @event Player#seeking
 * @description The seeking IDL attribute changed to true, and the user agent has started seeking to a new position
 * @see html spec [event-media-seeking]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-seeking} for detail
 */

/**
 * @event Player#seeked
 * @description The seeking IDL attribute changed to false after the current playback position was changed
 * @see html spec [event-media-seeked]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-seeked} for detail
 */

/**
 * @event Player#ended
 * @description Playback has stopped because the end of the media resource was reached
 * @see html spec [event-media-ended]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-ended} for detail
 */

/**
 * @event Player#durationchange
 * @description The duration attribute has just been updated
 * @see html spec [event-media-durationchange]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-durationchange} for detail
 */

/**
 * @event Player#timeupdate
 * @description The current playback position changed as part of normal playback or in an especially interesting way, for example discontinuously
 * @see html spec [event-media-timeupdate]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-timeupdate} for detail
 */

/**
 * @event Player#progress
 * @description The user agent is fetching media data
 * @see html spec [event-media-progress]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-progress} for detail
 */

/**
 * @event Player#play
 * @description The element is no longer paused. Fired after the play() method has returned, or when the autoplay attribute has caused playback to begin
 * @see html spec [event-media-play]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-play} for detail
 */

/**
 * @event Player#pause
 * @description The element has been paused. Fired after the pause() method has returned
 * @see html spec [event-media-pause]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-pause} for detail
 */

/**
 * @event Player#ratechange
 * @description Either the defaultPlaybackRate or the playbackRate attribute has just been updated
 * @see https://html.spec.whatwg.org/multipage/media.html#event-media-ratechange
 */

/**
 * @event Player#resize
 * @description One or both of the videoWidth and videoHeight attributes have just been updated
 * @see html spec [event-media-resize]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-resize} for detail
 */

/**
 * @event Player#volumechange
 * @description Either the volume attribute or the muted attribute has changed. Fired after the relevant attribute's setter has returned
 * @see html spec [event-media-volumechange]{@link https://html.spec.whatwg.org/multipage/media.html#event-media-volumechange} for detail
 */

/**
 * @external TimeRanges
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges
 */

/**
 * @external DOMTokenList
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
 */

/**
 * @external MediaError
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaError
 */

},{"./events/evented":9,"./events/events":10,"./html5/fullscreen":11,"./html5/html5":14,"./html5/html5-attrs":12,"./html5/html5-events":13,"./plugin/component":17,"./plugin/media-source-handler":18,"./plugin/plugin":21,"./plugin/plugin-types":20,"./utils/computed-style":22,"./utils/dom":23,"./utils/feature-detector":24,"./utils/log":26,"./utils/obj":29,"./utils/to-title-case":31,"global/document":3,"lodash.includes":5}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _pluginStore = require('./plugin-store');

var _pluginStore2 = _interopRequireDefault(_pluginStore);

var _pluginTypes = require('./plugin-types');

var _pluginTypes2 = _interopRequireDefault(_pluginTypes);

var _dom = require('../utils/dom');

var DOM = _interopRequireWildcard(_dom);

var _events = require('../events/events');

var Events = _interopRequireWildcard(_events);

var _evented = require('../events/evented');

var _evented2 = _interopRequireDefault(_evented);

var _toCamelCase = require('../utils/to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file component.js UI ????????????
                                                                                                                                                           * @author yuhui06
                                                                                                                                                           * @date 2018/4/8
                                                                                                                                                           * @desc
                                                                                                                                                           *    1) UI ???????????????????????????
                                                                                                                                                           *    2) UI ???????????? Component.register(class, options) ??????
                                                                                                                                                           *    3) ??????????????????????????? DOM ??? Events ???????????????????????????
                                                                                                                                                           */

var Component = function () {
    function Component(player) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Component);

        this.player = player;
        this.options = options;
        this.el = this.createEl(this.options);

        (0, _evented2['default'])(this, { eventBusKey: this.el });
        this.dispose = this.dispose.bind(this);
        this.player.on('dispose', this.dispose);
    }

    Component.prototype.createEl = function createEl() {
        return DOM.createElement('div', this.options);
    };

    // 1. remove Elements for memory
    // 2. remove Events for memory
    // 3. remove reference for GC


    Component.prototype.dispose = function dispose() {
        this.player.off('dispose', this.dispose);

        if (DOM.isEl(this.el) && this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
        this.player = null;
        this.options = null;
        this.el = null;
    };

    Component.createElement = function createElement(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        // babel ??????????????????????????? null ????????? null????????????????????? !== undefined
        options = options || {};

        var ComponentClass = void 0;
        if (typeof name === 'string') {
            ComponentClass = Component.get((0, _toCamelCase2['default'])(name));
        } else if (name.prototype instanceof Component) {
            ComponentClass = name;
        }

        for (var _len = arguments.length, child = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            child[_key - 2] = arguments[_key];
        }

        if (ComponentClass) {
            // ????????? this.player ????????????????????????????????????????????????????????? this.player
            // ????????????????????? Component.createElement ??????????????? Component.player ???????????????
            // ????????????????????????????????????????????????
            var instance = new ComponentClass(this.player, options);
            var el = instance.el;

            if (child) {
                DOM.appendContent(el, child);
            }

            return el;
        } else {
            return DOM.createElement.apply(DOM, [name, options].concat(child));
        }
    };

    Component.register = function register(component, options) {
        return _pluginStore2['default'].add(component, options, _pluginTypes2['default'].UI);
    };

    Component.unregister = function unregister(name) {
        _pluginStore2['default']['delete'](name, _pluginTypes2['default'].UI);
    };

    Component.get = function get(name) {
        return _pluginStore2['default'].get(name, _pluginTypes2['default'].UI);
    };

    Component.getAll = function getAll() {
        return _pluginStore2['default'].getAll(_pluginTypes2['default'].UI);
    };

    return Component;
}();

exports['default'] = Component;

},{"../events/evented":9,"../events/events":10,"../utils/dom":23,"../utils/to-camel-case":30,"./plugin-store":19,"./plugin-types":20}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _arrayFind = require('array-find');

var _arrayFind2 = _interopRequireDefault(_arrayFind);

var _pluginStore = require('./plugin-store');

var _pluginStore2 = _interopRequireDefault(_pluginStore);

var _pluginTypes = require('./plugin-types');

var _pluginTypes2 = _interopRequireDefault(_pluginTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file MediaSourceHandler ???????????????????????? Media Source Extension ?????????????????????????????????
                                                                                                                                                           * @author yuhui06
                                                                                                                                                           * @date 2018/4/2
                                                                                                                                                           * @desc
                                                                                                                                                           *     1) MS ?????????????????? MediaSourceHandler ??????
                                                                                                                                                           *     2) MS ???????????? MediaSourceHandler.register(handler, options) ??????
                                                                                                                                                           *     3) MS ??????????????? canPlay ?????????????????????????????????????????????????????????
                                                                                                                                                           */

var MediaSourceHandler = function () {
    function MediaSourceHandler(player, options) {
        _classCallCheck(this, MediaSourceHandler);

        this.player = player;
        this.options = options;
    }

    MediaSourceHandler.prototype.src = function src(_src) {
        this.player.techCall('setSrc', _src);
    };

    MediaSourceHandler.prototype.play = function play() {
        this.player.techCall('play');
    };

    MediaSourceHandler.prototype.dispose = function dispose() {
        this.player = null;
        this.options = null;
    };

    MediaSourceHandler.canPlay = function canPlay(src, type) {
        return false;
    };

    MediaSourceHandler.register = function register(handler, options) {
        return _pluginStore2['default'].add(handler, options, _pluginTypes2['default'].MS);
    };

    MediaSourceHandler.unregister = function unregister(name) {
        _pluginStore2['default']['delete'](name, _pluginTypes2['default'].MS);
    };

    MediaSourceHandler.getAll = function getAll() {
        return _pluginStore2['default'].getAll(_pluginTypes2['default'].MS);
    };

    MediaSourceHandler.select = function select(src, type) {
        var allMSHandlers = MediaSourceHandler.getAll();
        return (0, _arrayFind2['default'])(allMSHandlers, function (value) {
            return value.canPlay(src, type);
        });
    };

    return MediaSourceHandler;
}();

exports['default'] = MediaSourceHandler;

},{"./plugin-store":19,"./plugin-types":20,"array-find":1}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _lodash = require('lodash.values');

var _lodash2 = _interopRequireDefault(_lodash);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _mediaSourceHandler = require('./media-source-handler');

var _mediaSourceHandler2 = _interopRequireDefault(_mediaSourceHandler);

var _plugin = require('./plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _pluginTypes = require('./plugin-types');

var _pluginTypes2 = _interopRequireDefault(_pluginTypes);

var _guid = require('../utils/guid');

var _toCamelCase = require('../utils/to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var UI = _pluginTypes2['default'].UI,
    MS = _pluginTypes2['default'].MS,
    OTHERS = _pluginTypes2['default'].OTHERS; /**
                                               * @file plugin-store.js ??????????????????
                                               * @author yuhui06
                                               * @date 2018/4/8
                                               */

function getInitialStore() {
    var _ref;

    return _ref = {}, _ref[UI] = {}, _ref[MS] = {}, _ref[OTHERS] = {}, _ref;
}

exports['default'] = {
    store: getInitialStore(),
    validate: function validate(plugin, type) {
        switch (type) {
            case UI:
                // return Component.isPrototypeOf(plugin);
                return plugin && plugin.prototype instanceof _component2['default'];
            case MS:
                // return MediaSourceHandler.isPrototypeOf(plugin);
                return plugin && plugin.prototype instanceof _mediaSourceHandler2['default'];
            case OTHERS:
                // return Plugin.isPrototypeOf(plugin);
                return plugin && plugin.prototype instanceof _plugin2['default'];
            default:
                return false;
        }
    },
    has: function has(name, type) {
        return this.store[type] && this.store[type][name];
    },
    add: function add(plugin) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var type = arguments[2];

        if (this.validate(plugin, type)) {
            var name = options.name || (0, _toCamelCase2['default'])(plugin.name) || 'plugin_' + (0, _guid.newGUID)();
            plugin._displayName = name;

            if (!this.has(name, type)) {
                this.store[type][name] = plugin;
            }

            return true;
        } else {
            return false;
        }
    },
    'delete': function _delete(name, type) {
        if (this.has(name, type)) {
            delete this.store[type][name];
        }
    },
    clear: function clear() {
        this.store = getInitialStore();
    },
    get: function get(name, type) {
        if (this.has(name, type)) {
            return this.store[type][name];
        }
    },
    getAll: function getAll(type) {
        switch (type) {
            case UI:
                return (0, _lodash2['default'])(this.store[UI]);
            case MS:
                return (0, _lodash2['default'])(this.store[MS]);
            case OTHERS:
                return (0, _lodash2['default'])(this.store[OTHERS]);
            default:
                var allPlugins = [];
                for (var _type in this.store) {
                    if (this.store.hasOwnProperty(_type)) {
                        allPlugins.concat((0, _lodash2['default'])(this.store[_type]));
                    }
                }
                return allPlugins;
        }
    }
};

},{"../utils/guid":25,"../utils/to-camel-case":30,"./component":17,"./media-source-handler":18,"./plugin":21,"./plugin-types":20,"lodash.values":6}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;
/**
 * @file plugin-types ??????????????????
 * @author yuhui06
 * @date 2018/4/8
 */

exports['default'] = {
  UI: 'UI',
  MS: 'MS',
  OTHERS: 'plugin'
};

},{}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _pluginStore = require('./plugin-store');

var _pluginStore2 = _interopRequireDefault(_pluginStore);

var _pluginTypes = require('./plugin-types');

var _pluginTypes2 = _interopRequireDefault(_pluginTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file ??????????????????
                                                                                                                                                           * @author yuhui06
                                                                                                                                                           * @date 2018/4/8
                                                                                                                                                           * @desc
                                                                                                                                                           *    1) ???????????????????????????
                                                                                                                                                           *    2) ???????????? Plugin.register(class, options) ??????
                                                                                                                                                           */

var Plugin = function () {
    function Plugin(player) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Plugin);

        this.player = player;
        this.options = options;

        this.dispose = this.dispose.bind(this);
        this.player.on('dispose', this.dispose);
    }

    Plugin.prototype.dispose = function dispose() {
        this.player = null;
        this.options = null;
    };

    Plugin.register = function register(plugin, options) {
        _pluginStore2['default'].add(plugin, options, _pluginTypes2['default'].OTHERS);
    };

    Plugin.unregister = function unregister(name) {
        _pluginStore2['default']['delete'](name, _pluginTypes2['default'].OTHERS);
    };

    Plugin.get = function get(name) {
        _pluginStore2['default'].get(name, _pluginTypes2['default'].OTHERS);
    };

    Plugin.getAll = function getAll() {
        return _pluginStore2['default'].getAll(_pluginTypes2['default'].OTHERS);
    };

    return Plugin;
}();

exports['default'] = Plugin;

},{"./plugin-store":19,"./plugin-types":20}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = computedStyle;

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * ????????????????????????
 * ???????????? window.getComputedStyle ???????????????
 *
 * @param {Element} el ???????????????????????????????????????
 * @param {string} prop ??????????????????
 * @return {string} ?????????
 *
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function computedStyle(el, prop) {
    if (!el || !prop) {
        return '';
    }

    if (typeof _window2['default'].getComputedStyle === 'function') {
        var styleCollection = _window2['default'].getComputedStyle(el);
        return styleCollection ? styleCollection[prop] : '';
    }

    return el.currentStyle && el.currentStyle[prop] || '';
} /**
   * @file ??????????????????????????????
   * @author yuhui06@baidu.com
   * @date 2017/11/3
   */

},{"global/window":4}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.$$ = exports.$ = undefined;
exports.isReal = isReal;
exports.isEl = isEl;
exports.createQuerier = createQuerier;
exports.createEl = createEl;
exports.createElement = createElement;
exports.textContent = textContent;
exports.normalizeContent = normalizeContent;
exports.isTextNode = isTextNode;
exports.prependTo = prependTo;
exports.parent = parent;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.setAttributes = setAttributes;
exports.getAttributes = getAttributes;
exports.getAttribute = getAttribute;
exports.setAttribute = setAttribute;
exports.removeAttribute = removeAttribute;
exports.blockTextSelection = blockTextSelection;
exports.unblockTextSelection = unblockTextSelection;
exports.getBoundingClientRect = getBoundingClientRect;
exports.findPosition = findPosition;
exports.getPointerPosition = getPointerPosition;
exports.emptyEl = emptyEl;
exports.appendContent = appendContent;
exports.insertContent = insertContent;
exports.replaceContent = replaceContent;

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _obj = require('./obj');

var _computedStyle = require('./computed-style');

var _computedStyle2 = _interopRequireDefault(_computedStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * ?????????????????????????????????????????????????????????
 *
 * @inner
 *
 * @param {string} str ?????????????????????
 * @return {boolean} ??????????????????????????????
 */
function isNonBlankString(str) {
    return typeof str === 'string' && /\S/.test(str);
}

/**
 * ????????????????????????????????????????????????
 *
 * @inner
 *
 * @param {string} str ?????????????????????
 * @throws {Error}
 */
/**
 * @file dom ?????? api
 * @author yuhui06@baidu.com
 * @date 2017/11/2
 */

function throwIfWhitespace(str) {
    if (/\s/.test(str)) {
        throw new Error('class has illegal whitespace characters');
    }
}

/**
 * ????????????????????????????????????????????????????????? className ????????????????????????????????? className
 *
 * @inner
 *
 * @param {string} className ??????????????????
 * @return {Regexp} ??????????????????????????????????????????????????? className ????????????
 */
function classRegExp(className) {
    return new RegExp('(^|\\s+)' + className + '($|\\s+)');
}

/**
 * ??????????????????????????????
 *
 * @return {boolean}
 */
function isReal() {
    // IE 9 ?????????DOM ??????????????? typeof ????????? 'object' ????????? 'function'
    // ??????????????? 'undefined' ??????
    return typeof _document2['default'].createElement !== 'undefined';
}

/**
 * ??????????????????????????? DOM element
 *
 * @param {Mixed} value ??????????????????
 * @return {boolean} ????????? DOM element
 */
function isEl(value) {
    return (0, _obj.isObject)(value) && value.nodeType === 1;
}

/**
 * ???????????? DOM ??????????????????????????????????????????????????????????????????????????????????????????
 *
 * @param {string} method ?????????
 * @return {Function} ?????? DOM ????????????
 */
function createQuerier(method) {
    return function (selector, context) {
        if (!isNonBlankString(selector)) {
            return _document2['default'][method](null);
        }
        if (isNonBlankString(context)) {
            context = _document2['default'].querySelector(context);
        }

        var ctx = isEl(context) ? context : _document2['default'];

        return ctx[method] && ctx[method](selector);
    };
}

/**
 * ?????? DOM ??????
 *
 * @param {string=} tagName ?????????????????????????????? div
 * @param {Object=} properties ?????? prop ???????????????????????????
 * @param {Object=} attributes ?????? attr ???????????????????????????
 * @param {string|Element|TextNode|Array|Function=} content ?????????????????????????????????
 * @return {Element} el ???????????????
 */
function createEl() {
    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var content = arguments[3];

    var el = _document2['default'].createElement(tagName);

    if (properties == null) {
        properties = {};
    }

    if (attributes == null) {
        attributes = {};
    }

    Object.keys(properties).forEach(function (propName) {
        var val = properties[propName];

        // ????????????????????????????????????
        if (propName.indexOf('aria-') !== -1 || propName === 'role' || propName === 'type') {

            el.setAttribute(propName, val);
        } else if (propName === 'textContent') {
            // textContent ?????????????????????????????????????????????????????????
            textContent(el, val);
        } else {
            el[propName] = val;
        }
    });

    Object.keys(attributes).forEach(function (attrName) {
        el.setAttribute(attrName, attributes[attrName]);
    });

    if (content) {
        appendContent(el, content);
    }

    return el;
}

/**
 * ????????????????????????????????? props ??? ?????????
 *
 * vjs ??? createEl ??? props ??? attrs ???????????????????????????????????????????????????????????????
 * ????????????????????? child ?????????????????????????????? attrs ????????????????????????
 *
 * @todo ??????????????????????????????????????????????????????????????? createEl ????????????
 *
 * @param {string} tagName DOM ???????????????
 * @param {Object=} props ??????
 * @param {...Element|string} child ???????????????????????????????????????????????????????????????????????????
 * @return {Element} el ???????????????
 */
function createElement() {
    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = _document2['default'].createElement(tagName);

    if (props == null) {
        props = {};
    }
    Object.keys(props).forEach(function (propName) {
        setAttribute(el, propName === 'className' ? 'class' : propName, props[propName]);
        el[propName] = props[propName];
    });

    for (var _len = arguments.length, child = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        child[_key - 2] = arguments[_key];
    }

    if (child) {
        appendContent(el, child);
    }

    return el;
}

/**
 * ?????? DOM ??????????????????????????????????????????????????????????????????
 *
 * @param {Element} el ??????????????????????????? DOM ??????
 * @param {string} text ??????????????????
 * @return {Element} el ???????????? DOM ??????
 */
function textContent(el, text) {
    if (typeof el.textContent === 'undefined') {
        el.innerText = text;
    } else {
        el.textContent = text;
    }

    return el;
}

/**
 * ??????????????? DOM ???????????????????????????
 *
 * ?????? createTextNode ????????? createElement ?????? XSS ??????
 *
 * @param {string|Element|TextNode|Array|Function} content
 *        - string: ???????????? text node
 *        - Element/TextNode: ??????????????????
 *        - Array: ????????????????????????
 *        - Function: ??????????????????????????????
 * @return {Array} ?????????????????????
 */
function normalizeContent(content) {
    if (typeof content === 'function') {
        content = content();
    }

    return (Array.isArray(content) ? content : [].concat(content)).map(function (value) {
        if (typeof value === 'function') {
            value = value();
        }

        if (isEl(value) || isTextNode(value)) {
            return value;
        }

        if (isNonBlankString(value)) {
            return _document2['default'].createTextNode(value);
        }
    }).filter(function (value) {
        return !!value;
    });
}

/**
 * ??????????????????????????? textNode
 *
 * @param {Mixed} value ??????????????????
 * @return {boolean} ????????? textNode
 */
function isTextNode(value) {
    return (0, _obj.isObject)(value) && value.nodeType === 3;
}

/**
 * ????????????????????????????????????????????????????????????
 *
 * @param {Element} child ??????????????????
 * @param {Element} parent ??????????????????
 */
function prependTo(child, parent) {
    if (parent.firstChild) {
        parent.insertBefore(child, parent.firstChild);
    } else {
        parent.appendChild(child);
    }
}

/**
 * ?????????????????????????????????????????????????????????
 *
 * @param {Element} el ?????????????????????????????????
 * @param {string} classForSelector ??????????????? class ?????????
 * @return {Element|null} ??????????????????????????????????????????
 */
function parent(el, classForSelector) {
    var result = null;
    while (el && el.parentNode) {
        if (hasClass(el.parentNode, classForSelector)) {
            result = el.parentNode;
            el = null;
        } else {
            el = el.parentNode;
        }
    }

    return result;
}

/**
 * ???????????????????????????????????? class
 *
 * @param {Element} el ????????????
 * @param {string} classToCheck ???????????? class
 * @return {boolean} ??????????????????????????? class
 */
function hasClass(el, classToCheck) {
    throwIfWhitespace(classToCheck);

    if (el.classList) {
        // node.contains(otherNode)
        return el.classList.contains(classToCheck);
    } else {
        return classRegExp(classToCheck).test(el.className);
    }
}

/**
 * ????????????????????? class
 *
 * @param {Element} el ????????? class ?????????
 * @param {string} classToAdd ???????????? class
 * @return {Element} ????????? class ????????????
 */
function addClass(el, classToAdd) {
    if (el.classList) {
        el.classList.add(classToAdd);
    } else if (!hasClass(el, classToAdd)) {
        el.className = (el.className + ' ' + classToAdd).trim();
    }

    return el;
}

/**
 * ??????????????????????????? class
 *
 * @param {Element} el ????????? class ?????????
 * @param {string} classToRemove ???????????? class
 * @return {Element} ???????????? class ????????????
 */
function removeClass(el, classToRemove) {
    if (hasClass(el, classToRemove)) {
        if (el.classList) {
            el.classList.remove(classToRemove);
        } else {
            el.className = el.className.split(/\s+/).filter(function (className) {
                return className !== classToRemove;
            }).join(' ');
        }
    }

    return el;
}

/**
 * ?????????????????????????????????????????? class
 *
 * @param {Element} el ???????????? class ?????????
 * @param {string} classToToggle ????????????????????? class
 * @param {Function|boolean=} predicate ??????????????? class ????????????????????????????????????
 * @return {Element} ????????? class ????????????
 */
function toggleClass(el, classToToggle, predicate) {
    // IE ???????????? el.classList.toggle ????????????????????????
    // ??????????????????????????????????????? add/remove
    var has = hasClass(el, classToToggle);

    if (typeof predicate === 'function') {
        predicate = predicate(el, classToToggle);
    }

    if (typeof predicate !== 'boolean') {
        predicate = !has;
    }

    if (predicate === has) {
        return;
    }

    if (predicate) {
        addClass(el, classToToggle);
    } else {
        removeClass(el, classToToggle);
    }

    return el;
}

/**
 * ?????????????????????
 *
 * @param {Element} el ????????????????????????
 * @param {Object} attributes ????????????????????????
 */
function setAttributes(el, attributes) {
    Object.keys(attributes).forEach(function (attrName) {
        var attrValue = attributes[attrName];

        if (attrValue == null || attrValue === false) {
            el.removeAttribute(attrName);
        } else {
            el.setAttribute(attrName, attrValue === true ? '' : attrValue);
        }
    });
}

/**
 * ????????????????????????????????? DOM ??? NamedNodeMap ????????? key/value ?????????
 *
 * @param {Element} el ????????????????????????
 * @return {Object} ??? key/value ?????????????????????
 * @desc
 *      1) boolean ????????????????????? true/false
 */
function getAttributes(el) {
    var collection = {};

    // ??????????????? boolean ?????????
    // ????????????????????????????????? typeof ??? boolean???????????????
    // ???????????????????????????????????????????????????
    var knownBooleans = ['autoplay', 'controls', 'playsinline', 'webkit-playsinline', 'loop', 'muted', 'default', 'defaultMuted'];

    if (el && el.attributes && el.attributes.length) {
        var attrs = el.attributes;

        for (var i = 0; i < attrs.length; i++) {
            var attrName = attrs[i]['name'];
            var attrValue = attrs[i]['value'];

            if (typeof el[attrName] === 'boolean' || (0, _lodash2['default'])(knownBooleans, attrName)) {
                attrValue = attrValue !== null;
            }

            collection[attrName] = attrValue;
        }
    }

    return collection;
}

/**
 * ??????????????????????????????element.getAttribute ???????????????
 *
 * @param {Element} el ????????????????????????
 * @param {string} attribute ?????????????????????
 * @return {string} ??????????????????
 */
function getAttribute(el, attribute) {
    return el.getAttribute(attribute);
}

/**
 * ??????????????????????????? element.setAttribute ???????????????
 *
 * @param {Element} el ????????????????????????
 * @param {string} attr ??????????????????
 * @param {Mixed} value ????????????????????????
 */
function setAttribute(el, attr, value) {
    if (value === false) {
        removeAttribute(el, attr);
    } else {
        // ??????????????????????????? "true" ?????????????????????????????????????????????????????????
        // ??? controls = "true" => controls
        el.setAttribute(attr, value === true ? '' : value);
    }
}

/**
 * ?????????????????????????????? element.removeAttribute ???????????????
 *
 * @param {Element} el ????????????????????????
 * @param {string} attribute ?????????????????????
 */
function removeAttribute(el, attribute) {
    el.removeAttribute(attribute);
}

/**
 * ???????????????????????????????????????????????????????????????
 */
function blockTextSelection() {
    _document2['default'].body.focus();
    _document2['default'].onselectstart = function () {
        return false;
    };
}

/**
 * ????????????????????????????????????
 */
function unblockTextSelection() {
    _document2['default'].onselectstart = function () {
        return true;
    };
}

/**
 * ???????????? getBoundingClientRect ??????????????????????????????
 *
 * ????????????????????????????????? IE8??????????????????????????????????????????????????????
 *
 * ???????????????????????????????????? ClientRect/DOMRect ?????????????????????????????????????????????????????????????????????
 * ????????? ClientReact ???????????????????????????????????? x ??? y ?????????????????????????????????????????????????????????
 *
 * @param {Element} el ????????? ClientRect ???????????????
 * @return {Object|undefined}
 */
function getBoundingClientRect(el) {
    // TODO ???????????????????????? parentNode
    if (el && el.getBoundingClientRect && el.parentNode) {
        var rect = el.getBoundingClientRect();
        var result = {};

        ['top', 'right', 'bottom', 'left', 'width', 'height'].forEach(function (attr) {
            if (rect[attr] !== undefined) {
                result[attr] = rect[attr];
            }
        });

        if (!result.height) {
            result.height = parseFloat((0, _computedStyle2['default'])(el, 'height'));
        }

        if (!result.width) {
            result.width = parseFloat((0, _computedStyle2['default'])(el, 'width'));
        }

        return result;
    }
}

/**
 * ????????????????????????????????????????????????left, top???
 *
 * @see http://ejohn.org/blog/getboundingclientrect-is-awesome/
 *
 * @param {Element} el ????????????????????????
 * @return {Object} ???????????????????????????
 *
 * @desc
 *      1) clientLeft/clientTop ????????????????????????/?????????????????????????????? padding ??? margin ??????
 */
function findPosition(el) {
    var box = getBoundingClientRect(el);

    if (!box) {
        return { left: 0, top: 0 };
    }

    var docEl = _document2['default'].documentElement;
    var body = _document2['default'].body;

    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var scrollLeft = _window2['default'].pageXOffset || body.scrollLeft;
    var left = box.left + scrollLeft - clientLeft;

    var clientTop = docEl.clientLeft || body.clientLeft || 0;
    var scrollTop = _window2['default'].pageYOffset || body.scrollTop;
    var top = box.top + scrollTop - clientTop;

    // ????????????????????????????????????????????????????????????????????????
    return {
        left: Math.round(left),
        top: Math.round(top)
    };
}

/**
 * x and y coordinates for a dom element or mouse pointer
 * ?????????????????????
 *
 * @typedef {Object} DOM~Coordinates
 *
 * @property {number} x  ??????????????????????????????????????????
 * @property {number} y  ??????????????????????????????????????????
 */
/**
 * ????????????????????????????????????????????????????????????????????????
 *
 * @param {Element} el ??????????????????
 * @param {Event} event ????????????
 * @return {DOM~Coordinates}
 * @desc
 *      1) offsetWidth/offsetHeight: ???????????????????????? border padding width/height scrollbar
 *      2) pageX/pageY: ????????? x/y ?????????????????? document?????????????????????????????????????????????????????????????????????????????????
 *      3) changedTouches: touch ????????????????????????
 */
function getPointerPosition(el, event) {
    var box = findPosition(el);
    var boxW = el.offsetWidth;
    var boxH = el.offsetHeight;
    var boxY = box.top;
    var boxX = box.left;

    var pageX = event.pageX;
    var pageY = event.pageY;

    if (event.changedTouches) {
        pageX = event.changedTouches[0].pageX;
        pageY = event.changedTouches[0].pageY;
    }

    return {
        x: Math.max(0, Math.min(1, (pageX - boxX) / boxW)),
        y: Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH))
    };
}

/**
 * ??????????????????
 *
 * @param {Element} el ??????????????????
 * @return {Element} ?????????????????????????????????
 */
function emptyEl(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }

    return el;
}

/**
 * ????????????????????????
 *
 * @param {Element} el ?????????
 * @param {string|Element|TextNode|Array|Function} content ????????????????????????????????? normalizeContent ??????
 * @return {Element} ???????????????????????????
 */
function appendContent(el, content) {
    normalizeContent(content).forEach(function (node) {
        return el.appendChild(node);
    });
    return el;
}

/**
 * ?????????????????????
 * ??????????????????????????????
 *
 * @param {Element} el ?????????
 * @param {string|Element|TextNode|Array|Function} content
 *        ?????? normalizeContent ??????????????? {@link: dom:normalizeContent}
 * @return {Element} el ????????????????????????
 */
function insertContent(el, content) {
    return appendContent(emptyEl(el), content);
}

/**
 * ??? insertContent
 * insertContent ??? vjs ???????????????????????????????????????????????????????????????
 *
 * @todo ???????????????????????? insertContent ???????????????????????????????????? vjs ??????????????????;
 *
 * @param {Element} el ?????????
 * @param {string|Element|TextNode|Array|Function} content
 *        ?????? normalizeContent ??????????????? {@link: dom:normalizeContent}
 * @return {Element} el ????????????????????????
 */
function replaceContent(el, content) {
    return appendContent(emptyEl(el), content);
}

/**
 * ???????????????????????????????????????????????????????????????
 *
 * @const
 *
 * @type {Function}
 * @param {string} selector css ????????????????????????????????? querySelector ????????????????????????
 * @param {Element|string=} ???????????????????????????????????? document
 * @return {Element|null} ????????????????????? null
 */
var $ = exports.$ = createQuerier('querySelector');

/**
 * ??????????????????????????????????????????????????????????????????
 *
 * @const
 *
 * @type {Function}
 * @param {string} selector css ????????????????????????????????? querySelectorAll ????????????????????????
 * @param {Element|string=} ???????????????????????????????????? document
 * @return {NodeList} ????????????????????????????????????????????????????????????????????????
 */
var $$ = exports.$$ = createQuerier('querySelectorAll');

},{"./computed-style":22,"./obj":29,"global/document":3,"global/window":4,"lodash.includes":5}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  touch: 'ontouchend' in _document2['default']
}; /**
    * @file ???????????????????????????????????????
    * @author yuhui06
    * @date 2018/3/8
    */

},{"global/document":3}],25:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.newGUID = newGUID;
/**
 * @file guid ????????????
 * @author yuhui06@baidu.com
 * @date 2017/11/3
 */

var guid = 1;

/**
 * ?????????????????????????????? ID
 *
 * @return {number} ?????? ID
 */
function newGUID() {
  return guid++;
}

},{}],26:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = log;
/**
 * @file log.js log...log....loggggg
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/16
 */

/**
 * ??????????????????????????????
 *
 * @param {...string|object} ?????????????????????????????????
 * @example
 *    1) log('style: %c,'
 *           + 'just like print in c.'
 *           + 'string: %s,'
 *           + 'int: %i,'
 *           + 'float: %f,'
 *           + 'object: %o',
 *           'color:red;font-style: italic;',
 *           'string',
 *           333,
 *           1.2334,
 *           {});
 */

/* eslint-disable no-console */

function log() {
  var _console;

  (_console = console).log.apply(_console, arguments);
}

log.info = console.info;

log.warn = console.warn;

log.error = console.error;

log.clear = console.clear;

},{}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;
/**
 * @file ?????? MIME Type ?????????
 * @author YuHui<yuhui06@baidu.com>
 * @version 1.0 | YuHui<yuhui06@baidu.com> | 2017/12/14 | initial
 */

exports['default'] = {
    'flv': 'video/x-flv',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'm3u8': 'application/x-mpegURL',
    'ts': 'video/MP2T',
    '3gp': 'video/3gpp',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo',
    'wmv': 'video/x-ms-wmv'
};

},{}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = nomalizeSource;

var _obj = require('./obj');

var _mimeTypeMap = require('./mime-type-map');

var _mimeTypeMap2 = _interopRequireDefault(_mimeTypeMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @const
 * ?????? url ???????????? . ??????????????????
 */
/**
 * @file ???????????????????????? source ??????
 * @author YuHui<yuhui06@baidu.com>
 * @version 1.0 | YuHui<yuhui06@baidu.com> | 2017/12/14 | initial
 */

var MIME_TYPE_REG = /\.([\w]+)$/;

/**
 * ?????? src ???????????????????????????
 *
 * @param {string} src ????????????
 * @return {string|undefined} MIMEType ????????????
 */
function getMIMEType(src) {
    var MIMEType = '';
    if (typeof src === 'string') {
        var matchResult = src.match(MIME_TYPE_REG);
        if (Array.isArray(matchResult)) {
            MIMEType = matchResult[1];
        }
    }

    return _mimeTypeMap2['default'][MIMEType];
}

/**
 * ??????????????? source ??????
 *
 * @param {Object} singleSource ????????? source ??????
 * @param {string} singleSource.src ????????????
 * @param {string=} singleSource.type ???????????????????????????????????????????????????????????????????????????
 * @return {Object} singleSource ??????????????? source ??????
 */
function nomalizeSingleSource(singleSource) {
    if (!(0, _obj.isPlain)(singleSource)) {
        throw new TypeError('SingleSource should be an Object');
    }

    if (typeof singleSource.src !== 'string') {
        throw new TypeError('SingleSource.src should be a string');
    }

    if (singleSource.hasOwnProperty('type') && typeof singleSource.type !== 'string') {
        throw new TypeError('SingleSource.type should be a string');
    }

    if (!singleSource.type) {
        singleSource.type = getMIMEType(singleSource.src);
    }

    return singleSource;
}

/**
 * ????????? source
 *
 * @param {Object|Array} source ???????????? video ???????????? source?????????????????????????????????????????????????????????????????????
 * @return {Array} ??????????????? source
 */
function nomalizeSource(source) {
    if ((0, _obj.isPlain)(source)) {
        return [nomalizeSingleSource(source)];
    } else if (Array.isArray(source)) {
        return source.map(function (value) {
            return nomalizeSingleSource(value);
        });
    } else {
        throw new TypeError('Source should be an Object or an Array which contains Object');
    }
}

},{"./mime-type-map":27,"./obj":29}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.isPlain = isPlain;
exports.each = each;
/**
 * @file Object ????????????
 * @module obj
 * @author yuhui06@baidu.com
 * @date 2017/11/2
 */

/**
 * @callback obj:EachCallback
 *
 * @param {Mixed} value ??????????????? key ???????????????
 * @param {string} key ??????????????? key
 */

/**
 * ????????????????????????????????????????????? null???
 *
 * @param {Mixed} value ??????????????????
 * @return {boolean} ????????????????????????
 * @desc
 *      1) typeof null ????????? object
 */
function isObject(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

/**
 * ????????????????????????????????????????????????
 *
 * @param {Mixed} value ?????? js ??????
 * @return {boolean} ?????????????????????????????????
 */
function isPlain(value) {
  return isObject(value) && Object.prototype.toString.call(value) === '[object Object]' && value.constructor === Object;
}

/**
 * ????????????
 *
 * @param {Object} obj ??????????????????
 * @param {EachCallback} fn ????????????????????????????????????????????? EachCallback ??????
 */
function each(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
}

},{}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = toCamelCase;
/**
 * @file ??????????????????????????????
 * @author yuhui06
 * @date 2018/4/16
 */

// @notice ?????????????????????????????????????????????????????????????????????????????????????????????
function toCamelCase(str) {
    if (typeof str !== 'string') {
        return str;
    }

    return str.charAt(0).toLowerCase() + str.slice(1);
}

},{}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = toTitleCase;
/**
 * @file to-title-case.js
 * @author yuhui06@baidu.com
 * @date 2017/11/3
 */

/**
 * @function toTitleCase
 * @description ??????????????????????????????
 *
 * @param {string} str ?????????????????????????????????
 * @return {string} ???????????????????????????
 */
function toTitleCase(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

},{}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _arrayFind = require('array-find');

var _arrayFind2 = _interopRequireDefault(_arrayFind);

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.values');

var _lodash4 = _interopRequireDefault(_lodash3);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _computedStyle = require('./computed-style');

var _computedStyle2 = _interopRequireDefault(_computedStyle);

var _featureDetector = require('./feature-detector');

var _featureDetector2 = _interopRequireDefault(_featureDetector);

var _guid = require('./guid');

var guid = _interopRequireWildcard(_guid);

var _mimeTypeMap = require('./mime-type-map');

var _mimeTypeMap2 = _interopRequireDefault(_mimeTypeMap);

var _obj = require('./obj');

var obj = _interopRequireWildcard(_obj);

var _toCamelCase = require('./to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

var _toTitleCase = require('./to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
    find: _arrayFind2['default'],
    includes: _lodash2['default'],
    values: _lodash4['default'],
    assign: _objectAssign2['default'],
    computedStyle: _computedStyle2['default'],
    featureDetector: _featureDetector2['default'],
    guid: guid,
    mimeTypeMap: _mimeTypeMap2['default'],
    obj: obj,
    toCamelCase: _toCamelCase2['default'],
    toTitleCase: _toTitleCase2['default']
}; /**
    * @file ?????? utils ?????????????????????
    * @author yuhui06
    * @date 2018/5/6
    */

},{"./computed-style":22,"./feature-detector":24,"./guid":25,"./mime-type-map":27,"./obj":29,"./to-camel-case":30,"./to-title-case":31,"array-find":1,"lodash.includes":5,"lodash.values":6,"object-assign":7}]},{},[15])(15)
});

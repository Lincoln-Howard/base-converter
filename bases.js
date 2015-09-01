// Created by Lincoln Howard for base Converter chrome app
/**
  * The Converter object does the heavy lifting.
  * 
  * @class Converter
  * @static
  */
var Converter = {};
/**
  * The options for bases to convert between.
  * Base option objects have two fields, 'num' and 'chars'.
  * The 'num' field represents the numerical base, 'chars' represets the
  * available characters.
  * The five (currently) supported bases are binary, octal, decimal, dozenal,
  * and hex.
  * 
  * @property base_opts
  * @type {Object}
  */
var base_opts = {
  binary: {
    num: 2,
    chars: "01".split (""),
    delim: "."
  },
  octal: {
    num: 8,
    chars: "01234567".split (""),
    delim: "."
  },
  decimal: {
    num: 10,
    chars: "0123456789".split (""),
    delim: "."
  },
  dozenal: {
    num: 12,
    chars: "0123456789*#".split (""),
    delim: ";"
  },
  hexadecimal: {
    num: 16,
    chars: "0123456789abcdef".split (""),
    delim: "."
  }
}
/**
  * The default base for user input is base 10.
  * 
  * @property base_source
  * @type {int}
  * @default 10
  */
var base_source = base_opts.decimal;
/**
  * The default base for program outpur is base 16 (hex).
  * 
  * @property base_target
  * @type {int}
  * @default 10
  */
var base_target = base_opts.hexadecimal;
/**
  * The source number in decimal.
  * 
  * @property decimal
  * @type {Number}
  */
var decimal = 0;
/**
  * The user input for the source number. This should ALWAYS be a string.
  * 
  * @property source
  * @type {String}
  */
var source = "";
/**
  * The program outpurtfor the source number. This should ALWAYS be a string.
  * 
  * @property target
  * @type {String}
  */
var target = "";
/**
  * Validates the text in the source. Removes all invalid characters.
  * 
  * @method validate
  * @return {String []} Invalid characters.
  */
function validate () {
  // get the character list
  var list = source.split ("");
  // keep track of removed characters
  var removed = [];
  // loop over character list
  for (var i = 0; i < list.length; i++)
    // check against accepted characters
    if ((base_source.chars.indexOf (list [i]) == -1) && (list [i] != base_source.delim))
      // remove the invalid character
      removed.push (list.splice (i, 1, ""));
  // loop until all improper decimals are removed
  while (list.indexOf (base_source.delim) != list.lastIndexOf (base_source.delim))
    // remove all decimals
    removed.push (list.splice (list.indexOf (base_source.delim), 1, ""));
  // check to make sure we don't end with a decimal
  if (list [list.length - 1] == base_source.delim)
    // remove the unnecessary decimal
    list.push ("0");
  // join it all back together
  source = list.join ("");
  // return the removed characters
  return removed;
}
/**
  * Conversion to decimal. Assumes validated text.
  * 
  * @method convert_to_dec
  */
function parse_decimal () {
  // reset decimal value
  decimal = 0;
  // get the integer portion of the source number
  var whole = source.split (base_source.delim) [0].split ("");
  whole.reverse ();
  // loop over whole number characters
  for (var i = 0; i < whole.length; i++) {
    // add the proper amount to decimal
    decimal += Math.pow (base_source.num, i) * base_source.chars.indexOf (whole [i]);
   }
   // check that we have a decimal
   if (source.split (base_source.delim).length == 1) return;
  // get the fractional portion of the source number
  var fract = source.split (base_source.delim) [1].split ("");
  fract.reverse ();
  // loop over fractional values
  for (var i = 0; i < fract.length; i++) {
    // add the proper amount to decimal
    decimal += Math.pow (base_source.num, - i - 1) * base_source.chars.indexOf (fract [i]);
  }
}
/**
  * Do all the work for conversion.
  * 
  * @method convert
  */
function convert () {
  // reset target
  target = "";
  // set it up
  validate ();
  parse_decimal ();
  // get the target base
  var KT = base_target.num;
  // get the integer portion of the number
  var whole = decimal - decimal % 1;
  // get the decimal portion of the number
  var fract = decimal - whole;
  // loop through integer portion
  var i = 0;
  while (whole != 0) {
    var remainder = whole % KT;
    whole = (whole / KT) - ((whole / KT) % 1);
    target = base_target.chars [remainder] + target;
    i++;
  }
  // add decimal place
  if (fract == 0) return;
  target += base_target.delim;
  // loop through fractional portion
  i = 0;
  while ((fract > 0) && (i < 10)) {
    var n0 = Math.pow (KT, -1 - i);
    var div = (fract / n0) - (fract / n0) % 1;
    console.log (div);
    fract = fract % (n0 * div);
    target +=base_target.chars [div];
    i++;
  }
}
// make getters for all required props
Object.defineProperty (Converter, "base_source", {
  enumerable: true,
  get: function () {return base_source},
  set: function (v) {base_source = base_opts [v]}
});
Object.defineProperty (Converter, "base_target", {
  enumerable: true,
  get: function () {return base_target},
  set: function (v) {base_target = base_opts [v]}
});
Object.defineProperty (Converter, "source", {
  enumerable: true,
  get: function () {return source},
  set: function (v) {source = v}
});
Object.defineProperty (Converter, "target", {
  enumerable: true,
  get: function () {return target}
});
Object.defineProperty (Converter, "decimal", {
  enumerable: true,
  get: function () {return decimal}
});
Object.defineProperty (Converter, "validate", {
  enumerable: true,
  get: function () {return validate}
});
Object.defineProperty (Converter, "parse_decimal", {
  enumerable: true,
  get: function () {return parse_decimal}
});
Object.defineProperty (Converter, "convert", {
  enumerable: true,
  get: function () {return convert}
});
// export Converter
try {
  exports.Converter = Converter;
} catch (e) {
  console.log ("In browser not node");
}
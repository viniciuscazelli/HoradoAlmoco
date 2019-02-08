"use strict";
var utilCase;
(function (utilCase) {
    function textValidate(text, regex) {
        var patt = new RegExp(regex, "g");
        var myArray = text.match(patt);
        // console.log(myArray);
        return myArray.length == text.length;
    }
    utilCase.textValidate = textValidate;
})(utilCase = exports.utilCase || (exports.utilCase = {}));

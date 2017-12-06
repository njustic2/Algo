/* ------------------------------------------- */
/*	HexConverter.JS
/*	Version 1.0
/*	A Library for converting hex strings
/*	Author: Jordan Wild
/*	September 2014
/* ------------------------------------------- */

(function () {
   'use strict';
}());

var HexConverter = function(){
	this.toHexArray = function(str) { 
	    var result = new Array(str.length/2);
	    var resultLength = result.length;
	    for (var i = 0; i < resultLength; str = str.substring(2, str.length), i++) {
	    	result[i] = parseInt(str.substring(0, 2), 16);
	    }
        return result;
    };

    this.to2dHexArray = function(str) {
		var block = [[],[],[],[]];
		for (var i = 0; i < 16; i++)
		{
			block[i%4][Math.floor(i/4)] = parseInt(str.substring(0, 2), 16);
			str = str.substring(2, str.length);
		}
		return block;
    };

    this.blockToArray = function(block) {
    	var output = new Array(block.length);
    	for (var i = 0; i < block.length * 4; i++)
    		output[i] = block[i%block.length][Math.floor(i/4)];
    	
    	return output;
    };

    this.toHexString = function(block) {
	    var result = "";

	    for (var i = 0; i < block.length * 4; i++) {
	        result += ('0' + block[i%block.length][Math.floor(i/4)].toString(16)).slice(-2);
	    }

	    return result;
	};
}
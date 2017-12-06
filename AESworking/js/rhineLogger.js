/* ------------------------------------------- */
/*	RhineLogger.JS
/*	Version 1.0
/*	A logger for logging round info for AES
/*	Author: Jordan Wild
/*	September 2014
/* ------------------------------------------- */


(function () {
   'use strict';
}());

var RhineLogger = function(numRounds) {
	var logger = new Array(numRounds+1);
	for (var i = 0; i <= numRounds; i++)
		logger[i] = new Array(5);

	this.logStep = function(block, round, step) {
		var result = [[],[],[],[]];
		for (var i = 0; i < block.length; i++)
			for (var j = 0; j < block[0].length; j++)
				result[i][j] = block[i][j].toString(16);

		logger[round][step] = result;
	}

	this.logKey = function(keyBlock, round, step) {
		logger[round][step] = keyBlock;
	}

	this.getRoundInfo = function() {
		return logger;
	}

}


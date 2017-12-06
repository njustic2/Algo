
var roundData;

var encryptHeaders = '<td>Start</td><td>SubBytes</td><td>ShiftRows</td><td>MixColumns</td><td>RoundKey</td>';
var decryptHeaders = '<td>Start</td><td>ShiftRows</td><td>SubBytes</td><td>RoundKey</td><td>MixColumns</td>';

var encrypt = function() {
		document.getElementById('nextButton').disabled = false;
		document.getElementById('prevButton').disabled = true;
		document.getElementById('roundNumber').innerHTML = '0';
		document.getElementById('roundInfoHeader').innerHTML = encryptHeaders;

		var input = encode_utf8(document.getElementById('textHolder').value);
		var key = encode_utf8(document.getElementById('keyHolder').value);

		var rhino = new RhineDoll();
		var output = rhino.encrypt(input, key);
		roundData = output.rounds;

		
		updateTables(roundData[0]);
		document.getElementById('roundTotal').innerHTML = ' / ' + (roundData.length - 1).toString();
		document.getElementById('outputHolder').value = output.result;
		return output;
};

var decrypt = function() {
	document.getElementById('nextButton').disabled = true;
	document.getElementById('prevButton').disabled = false;
	document.getElementById('roundInfoHeader').innerHTML = decryptHeaders;

	var input = encode_utf8(document.getElementById('outputHolder').value);
	var key = encode_utf8(document.getElementById('keyHolder').value);

	var rhino = new RhineDoll();
	var output = rhino.decrypt(input, key);
	roundData = output.rounds;
	document.getElementById('roundNumber').innerHTML = (roundData.length - 1).toString();

	updateTables(roundData[roundData.length - 1]);
	document.getElementById('roundTotal').innerHTML = ' / ' + (roundData.length - 1).toString();
	document.getElementById('textHolder').value = output.result;
	return output;


};

var next = function() {
	var label = document.getElementById('roundNumber');
	var roundNum = parseInt(label.innerHTML) + 1;
	label.innerHTML = roundNum;
	if(roundNum == roundData.length-1)
		nextButton.disabled = true;
	document.getElementById('prevButton').disabled = false;
	updateTables(roundData[roundNum]);
};

var prev = function() {
	var label = document.getElementById('roundNumber');
	var roundNum = parseInt(document.getElementById('roundNumber').innerHTML) - 1;
	label.innerHTML = roundNum;
	if(roundNum === 0)
		document.getElementById('prevButton').disabled = true;
	document.getElementById('nextButton').disabled = false;
	updateTables(roundData[roundNum]);
};

var blankTable = '<tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody>';

var updateTables = function(round) {
	for(var i=0; i < round.length; i++) {
		if (!round[i]) {
			document.getElementById('table-' + i).innerHTML = blankTable;
		} else {
			var tableBody = '<tbody>';
			for(var j=0; j < 4; j++) {
				tableBody += '<tr>';
				for(var k=0; k < 4; k++) {
					tableBody += '<td> ' + round[i][j][k] + ' </td>';
				}
				tableBody += '</tr>';
			}
			tableBody += '</tbody>';
			document.getElementById('table-' + i).innerHTML = tableBody;
		}

	}
};

var encode_utf8 = function(s) {
	var re = /^[0-9A-Fa-f]+$/;
	if (!re.exec(s))
		return unescape(encodeURIComponent(s));
	else
		return s;
};

var loadExample = function(ex) {
	document.getElementById('textHolder').value = examples[ex].input;
	document.getElementById('keyHolder').value = examples[ex].key;

};

var examples = [
	{input:'3243f6a8885a308d313198a2e0370734', key:'2b7e151628aed2a6abf7158809cf4f3c'},
	{input:'00112233445566778899aabbccddeeff', key:'000102030405060708090a0b0c0d0e0f'},
	{input:'00112233445566778899aabbccddeeff', key:'000102030405060708090a0b0c0d0e0f1011121314151617'},
	{input:'00112233445566778899aabbccddeeff', key:'000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'}
];

document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
    	case 37: //left
    		if (roundData && !document.getElementById('prevButton').disabled)
    			prev();
        break;

        case 39: //right
        	if (roundData && !document.getElementById('nextButton').disabled)
    			next();
        break;

        default: return;
    }
    e.preventDefault();
};

var inputKeyUp = function(e) {
	e.which = e.which || e.keyCode;
    if(e.which == 13) {
        encrypt();
    }
};

var outputKeyUp = function(e) {
	e.which = e.which || e.keyCode;
    if(e.which == 13) {
        decrypt();
    }
};


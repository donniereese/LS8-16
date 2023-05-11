const grammer = [ 
//	inst				op			type				argTypes
// --------------------------------------------------------
	['INIT',			'00',		'cmd',			[]],
	['INITALK',		'FE',		'cmd',			[]],
	['SETR',			'01',		'setAddr',	['REG_ADDR']],
	['GETR',			'6F',		'getVal',		[]],
	['SAVE',			'04',		'prgCpy',		[]],
	['LOAD',			'07',		'prgLd',		[]],
	['PRN',				'06',		'prnBuf',		[]],
	['HALT',			'00',		'cmd',			[]],
	['PRAR',			'41',		'prnChar',	['REG_VAL']],
	['PRAM',			'42',		'prnChar',	['MEM_VAL']],
	['LD',				'08',		'setVal',		['MEM_VAL']],
	['ST',]
]

module.exports = grammer;
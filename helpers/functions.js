
const getDetectVariableTypeFunc = type => {
	return v => toString.call( v ) === `[object ${ type }]`
};

export const ucfirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

export const isFunction = getDetectVariableTypeFunc( "Function" );

export const isObject = getDetectVariableTypeFunc( "Object" );

export const isNumber = getDetectVariableTypeFunc( "Number" ); 

export const isString = getDetectVariableTypeFunc( "String" );

export const getTranslated = (field, locale) => isObject( field ) ? ( field[ locale ] || "" ) : field;

export const addZeroIfNeeded = num => num <= 9 ? `0${num}` : num;
export const ucfirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

export const isFunction = func => toString.call( func ) === "[object Function]";

export const isObject = obj = toString.call( obj ) === "[object Object]";

export const getTranslated = (field, locale) => isObject( field ) ? ( field[ locale ] || "" ) : field;
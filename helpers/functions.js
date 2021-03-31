export const ucfirst = str => str.substr(0, 1).toUpperCase() + str.substr(1);

export const isFunction = func => toString.call( func ) === "[object Function]";
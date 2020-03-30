/**
 * Wrapper function for wrapping component conditionally
 * @param {boolean} condition Wrapper condition
 * @param {component} wrapper Wrapper component
 * @param {any} children Wrapped children
 */
export const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

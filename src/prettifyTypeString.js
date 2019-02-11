/**
 * @typedef {{
 *      tabSize?: number,
 *      tabSymbol?: string,
 *      breakSymbol?: string
 * }} Params
 */

const defaultParams = {
  tabSize: 4,
  tabSymbol: ' ',
  breakSymbol: '\n',
};

/**
 * Insert tabs and line breaks for nested custom types
 *
 * @param {string} typeString
 * @param {Params} customParams
 * @returns {string}
 */
export default function prettifyTypeString(typeString, customParams = {}) {
  const normalizedString = typeString.replace(/,\s/g, ',');
  const { tabSize, tabSymbol, breakSymbol } = {
    ...defaultParams,
    ...customParams,
  };
  const tab = getTab(tabSymbol, tabSize);

  let depth = 0;
  let prettyString = '';

  for (let i = 0; i < normalizedString.length; i += 1) {
    const char = normalizedString.charAt(i);

    switch (char) {
      case '{':
        depth += 1;
        prettyString += `${char}${breakSymbol}${tab(depth)}`;
        break;
      case '}':
        depth -= 1;
        prettyString += `${breakSymbol}${tab(depth)}${char}`;
        break;
      case ',':
        prettyString += `${char}${breakSymbol}${tab(depth)}`;
        break;
      default:
        prettyString += char;
    }
  }
  return prettyString;
}

/**
 * Returns function to indent
 *
 * @param {string} tabSymbol
 * @param {number} tabSize
 * @returns {function(number): string}
 */
function getTab(tabSymbol, tabSize) {
  return function size(value = 1) {
    return tabSymbol.repeat(value * tabSize);
  };
}

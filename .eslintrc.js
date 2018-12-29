module.exports = {
    extends: ['airbnb-base', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
    plugins: [
        'prettier'
    ],
    rules: {
        'prettier/prettier': ['error', {'singleQuote': true, trailingComma: 'all'}],
        'no-use-before-define': 'off'
    }
}

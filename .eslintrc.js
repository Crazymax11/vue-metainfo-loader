module.exports = {
    extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:vue/recommended',
        'prettier/vue',
    ],
    plugins: [
        'prettier',
        'jsdoc'
    ],
    rules: {
        'prettier/prettier': ['error', {
            singleQuote: true,
            trailingComma: 'all',
            htmlWhitespaceSensitivity: 'ignore'
        }],
        'no-use-before-define': 'off',

        // @see https://github.com/gajus/eslint-plugin-jsdoc
        "jsdoc/check-examples": 1,
        "jsdoc/check-param-names": 2,
        "jsdoc/check-tag-names": 2,
        "jsdoc/check-types": 2,
        "jsdoc/newline-after-description": 2,
        "jsdoc/no-undefined-types": 1,
        "jsdoc/require-description": 0,
        "jsdoc/require-description-complete-sentence": 0,
        "jsdoc/require-example": 0,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-param": 2,
        "jsdoc/require-param-description": 0,
        "jsdoc/require-param-name": 2,
        "jsdoc/require-param-type": 2,
        "jsdoc/require-returns-description": 0,
        "jsdoc/require-returns-type": 2,
        "jsdoc/valid-types": 2
    }
};


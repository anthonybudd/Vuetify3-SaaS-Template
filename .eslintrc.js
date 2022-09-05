module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'max-len': 'off',
        'no-multiple-empty-lines': 'off',
        'no-trailing-spaces': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'indent': ['error', 4],
        'semi': 'off',
        'class-methods-use-this': 'off',
        'no-empty-function': 'off',
        'comma-dangle': 'off',
        'import/no-useless-path-segments': 'off',
        'no-underscore-dangle': 'off',
        'default-case': 'off',
        'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-unused-vars': 'off',
        'no-plusplus': 'off',
        'no-bitwise': 'off', // Why?
        'no-param-reassign': 'off',
        'prefer-destructuring': 'off',
        'no-useless-escape': 'off',
        'consistent-return': 'off',
        'no-restricted-properties': 'off', // temp
        'no-empty': 'off',
        'prefer-object-spread': 'off',
        'no-undef': 'off', // breaks google maps
        'object-curly-newline': 'off',
        'operator-assignment': 'off',
        'vue/no-unused-vars': 'off', // AB: If I want to declare a variable and not use it, that's my prerogative
        'vue/no-unused-components': 'off', // AB: This doesnt even work.
        'no-else-return': 'off',
        'no-restricted-syntax': 'off', // AB: I can/will use whichever syntax I like.
        'no-restricted-globals': 'off',
        'quotes': 'off',
        'no-return-assign': 'off',
        'padded-blocks': 'off',
        'no-unreachable': 'off',
        'indent': 'off', //AB: switch() breaks this
    },
};

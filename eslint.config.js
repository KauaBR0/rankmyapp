const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                process: "readonly",
                console: "readonly",
                module: "readonly",
                require: "readonly",
                __dirname: "readonly",
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                jest: "readonly",
                Buffer: "readonly"
            },
            ecmaVersion: 2022,
            sourceType: "commonjs"
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error"
        }
    }
];

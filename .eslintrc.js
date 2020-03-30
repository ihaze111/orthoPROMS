module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "react-app",
        "airbnb",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "ignorePatterns": ["node_modules/", "build/", "public/", "ehr-template-processor/", "ehr-template-react-generator/", "react-styled-nhs/"],
    "rules": {
        "react/no-deprecated": "off",
        "react/destructuring-assignment": "off",
        "react/require-default-props": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
};

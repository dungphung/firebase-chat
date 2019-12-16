module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ],
  globals: {
    document: true,
    window: true,
    process: true,
    localStorage: true,
    FB: true,
    File: true,
    Image: true,
    Blob: true,
    atob: true,
    isFinite: true,
    fetch: true,
    __DEV__: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    allowImportExportEverywhere: false
  },

  // plugins: ["prettier"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "react/state-in-constructor": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "prettier/prettier": ["error"],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false
      }
    ],
    "react/jsx-props-no-spreading": "off",

    "no-unused-expressions": "warn",
    "react/sort-comp": "off",
    "no-unused-labels": "warn",
    "react/no-this-in-sfc": "off",
    "import/no-unresolved": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "no-shadow": "off",
    "no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true
      }
    ],
    "global-require": "off",
    camelcase: "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "prettier/prettier": "off"
  }
};

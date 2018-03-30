module.exports = {
  extends: "standard",
  parser: "babel-eslint",
  ecmaFeatures: {
    classes: true,
    jsx: true
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "max-len": ["error", { code: 100 }]
  }
};

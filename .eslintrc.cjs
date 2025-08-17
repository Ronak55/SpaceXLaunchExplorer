module.exports = {
  root: true,
  extends: ["@react-native", "plugin:import/recommended", "prettier"],
  plugins: ["import"],
  rules: {
    "import/order": ["error", {
      "groups": [["builtin", "external", "internal"], ["parent", "sibling", "index"]],
      "newlines-between": "always"
    }],
    "react/react-in-jsx-scope": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }]
  },
  settings: { "import/ignore": ["react-native"] }
};

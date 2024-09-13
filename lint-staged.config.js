module.exports = {
  // Type check TypeScript files
  "**/*.(ts)": () => "npx tsc --noEmit",

  // Lint then format TypeScript and JavaScript files
  "**/*.(ts|js)": (filenames) => [
    `npx eslint --fix ${filenames.join(" ")}`,
  ],

  // Format MarkDown and JSON
  // "**/*.(md|json|css)": (filenames) => `npx eslint --fix ${filenames.join(" ")}`,
};

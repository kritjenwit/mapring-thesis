export const importScript = (scriptName: string) => {
  const script = document.createElement("script");
  script.src = scriptName;
  document.body.appendChild(script);
};

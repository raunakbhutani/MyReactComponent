const MISSING_COMPONENT_ERROR =
  "Generated code must declare a function named GeneratedComponent.";

export const createComponentFromCode = (generatedCode, ReactLib) => {
  if (!ReactLib) {
    throw new Error("React runtime is unavailable for generated component execution.");
  }

  console.log('Generated code to execute:', generatedCode);

  try {
    const Component = new Function(
      "React",
      `"use strict";
${generatedCode}
if (typeof GeneratedComponent === "function") {
  return GeneratedComponent;
}
throw new Error("${MISSING_COMPONENT_ERROR}");`
)(ReactLib);

    if (typeof Component !== "function") {
      throw new Error(MISSING_COMPONENT_ERROR);
    }
    return Component;
  } catch (error) {
    console.error('Error executing generated code:', error);
    if (error instanceof SyntaxError) {
      throw new Error(
        "Generated code had invalid JavaScript syntax. Retrying with a fresh response may fix it."
      );
    }

    throw error;
  }
};

// response sanitization
const extractGeneratedComponentFunction = (code) => {
  const functionStart = code.search(/function\s+GeneratedComponent\s*\(/);
  if (functionStart === -1) {
    return code;
  }

  const bodyStart = code.indexOf("{", functionStart);
  if (bodyStart === -1) {
    return code;
  }

  let depth = 0;
  for (let index = bodyStart; index < code.length; index += 1) {
    const currentChar = code[index];

    if (currentChar === "{") {
      depth += 1;
    } else if (currentChar === "}") {
      depth -= 1;
      if (depth === 0) {
        return code.slice(functionStart, index + 1).trim();
      }
    }
  }

  return code.slice(functionStart).trim();
};

export const purifyCode = (code) => {
  let sanitizedCode = code;

  // Remove markdown code fences if model includes them.
  sanitizedCode = sanitizedCode.replace(/```(?:javascript|js)?/gi, "").replace(/```/g, "");

  // Remove import statements if model includes them.
  sanitizedCode = sanitizedCode.replace(/import\s+.*?;\s*/g, "");

  // Remove accidental language tags.
  sanitizedCode = sanitizedCode.replace(/\/\/\s*language:\s*\w+/g, "");

  // Remove export statements if model includes them.
  sanitizedCode = sanitizedCode.replace(/export\s+.*?;\s*/g, "");

  // Remove accidental top-level "return GeneratedComponent;".
  sanitizedCode = sanitizedCode.replace(/^\s*return\s+GeneratedComponent\s*;?\s*$/gim, "");

  sanitizedCode = extractGeneratedComponentFunction(sanitizedCode);

  // Check if code is incomplete (ends with comma or incomplete object)
  const trimmedCode = sanitizedCode.trim();
  if (trimmedCode.endsWith(',')) {
    throw new Error("Generated code is incomplete (truncated). The API response was cut off. Please try again or simplify your prompt.");
  }

  // Check for balanced braces
  const openBraces = (trimmedCode.match(/\{/g) || []).length;
  const closeBraces = (trimmedCode.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    throw new Error("Generated code has unbalanced braces (truncated). The API response was cut off. Please try again or simplify your prompt.");
  }

  // Check for balanced parentheses
  const openParens = (trimmedCode.match(/\(/g) || []).length;
  const closeParens = (trimmedCode.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    throw new Error("Generated code has unbalanced parentheses (truncated). The API response was cut off. Please try again or simplify your prompt.");
  }

  return sanitizedCode.trim();
};

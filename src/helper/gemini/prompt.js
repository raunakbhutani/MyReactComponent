// prompt construction
export const buildComponentPrompt = (userQuery) => `
Create exactly one React function declaration named GeneratedComponent for:
"${userQuery}"

Rules:
- Use only React.createElement (no JSX).
- Output must be valid plain JavaScript.
- No import/export statements.
- No markdown, no code fences, no explanations.
- No top-level return statement.
- Do not wrap the function in objects, arrays, or variables.
- Use inline style objects only when needed.
- Ensure all braces, parentheses, and quotes are properly closed.
- Keep the component simple and concise (under 100 lines).

Styling Guidelines:
- Use simple, clean styles
- Use rounded corners (borderRadius: "8px")
- Use good color contrast
- Add proper padding (padding: "12px 16px")
- Use flexbox for layout (display: "flex", alignItems: "center")
- Keep styles minimal and essential

Output format:
function GeneratedComponent() {
  return React.createElement("div", null, "...");
}
`.trim();


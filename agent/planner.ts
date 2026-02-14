export type Plan = {
  layout: string;
  components: ComponentNode[];
};

type ComponentNode = {
  type: string;
  props?: Record<string, any>;
  children?: ComponentNode[];
};


export async function planner(userInput: string, existingPlan?: any ): Promise<Plan> {
    const systemPrompt = `
You are a deterministic UI planner.

Rules:
- You MUST use only allowed components:
  Button, Card, Input, Table
- You may NOT create new component types.
- You may NOT generate CSS or styles.
- Output ONLY valid JSON.
- Do NOT include markdown.

Component prop rules:
- Button uses prop: "label"
- Card uses prop: "title"

The JSON MUST follow this exact structure:

{
  "layout": "string describing layout (e.g., vertical, grid, sidebar-layout)",
  "components": [
    {
      "type": "ComponentName",
      "props": {},
      "children": []
    }
  ]
}

All UI elements must be inside the "components" array.
`;


const userPrompt = existingPlan
  ? `
User request:
${userInput}

Existing UI tree:
${JSON.stringify(existingPlan, null, 2)}

Modify the existing tree.
Preserve structure unless change is requested.
Do NOT regenerate the entire layout.
Only change what is necessary.
`
  : `
User request:
${userInput}

Generate a new UI tree.
`;



    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: systemPrompt },
                        { text: userPrompt }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0
            }
        }),
    }
);

const data = await response.json();

console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));


console.log(
  "Gemini TEXT:",
  data?.candidates?.[0]?.content?.parts?.[0]?.text
);


const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

if (!text) {
    throw new Error("No valid response from Gemini");
}

const jsonMatch = text.match(/\{[\s\S]*\}/);

if (!jsonMatch) {
    throw new Error("No JSON found in Gemini output");
}

return JSON.parse(jsonMatch[0]);
}
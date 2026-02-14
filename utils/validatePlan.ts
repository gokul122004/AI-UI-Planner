const allowedComponents = new Set([
  "Card",
  "Button",
  "Input",
  "Table",
]);

function validateNode(node: any) {
  if (!node || !node.type) {
    throw new Error("Invalid node structure");
  }

  if (!allowedComponents.has(node.type)) {
    throw new Error(`Invalid component type: ${node.type}`);
  }

  if (node.children && Array.isArray(node.children)) {
    node.children.forEach(validateNode);
  }
}

export function validatePlan(plan: any) {
  if (!plan || !Array.isArray(plan.components)) {
    throw new Error("Plan must contain components array");
  }

  plan.components.forEach(validateNode);
}

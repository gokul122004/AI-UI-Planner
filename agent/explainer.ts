import { Plan } from "./planner";

export async function explainer(plan: Plan): Promise<string> {
    return `The layout uses ${plan.layout}.
    It includes the following components:
    ${plan.components.map((c) => c.type).join(",")}.`;
}
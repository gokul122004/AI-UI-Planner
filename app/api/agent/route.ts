import { planner } from "../../../agent/planner";
import { explainer } from "../../../agent/explainer";
import { validatePlan } from "../../../utils/validatePlan";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userInput, existingPlan } = body;

    if (!userInput) {
      return Response.json(
        { error: "userInput is required" },
        { status: 400 }
      );
    }

    // 🔹 Pass existing plan to planner for modification support
    const plan = await planner(userInput, existingPlan || undefined);

    // 🔹 Validate plan before rendering (Component Whitelist Enforcement)
    try {
      validatePlan(plan);
    } catch (err: any) {
      return Response.json(
        { error: err.message },
        { status: 400 }
      );
    }

    const explanation = await explainer(plan);

    return Response.json({
      plan,
      explanation,
    });
  } catch (error: any) {
    console.error("AGENT ERROR:", error);

    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

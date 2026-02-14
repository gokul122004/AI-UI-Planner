export function generateCode(plan: any): string {
    if (!plan || !Array.isArray(plan.components)) return "";
    console.log("INSIDE GENERATOR:", plan);

    if (!plan) return "";
    if (!plan.components) return "";
    let code = "";

    plan.components.forEach((component: any) => {
        if (component.type === "Card") {
            code += `<Card title="${component.props?.title}">\n`;

            if (Array.isArray(component.children)) {
                component.children.forEach((child: any) => {
                    if (child.type === "Button") {
                        code += `  <Button label="${child.props?.label}" />\n`;
                    }
                });
            }

            code += `</Card>\n`;
        }

        if (component.type === "Button") {
            code += `<Button label="${component.props?.label}" />\n`;
        }
    });

    return code;
}

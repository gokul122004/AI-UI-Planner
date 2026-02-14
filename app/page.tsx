"use client";

import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { generateCode } from "../utils/generator";

export default function Home() {
    const [userInput, setUserInput] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");

    // Version history
    const [history, setHistory] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    // Current plan derived from history
    const currentPlan =
        currentIndex >= 0 ? history[currentIndex] : null;

    // Generate / Modify UI
    const handleGenerate = async () => {
        try {
            const response = await fetch("/api/agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userInput,
                    existingPlan: currentPlan,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Something went wrong");
                return;
            }

            // Add to history 
            const newHistory = [
                ...history.slice(0, currentIndex + 1),
                data.plan,
            ];

            setHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);

            setGeneratedCode(generateCode(data.plan));
        } catch (err) {
            console.error(err);
            alert("Failed to generate UI");
        }
    };

    // Recursive renderer
    const renderComponent = (
        node: any,
        path: string
    ): React.ReactNode => {
        if (!node) return null;

        const { type, props, children } = node;

        if (type === "Card") {
            return (
                <Card key={path} title={props?.title}>
                    {Array.isArray(children)
                        ? children.map((child, index) =>
                              renderComponent(child, `${path}-${index}`)
                          )
                        : null}
                </Card>
            );
        }

        if (type === "Button") {
            return (
                <Button
                    key={path}
                    label={props?.label}
                />
            );
        }

        // Unknown component fallback (safety)
        return null;
    };

    const renderPreview = () => {
        if (!currentPlan) return null;

        if (Array.isArray(currentPlan.children)) {
            return currentPlan.children.map(
                (component: any, index: number) =>
                    renderComponent(component, `root-${index}`)
            );
        }

        if (Array.isArray(currentPlan.components)) {
            return currentPlan.components.map(
                (component: any, index: number) =>
                    renderComponent(component, `root-${index}`)
            );
        }

        return null;
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Chat Panel */}
            <div
                style={{
                    flex: 1,
                    borderRight: "1px solid #ccc",
                    padding: "16px",
                }}
            >
                <h2>Chat</h2>

                <textarea
                    style={{
                        width: "100%",
                        height: "100px",
                        marginBottom: "12px",
                    }}
                    value={userInput}
                    onChange={(e) =>
                        setUserInput(e.target.value)
                    }
                    placeholder="Describe the UI..."
                />

                <button onClick={handleGenerate}>
                    Generate / Modify UI
                </button>

                {/* Version History */}
                <div style={{ marginTop: "20px" }}>
                    <h3>Versions</h3>
                    {history.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                setGeneratedCode(
                                    generateCode(history[index])
                                );
                            }}
                            style={{
                                marginRight: "8px",
                                background:
                                    index === currentIndex
                                        ? "#333"
                                        : "#eee",
                                color:
                                    index === currentIndex
                                        ? "#fff"
                                        : "#000",
                                padding: "4px 8px",
                            }}
                        >
                            v{index}
                        </button>
                    ))}
                </div>
            </div>

            {/* Code Panel */}
            <div
                style={{
                    flex: 1,
                    borderRight: "1px solid #ccc",
                    padding: "16px",
                }}
            >
                <h2>Generated Code</h2>
                <pre>{generatedCode}</pre>
            </div>

            {/* Live Preview */}
            <div
                style={{
                    flex: 1,
                    padding: "16px",
                }}
            >
                <h2>Live Preview</h2>
                {renderPreview()}
            </div>
        </div>
    );
}

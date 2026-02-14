type CardProps = {
    title: string;
    children?: React.ReactNode;
};

export function Card({ title, children }: CardProps) {
    return (
        <div
            style = {{ 
                border: "1px solid #ddd",
                borderRadius: "8xp",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "#f9f9f9"
            }}
        >
            <h3 style = {{ marginBottom: "12px" }}>
                {title}
            </h3>
            {children}
        </div>
    );
}
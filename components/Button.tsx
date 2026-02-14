type ButtonProps = {
    label :string;
};

export function Button({ label }: ButtonProps) {
    return (
        <button 
            style = {{ 
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
            }}
        >
            {label}
        </button>
    );
}
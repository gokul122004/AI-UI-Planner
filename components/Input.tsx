type InputProps = {
    placeholder?: string; 
};

export function Input({ placeholder }: InputProps) {
    return (
        <input
            placeholder = {placeholder}
            style = {{ 
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                width: "100%",
                marginBottom: "12px",
            }}
        />
    );
}
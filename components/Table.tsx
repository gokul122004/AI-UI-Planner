type TableProps = {
    headers: string[];
    data: string[][];
};

export function Table({ headers, data }: TableProps) {
    return (
        <table
            style = {{ 
                width: "100%",
                borderCollapse: "collapse",
            }}
        >
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key = {index}
                            style = {{
                                border: "1px solid #ddd",
                                padding: "8px",
                                backgroundColor: "#f3f4f6",
                            }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key = {rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key = {cellIndex}
                                style = {{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
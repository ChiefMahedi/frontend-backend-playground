interface ColorScaleProps {
    COLORS: Map<number, string>;
}

const ColorScale = ({ COLORS }: ColorScaleProps) => {
    console.log(COLORS);
    return (
        <>
            <h2>Total Value</h2>
            <div className="color-scale flex gap-2">
                <div>
                    <ul className="list-none p-0 m-0.5">
                        {Array.from(COLORS.entries())
                            .reverse() 
                            .map(([key, color]) => (
                                <li
                                    key={key}
                                    className="w-2 h-3"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                >
                                </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <ul className="list-none p-0 m-0">
                        {Array.from(COLORS.entries())
                            .reverse() 
                            .map(([key,], index, array) => (
                                <li key={key} className="w-2 h-3 text-xs">
                                    {index === 0 || index === array.length - 1 || index % 5 === 0 ? (
                                        key
                                    ) : (
                                        <span>&nbsp;</span>
                                    )}
                                </li>
                            ))}
                    </ul>

                </div>
            </div>
        </>
    );
};

export default ColorScale;

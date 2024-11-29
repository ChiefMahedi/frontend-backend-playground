interface ColorScaleProps {
    COLORS: Map<number, string>;
}

const ColorScale = ({ COLORS }: ColorScaleProps) => {
    console.log(COLORS);
    return (
        <>
            <h2 className="text-xs mt-1">Total Value</h2>
            <div className="color-scale flex laptop:gap-2 mobile:gap-0 tablet:gap-2">
                <div>
                    <ul className="list-none p-0 m-0.5">
                        {Array.from(COLORS.entries())
                            .reverse()
                            .map(([key, color]) => (
                                <li
                                    key={key}
                                    className="laptop:w-2 laptop:h-2.5 tablet:w-2 tablet:h-2 mobile:w-2 mobile:h-1"
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
                            .map(([key], index, array) => (
                                <li key={key} className="laptop:w-2 laptop:h-2.5 tablet:w-2 tablet:h-2  mobile:w-2 mobile:h-1 text-xs">
                                    {index === 0 || index === array.length - 1 || (key - array[0][0]) % 5 === 0 ? (
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

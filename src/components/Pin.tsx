interface Props {
    index: number;
    activePos: number;
    pinValue: Array<number>;
}

const Pin = ({ index, activePos, pinValue }: Props) => {
    return (
        <div className="absolute w-8 h-16 grid place-items-center" style={{ left: `${1 + index * 2}rem` }}>
            <div
                style={{ borderColor: activePos === index ? '#00cc00' : 'transparent', boxShadow: activePos === index ? '0 0 5px 1px #00cc00' : 'none' }}
                className="absolute w-full h-full border rounded transition-all"
            ></div>
            <div className="absolute w-3 h-14 bg-gray-500 rounded transition-all z-0">
                <div style={{ top: `${pinValue[index]}rem` }} className="relative w-full h-6 bg-cyan-500 rounded grid place-items-center">
                    <div className="w-full h-px bg-white"></div>
                </div>
            </div>
        </div>
    );
};

export default Pin;

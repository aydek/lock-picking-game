interface Props {
    countdown: number;
}

const ProgressBar = ({ countdown }: Props) => {
    return (
        <div className="relative w-56 pt-3">
            <div className="bg-gray-600 w-full h-2 rounded-sm absolute"></div>
            <div style={{ width: `${countdown}%`, backgroundColor: '#00cc00' }} className=" absolute h-2 rounded-sm"></div>
        </div>
    );
};

export default ProgressBar;

import RestartButton from './RestartButton';

const Fail = () => {
    return (
        <div className=" text-white text-center font-bold mt-4">
            <div className="w-full text-red-800">Failed! </div>
            <RestartButton />
        </div>
    );
};

export default Fail;

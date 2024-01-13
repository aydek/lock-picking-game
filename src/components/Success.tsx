import RestartButton from './RestartButton';

const Success = () => {
    return (
        <div className=" text-white text-center font-bold mt-4">
            <div className="w-full text-green-800">Success! Challenge solved!</div>
            <RestartButton />
        </div>
    );
};

export default Success;

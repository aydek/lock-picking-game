const RestartButton = () => {
    return (
        <button className="bg-cyan-600 px-2 rounded mt-2 hover:bg-cyan-500" onClick={() => window.location.reload()}>
            Restart
        </button>
    );
};

export default RestartButton;

import { useState, useEffect } from 'react';
import Pin from './components/Pin';
import InfoText from './components/InfoText';
import ProgressBar from './components/ProgressBar';
import Success from './components/Success';
import Fail from './components/Fail';

function App() {
    const [activePos, setActivePos] = useState(0);
    const [pinValue, setPinValue] = useState<Array<number>>([]);
    const [countdown, setCountdown] = useState(100);
    const [startCount, setStartCount] = useState(false);
    const [gameFishished, setGameFinished] = useState(false);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (gameFishished) {
            return;
        }

        if (event.code === 'Space') {
            if (isGameSolved()) {
                onceSolved();
            } else {
                onceFailed();
            }
            setGameFinished(true);
            setStartCount(false);
            return;
        }

        if (event.code === 'KeyD' || event.code === 'KeyA' || event.code === 'KeyW' || event.code === 'KeyS') {
            setStartCount(true);
        }

        if (event.code === 'KeyD') {
            if (activePos >= 5) return;
            setActivePos((prev) => prev + 1);
            return;
        }
        if (event.code === 'KeyA') {
            if (activePos === 0) return;
            setActivePos((prev) => prev - 1);
            return;
        }
        if (event.code === 'KeyW') {
            if (pinValue[activePos] <= 0) return;
            const copy = [...pinValue];
            copy[activePos] = parseFloat((copy[activePos] - 0.1).toFixed(1));
            setPinValue(copy);
            return;
        }
        if (event.code === 'KeyS') {
            if (pinValue[activePos] >= 2) return;
            const copy = [...pinValue];
            copy[activePos] = parseFloat((copy[activePos] + 0.1).toFixed(1));
            setPinValue(copy);
            return;
        }
    };

    const onceSolved = () => {
        setGameFinished(true);
        console.log('success');
    };

    const onceFailed = () => {
        setGameFinished(true);
        console.log('failed');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!startCount || countdown <= 0) return;
            if (countdown <= 1) {
                onceFailed();
            }
            setCountdown((prev) => prev - 1);
        }, 70);

        return () => clearInterval(interval);
    }, [countdown, startCount, pinValue]);

    useEffect(() => {
        const generateRandomNumbers = (): number[] => {
            const result: number[] = [];
            for (let i = 0; i < 6; i++) {
                result.push(parseFloat(getRandomNumber(0, 2).toFixed(1)));
            }
            return result;
        };

        setPinValue(generateRandomNumbers());
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePos, pinValue, gameFishished]);

    const getRandomNumber = (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    };

    const isGameSolved = () => {
        const isDone = pinValue.every((item) => item === 1);
        if (isDone) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="relative w-56 h-16  rounded bg-gray-800 grid place-items-center p-2">
                    <div className="h-px bg-white w-full z-10"></div>
                    {[...Array(6)].map((_item, index) => (
                        <Pin index={index} activePos={activePos} pinValue={pinValue} key={`pin:${index}`} />
                    ))}
                </div>
                {!gameFishished && <ProgressBar countdown={countdown} />}
                {gameFishished && isGameSolved() ? <Success /> : gameFishished && !isGameSolved() ? <Fail /> : <InfoText />}
            </div>
        </div>
    );
}

export default App;

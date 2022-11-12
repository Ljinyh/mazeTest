import { useState } from 'react';
import { Buttons } from '../components';

const INITIAL_STEP = 1;
const INITIAL_SIGN_TYPE = "login";

function Sign() {
    const [step, setStep] = useState(INITIAL_STEP);
    const [signType, setSignType] = useState(INITIAL_SIGN_TYPE);

    const onSignTypeButtonClick = (newSignType) => {
        setSignType(newSignType);
        setStep(2);
    };

    return (
        <div>
            {step === INITIAL_STEP && <Buttons onClick={onSignTypeButtonClick} />}
            {step === 2 && (
                <p>오세명 짱</p>
            )}
        </div>
    );
}

export default Sign;
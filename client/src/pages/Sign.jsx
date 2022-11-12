import { useState } from 'react';
import { Buttons, TermsAndAgreements, Authentication } from '../components';

const INITIAL_STEP = 1;
const INITIAL_SIGN_TYPE = "login";

function Sign() {
    const [step, setStep] = useState(INITIAL_STEP);
    const [signType, setSignType] = useState(INITIAL_SIGN_TYPE);
    const [adCheck, setAdCheck] = useState(false);

    // 1단계
    const onSignTypeButtonClick = (newSignType) => {
        setSignType(newSignType);
        setStep(2);
    };

    // 2단계
    const onTermsAndAgreementButtonClick = (newAdCheck) => {
        setAdCheck(newAdCheck);
        setStep(3)
    };

    return (
        <div>
            {step === INITIAL_STEP && <Buttons onClick={onSignTypeButtonClick} />}
            {step === 2 && <TermsAndAgreements onClick={onTermsAndAgreementButtonClick} />}
            {step === 3 && <Authentication signType={signType} adCheck={adCheck} />}
        </div>
    );
}

export default Sign;
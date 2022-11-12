import { useState } from "react";
import { requestAuthCode, verifyAuthCode, signupAndSignin } from '../api';
import { useNavigate } from 'react-router-dom';

const withOutNumber = /[^0-9.]/;

function Authentication(props) {
    const signType = props.signType;
    const adCheck = props.adCheck;

    const [phone, setPhone] = useState('');
    const [authCode, setAuthCode] = useState('');
    // 인증번호 요청 성공을 나타내는 값
    const [isRequestSuccess, setIsRequestSuccess] = useState(false);
    // 인증 성공 여부
    const [isVerified, setIsVerified] = useState(false);

    const navigate = useNavigate();

    // 인증번호 받기 버튼을 눌렀을 때 실행되는 함수
    const handleRequest = async () => {
        try {
            await requestAuthCode(phone, adCheck);
            setIsRequestSuccess(true);

        } catch (err) {
            setIsRequestSuccess(false);
        };
    };

    //인증하기 버튼 눌렀을 때 실행되는 함수
    const handleVerify = async () => {
        try {
            await verifyAuthCode(phone, authCode);
            setIsVerified(true);
        } catch (err) {
            alert(err.response.data.errorMessage);
            setIsVerified(false);
        };
    };

    // 완료버튼 눌렀을 때 실행되는 함수
    const handleSignButtonClick = async () => {
        try {
            const res = await signupAndSignin(phone, adCheck, signType);
            window.localStorage.setItem('maze-key', JSON.stringify({
                accessToken: res.access,
                refreshToken: res.refresh
            }));
            navigate('/', { replace: true });
        } catch (err) {
            alert(err.response.data.errorMessage);
            window.location.reload();
        };
    };

    return (
        <div>
            <div>
                <input maxLength={11} type='text' placeholder="휴대폰번호를 입력하세요." value={phone} onChange={(e) => {
                    setIsRequestSuccess(false);
                    setPhone(e.target.value.replace(withOutNumber, ''));
                }} />
                <button onClick={handleRequest} disabled={isRequestSuccess || phone.length === 0}>인증번호 받기</button>
            </div>
            <div>
                <input maxLength={6} type='text' placeholder="인증번호를 입력하세요." value={authCode} onChange={(e) => {
                    setIsVerified(false);
                    setAuthCode(e.target.value.replace(withOutNumber, ''));
                }} />
                <button onClick={handleVerify} disabled={isVerified || authCode.length === 0}>인증하기</button>
            </div>
            <div>
                <button onClick={handleSignButtonClick} disabled={!isVerified}>완료</button>
            </div>
        </div>
    );
};

export default Authentication;
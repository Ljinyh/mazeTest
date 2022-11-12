import { useState } from 'react';

function TermsAndAgreements(props) {
    const onClick = props.onClick;
    const [termsCheck, setTermsCheck] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); //새로고침 방지
        onClick(e.target.elements.ad.checked);
        console.log('aa')
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은 헌법재판소에 제청하여 그 심판에 의하여 재판한다. 공공필요에 의한 재산권의 수용·사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다. 국가는 농업 및 어업을 보호·육성하기 위하여 농·어촌종합개발과 그 지원등 필요한 계획을 수립·시행하여야 한다. 헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 국민의 자유와 권리는 헌법에 열거되지 아니한 이유로 경시되지 아니한다. 연소자의 근로는 특별한 보호를 받는다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.
            </p>
            <div>
                <input type="checkbox" checked={termsCheck} onChange={(e) => setTermsCheck(e.target.checked)} />
                <span>이용약관 동의(필수)</span>
            </div>
            <label htmlFor='ad'>
                <input id="ad" name="ad" type="checkbox" />
                <span>마케팅 활용 동의 및 서비스 관련 정보 수신 동의(선택)</span>
            </label>
            <button type="submit" disabled={!termsCheck}>다음</button>
        </form>
    )
};

export default TermsAndAgreements;

function Buttons(props) {
    const onClick = props.onClick;
    return (
        <>
            <button onClick={() => onClick('login')}>로그인</button>
            <button onClick={() => onClick('signup')}>회원가입</button>
        </>
    );
};

export default Buttons;
// sms module

const axios = require('axios');
const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');
require("dotenv").config();

function send_message(authNum, phoneNum) {
    Cache.del(phoneNum);
    Cache.put(phoneNum, authNum);

    const date = Date.now().toString();

    // 환경변수로 저장했던 중요한 정보들
    const serviceId = process.env.SMS_SERVICE_ID;
    const secretKey = process.env.SMS_SECRET_KEY;
    const accessKey = process.env.SMS_ACCESS_KEY_ID;
    const my_number = process.env.SMS_MYNUM;

    // 그 외 url 관련
    const method = 'POST';
    const space = ' ';
    const newLine = '\n';
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
    const url2 = `/sms/v2/services/${serviceId}/messages`;

    //cryptojs로 hashing
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();

    const signature = hash.toString(CryptoJS.enc.Base64);
    try {

        axios({
            method: method,
            // request는 uri였지만 axios는 url이다
            url: url,
            headers: {
                'Contenc-type': 'application/json; charset=utf-8',
                'x-ncp-iam-access-key': accessKey,
                'x-ncp-apigw-timestamp': date,
                'x-ncp-apigw-signature-v2': signature,
            },
            // request는 body였지만 axios는 data다
            data: {
                type: 'SMS',
                countryCode: '82',
                from: my_number,
                // 원하는 메세지 내용
                content: `[메이즈 백엔드 채용] 인증번호는 ${authNum} 입니다.`,
                messages: [
                    // 신청자의 전화번호
                    { to: `${phoneNum}` },
                ],
            },
        });
        return;
    } catch (err) {
        Cache.del(phoneNum);
        return console.log(err);
    }
}

module.exports = send_message;
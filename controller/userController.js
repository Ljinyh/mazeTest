const JWT = require('jsonwebtoken');
const send_message = require('../smsModule/sms'); //sms module
const Cache = require('memory-cache');
const { Users } = require('../models');

require('dotenv').config();

module.exports = {
    // SMS 문자 인증 API
    sendSMS: async (req, res) => {
        const { phoneNum } = req.body;
        const authNum = Math.random().toString().substring(2, 8);


        if (phoneNum) {
            send_message(authNum, phoneNum);
            return res.status(200).send({ msg: 'success!' });
        };
    },

    // 인증번호 확인 API
    checkCode: async (req, res) => {
        const { phoneNum, authCode } = req.body;

        const cacheData = Cache.get(phoneNum);
        console.log(cacheData)
        if (!cacheData) {
            return res.status(400).send('인증번호를 다시 요청해주세요.');
        }

        else if (cacheData !== authCode) {
            return res.status(400).send('인증번호를 다시 요청해주세요.');
        }

        else {
            Cache.del(phoneNum);
            return res.stauts(200).send({ msg: 'success!' });
        };
    },

    // 로그인 & 회원가입 API
    signup: async (req, res) => {
        const { phoneNum, AD_check } = req.body;

        // 유저가 존재하면 토큰 넘기고 바로 로그인, 없으면 가입후 로그인
        const existUser = await Users.findOrCreate({
            where: { user_phone: phoneNum },
            defaults: { AD_check: AD_check }
        });

        if (existUser[0].id) {
            // token 생성
            const refreshToken = JWT.sign({}, process.env.SECRETKEY, {
                expiresIn: '3d'
            });

            const accessToken = JWT.sign({ userId: existUser[0].id }, process.env.SECRETKEY, {
                expiresIn: '1d', //for test
                // expiresIn: '1h'
            });

            await Users.update({
                AD_check: AD_check,
                refressToken: refressToken
            }, {
                where: { id: existUser[0].id }
            });

            return res.status(201).send({
                msg: 'success!',
                refresh: refreshToken,
                access: accessToken
            });
        }
    },

    // 중복확인 API
    checkNum: async (req, res) => {
        const { phoneNum } = req.body;

        const existUser = await Users.findOne({
            where: { user_phone: phoneNum }
        });

        if (existUser) {
            return res.statue(400).send({
                msg: '이미 등록된 번호입니다.'
            });
        } else {
            return res.stauts(200).send({
                msg: '사용 가능한 번호입니다.'
            });
        };
    }
};
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

        if (!cacheData || cacheData !== authCode) {
            return res.status(400).send('인증번호를 다시 요청해주세요.');
        } else {
            Cache.del(phoneNum);
            return res.status(200).send({ msg: 'success!' });
        };
    },

    // 로그인 & 회원가입 API
    signup: async (req, res) => {
        const { phoneNum, AD_check } = req.body;
        const { type } = req.query;

        const refreshToken = JWT.sign({}, process.env.SECRETKEY, {
            expiresIn: '3d'
        });

        if (type === "login") {
            const existUser = await Users.findOne({
                where: { user_phone: phoneNum }
            });

            if (existUser) {
                // token 생성
                const accessToken = JWT.sign({ userId: existUser.id }, process.env.SECRETKEY, {
                    expiresIn: '1d'
                });

                await Users.update({
                    AD_check: AD_check,
                    refreshToken: refreshToken
                }, {
                    where: { id: existUser.id }
                });

                return res.status(201).send({
                    msg: 'success!',
                    refresh: refreshToken,
                    access: accessToken
                });
            } else {
                return res.status(400).send({
                    errorMessage: "회원가입이 필요합니다."
                })
            };
        } else {
            // 유저 확인
            const existUser = await Users.findOne({
                where: { user_phone: phoneNum }
            });

            if (existUser) {
                return res.status(400).send({
                    errorMessage: '이미 등록된 번호입니다.'
                })
            } else {
                // 등록된 유저가 아니라면 회원가입
                await Users.create({
                    user_phone: phoneNum,
                    AD_check: AD_check,
                    refreshToken: refreshToken
                });

                //토큰 발급을 위해 유저찾기
                const findUser = await Users.findOne({
                    where: { user_phone: phoneNum }
                })

                if (findUser) {
                    // token 생성
                    const accessToken = JWT.sign({ userId: findUser.id }, process.env.SECRETKEY, {
                        expiresIn: '1d', //for test
                    });

                    return res.status(201).send({
                        msg: 'success!',
                        refresh: refreshToken,
                        access: accessToken
                    });
                }
            }


        };
    },
};
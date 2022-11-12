import client from './client';
import { API_PATHS } from './constants';

export const requestAuthCode = async (phoneNum, AD_check) =>
    (await client.post(API_PATHS.sms, { phoneNum, AD_check })).data;

export const verifyAuthCode = async (phoneNum, authCode) =>
    (await client.post(API_PATHS.checkCode, { phoneNum, authCode })).data;


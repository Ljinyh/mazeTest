import client from './client';
import { API_PATHS } from './constants';

export const signupAndSignin = async (phoneNum, AD_check, type) =>
    (await client.post(API_PATHS.signup, { phoneNum, AD_check },
        type === "login" ? { params: { type } } : {})).data;
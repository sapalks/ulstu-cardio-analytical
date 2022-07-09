import { v4 as uuid } from 'uuid';
import { UserBaseInfo } from "../store/store.model";

export function getRandomString(length = 25, symbsString?: string): string {
    symbsString = symbsString
        ? symbsString
        : '1234567890qwertyuiopasdfghjklzxcvbnm';
    let res = '';
    for (let i = 0; i < length; i++) {
        const index = Math.round(Math.random() * (symbsString.length - 1));
        res += symbsString[index];
    }
    return res;
}

export function getRandomNumber(max?: number, min?: number): number {
    max = max ?? Number.MAX_VALUE;
    min = min ?? 0;
    return min + Math.round(Math.random() * (max - min));
}

export function getRandomUser(): UserBaseInfo {
    const user: UserBaseInfo = {
        id: uuid(),
        fio: `${getRandomString(getRandomNumber(10, 7))} ${getRandomString(getRandomNumber(17, 10))} ${getRandomString(getRandomNumber(17, 10))}`,
        region: 'Uljanovsk',
        clientClass: 'A',
        born: Date.now(),
        lastRequestAt: Date.now(),
        requestCount: getRandomNumber(100, 10),
        recommendationCount: getRandomNumber(100, 10),
        recommendationAvgRating: getRandomNumber(5),
        doctorFio: `${getRandomString(getRandomNumber(10, 7))} ${getRandomString(getRandomNumber(17, 10))} ${getRandomString(getRandomNumber(17, 10))}`,
        doctorEmail: `${getRandomString(getRandomNumber(10, 3))}@gmail.com`
    };

    return user;
}

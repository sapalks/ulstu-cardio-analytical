import { v4 as uuid } from 'uuid';
import { CardiovascularDiseasePredispositionEnum, InfarctionOrInsultEnum, Recommendation, SexEnum, StatusRecommndationEnum, UserBaseInfo, UserFullModel } from "../store/store.model";

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

export function getRandomUser(index: number = 0): UserBaseInfo {
    // const user: UserBaseInfo = {
    //     id: uuid(),
    //     fio: `${getRandomString(getRandomNumber(10, 7))} ${getRandomString(getRandomNumber(17, 10))} ${getRandomString(getRandomNumber(17, 10))}`,
    //     region: 'Uljanovsk',
    //     clientClass: 'A',
    //     born: Date.now(),
    //     lastRequestAt: Date.now(),
    //     requestCount: getRandomNumber(100, 10),
    //     recommendationCount: getRandomNumber(100, 10),
    //     recommendationAvgRating: getRandomNumber(5),
    //     doctorFio: `${getRandomString(getRandomNumber(10, 7))} ${getRandomString(getRandomNumber(17, 10))} ${getRandomString(getRandomNumber(17, 10))}`,
    //     doctorEmail: `${getRandomString(getRandomNumber(10, 3))}@gmail.com`
    // };

    const user: UserBaseInfo = {
        id: uuid(),
        fio: `client FIO ${index ?? 0}`,
        region: 'Uljanovsk',
        born: Date.now() / 1000,
        lastRequestAt: Date.now() / 1000,
        requestCount: getRandomNumber(100, 10),
        recommendationCount: getRandomNumber(100, 10),
        recommendationAvgRating: getRandomNumber(5),
        doctorFio: `doctor FIO ${index ?? 0}`,
        doctorEmail: `doctor@gmail.com`
    };

    return user;
}

export function getRandomFullUserInfo(id: string, index: number = 0): UserFullModel {

    const user: UserFullModel = {
        id,
        login: 'user login',
        fio: `client FIO ${index ?? 0}`,
        region: 'Uljanovsk',
        clientClass: 'A',
        born: Date.now() / 1000,
        lastRequestAt: Date.now() / 1000,
        requestCount: getRandomNumber(100, 10),
        recommendationCount: getRandomNumber(100, 10),
        recommendationAvgRating: getRandomNumber(5),
        doctorFio: `doctor FIO ${index ?? 0}`,
        doctorEmail: `doctor@gmail.com`,
        sex: SexEnum.MAN,
        birthAt: Date.now() / 1000,
        valuation1: '',
        valuation2: '',
        valuation3: '',
        ecg: '',
        cardiovascularDiseasePredisposition: CardiovascularDiseasePredispositionEnum.HAVE_DISEASE_IN_FAMILY,
        statinsTaking: false,
        arterialHypertension: false,
        cardiacIschemia: false,
        diabetesType2: false,
        infarctionOrInsult: InfarctionOrInsultEnum.NO,
        atherosclerosis: false,
        otherCardiovascularSystemDiseases: false,
        chronicKidneyDisease: false,
        cardiovascularAge: undefined,
        riskOfCardiovascularEvents: undefined,
    };

    return user;
}

export function getRandomRecommendation(
    number: number,
    status: StatusRecommndationEnum | null,
    rating: number | null
): Recommendation {
    const r: Recommendation = {
        id: uuid(),
        status,
        number,
        text: `Текст вначале этой вкладки: Система КардиоАналитик  по введенным данным создала рекомендации по управлению вашим сердечно-сосудистым здоровьем.  Вы можете просмотреть, оценить, сохранить или отправить полную информацию о своем сердечно-сосудистом здоровье и сгенерированные рекомендации курирующему врачу для коррекции и уточнения.

        Далее выводится текущая дата, номер рекомендации,  структурированный текст  сгенерированной рекомендации, располагаемый в две колонки. 
        В нижней части страницы (в последней строке) разместить кнопки:
        КНОПКА Вверх, КНОПКА Отправить врачу, КНОПКА Оценить, КНОПКА Сохранить, 
        По нажатию по кнопке вверх – Переход в начало этой страницы.
        
        По нажатию по кнопке Отправить врачу – на почту курирующего врача отправляется уведомление, что пациент ФИО отправил сгенерированную рекомендацию для согласования. 
        По нажатию по кнопке Оценить – появляется поле  с выбором из значений от 0 до 5. Выбор одного из значений будет сохранен при нажатии на кнопку Сохранить.
        По нажатию по кнопке Сохранить – текст рекомендации сохраняется и формируется новая запись для текущего пациента (Фио, дата, Рекомендация №, Статус (сохранено/отправлено врачу/согласовано с врачом), адрес хранения).
        `,
        createdAt: Date.now() / 1000,
        rating,
        canSendToDoctor: true,
    }
    return r;
}

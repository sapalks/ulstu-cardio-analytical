

export interface AdminStore {
    users: UserBaseInfo[];
}

export interface UserStore {
    current: UserFullModel | null;
    id: string
    loading: boolean;
}


export interface FullStore {
    admin: AdminStore;
    user: UserStore;
}

export const initialAdminState: AdminStore = {
    users: []
}
export const initialUserState: UserStore = {
    current: null,
    loading: false,
    id: '',
}

export enum SexEnum {
    MAN = 'man',
    WOMAN = 'woman',
}

export enum FamilyStatusEnum {
    MARRIED = 'Married',
    DIVORCED = 'Divorced',
    WIDOWER = 'Widower',
}

export enum InSocialEventsEnum {
    ONE = 'one',
    MORE = 'more',
}

export enum PhysicalActivityEnum {
    ONE = 'one',
    MORE = 'more',
    DAILY = 'daily',
}

export enum WorkStatusEnum {
    WORKERD = 'worked',
    RETIRED = 'retired',
    UNEMPLOYED = 'unemployed',
    LOOKING = 'looking',
}

export enum SymptomsOfAnginaPectorisEnum {
    NO_SYMPTOMS = 'no symptoms',
    GOTO_CARDIOLOGIST = 'goto cardiologist',
}

export enum CommitmentEnum {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGTH = 'higth',
}

export enum CardiovascularDiseasePredispositionEnum {
    NO = 'no',
    HAVE_DISEASE_IN_FAMILY = 'have disease in family',
    GENETIC_PREDISPOSITION = 'genetic predisposition',
}

export enum InfarctionOrInsultEnum {
    NO = 'no',
    INFARCTION = 'infarction',
    INSULT = 'insult'
}

export interface UserFullModel extends UserBaseInfo {
    login: string;
    // Вес
    weight?: number | undefined;
    // Рост
    growth?: number | undefined;
    // Объем талии
    waist?: number | undefined;
    // Пол
    sex: SexEnum;
    // Дата рождения
    birthAt: number;
    // Уровень систолического АД
    systolicBloodPressureLevel?: number | undefined
    // Курение
    isSmocking?: boolean | undefined;
    // холестерин
    cholesterol?: number | undefined;
    // Риск сердечно-сосудистых событий в течение 10 лет по шкале SCORE
    cardiovascularEventsRisk?: number | undefined;
    // Ваш идеальный «сердечно-сосудистый возраст»
    cardiovascularAge?: number | undefined;

    // Семейное положение
    familyStatus?: FamilyStatusEnum | undefined;
    // Участие в социально мероприятиях
    inSocialEvents?: InSocialEventsEnum | undefined;
    // Физическая активность
    physicalActivity?: PhysicalActivityEnum | undefined;
    // Работа
    workStatus?: WorkStatusEnum | undefined;
    // Симптомы стенокардии
    symptomsOfAnginaPectoris?: SymptomsOfAnginaPectorisEnum | undefined;
    // Приверженность
    commitment?: CommitmentEnum | undefined;
    // Самая значимая ценность для вас
    valuation1: string;
    // Наиболее значимая ценность для вас
    valuation2: string;
    // Значимая ценность для вас
    valuation3: string;

    // Холестерин высокой плотности (ЛПВП)
    highDensityCholesterol?: number | undefined;
    // Холестерин низкой плотности (ЛПНП)
    lowDensityCholesterol?: number | undefined;
    // Триглицериды
    triglycerides?: number | undefined;
    // Липопротеин
    lipoprotein?: number | undefined;
    // Результаты ЭКГ
    ecg: string;
    // Высокочувствительный С-реактивный белок (кардио)
    protein?: number | undefined;
    // Коэффициент атерогенности
    atherogenicCoefficient?: number | undefined;
    // Креатинин
    creatinine?: number | undefined;
    // Результаты УЗДМАГ. Наличие атеросклеротических бляшек
    havePlaques?: boolean | undefined;

    // предрасположенность к сердечно-сосудистым заболеваниям
    cardiovascularDiseasePredisposition: CardiovascularDiseasePredispositionEnum;
    // прием статинов
    statinsTaking: boolean;
    // хроническое заболевание почек
    chronicKidneyDisease: boolean;
    // Артериальная гипертония
    arterialHypertension: boolean;
    // Ишемическая болезнь сердца
    cardiacIschemia: boolean;
    // Сахарный диабет 2 типа
    diabetesType2: boolean;
    // Инфаркт миокарда или инсульт
    infarctionOrInsult: InfarctionOrInsultEnum;
    // Атеросклероз
    atherosclerosis: boolean;
    // Другие заболевания сердечно-сосудистой системы
    otherCardiovascularSystemDiseases: boolean;

}

export interface UserBaseInfo {
    id: string;
    // ФИО
    fio: string;
    // регион
    region: string;
    // класс пациента
    clientClass: string;
    // дата рождения
    born: number;
    // даты последнего обращения
    lastRequestAt: number;
    // количество обращений
    requestCount: number;
    // количество сгенерированных рекомендаций
    recommendationCount: number;
    // оценка сгенерированных рекомендаций
    recommendationAvgRating: number;
    // ФИО курирующего врача
    doctorFio: string;
    // почта курирующего врача
    doctorEmail: string;
}

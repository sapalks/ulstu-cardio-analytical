## Получение списка пользователей

GET, без параметров
Ответ:

```js
interface UserBaseInfo {
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
;[]
```

## Получение информации по пользователю

GET, параметры
userId:string
Ответ:

```js

export interface UserFullModel {
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
    ecg: ECGEnum | undefined;
    // Высокочувствительный С-реактивный белок (кардио)
    protein?: number | undefined;
    // Коэффициент атерогенности
    atherogenicCoefficient?: number | undefined;
    // Креатинин
    creatinine?: number | undefined;

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
    YES = 'yes',
    NO = 'no',
}

export enum PhysicalActivityEnum {
    ONE = 'one',
    MORE = 'more',
    DAILY = 'daily',
}

export enum WorkStatusEnum {
    WORKERD = 'worked',
    RETIRED = 'retired',
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

export enum ECGEnum {
    HAVE_DEVIATIONS = 'have deviations',
    NO_DEVIATIONS = 'no deviations'
}

```

# Редактирование пользователя

POST,
Тело запроса, формат JSON

```js
Pick<UserFullModel,'id'>&Partial<UserFullModel>
```

т.е. в теле передаю id пользователя и набор полей, которые надо изменить
Ответ

```js
{
  status: 'ok' | 'error'
}
```

# Получение Риск сердечно-сосудистых событий в течение 10 лет по шкале SCORE

GET, параметры

```
userId:string
```

Ответ:

```js
{
    status:'ok'|'error',
    riskOfCardiovascularEvents:number,
    errorText:''
}
```

# Получение Ваш идеальный «сердечно-сосудистый возраст»

GET, параметры

```
userId:string
```

Ответ:

```js
{
    status:'ok'|'error',
    cardiovascularAge:number,
    errorText:''
}
```

# Получение рекомендаций

GET, параметры

```
userId:string
```

Ответ:

```js

export enum StatusRecommndationEnum {
    SAVED = 'saved',
    SENDED_TO_DOCTOR = 'sended_to_doctor',
    APPROVED = 'approved'
}

{
    status:'ok'|'error',
    body:{
        id: string;
        createdAt: number;
        number: number;
        text: string;
        rating: number | null;
        status: StatusRecommndationEnum | null;
        canSendToDoctor: boolean;
    }[],
    errorText:''
}
```

# Отправка рекомендации курирующему врачу

GET, параметры

```
recommendationId:string
```

Ответ:

```js
{
    status:'ok'|'error',
    errorText:''
}
```

# Сохранение рекомендации

POST,
Тело запроса, формат JSON

```js
{
  id: string
  rating: number
}
```

т.е. в теле передаю id пользователя и набор полей, которые надо изменить
Ответ

```js
{
  status: 'ok' | 'error'
}
```

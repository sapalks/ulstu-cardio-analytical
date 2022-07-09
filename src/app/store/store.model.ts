

export interface AdminStore {
    users: UserBaseInfo[];
}

export interface FullStore {
    admin: AdminStore;
}

export const initialAdminState: AdminStore = {
    users: []
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

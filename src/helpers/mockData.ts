const userDataActive = {
    id: 2,
    position: '',
    phone: '8999999229',
    fullName: 'yo masta',
    familyName: 'yo',
    firstName: 'masta',
    email: 'yo@antph.local',
    companyName: 'company',
    created: '2025-08-01 08:46:01',
    license: {
        type: 'Стандарт',
        expired: '2026-08-01 14:45:04',
        supportExpired: '2025-08-17 00:00:00',
        employeeCount: 12,
        pointCount: 12,
        lastPoints: 0,
        defaultDomain: 'attack.local',
        isValid: 1,
    },
};

const userDataInactive = {
    id: 3,
    position: '',
    phone: '8999123456',
    fullName: 'Анна Петрова',
    familyName: 'Петрова',
    firstName: 'Анна',
    email: 'anna@testcompany.ru',
    companyName: 'Test Company Ltd',
    created: '2024-03-15 10:30:00',
    license: {
        type: 'Премиум',
        expired: '2024-12-31 23:59:59',
        supportExpired: '2024-11-30 00:00:00',
        employeeCount: 50,
        pointCount: 47,
        lastPoints: 3,
        defaultDomain: 'testcompany.ru',
        isValid: 0,
    },
};


export const userData = [
    { login: 'userDataActive', password: '123456', data: userDataActive },
    { login: 'userDataInactive', password: '123456', data: userDataInactive },
]
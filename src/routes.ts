import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/profilePage/Profile';

export const routes = [
    {
        path: '/',
        component: Home,
        title: 'Главная',
    },
    {
        path: '/profile',
        component: Profile,
        title: 'Профиль',
    },
    {
        path: '/login',
        component: Login,
        title: 'Вход',
    },
];

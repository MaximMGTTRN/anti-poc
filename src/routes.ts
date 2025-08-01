import Home from './pages/Home';
import Profile from './pages/Profile';
import { Login } from '@mui/icons-material';

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

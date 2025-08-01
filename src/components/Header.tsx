import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { User } from '../pages/profilePage/types';
import { routes } from '../routes';

const Header = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated') === 'true';
        const userStr = localStorage.getItem('currentUser');

        setIsAuthenticated(auth);

        if (auth && userStr) {
            try {
                const user: User = JSON.parse(userStr);
                setCurrentUser(user);
            } catch (error) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('isAuthenticated');
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        setCurrentUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    ПРИЛОЖЕНИЕ
                </Typography>

                {isAuthenticated && currentUser ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.875rem',
                                    bgcolor: 'rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                {currentUser.fullName[0].toUpperCase()}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: 'white' }}>
                                {currentUser.fullName}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {routes
                                .filter(route => route.path !== '/login')
                                .map((route) => (
                                    <Button
                                        key={route.path}
                                        component={RouterLink}
                                        to={route.path}
                                        sx={{
                                            color: 'white',
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }}
                                    >
                                        {route.title}
                                    </Button>
                                ))}
                        </Box>

                        <Button
                            onClick={handleLogout}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            Выйти
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {routes
                            .filter(route => route.path === '/login' || route.path === '/')
                            .map((route) => (
                                <Button
                                    key={route.path}
                                    component={RouterLink}
                                    to={route.path}
                                    sx={{
                                        color: 'white',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    {route.title}
                                </Button>
                            ))}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header; 
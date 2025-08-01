import {
    Typography,
    Paper,
    Box,
    TextField,
    Button,
    Alert,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userData } from '../helpers/mockData';

const Login = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const currentUser = localStorage.getItem('currentUser');

        if (isAuthenticated && currentUser) {
            navigate('/profile');
        }
    }, [navigate]);

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
        if (authError) {
            setAuthError(null);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.login) {
            newErrors.login = 'Логин обязателен';
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setAuthError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const user = userData.find(
                u => u.login === formData.login && u.password === formData.password
            );

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                localStorage.setItem('isAuthenticated', 'true');

                navigate('/profile');
            } else {
                setAuthError('Неверный логин или пароль');
            }

        } catch (error) {
            console.error('Ошибка авторизации:', error);
            setAuthError('Произошла ошибка при входе');
        } finally {
            setIsLoading(false);
        }
    };

    const handleHelpClick = () => {
        alert(`1. Логин: userDataActive, Пароль: 123456
    2. Логин: userDataInactive, Пароль: 123456`);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh'
        }}>
            <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Вход в систему
                </Typography>

                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                    Введите свои учетные данные для входа
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Логин"
                        name="login"
                        autoComplete="username"
                        autoFocus
                        value={formData.login}
                        onChange={handleChange('login')}
                        error={!!errors.login}
                        helperText={errors.login}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        error={!!errors.password}
                        helperText={errors.password}
                    />

                    {authError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {authError}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button
                            variant="text"
                            size="small"
                            onClick={handleHelpClick}
                            sx={{ fontSize: '0.875rem' }}
                        >
                            Не получается зайти?
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login; 
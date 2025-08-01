import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  Paper,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import {
  Security as SecurityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { User } from './types';
import { useNotification } from '../../components/NotificationProvider';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const checkAuthAndLoadData = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const currentUserStr = localStorage.getItem('currentUser');

      if (!isAuthenticated || !currentUserStr) {
        navigate('/login');
        return;
      }

      try {
        const currentUser: User = JSON.parse(currentUserStr);
        setUserData(currentUser);
      } catch (error) {
        console.error('Ошибка при парсинге данных пользователя:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    showNotification('Вы успешно вышли из системы', 'info');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return null;
  }

  const { fullName, created } = userData;
  const license = userData.license;

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Личный кабинет
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Профиль пользователя
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 80,
                  height: 80,
                  mr: 3,
                  fontSize: '2rem'
                }}
              >
                {fullName[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Пользователь с {new Date(created).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Имя
                </Typography>
                <Typography variant="body1">
                  {userData.firstName}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Фамилия
                </Typography>
                <Typography variant="body1">
                  {userData.familyName}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1">
                  {userData.email}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Телефон
                </Typography>
                <Typography variant="body1">
                  {userData.phone}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Название компании
                </Typography>
                <Typography variant="body1">
                  {userData.companyName}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Информация о лицензии
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SecurityIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Тип лицензии
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {license.type ?? 'Стандарт'}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Сроки действия
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      <strong>Лицензия до:</strong> {new Date(license.expired).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Поддержка до:</strong> {new Date(license.supportExpired).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Статистика
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      <strong>Сотрудников:</strong> {license.employeeCount}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Оценок:</strong> {license.pointCount}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Домен:</strong> {license.defaultDomain}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={license.isValid ? 'Лицензия активна' : 'Лицензия неактивна'}
                    color={license.isValid ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;

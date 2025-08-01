import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  Paper,
  Button,
  TextField,
  Alert,
  Stack,
  CircularProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { User } from './types';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    phone: '',
    companyName: ''
  });

  const navigate = useNavigate();

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
        setFormData({
          firstName: currentUser.firstName,
          familyName: currentUser.familyName,
          email: currentUser.email,
          phone: currentUser.phone,
          companyName: currentUser.companyName
        });
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

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = () => {
    if (userData) {
      const updatedUserData = {
        ...userData,
        ...formData,
        fullName: `${formData.firstName} ${formData.familyName}`
      };

      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        firstName: userData.firstName,
        familyName: userData.familyName,
        email: userData.email,
        phone: userData.phone,
        companyName: userData.companyName
      });
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Профиль пользователя
              </Typography>
              <Button
                variant={isEditing ? "contained" : "outlined"}
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? 'Сохранить' : 'Редактировать'}
              </Button>
            </Box>

            {isEditing && (
              <Alert severity="info" sx={{ mb: 3 }}>
                Режим редактирования. Внесите изменения и нажмите "Сохранить".
              </Alert>
            )}

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

            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <TextField
                sx={{ flex: '1 1 200px', minWidth: 0 }}
                label="Имя"
                value={formData.firstName}
                onChange={handleChange('firstName')}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                sx={{ flex: '1 1 200px', minWidth: 0 }}
                label="Фамилия"
                value={formData.familyName}
                onChange={handleChange('familyName')}
                disabled={!isEditing}
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Телефон"
                value={formData.phone}
                onChange={handleChange('phone')}
                disabled={!isEditing}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Название компании"
                value={formData.companyName}
                onChange={handleChange('companyName')}
                disabled={!isEditing}
              />
            </Box>

            {isEditing && (
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
              </Box>
            )}
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

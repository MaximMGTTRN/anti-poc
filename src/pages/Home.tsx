import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

interface FormData {
  firstName: string;
  familyName: string;
  email: string;
  phone: string;
  companyName: string;
  username: string;
  password: string;
  employeeCount: string;
  companyTargetCount: string;
  package: '100' | '500';
}

const Home = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    familyName: '',
    email: '',
    phone: '',
    companyName: '',
    username: '',
    password: '',
    employeeCount: '',
    companyTargetCount: '',
    package: '100'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
    if (!formData.familyName) newErrors.familyName = 'Фамилия обязательна';
    if (!formData.email) newErrors.email = 'Email обязателен';
    if (!formData.phone) newErrors.phone = 'Телефон обязателен';
    if (!formData.companyName) newErrors.companyName = 'Название компании обязательно';
    if (!formData.username) newErrors.username = 'Логин обязателен';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    if (!formData.employeeCount) newErrors.employeeCount = 'Количество сотрудников обязательно';
    if (!formData.companyTargetCount) newErrors.companyTargetCount = 'Целевое количество сотрудников обязательно';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      sendToManager(formData);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPackagePrice = () => {
    return formData.package === '100' ? '50 000 ₽' : '200 000 ₽';
  };

  const getPackageUsers = () => {
    return formData.package === '100' ? '100 пользователей' : '500 пользователей';
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Защита от фишинга и обучение сотрудников
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Оформить заказ
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend">Выберите пакет</FormLabel>
                <RadioGroup
                  value={formData.package}
                  onChange={handleChange('package')}
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel
                    value="100"
                    control={<Radio />}
                    label="100 пользователей - 50 000 ₽"
                  />
                  <FormControlLabel
                    value="500"
                    control={<Radio />}
                    label="500 пользователей - 200 000 ₽"
                  />
                </RadioGroup>
              </FormControl>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Личные данные
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                  sx={{ flex: '1 1 200px', minWidth: 0 }}
                  label="Имя *"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  sx={{ flex: '1 1 200px', minWidth: 0 }}
                  label="Фамилия *"
                  value={formData.familyName}
                  onChange={handleChange('familyName')}
                  error={!!errors.familyName}
                  helperText={errors.familyName}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Телефон *"
                  placeholder="8XXXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                Данные компании
              </Typography>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Название компании *"
                  value={formData.companyName}
                  onChange={handleChange('companyName')}
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    sx={{ flex: '1 1 200px', minWidth: 0 }}
                    label="Количество сотрудников *"
                    value={formData.employeeCount}
                    onChange={handleChange('employeeCount')}
                    error={!!errors.employeeCount}
                    helperText={errors.employeeCount}
                  />
                  <TextField
                    sx={{ flex: '1 1 200px', minWidth: 0 }}
                    label="Целевое количество *"
                    value={formData.companyTargetCount}
                    onChange={handleChange('companyTargetCount')}
                    error={!!errors.companyTargetCount}
                    helperText={errors.companyTargetCount}
                  />
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom>
                Учетные данные
              </Typography>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Логин *"
                  value={formData.username}
                  onChange={handleChange('username')}
                  error={!!errors.username}
                  helperText={errors.username}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Пароль *"
                  type="password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Box>

              <Card sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Итого к оплате
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {getPackagePrice()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getPackageUsers()}
                  </Typography>
                </CardContent>
              </Card>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ py: 1.5 }}
              >
                {isLoading ? 'Обработка...' : 'Оплатить'}
              </Button>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <Typography variant="h4" gutterBottom>
              Anti-Phishing Platform
            </Typography>

            <Typography variant="body1" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Основные возможности
            </Typography>

            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography component="li" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography component="li" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography component="li" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Box>

            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Преимущества
            </Typography>

            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography component="li" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography component="li" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Alert>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

export async function sendToManager(formData: FormData) {
  const payload = {
    license: {
      features: [],
      expired: "2026-08-01 14:47:57",
      supportExpired: "2025-08-31 00:00:00",
      senderDomains: [
        {
          id: 1,
          name: "attack.local",
          global_id: "AF_a76687ac5908b95d48ef5d1ee331081d39645ed2",
          isDefault: 1,
          valid: 1
        }
      ],
      defaultDomain: "attack.local",
      accessToken: {
        value: null,
        expirationDate: null
      },
      employeeCount: formData.employeeCount,
      outInfectedUrl: "http://ya.ru",
      companyTargetCount: formData.companyTargetCount,
      isInfinity: true,
      domains: ["antph.local"],
      packageId: formData.package === "100" ? 1 : 2
    },
    learning: {
      timeValue: 1,
      timePeriod: "day",
      type: 2,
      systemLanguage: "ru",
      internalUrl: "http://edu.local",
      proxyUrl: null,
      linkMode: 2,
      authType: 1
    },
    timeZone: "UTC",
    userPolicy: {
      char_small: 0,
      char_big: 0,
      char_special: 0,
      digit: 0,
      digit_min: 0,
      length: 0,
      password_verify_count: 5,
      password_active_days: 0,
      global: {
        char_small: 0,
        char_big: 0,
        char_special: 0,
        digit: 0,
        digit_min: 0,
        length: 0,
        password_verify_count: 5,
        password_active_days: 0,
        global: null
      }
    },
    password: formData.password,
    userAuthSettings: {
      noActionLogoutTimeout: 0,
      authFailLimit: 0,
      authTimeout: 0,
      global: null
    },
    email: formData.email,
    familyName: formData.familyName,
    firstName: formData.firstName,
    phone: formData.phone,
    companyName: formData.companyName,
    canBeMetaClient: false,
    username: formData.username,
    days_as_new: 60,
    certExpire: 365,
    directories: JSON.stringify({
      finalPages: [],
      phishingPages: [],
      certificates: [],
      courses: []
    })
  };

  try {
    const res = await axios.post('http://localhost:3001/mock-manager', payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Csrf-Token': 'MOCKED_TOKEN',
        'Enable-Session': '1',
        'Cookie': 'ANTPHMNGSESSID=mocked-session; instance=1'
      }
    });

    return res.data;
  } catch (error) {
    console.error("Ошибка при отправке в менеджера:", error);
    throw error;
  }
}
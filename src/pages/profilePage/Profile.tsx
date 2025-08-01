import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const userData = {
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

const Profile: React.FC = () => {
  const { fullName, email, phone, companyName, created } = userData;
  const license = userData.license;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Typography variant="h4" gutterBottom>
        Личный кабинет
      </Typography>

      <Grid container spacing={4} maxWidth="md">
        <Grid>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{ bgcolor: deepPurple[500], width: 64, height: 64, mr: 2 }}
                >
                  {fullName[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6">{fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {email}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={0.5}>
                <Typography>Телефон: {phone}</Typography>
                <Typography>Компания: {companyName}</Typography>
                <Typography>
                  Дата регистрации: {new Date(created).toLocaleDateString()}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Лицензия
              </Typography>
              <Stack spacing={0.5}>
                <Typography>Тип: {license.type ?? '—'}</Typography>
                <Typography>
                  Срок действия до:{' '}
                  {new Date(license.expired).toLocaleDateString()}
                </Typography>
                <Typography>
                  Поддержка до:{' '}
                  {new Date(license.supportExpired).toLocaleDateString()}
                </Typography>
                <Typography>Домен: {license.defaultDomain}</Typography>
                <Typography>Сотрудников: {license.employeeCount}</Typography>
                <Typography>Оценок: {license.pointCount}</Typography>
              </Stack>
              <Box mt={2}>
                <Chip
                  label={license.isValid ? 'Активна' : 'Неактивна'}
                  color={license.isValid ? 'success' : 'error'}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;

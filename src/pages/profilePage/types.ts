export interface User {
  fullName: string;
  email: string;
  registeredAt: string;
  avatarUrl?: string;
}

export interface License {
  type: string;
  startDate: string;
  endDate: string;
  status: 'Активна' | 'Неактивна';
}

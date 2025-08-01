export interface User {
  id: number;
  position: string;
  phone: string;
  fullName: string;
  familyName: string;
  firstName: string;
  email: string;
  companyName: string;
  created: string;
  license: License;
}

export interface License {
  type: string;
  expired: string;
  supportExpired: string;
  employeeCount: number;
  pointCount: number;
  lastPoints: number;
  defaultDomain: string;
  isValid: number;
}

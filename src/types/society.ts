
// Define types shared across society components

export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: string;
  status?: string;
}

export interface BankInfo {
  accountHolder: string;
  bankName: string;
  iban: string;
  bic: string;
}

export interface FamilyMember {
  name: string;
  birthDate: string;
}

export interface FamilyInfo {
  maritalStatus: string;
  spouse?: FamilyMember;
  children?: FamilyMember[];
}

export interface SocietyInfo {
  name: string;
  founded: string;
  members: number;
  description: string;
}

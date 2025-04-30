
import { useState } from 'react';
import { Address, PersonalInfo, BankInfo, FamilyInfo, Payment } from '@/types/society';

export const useSocietyMember = () => {
  // Mock society member data - currently stored in state for editing
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+49 123 456 7890",
    birthDate: "15.05.1985",
    gender: "Male",
    address: "Musterstraße 123, 10115 Berlin",
    status: "Aktif",
  });

  // Address fields as structured data
  const [addressData, setAddressData] = useState<Address>({
    street: "Musterstraße",
    houseNumber: "123",
    postalCode: "10115",
    city: "Berlin",
  });

  // Mock family information
  const familyInfo: FamilyInfo = {
    maritalStatus: "Married",
    spouse: {
      name: "Maria Smith",
      birthDate: "22.08.1988",
    },
    children: [
      {
        name: "Thomas Smith",
        birthDate: "03.12.2012",
      },
      {
        name: "Anna Smith",
        birthDate: "17.06.2016",
      }
    ]
  };

  // Mock bank information - now state for editing
  const [bankInfo, setBankInfo] = useState<BankInfo>({
    accountHolder: "John Smith",
    bankName: "Sparkasse Berlin",
    iban: "DE12 3456 7890 1234 5678 90",
    bic: "SPKRDE21XXX"
  });

  // Mock payment history
  const paymentHistory: Payment[] = [
    {
      id: "p1",
      date: "01.01.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p2",
      date: "01.02.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p3",
      date: "01.03.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p4",
      date: "01.04.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Pending"
    }
  ];

  // Mock society data
  const societyInfo = {
    name: "Community Helpers Society",
    founded: "2020",
    members: 124,
    description: "A volunteer organization dedicated to helping the community through various social service activities.",
  };

  return {
    personalInfo,
    setPersonalInfo,
    addressData,
    setAddressData,
    familyInfo,
    bankInfo,
    setBankInfo,
    paymentHistory,
    societyInfo
  };
};

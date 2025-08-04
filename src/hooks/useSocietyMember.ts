
import { useState, useEffect } from 'react';
import { Address, PersonalInfo, BankInfo, FamilyInfo, Payment } from '@/types/society';
import { memberApi } from '@/services/apiService';
import { getCurrentUser } from '@/utils/authUtils';

export const useSocietyMember = () => {
  // Real user data from API - stored in state for editing
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
    status: "",
  });

  // Address fields as structured data
  const [addressData, setAddressData] = useState<Address>({
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
  });

  // Family information - will be populated from API if available
  const [familyInfo, setFamilyInfo] = useState<FamilyInfo>({
    maritalStatus: "",
    spouse: {
      name: "",
      birthDate: "",
    },
    children: []
  });

  // Bank information - will be populated from API if available
  const [bankInfo, setBankInfo] = useState<BankInfo>({
    accountHolder: "",
    bankName: "",
    iban: "",
    bic: ""
  });

  // Payment history - will be populated from API if available
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);

  // Society data - will be populated from API if available
  const [societyInfo, setSocietyInfo] = useState({
    name: "",
    founded: "",
    members: 0,
    description: "",
  });

  // Load user data from API
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) return;

        // Fetch user profile data
        const profileResponse = await memberApi.getProfile();
        if (profileResponse.success && profileResponse.data) {
          const userData = profileResponse.data;

          // Update personal info with API data
          setPersonalInfo({
            fullName: userData.name || userData.fullName || "",
            email: userData.email || "",
            phone: userData.phone || userData.phoneNumber || "",
            birthDate: userData.birthDate || userData.dateOfBirth || "",
            gender: userData.gender || "",
            address: userData.address || "",
            status: userData.status || userData.membershipStatus || "",
          });

          // Update address data if available
          if (userData.address) {
            // Try to parse address string or use structured address data
            const addressParts = userData.address.split(',');
            setAddressData({
              street: userData.street || (addressParts[0] ? addressParts[0].trim() : ""),
              houseNumber: userData.houseNumber || "",
              postalCode: userData.postalCode || (addressParts[1] ? addressParts[1].trim().split(' ')[0] : ""),
              city: userData.city || (addressParts[1] ? addressParts[1].trim().split(' ').slice(1).join(' ') : ""),
            });
          }

          // Update bank info if available
          if (userData.bankInfo || userData.iban) {
            setBankInfo({
              accountHolder: userData.bankInfo?.accountHolder || userData.accountHolder || userData.name || "",
              bankName: userData.bankInfo?.bankName || userData.bankName || "",
              iban: userData.bankInfo?.iban || userData.iban || "",
              bic: userData.bankInfo?.bic || userData.bic || ""
            });
          }

          // Update family info if available
          if (userData.familyInfo || userData.spouse || userData.children) {
            setFamilyInfo({
              maritalStatus: userData.familyInfo?.maritalStatus || userData.maritalStatus || "",
              spouse: {
                name: userData.familyInfo?.spouse?.name || userData.spouse?.name || "",
                birthDate: userData.familyInfo?.spouse?.birthDate || userData.spouse?.birthDate || "",
              },
              children: userData.familyInfo?.children || userData.children || []
            });
          }
        }

        // Fetch payment history if available
        try {
          const paymentsResponse = await memberApi.getPaymentHistory();
          if (paymentsResponse.success && paymentsResponse.data) {
            setPaymentHistory(paymentsResponse.data);
          }
        } catch (error) {
          console.log("Payment history not available:", error);
        }

      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  return {
    personalInfo,
    setPersonalInfo,
    addressData,
    setAddressData,
    familyInfo,
    setFamilyInfo,
    bankInfo,
    setBankInfo,
    paymentHistory,
    setPaymentHistory,
    societyInfo,
    setSocietyInfo
  };
};

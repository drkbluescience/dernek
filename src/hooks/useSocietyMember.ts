
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

        // Handle both success/data format and direct data format
        const userData = profileResponse.success ? profileResponse.data : profileResponse;

        if (userData && typeof userData === 'object') {
          const userDataObj = userData as any;

          // Update personal info with real API data
          setPersonalInfo({
            fullName: userDataObj.briefname || "",
            email: userDataObj.email || "",
            phone: userDataObj.handynummer || userDataObj.telefonnummer || "",
            birthDate: "", // Not available in current API response
            gender: "", // Not available in current API response
            address: `${userDataObj.strasse || ""} ${userDataObj.hausnummer || ""}, ${userDataObj.plz || ""} ${userDataObj.ort || ""}`.trim(),
            status: userDataObj.status || "",
          });

          // Update address data with structured API data
          setAddressData({
            street: userDataObj.strasse || "",
            houseNumber: userDataObj.hausnummer || "",
            postalCode: userDataObj.plz || "",
            city: userDataObj.ort || "",
          });

          // Update bank info with API data
          setBankInfo({
            accountHolder: userDataObj.kontoinhaber || "",
            bankName: userDataObj.bankname || "",
            iban: userDataObj.iban || "",
            bic: userDataObj.bic || ""
          });

          // Update family info if mitglied array exists
          if (userDataObj.mitglied && Array.isArray(userDataObj.mitglied)) {
            const familyMembers = userDataObj.mitglied;

            // Try to identify spouse and children from mitglied array
            const spouse = familyMembers.find((member: any) =>
              member.verwandtschaftsgrad === 'Ehepartner' ||
              member.verwandtschaftsgrad === 'Ehefrau' ||
              member.verwandtschaftsgrad === 'Ehemann'
            );

            const children = familyMembers.filter((member: any) =>
              member.verwandtschaftsgrad === 'Kind' ||
              member.verwandtschaftsgrad === 'Sohn' ||
              member.verwandtschaftsgrad === 'Tochter'
            );

            setFamilyInfo({
              maritalStatus: spouse ? "Verheiratet" : "",
              spouse: {
                name: spouse?.name || spouse?.vorname + " " + spouse?.nachname || "",
                birthDate: spouse?.geburtsdatum || "",
              },
              children: children.map((child: any) => ({
                name: child.name || child.vorname + " " + child.nachname || "",
                birthDate: child.geburtsdatum || "",
              }))
            });
          }
        }

        // Process payment history from feeMatches if available
        if (userDataObj.feeMatches && Array.isArray(userDataObj.feeMatches)) {
          const payments = userDataObj.feeMatches.map((fee: any, index: number) => ({
            id: `payment-${index}`,
            date: fee.faelligkeitsdatum || fee.datum || "",
            amount: fee.betrag ? `${fee.betrag.toFixed(2)} €` : "",
            type: fee.beitragsart || "Mitgliedsbeitrag",
            status: fee.bezahlt ? "Bezahlt" : "Offen"
          }));

          setPaymentHistory(payments);
        }

        // Update society info with contract details
        setSocietyInfo({
          name: "Zentrum für Soziale Unterstützung e.V.",
          founded: "1991",
          members: 0, // Not available in API
          description: `Mitglied seit: ${userDataObj.startderMitgliedschaft || ""}\nVertragsnummer: ${userDataObj.vertragsnummer || ""}\nAktueller Saldo: ${userDataObj.saldo ? userDataObj.saldo.toFixed(2) + " €" : ""}`,
        });

      } catch (error) {
        console.error("Error loading user data:", error);
        // Keep empty state if API fails
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

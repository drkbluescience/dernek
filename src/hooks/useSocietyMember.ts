
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

  // Raw family data from API
  const [rawFamilyData, setRawFamilyData] = useState<any[]>([]);

  // Raw payment data from API
  const [rawPaymentData, setRawPaymentData] = useState<any[]>([]);

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

        // Debug: Check if feeMatches exists in response
        console.log("🔍 feeMatches exists?", !!(userData && userData.feeMatches));
        console.log("🔍 feeMatches length:", userData?.feeMatches?.length || 0);

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

            // Store raw family data for detailed display
            setRawFamilyData(familyMembers);

            // Find spouse based on verwandschaft field
            const spouse = familyMembers.find((member: any) =>
              member.verwandschaft === 'Ehefrau' ||
              member.verwandschaft === 'Eheman' ||
              member.verwandschaft === 'Ehepartner'
            );

            // Find children based on verwandschaft field
            const children = familyMembers.filter((member: any) =>
              member.verwandschaft === 'Kind' ||
              member.verwandschaft === 'Sohn' ||
              member.verwandschaft === 'Tochter'
            );

            // Determine marital status from familienstand_Id or presence of spouse
            let maritalStatus = "";
            if (spouse) {
              maritalStatus = "Verheiratet";
            } else if (familyMembers.length > 0 && familyMembers[0].familienstand_Id) {
              // Map familienstand_Id to status (this might need adjustment based on your system)
              const familienstandId = familyMembers[0].familienstand_Id;
              switch (familienstandId) {
                case 1: maritalStatus = "Ledig"; break;
                case 2: maritalStatus = "Verheiratet"; break;
                case 3: maritalStatus = "Geschieden"; break;
                case 4: maritalStatus = "Verwitwet"; break;
                default: maritalStatus = "";
              }
            }

            setFamilyInfo({
              maritalStatus,
              spouse: spouse ? {
                name: `${spouse.vorname || ""} ${spouse.nachname || ""}`.trim(),
                birthDate: spouse.geburtsdatum || "",
              } : { name: "", birthDate: "" },
              children: children.map((child: any) => ({
                name: `${child.vorname || ""} ${child.nachname || ""}`.trim(),
                birthDate: child.geburtsdatum || "",
              }))
            });
          }
        }



        // Update society info with contract details
        setSocietyInfo({
          name: "Zentrum für Soziale Unterstützung e.V.",
          founded: "1991",
          members: 0, // Not available in API
          description: `Mitglied seit: ${userDataObj.startderMitgliedschaft || ""}\nVertragsnummer: ${userDataObj.vertragsnummer || ""}\nAktueller Saldo: ${userDataObj.saldo ? userDataObj.saldo.toFixed(2) + " €" : ""}`,
        });

        // Process payment history from feeMatches if available
        console.log("🔍 Step 1: Checking for feeMatches...");
        console.log("🔍 userDataObj.feeMatches exists?", !!(userDataObj.feeMatches));
        console.log("🔍 userDataObj.feeMatches is array?", Array.isArray(userDataObj.feeMatches));
        console.log("🔍 userDataObj.feeMatches length:", userDataObj.feeMatches?.length);

        if (userDataObj.feeMatches && Array.isArray(userDataObj.feeMatches)) {
          console.log("✅ Step 2: FOUND feeMatches with", userDataObj.feeMatches.length, "items");
          console.log("🔍 Step 3: About to call setRawPaymentData...");

          // Store raw payment data for detailed display with pagination
          setRawPaymentData(userDataObj.feeMatches);
          console.log("✅ Step 4: setRawPaymentData called with", userDataObj.feeMatches.length, "items");

          // Also create processed payment history for fallback
          const payments = userDataObj.feeMatches.map((fee: any, index: number) => ({
            id: fee.id || `payment-${index}`,
            date: fee.datum ? new Date(fee.datum).toLocaleDateString('de-DE') : "",
            amount: fee.soll ? `${fee.soll} €` : (fee.haben ? `${fee.haben} €` : "0 €"),
            type: `Gebühr ${fee.fk_Gebuehren_Id || 'N/A'}`,
            status: fee.haben > 0 ? "Bezahlt" : "Offen"
          }));

          setPaymentHistory(payments);
          console.log("✅ Step 5: setPaymentHistory called with", payments.length, "items");
        } else {
          console.log("❌ Step 2: feeMatches NOT found or not array");
        }
        }

      } catch (error) {
        console.error("Error loading user data:", error);
        // Keep empty state if API fails
      }
    };

    loadUserData();
  }, []);

  // Debug: Check final state before return
  console.log("🔍 Final state check:");
  console.log("🔍 rawPaymentData length:", rawPaymentData?.length || 0);
  console.log("🔍 paymentHistory length:", paymentHistory?.length || 0);

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
    setSocietyInfo,
    rawFamilyData,
    rawPaymentData
  };
};

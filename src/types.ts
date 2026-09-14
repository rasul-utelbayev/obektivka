export interface RelativeItem {
  id: string;
  relation: string; // Otasi, Onasi, Akasi, Ukasi, Opasi, Singlisi, Turmush o'rtog'i, O'g'li, Qizi va h.k.
  fio: string;
  birthAndPlace: string;
  workAndPosition: string;
  residence: string;
}

export interface LanguageCertificate {
  id: string;
  language: string;
  certificate: string;
  certNumber: string;
  validity: string;
}

export interface WorkHistoryItem {
  id: string;
  period: string; // masalan: "2025 y. - x.v."
  position: string; // masalan: "Berdaq nomidagi qoraqalpoq davlat universiteti Iqtisodiyot fakulteti..."
}

export interface ObektivkaData {
  // 1-sahifa
  fio: string;
  currentStatusDate: string; // masalan: "2025 yil 9-sentyabr:"
  currentPosition: string; // Hozirgi lavozim yoki o'qish joyi
  photoUrl: string; // Rasm (base64 yoki URL)
  
  birthDate: string; // "05.01.2006"
  birthPlace: string; // "Qoraqalpog'iston Respublikasi, Xojayli tumani"
  nationality: string; // "Qoraqalpoq"
  partyMembership: string; // "Yoq"
  education: string; // "O’rta-mahsus", "Oliy"
  graduated: string; // "2024 y. Nukus shahar \"Awmet\" nodavlat talim muassasi"
  specialization: string; // "Aniq fanlar"
  academicDegree: string; // "Yoq"
  academicTitle: string; // "Yoq"
  
  languages: LanguageCertificate[];
  stateAwards: string; // "Yoq"
  electedOfficial: string; // "Yoq"
  
  workHistory: WorkHistoryItem[];

  // 2-sahifa (Yaqin qarindoshlar)
  relatives: RelativeItem[];
  homeAddress: string;
  phone: string;
}

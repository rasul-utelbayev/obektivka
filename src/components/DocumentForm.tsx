import React, { useState } from 'react';
import { ObektivkaData, RelativeItem, LanguageCertificate, WorkHistoryItem } from '../types';
import { initialObektivkaData, emptyObektivkaData } from '../defaultData';
import {
  User,
  GraduationCap,
  Languages,
  Award,
  Briefcase,
  Users,
  MapPin,
  Upload,
  Trash2,
  Plus,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileText,
} from 'lucide-react';

interface DocumentFormProps {
  data: ObektivkaData;
  onChange: (newData: ObektivkaData) => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'languages' | 'work' | 'relatives' | 'contact' | 'quickpaste'>('personal');
  const [quickText, setQuickText] = useState('');
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  const updateField = <K extends keyof ObektivkaData>(field: K, value: ObektivkaData[K]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateField('photoUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateField('photoUrl', '');
  };

  // Language management
  const addLanguage = () => {
    const newLang: LanguageCertificate = {
      id: Date.now().toString(),
      language: 'Ingliz',
      certificate: 'CEFR B2',
      certNumber: '',
      validity: '2024 - 2026',
    };
    updateField('languages', [...data.languages, newLang]);
  };

  const removeLanguage = (id: string) => {
    updateField(
      'languages',
      data.languages.filter((l) => l.id !== id),
    );
  };

  const updateLanguage = (id: string, field: keyof LanguageCertificate, val: string) => {
    updateField(
      'languages',
      data.languages.map((l) => (l.id === id ? { ...l, [field]: val } : l)),
    );
  };

  // Work history management
  const addWorkHistory = () => {
    const newWork: WorkHistoryItem = {
      id: Date.now().toString(),
      period: '2025 y. - h.v.',
      position: '',
    };
    updateField('workHistory', [...data.workHistory, newWork]);
  };

  const removeWorkHistory = (id: string) => {
    updateField(
      'workHistory',
      data.workHistory.filter((w) => w.id !== id),
    );
  };

  const updateWorkHistory = (id: string, field: keyof WorkHistoryItem, val: string) => {
    updateField(
      'workHistory',
      data.workHistory.map((w) => (w.id === id ? { ...w, [field]: val } : w)),
    );
  };

  // Relatives management
  const addRelative = (relationType: string = 'Qarindoshi') => {
    const newRel: RelativeItem = {
      id: Date.now().toString(),
      relation: relationType,
      fio: '',
      birthAndPlace: '',
      workAndPosition: '',
      residence: data.homeAddress || '',
    };
    updateField('relatives', [...data.relatives, newRel]);
  };

  const removeRelative = (id: string) => {
    updateField(
      'relatives',
      data.relatives.filter((r) => r.id !== id),
    );
  };

  const updateRelative = (id: string, field: keyof RelativeItem, val: string) => {
    updateField(
      'relatives',
      data.relatives.map((r) => (r.id === id ? { ...r, [field]: val } : r)),
    );
  };

  // Quick Text Parser helper (parses lines if user pastes simple notes)
  const handleQuickParse = () => {
    if (!quickText.trim()) return;

    const lines = quickText.split('\n').map((l) => l.trim()).filter(Boolean);
    const updated = { ...data };

    lines.forEach((line) => {
      const lower = line.toLowerCase();
      if (lower.startsWith('fio:') || lower.startsWith('ism:') || lower.startsWith('ism sharif:')) {
        updated.fio = line.split(':')[1]?.trim().toUpperCase() || updated.fio;
      } else if (lower.startsWith('tug') && lower.includes('sana')) {
        updated.birthDate = line.split(':')[1]?.trim() || updated.birthDate;
      } else if (lower.startsWith('tug') && lower.includes('joy')) {
        updated.birthPlace = line.split(':')[1]?.trim() || updated.birthPlace;
      } else if (lower.startsWith('millat')) {
        updated.nationality = line.split(':')[1]?.trim() || updated.nationality;
      } else if (lower.startsWith('tel') || lower.startsWith('telefon')) {
        updated.phone = line.split(':')[1]?.trim() || updated.phone;
      } else if (lower.startsWith('manzil')) {
        updated.homeAddress = line.split(':')[1]?.trim() || updated.homeAddress;
      } else if (lower.startsWith('mutaxassislik')) {
        updated.specialization = line.split(':')[1]?.trim() || updated.specialization;
      } else if (lower.startsWith('tamomlagan')) {
        updated.graduated = line.split(':')[1]?.trim() || updated.graduated;
      }
    });

    onChange(updated);
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3000);
  };

  const commonRelations = [
    'Otasi',
    'Onasi',
    'Akasi',
    'Ukasi',
    'Opasi',
    'Singlisi',
    "Turmush o'rtog'i",
    "O'g'li",
    'Qizi',
  ];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Form Top Bar */}
      <div className="p-4 border-b border-neutral-200 bg-neutral-50/80 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Ma'lumotlarni to'ldirish
          </h2>
          <p className="text-xs text-neutral-500">
            Original format o'zgarmaydi, faqat maydonlarni to'ldiring
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange(initialObektivkaData)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-xs"
            title="Rasmdagi namunaviy ma'lumotlarni qayta yuklash"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
            Namunani yuklash
          </button>
          <button
            type="button"
            onClick={() => onChange(emptyObektivkaData)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            title="Barcha maydonlarni bo'shatish"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Tozalash
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 overflow-x-auto bg-neutral-100/60 p-1 text-xs font-medium scrollbar-thin">
        <button
          type="button"
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === 'personal'
              ? 'bg-white text-blue-700 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          1. Asosiy & Rasm
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('education')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === 'education'
              ? 'bg-white text-blue-700 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          2. O'qish / Ish
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('languages')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === 'languages'
              ? 'bg-white text-blue-700 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          3. Tillar & Mukofot
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('work')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === 'work'
              ? 'bg-white text-blue-700 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          4. Mehnat faoliyati
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('relatives')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === 'relatives'
              ? 'bg-white text-blue-700 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          5. Qarindoshlar ({data.relatives.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === 'contact'
              ? 'bg-white text-blue-700 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          6. Manzil & Aloqa
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('quickpaste')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap ${
            activeTab === 'quickpaste'
              ? 'bg-white text-purple-700 shadow-xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          Tezkor matn
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5 overflow-y-auto max-h-[calc(100vh-250px)] space-y-4 text-sm">
        {/* TAB 1: ASOSIY VA RASM */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            {/* Photo upload */}
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                3x4 Rasm (Ixtiyoriy)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 border border-neutral-300 rounded bg-white overflow-hidden flex items-center justify-center flex-shrink-0">
                  {data.photoUrl ? (
                    <img
                      src={data.photoUrl}
                      alt="3x4"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <User className="w-8 h-8 text-neutral-300" />
                  )}
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-neutral-600" />
                    Rasm yuklash
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {data.photoUrl && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="ml-2 inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      O'chirish
                    </button>
                  )}
                  <p className="text-[11px] text-neutral-500">
                    JPG, PNG yoki WEBP formatidagi rasmni tanlang.
                  </p>
                </div>
              </div>
            </div>

            {/* FIO */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                F.I.O. (Familiya, Ism, Sharif) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.fio}
                onChange={(e) => updateField('fio', e.target.value.toUpperCase())}
                placeholder="XABIBULLAEV NURSULTAN ORÍNBAEVICH"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-[11px] text-neutral-400">
                Katta harflarda yozish rasmiy standartga mos keladi
              </span>
            </div>

            {/* Birth date & place */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Tug'ilgan yili va sanasi
                </label>
                <input
                  type="text"
                  value={data.birthDate}
                  onChange={(e) => updateField('birthDate', e.target.value)}
                  placeholder="05.01.2006"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Millati
                </label>
                <input
                  type="text"
                  value={data.nationality}
                  onChange={(e) => updateField('nationality', e.target.value)}
                  placeholder="Qoraqalpoq / O'zbek"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Tug'ilgan joyi
              </label>
              <textarea
                rows={2}
                value={data.birthPlace}
                onChange={(e) => updateField('birthPlace', e.target.value)}
                placeholder="Qoraqalpog'iston Respublikasi, Xojayli tumani"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Partiyaviyligi
              </label>
              <input
                type="text"
                value={data.partyMembership}
                onChange={(e) => updateField('partyMembership', e.target.value)}
                placeholder="Yoq / O'zLiDeP azosi"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* TAB 2: O'QISH / ISH VA TA'LIM */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900">
              Bu bo'lim sarlavhadan keyingi hozirgi o'qish/ish holatini va ma'lumot darajasini belgilaydi.
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Hozirgi boshlangan sana (masalan: 2025 yil 9-sentyabr:)
              </label>
              <input
                type="text"
                value={data.currentStatusDate}
                onChange={(e) => updateField('currentStatusDate', e.target.value)}
                placeholder="2025 yil 9-sentyabr:"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Hozirgi o'qish yoki ish joyi (to'liq nomi va talaba/lavozim)
              </label>
              <textarea
                rows={3}
                value={data.currentPosition}
                onChange={(e) => updateField('currentPosition', e.target.value)}
                placeholder="Berdaq nomidagi qoraqalpoq davlat universiteti Iqtisodiyot fakulteti Moliya va moliyaviy texnologiyalar bakalavr talim yónalishi talabasi"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Ma'lumoti
                </label>
                <select
                  value={data.education}
                  onChange={(e) => updateField('education', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="O’rta-mahsus">O’rta-mahsus</option>
                  <option value="Oliy">Oliy</option>
                  <option value="Tugallanmagan oliy">Tugallanmagan oliy</option>
                  <option value="O'rta">O'rta</option>
                  <option value="Bakalavr">Bakalavr</option>
                  <option value="Magistr">Magistr</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Mutaxassisligi
                </label>
                <input
                  type="text"
                  value={data.specialization}
                  onChange={(e) => updateField('specialization', e.target.value)}
                  placeholder="Aniq fanlar / Iqtisodchi / Dasturchi"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Tamomlagan ta'lim muassasasi (yili va nomi)
              </label>
              <textarea
                rows={2}
                value={data.graduated}
                onChange={(e) => updateField('graduated', e.target.value)}
                placeholder='2024 y. Nukus shahar "Awmet" nodavlat talim muassasi'
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Ilmiy darajasi
                </label>
                <input
                  type="text"
                  value={data.academicDegree}
                  onChange={(e) => updateField('academicDegree', e.target.value)}
                  placeholder="Yoq / PhD / Fan nomzodi"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Ilmiy unvoni
                </label>
                <input
                  type="text"
                  value={data.academicTitle}
                  onChange={(e) => updateField('academicTitle', e.target.value)}
                  placeholder="Yoq / Dotsent / Professor"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TILLAR VA MUKOFOTLAR */}
        {activeTab === 'languages' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-neutral-700">
                  Chet tillari va sertifikatlari
                </label>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Til qo'shish
                </button>
              </div>

              {data.languages.length === 0 ? (
                <div className="p-4 border border-dashed border-neutral-300 rounded-lg text-center text-xs text-neutral-500">
                  Chet tillari kiritilmagan ("Yoq" deb chiqadi).
                </div>
              ) : (
                <div className="space-y-3">
                  {data.languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 grid grid-cols-1 md:grid-cols-4 gap-2 relative"
                    >
                      <div>
                        <span className="text-[10px] text-neutral-500 block mb-0.5">Chet tili</span>
                        <input
                          type="text"
                          value={lang.language}
                          onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                          placeholder="Ingliz"
                          className="w-full px-2 py-1 border border-neutral-300 rounded text-xs bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block mb-0.5">Sertifikat</span>
                        <input
                          type="text"
                          value={lang.certificate}
                          onChange={(e) => updateLanguage(lang.id, 'certificate', e.target.value)}
                          placeholder="CEFR / IELTS"
                          className="w-full px-2 py-1 border border-neutral-300 rounded text-xs bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block mb-0.5">Seriya va raqam</span>
                        <input
                          type="text"
                          value={lang.certNumber}
                          onChange={(e) => updateLanguage(lang.id, 'certNumber', e.target.value)}
                          placeholder="24BBA1104811XN"
                          className="w-full px-2 py-1 border border-neutral-300 rounded text-xs font-mono bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex-1">
                          <span className="text-[10px] text-neutral-500 block mb-0.5">Muddati</span>
                          <input
                            type="text"
                            value={lang.validity}
                            onChange={(e) => updateLanguage(lang.id, 'validity', e.target.value)}
                            placeholder="10.01.2024 - 09.01.2026"
                            className="w-full px-2 py-1 border border-neutral-300 rounded text-xs bg-white"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLanguage(lang.id)}
                          className="mt-4 p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Davlat mukofatlari bilan taqdirlanganmi (qanaqa)
              </label>
              <input
                type="text"
                value={data.stateAwards}
                onChange={(e) => updateField('stateAwards', e.target.value)}
                placeholder="Yoq / Shuxrat medali (2023)"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Xalq deputatlari, respublika, viloyat, shahar va tuman Kengashi deputatimi yoki boshqa saylandi organlarning azosimi
              </label>
              <textarea
                rows={2}
                value={data.electedOfficial}
                onChange={(e) => updateField('electedOfficial', e.target.value)}
                placeholder="Yoq"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* TAB 4: MEHNAT FAOLIYATI */}
        {activeTab === 'work' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-1">
              <div>
                <label className="text-xs font-semibold text-neutral-700">
                  MEXNAT FAOLIYATI
                </label>
                <p className="text-[11px] text-neutral-500">
                  Talabalik, amaliyot yoki ishlagan joylar xronologik tartibda
                </p>
              </div>
              <button
                type="button"
                onClick={addWorkHistory}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Plus className="w-3 h-3" />
                Faoliyat qo'shish
              </button>
            </div>

            {data.workHistory.length === 0 ? (
              <div className="p-4 border border-dashed border-neutral-300 rounded-lg text-center text-xs text-neutral-500">
                Mehnat faoliyati kiritilmagan.
              </div>
            ) : (
              <div className="space-y-3">
                {data.workHistory.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-neutral-700">
                        {index + 1}-bosqich
                      </span>
                      <button
                        type="button"
                        onClick={() => removeWorkHistory(item.id)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <span className="text-[10px] text-neutral-500 block mb-0.5">
                          Davr (yillar)
                        </span>
                        <input
                          type="text"
                          value={item.period}
                          onChange={(e) => updateWorkHistory(item.id, 'period', e.target.value)}
                          placeholder="2025 y. - x.v."
                          className="w-full px-2 py-1.5 border border-neutral-300 rounded text-xs bg-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-[10px] text-neutral-500 block mb-0.5">
                          Tashkilot va lavozim
                        </span>
                        <input
                          type="text"
                          value={item.position}
                          onChange={(e) => updateWorkHistory(item.id, 'position', e.target.value)}
                          placeholder="Berdaq nomidagi qoraqalpoq davlat universiteti talabasi"
                          className="w-full px-2 py-1.5 border border-neutral-300 rounded text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: YAQIN QARINDOSHLAR (2-SAHIFA JADVALI) */}
        {activeTab === 'relatives' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xs font-semibold text-neutral-800">
                  Yaqin qarindoshlar ro'yxati (2-sahifa jadvali)
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Ota-onasi, aka-uka, opa-singillari, turmush o'rtog'i va farzandlari
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1">
                {commonRelations.slice(0, 4).map((rel) => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => addRelative(rel)}
                    className="px-2 py-1 text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
                  >
                    + {rel}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => addRelative('Qarindoshi')}
                  className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Boshqa
                </button>
              </div>
            </div>

            {data.relatives.length === 0 ? (
              <div className="p-6 border border-dashed border-neutral-300 rounded-lg text-center text-xs text-neutral-500 space-y-2">
                <Users className="w-8 h-8 text-neutral-400 mx-auto" />
                <p>Hozircha hech qanday qarindosh qo'shilmagan.</p>
                <button
                  type="button"
                  onClick={() => addRelative('Otasi')}
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  Otasi ma'lumotlarini qo'shish
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {data.relatives.map((rel, index) => (
                  <div
                    key={rel.id}
                    className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={rel.relation}
                          onChange={(e) => updateRelative(rel.id, 'relation', e.target.value)}
                          placeholder="Otasi"
                          className="px-2 py-0.5 font-semibold text-neutral-800 border border-neutral-300 rounded text-xs bg-white w-28"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeRelative(rel.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-neutral-600 block mb-0.5">
                          F.I.O. (Familiya, Ismi, Otasining ismi)
                        </label>
                        <input
                          type="text"
                          value={rel.fio}
                          onChange={(e) => updateRelative(rel.id, 'fio', e.target.value)}
                          placeholder="Ramatullaev Orínbay Xabibullaevich"
                          className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-md text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-neutral-600 block mb-0.5">
                          Tug'ilgan yili va joyi
                        </label>
                        <textarea
                          rows={2}
                          value={rel.birthAndPlace}
                          onChange={(e) => updateRelative(rel.id, 'birthAndPlace', e.target.value)}
                          placeholder="1977-yil Ózbekiston Respublikasi, Qoraqalpog'iston..."
                          className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-md text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[11px] font-medium text-neutral-600">
                            Ish joyi va lavozimi
                          </label>
                          <div className="flex gap-1 text-[10px]">
                            <button
                              type="button"
                              onClick={() => updateRelative(rel.id, 'workAndPosition', 'Vafot etgan')}
                              className="text-neutral-500 hover:text-black underline"
                            >
                              Vafot etgan
                            </button>
                            <span>|</span>
                            <button
                              type="button"
                              onClick={() => updateRelative(rel.id, 'workAndPosition', 'Vaqtincha ishsiz')}
                              className="text-neutral-500 hover:text-black underline"
                            >
                              Ishsiz
                            </button>
                            <span>|</span>
                            <button
                              type="button"
                              onClick={() => updateRelative(rel.id, 'workAndPosition', 'Nafaqada')}
                              className="text-neutral-500 hover:text-black underline"
                            >
                              Nafaqada
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={rel.workAndPosition}
                          onChange={(e) => updateRelative(rel.id, 'workAndPosition', e.target.value)}
                          placeholder="18-sonli umumta'lim maktabi o'qituvchisi"
                          className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-md text-xs bg-white"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[11px] font-medium text-neutral-600">
                            Turar joyi
                          </label>
                          {data.homeAddress && (
                            <button
                              type="button"
                              onClick={() => updateRelative(rel.id, 'residence', data.homeAddress)}
                              className="text-[10px] text-blue-600 hover:underline"
                            >
                              O'z manzilim
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={2}
                          value={rel.residence}
                          onChange={(e) => updateRelative(rel.id, 'residence', e.target.value)}
                          placeholder="Qoraqalpog'iston Respublikasi Xojayli tumani..."
                          className="w-full px-2.5 py-1.5 border border-neutral-300 rounded-md text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: MANZIL VA TELEFON */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Yashash manzili (Doimiy ro'yxatdan o'tgan yoki istiqomat qiladigan joyi)
              </label>
              <textarea
                rows={3}
                value={data.homeAddress}
                onChange={(e) => updateField('homeAddress', e.target.value)}
                placeholder="Qoraqalpog'iston Respublikasi Xojayli tumani Bayterek MFY, T.Ibragimov kóchasi 47-uy, 6-xonadon"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Telefon raqami
              </label>
              <input
                type="text"
                value={data.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+99890 422-57-22"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
              />
            </div>
          </div>
        )}

        {/* TAB 7: TEZKOR MATN ORQALI KIRITISH */}
        {activeTab === 'quickpaste' && (
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-xs text-purple-900 leading-relaxed">
              <p className="font-semibold mb-1">Tezkor matn orqali to'ldirish yordamchisi</p>
              Siz Telegram, rezyume yoki qoralamangizdagi matnni quyidagi maydonga qo'yishingiz mumkin.
              Masalan:
              <pre className="mt-1 p-2 bg-white rounded border border-purple-100 text-[11px] font-mono text-purple-800">
                {`FIO: ALIMOV ANVAR RUSTAMOVICH\nTug'ilgan sana: 12.04.2001\nTug'ilgan joy: Toshkent shahri, Yunusobod tumani\nMillati: O'zbek\nTelefon: +99890 123-45-67\nManzil: Toshkent sh., Chilonzor tumani 5-mavze`}
              </pre>
            </div>

            <textarea
              rows={8}
              value={quickText}
              onChange={(e) => setQuickText(e.target.value)}
              placeholder="Matningizni shu yerga qo'ying (paste)..."
              className="w-full p-3 border border-neutral-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleQuickParse}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Matndan maydonlarni to'ldirish
              </button>

              {showSavedNotification && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  Muvaffaqiyatli o'zlashtirildi!
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

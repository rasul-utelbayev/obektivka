import React from 'react';
import { ObektivkaData } from '../types';
import { User } from 'lucide-react';

interface DocumentViewProps {
  data: ObektivkaData;
}

export const DocumentView: React.FC<DocumentViewProps> = ({ data }) => {
  return (
    <div className="print-container flex flex-col items-center gap-8 py-6 w-full">
      {/* 1-SAHIFA: MALUMOTNOMA (OB'EKTIVKA) */}
      <div className="a4-page font-document text-black text-[13px] leading-[1.35] bg-white relative selection:bg-blue-100">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-[16px] font-bold tracking-wider mb-2 uppercase">
            MALUMOTNOMA
          </h1>
          <h2 className="text-[14px] font-bold uppercase tracking-wide">
            {data.fio || "FAMILIYA ISM SHARIF"}
          </h2>
        </div>

        {/* Current Position + Photo Section */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1 pr-2 pt-1 text-[13px] leading-[1.4]">
            {data.currentStatusDate && (
              <p className="font-normal text-black mb-1">
                {data.currentStatusDate}
              </p>
            )}
            <p className="font-normal text-black whitespace-pre-line">
              {data.currentPosition || "Hozirgi ish joyi yoki o'qish joyi, fakultet va yo'nalishi"}
            </p>
          </div>

          {/* Photo Frame (Official 3x4 ratio: ~32mm x 42mm / ~120px x 160px) */}
          <div className="w-[120px] h-[160px] flex-shrink-0 border border-neutral-300 bg-neutral-50 flex items-center justify-center overflow-hidden relative shadow-sm">
            {data.photoUrl ? (
              <img
                src={data.photoUrl}
                alt={data.fio}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-neutral-400 p-2 text-center">
                <User className="w-12 h-12 stroke-1 text-neutral-300 mb-1" />
                <span className="text-[10px] uppercase font-sans text-neutral-400">3 x 4 Rasm</span>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Key-Value Rows */}
        <div className="space-y-2 mb-4 text-[13px]">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold block">Tug'ilgan yili:</span>
              <span className="block">{data.birthDate || "—"}</span>
            </div>
            <div>
              <span className="font-bold block">Tug'ilgan joyi:</span>
              <span className="block whitespace-pre-line">{data.birthPlace || "—"}</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold block">Millati:</span>
              <span className="block">{data.nationality || "—"}</span>
            </div>
            <div>
              <span className="font-bold block">Partiyaviylik:</span>
              <span className="block">{data.partyMembership || "Yoq"}</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold block">Malumoti:</span>
              <span className="block">{data.education || "—"}</span>
            </div>
            <div>
              <span className="font-bold block">Tamomlagan:</span>
              <span className="block whitespace-pre-line">{data.graduated || "—"}</span>
            </div>
          </div>

          {/* Row 4: Specialization */}
          <div>
            <span className="font-bold inline-block mr-2">Malumoti boyisha mutaxasisligi:</span>
            <span>{data.specialization || "—"}</span>
          </div>

          {/* Row 5: Scientific degree & title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold block">Ilmiy darajasi:</span>
              <span className="block">{data.academicDegree || "Yoq"}</span>
            </div>
            <div>
              <span className="font-bold block">Ilmiy unvoni:</span>
              <span className="block">{data.academicTitle || "Yoq"}</span>
            </div>
          </div>
        </div>

        {/* Foreign Languages Table */}
        <div className="mb-4">
          <p className="font-bold mb-1 text-[13px]">Qaysi chet tillarini biladi:</p>
          {data.languages && data.languages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-[12.5px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-transparent">
                    <th className="font-normal py-0.5 pr-3">Chet tili</th>
                    <th className="font-normal py-0.5 px-3">Sertifikat</th>
                    <th className="font-normal py-0.5 px-3">Sertifikat seriyasi va raqami</th>
                    <th className="font-normal py-0.5 pl-3">Amal qilish muddati</th>
                  </tr>
                </thead>
                <tbody>
                  {data.languages.map((lang) => (
                    <tr key={lang.id}>
                      <td className="py-0.5 pr-3">{lang.language}</td>
                      <td className="py-0.5 px-3">{lang.certificate}</td>
                      <td className="py-0.5 px-3 font-mono text-[12px]">{lang.certNumber}</td>
                      <td className="py-0.5 pl-3">{lang.validity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[13px]">Yoq</p>
          )}
        </div>

        {/* State awards */}
        <div className="mb-3 text-[13px]">
          <p className="font-bold mb-0.5">Davlat mukofatlari bilan taqdirlanganmi (qanaqa):</p>
          <p>{data.stateAwards || "Yoq"}</p>
        </div>

        {/* Deputy / elected body membership */}
        <div className="mb-5 text-[13px]">
          <p className="font-bold mb-0.5 leading-[1.3]">
            Xalq deputatlari, respublika, viloyat, shahar va tuman Kengashi deputatimi yoki boshqa
            saylandi organlarning azosimi (toliq korsatilishi lozim):
          </p>
          <p>{data.electedOfficial || "Yoq"}</p>
        </div>

        {/* MEXNAT FAOLIYATI */}
        <div>
          <h3 className="text-center font-bold text-[14px] uppercase tracking-wider mb-4">
            MEXNAT FAOLIYATI
          </h3>
          <div className="space-y-2 text-[13px] leading-[1.4]">
            {data.workHistory && data.workHistory.length > 0 ? (
              data.workHistory.map((item) => (
                <div key={item.id} className="flex items-start gap-2">
                  <span className="whitespace-nowrap font-normal">{item.period} –</span>
                  <span className="flex-1">{item.position}</span>
                </div>
              ))
            ) : (
              <p className="text-center italic text-neutral-500">Kiritilmagan</p>
            )}
          </div>
        </div>
      </div>

      {/* 2-SAHIFA: YAQIN QARINDOSHLARI HAQIDA MA'LUMOT */}
      <div className="a4-page font-document text-black text-[13px] leading-[1.35] bg-white relative selection:bg-blue-100">
        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="text-[13.5px] font-bold mb-1">
            {data.fio ? `${data.fio} yaqin qarindoshlari haqida` : "Yaqin qarindoshlari haqida"}
          </h2>
          <h1 className="text-[14px] font-bold uppercase tracking-wider">
            MAЪLUMOT
          </h1>
        </div>

        {/* Relatives Table */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-black text-[12px] leading-[1.3]">
            <thead>
              <tr className="bg-neutral-50 print:bg-transparent">
                <th className="border border-black p-1.5 font-bold text-center w-[12%]">
                  Qarindoshligi
                </th>
                <th className="border border-black p-1.5 font-bold text-center w-[23%]">
                  FIO
                </th>
                <th className="border border-black p-1.5 font-bold text-center w-[23%]">
                  Tug'ilgan yili va joyi
                </th>
                <th className="border border-black p-1.5 font-bold text-center w-[22%]">
                  Ish joyi va lavozimi
                </th>
                <th className="border border-black p-1.5 font-bold text-center w-[20%]">
                  Turar joyi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.relatives && data.relatives.length > 0 ? (
                data.relatives.map((rel) => (
                  <tr key={rel.id}>
                    <td className="border border-black p-2 text-center align-top font-medium">
                      {rel.relation}
                    </td>
                    <td className="border border-black p-2 align-top">
                      {rel.fio}
                    </td>
                    <td className="border border-black p-2 align-top whitespace-pre-line text-center">
                      {rel.birthAndPlace}
                    </td>
                    <td className="border border-black p-2 align-top text-center">
                      {rel.workAndPosition}
                    </td>
                    <td className="border border-black p-2 align-top">
                      {rel.residence}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-black p-4 text-center italic text-neutral-500">
                    Qarindoshlar ro'yxati kiritilmagan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Address and Phone */}
        <div className="mt-8 space-y-2 text-[13px] pt-4">
          <p>
            <span className="font-bold">Yashash manzili:</span>{' '}
            <span>{data.homeAddress || "—"}</span>
          </p>
          <p>
            <span className="font-bold">Telefon raqami:</span>{' '}
            <span>{data.phone || "—"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

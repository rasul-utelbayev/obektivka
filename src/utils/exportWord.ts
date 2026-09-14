import { ObektivkaData } from '../types';

export function exportToWord(data: ObektivkaData) {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${data.fio || 'Malumotnoma'}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: A4;
          margin: 15mm 15mm 15mm 20mm;
          mso-header-margin: 10mm;
          mso-footer-margin: 10mm;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 13pt;
          line-height: 1.35;
          color: #000;
        }
        h1 {
          font-size: 16pt;
          font-weight: bold;
          text-align: center;
          margin-bottom: 6pt;
          text-transform: uppercase;
        }
        h2 {
          font-size: 14pt;
          font-weight: bold;
          text-align: center;
          margin-bottom: 14pt;
          text-transform: uppercase;
        }
        .text-bold { font-weight: bold; }
        .center { text-align: center; }
        .page-break { page-break-before: always; }
        table.rel-table {
          width: 100%;
          border-collapse: collapse;
          border: 1pt solid black;
          font-size: 12pt;
          margin-top: 12pt;
          margin-bottom: 16pt;
        }
        table.rel-table th, table.rel-table td {
          border: 1pt solid black;
          padding: 6pt;
          vertical-align: top;
        }
        table.rel-table th {
          font-weight: bold;
          text-align: center;
        }
        table.lang-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12pt;
          margin-top: 4pt;
        }
        table.lang-table td, table.lang-table th {
          padding: 3pt 6pt;
          text-align: left;
        }
      </style>
    </head>
    <body>
      <!-- 1-SAHIFA -->
      <h1>MALUMOTNOMA</h1>
      <h2>${data.fio || 'FAMILIYA ISM SHARIF'}</h2>

      <table style="width: 100%; border: none; margin-bottom: 12pt;">
        <tr>
          <td style="vertical-align: top; width: 75%;">
            ${data.currentStatusDate ? `<p style="margin: 0 0 4pt 0;">${data.currentStatusDate}</p>` : ''}
            <p style="margin: 0;">${(data.currentPosition || '').replace(/\n/g, '<br/>')}</p>
          </td>
          <td style="vertical-align: top; width: 25%; text-align: right;">
            ${
              data.photoUrl
                ? `<img src="${data.photoUrl}" width="120" height="160" style="border: 1pt solid #ccc;" />`
                : `<div style="width: 115px; height: 150px; border: 1pt solid #ccc; text-align: center; padding-top: 60px; font-size: 9pt; color: #888;">3x4 Rasm</div>`
            }
          </td>
        </tr>
      </table>

      <table style="width: 100%; border: none; margin-bottom: 10pt;">
        <tr>
          <td style="width: 50%; vertical-align: top;">
            <b>Tug'ilgan yili:</b><br/>
            ${data.birthDate || '—'}
          </td>
          <td style="width: 50%; vertical-align: top;">
            <b>Tug'ilgan joyi:</b><br/>
            ${(data.birthPlace || '—').replace(/\n/g, '<br/>')}
          </td>
        </tr>
        <tr><td style="height: 8pt;"></td></tr>
        <tr>
          <td style="vertical-align: top;">
            <b>Millati:</b><br/>
            ${data.nationality || '—'}
          </td>
          <td style="vertical-align: top;">
            <b>Partiyaviylik:</b><br/>
            ${data.partyMembership || 'Yoq'}
          </td>
        </tr>
        <tr><td style="height: 8pt;"></td></tr>
        <tr>
          <td style="vertical-align: top;">
            <b>Malumoti:</b><br/>
            ${data.education || '—'}
          </td>
          <td style="vertical-align: top;">
            <b>Tamomlagan:</b><br/>
            ${(data.graduated || '—').replace(/\n/g, '<br/>')}
          </td>
        </tr>
        <tr><td style="height: 8pt;"></td></tr>
        <tr>
          <td colspan="2">
            <b>Malumoti boyisha mutaxasisligi:</b> ${data.specialization || '—'}
          </td>
        </tr>
        <tr><td style="height: 8pt;"></td></tr>
        <tr>
          <td style="vertical-align: top;">
            <b>Ilmiy darajasi:</b><br/>
            ${data.academicDegree || 'Yoq'}
          </td>
          <td style="vertical-align: top;">
            <b>Ilmiy unvoni:</b><br/>
            ${data.academicTitle || 'Yoq'}
          </td>
        </tr>
      </table>

      <p style="margin-bottom: 4pt;"><b>Qaysi chet tillarini biladi:</b></p>
      ${
        data.languages && data.languages.length > 0
          ? `
        <table class="lang-table">
          <tr>
            <th>Chet tili</th>
            <th>Sertifikat</th>
            <th>Sertifikat seriyasi va raqami</th>
            <th>Amal qilish muddati</th>
          </tr>
          ${data.languages
            .map(
              (l) => `
            <tr>
              <td>${l.language}</td>
              <td>${l.certificate}</td>
              <td>${l.certNumber}</td>
              <td>${l.validity}</td>
            </tr>
          `,
            )
            .join('')}
        </table>
      `
          : '<p style="margin: 0 0 10pt 0;">Yoq</p>'
      }

      <p style="margin-top: 10pt; margin-bottom: 2pt;"><b>Davlat mukofatlari bilan taqdirlanganmi (qanaqa):</b></p>
      <p style="margin-top: 0; margin-bottom: 10pt;">${data.stateAwards || 'Yoq'}</p>

      <p style="margin-bottom: 2pt;"><b>Xalq deputatlari, respublika, viloyat, shahar va tuman Kengashi deputatimi yoki boshqa saylandi organlarning azosimi (toliq korsatilishi lozim):</b></p>
      <p style="margin-top: 0; margin-bottom: 16pt;">${data.electedOfficial || 'Yoq'}</p>

      <h3 style="text-align: center; font-weight: bold; text-transform: uppercase; font-size: 14pt; margin-top: 16pt; margin-bottom: 10pt;">MEXNAT FAOLIYATI</h3>
      <div>
        ${
          data.workHistory && data.workHistory.length > 0
            ? data.workHistory
                .map(
                  (w) => `
              <p style="margin: 4pt 0;">${w.period} – ${w.position}</p>
            `,
                )
                .join('')
            : '<p style="text-align: center;">Kiritilmagan</p>'
        }
      </div>

      <!-- 2-SAHIFA -->
      <div class="page-break"></div>
      <p style="text-align: center; font-weight: bold; font-size: 13pt; margin-top: 20pt; margin-bottom: 4pt;">
        ${data.fio ? `${data.fio} yaqin qarindoshlari haqida` : 'Yaqin qarindoshlari haqida'}
      </p>
      <h2 style="font-size: 14pt; text-align: center; margin-bottom: 16pt;">МАЪЛУМОТ</h2>

      <table class="rel-table">
        <thead>
          <tr>
            <th style="width: 12%;">Qarindoshligi</th>
            <th style="width: 23%;">FIO</th>
            <th style="width: 23%;">Tug'ilgan yili va joyi</th>
            <th style="width: 22%;">Ish joyi va lavozimi</th>
            <th style="width: 20%;">Turar joyi</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.relatives && data.relatives.length > 0
              ? data.relatives
                  .map(
                    (r) => `
                <tr>
                  <td style="text-align: center;"><b>${r.relation}</b></td>
                  <td>${r.fio}</td>
                  <td style="text-align: center;">${(r.birthAndPlace || '').replace(/\n/g, '<br/>')}</td>
                  <td style="text-align: center;">${r.workAndPosition}</td>
                  <td>${r.residence}</td>
                </tr>
              `,
                  )
                  .join('')
              : `
              <tr>
                <td colspan="5" style="text-align: center; padding: 12pt;">Qarindoshlar ro'yxati kiritilmagan</td>
              </tr>
            `
          }
        </tbody>
      </table>

      <div style="margin-top: 20pt;">
        <p style="margin: 4pt 0;"><b>Yashash manzili:</b> ${data.homeAddress || '—'}</p>
        <p style="margin: 4pt 0;"><b>Telefon raqami:</b> ${data.phone || '—'}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + content], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = data.fio
    ? `Malumotnoma_${data.fio.replace(/\s+/g, '_')}.doc`
    : 'Malumotnoma.doc';
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

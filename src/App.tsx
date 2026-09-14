/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ObektivkaData } from './types';
import { initialObektivkaData } from './defaultData';
import { DocumentView } from './components/DocumentView';
import { DocumentForm } from './components/DocumentForm';
import { exportToWord } from './utils/exportWord';
import {
  Printer,
  FileDown,
  Eye,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck2,
  Sparkles,
  Layers,
} from 'lucide-react';

const STORAGE_KEY = 'obektivka_user_data_v1';

export default function App() {
  const [data, setData] = useState<ObektivkaData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return initialObektivkaData;
  });

  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('preview');
  const [zoomScale, setZoomScale] = useState<number>(0.9);
  const [savedBadge, setSavedBadge] = useState<boolean>(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedBadge(true);
      const timer = setTimeout(() => setSavedBadge(false), 2000);
      return () => clearTimeout(timer);
    } catch {
      // Ignore
    }
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    exportToWord(data);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(1.3, Number((prev + 0.1).toFixed(1))));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(0.5, Number((prev - 0.1).toFixed(1))));
  };

  const handleResetZoom = () => {
    setZoomScale(0.9);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* HEADER / TOOLBAR (Hidden when printing) */}
      <header className="no-print sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 tracking-tight">
                  Ma'lumotnoma (Ob'ektivka)
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-800">
                  Davlat standarti (2-sahifa)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Original nusxani o'zgartirmasdan, faqat ma'lumotlarni to'ldirish
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile View Toggle */}
            <div className="flex lg:hidden bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setMobileTab('form')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  mobileTab === 'form'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Kiritish
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('preview')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  mobileTab === 'preview'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Hujjat (A4)
              </button>
            </div>

            {/* Word Export Button */}
            <button
              type="button"
              onClick={handleExportWord}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
              title="Microsoft Word (.doc) formatida yuklab olish"
            >
              <FileDown className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Word (.doc)</span>
            </button>

            {/* Print / PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              title="Chop etish yoki PDF sifatida saqlash"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* QUICK INFO BANNER (Hidden on print) */}
      <div className="no-print bg-blue-50 border-b border-blue-100 text-blue-900 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              <strong>Maslahat:</strong> Chap tomondagi maydonlarni o'zgartirsangiz, o'ng tarafdagi original A4 hujjat darhol yangilanadi. Hujjat 2 sahifadan iborat (1-sahifa: Ma'lumotnoma, 2-sahifa: Yaqin qarindoshlar).
            </span>
          </div>
          {savedBadge && (
            <span className="text-[11px] text-emerald-600 font-medium whitespace-nowrap">
              Avtomatik saqlandi ✓
            </span>
          )}
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FORM EDITOR (Hidden on mobile if preview tab active) */}
        <div
          className={`lg:col-span-5 ${
            mobileTab === 'form' ? 'block' : 'hidden lg:block'
          } no-print`}
        >
          <DocumentForm data={data} onChange={setData} />
        </div>

        {/* RIGHT COLUMN: DOCUMENT PREVIEW */}
        <div
          className={`lg:col-span-7 flex flex-col items-center w-full ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Preview Controls Bar */}
          <div className="no-print w-full flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2 mb-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Hujjat ko'rinishi (2 ta A4 sahifa)</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                title="Kichraytirish"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-mono text-slate-600">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                title="Kattalashtirish"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded ml-1"
                title="Tiklash (90%)"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scaled Document Container for screen */}
          <div className="w-full flex justify-center overflow-x-auto pb-12 print:p-0 print:m-0 print:overflow-visible">
            <div
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
                marginBottom: zoomScale < 1 ? `-${(1 - zoomScale) * 1100}px` : `${(zoomScale - 1) * 300}px`,
              }}
              className="print:transform-none print:m-0"
            >
              <DocumentView data={data} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

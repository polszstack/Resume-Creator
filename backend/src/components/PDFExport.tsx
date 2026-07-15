import { useState } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function PDFExport() {
  const [loading, setLoading] = useState(false);

  const exportPDF = async () => {
    setLoading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('resume-preview');
      
      if (!element) return;

      const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={exportPDF}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg 
        hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <DocumentArrowDownIcon className="w-5 h-5" />
      {loading ? 'Generating PDF...' : 'Download PDF'}
    </button>
  );
}

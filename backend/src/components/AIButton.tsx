import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface AIButtonProps {
  onClick: () => Promise<void>;
  label: string;
  size?: 'sm' | 'md';
}

export default function AIButton({ onClick, label, size = 'md' }: AIButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await onClick();
    } catch (err) {
      setError('AI failed. Try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 
          text-white rounded-lg hover:from-purple-600 hover:to-pink-600 
          disabled:opacity-50 disabled:cursor-not-allowed transition-all
          ${size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2'}`}
      >
        <SparklesIcon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />
        {loading ? 'Improving...' : label}
      </button>
      {error && (
        <div className="absolute top-full mt-1 text-red-500 text-xs whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
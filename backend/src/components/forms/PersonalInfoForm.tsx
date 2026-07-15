import { ResumeData } from '@/types/resume';
import AIButton from '@/components/AIButton';

interface PersonalInfoFormProps {
  data: ResumeData['personalInfo'];
  onChange: (field: string, value: string) => void;
  onImproveSummary: () => Promise<void>;
}

export default function PersonalInfoForm({ data, onChange, onImproveSummary }: PersonalInfoFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent"
            placeholder="New York, NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => onChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-transparent"
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <AIButton
            onClick={onImproveSummary}
            label="Improve Summary"
            size="sm"
          />
        </div>
        <textarea
          value={data.summary}
          onChange={(e) => onChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-transparent"
          placeholder="Experienced professional with..."
        />
      </div>
    </div>
  );
}
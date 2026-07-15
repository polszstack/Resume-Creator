import { Experience } from '@/types/resume';
import AIButton from '@/components/AIButton';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: any) => void;
  onDelete: (id: string) => void;
  onUpdateBullet: (expId: string, bulletIndex: number, value: string) => void;
  onAddBullet: (expId: string) => void;
  onImproveBullet: (expId: string, bulletIndex: number) => Promise<void>;
  onGenerateBullets: (expId: string) => Promise<void>;
}

export default function ExperienceForm({
  experiences,
  onAdd,
  onUpdate,
  onDelete,
  onUpdateBullet,
  onAddBullet,
  onImproveBullet,
  onGenerateBullets
}: ExperienceFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg 
            hover:bg-blue-800 transition-colors"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id} className="relative border border-gray-200 rounded-lg p-6 space-y-4">
          <button
            onClick={() => onDelete(exp.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <TrashIcon className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-semibold text-gray-700">
            Position #{index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => onUpdate(exp.id, 'jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="Tech Corp Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => onUpdate(exp.id, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => onUpdate(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {!exp.current && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => onUpdate(exp.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => onUpdate(exp.id, 'current', e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Current Position</span>
            </label>
          </div>

          {/* Bullet Points Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Key Achievements
              </label>
              <div className="flex gap-2">
                <AIButton
                  onClick={() => onGenerateBullets(exp.id)}
                  label="Generate Bullets"
                  size="sm"
                />
                <button
                  onClick={() => onAddBullet(exp.id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 
                    hover:text-blue-700"
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Add Bullet
                </button>
              </div>
            </div>

            {exp.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex gap-2 items-start">
                <span className="mt-3 text-gray-400">•</span>
                <div className="flex-1 relative">
                  <textarea
                    value={bullet}
                    onChange={(e) => onUpdateBullet(exp.id, bulletIndex, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Led team of 5 developers to deliver project 2 weeks ahead of schedule..."
                  />
                  <div className="absolute right-2 bottom-2">
                    <AIButton
                      onClick={() => onImproveBullet(exp.id, bulletIndex)}
                      label="Improve"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
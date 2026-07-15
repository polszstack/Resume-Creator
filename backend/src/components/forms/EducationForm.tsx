import { Education } from '@/types/resume';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EducationFormProps {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export default function EducationForm({ education, onAdd, onUpdate, onDelete }: EducationFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg 
            hover:bg-blue-800 transition-colors"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={edu.id} className="relative border border-gray-200 rounded-lg p-6 space-y-4">
          <button
            onClick={() => onDelete(edu.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <TrashIcon className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-semibold text-gray-700">
            Education #{index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School *
              </label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => onUpdate(edu.id, 'school', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="University of California"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="Bachelor of Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => onUpdate(edu.id, 'field', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Graduation Date
              </label>
              <input
                type="date"
                value={edu.graduationDate}
                onChange={(e) => onUpdate(edu.id, 'graduationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => onUpdate(edu.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="3.8/4.0"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
import { Skill } from '@/types/resume';
import { PlusCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SkillsFormProps {
  skills: Skill[];
  onAddCategory: () => void;
  onUpdateCategory: (id: string, field: string, value: string) => void;
  onUpdateSkill: (categoryId: string, skillIndex: number, value: string) => void;
  onAddSkill: (categoryId: string) => void;
  onDeleteCategory: (id: string) => void;
  onDeleteSkill: (categoryId: string, skillIndex: number) => void;
}

export default function SkillsForm({
  skills,
  onAddCategory,
  onUpdateCategory,
  onUpdateSkill,
  onAddSkill,
  onDeleteCategory,
  onDeleteSkill
}: SkillsFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={onAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg 
            hover:bg-blue-800 transition-colors"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {skills.map((category) => (
        <div key={category.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={category.category}
                onChange={(e) => onUpdateCategory(category.id, 'category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent"
                placeholder="Programming Languages"
              />
            </div>
            <button
              onClick={() => onDeleteCategory(category.id)}
              className="mt-7 text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => onUpdateSkill(category.id, skillIndex, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="React.js"
                  />
                  <button
                    onClick={() => onDeleteSkill(category.id, skillIndex)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => onAddSkill(category.id)}
                className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-lg 
                  text-gray-400 hover:text-blue-500 hover:border-blue-500 text-sm"
              >
                + Add Skill
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
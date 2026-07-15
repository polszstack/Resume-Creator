interface TemplateSelectorProps {
  selected: 'classic' | 'modern' | 'minimal';
  onChange: (template: 'classic' | 'modern' | 'minimal') => void;
}

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'Traditional layout, perfect for corporate roles',
      preview: 'bg-gradient-to-br from-gray-100 to-gray-200'
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Clean design with colored accents',
      preview: 'bg-gradient-to-br from-blue-100 to-purple-200'
    },
    {
      id: 'minimal' as const,
      name: 'Minimal',
      description: 'Simple and elegant, focuses on content',
      preview: 'bg-gradient-to-br from-white to-gray-50'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Choose Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selected === template.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className={`h-32 ${template.preview} rounded-lg mb-3`} />
            <h3 className="font-semibold text-gray-800">{template.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
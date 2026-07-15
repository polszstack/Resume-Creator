import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, experiences, education, skills, template } = data;

  const templateStyles = {
    classic: {
      header: 'border-b-4 border-gray-800 pb-4 mb-6',
      name: 'text-3xl font-bold text-gray-900',
      section: 'border-b-2 border-gray-300 pb-1 mb-3 text-xl font-bold text-gray-800'
    },
    modern: {
      header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-6',
      name: 'text-3xl font-bold',
      section: 'border-l-4 border-blue-600 pl-3 mb-3 text-xl font-bold text-gray-800'
    },
    minimal: {
      header: 'mb-6',
      name: 'text-3xl font-light text-gray-900 tracking-wide',
      section: 'mb-3 text-xl font-light text-gray-800 uppercase tracking-wider'
    }
  };

  const styles = templateStyles[template];

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto" id="resume-preview">
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className={styles.section}>Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className={styles.section}>Work Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                {exp.location && (
                  <p className="text-sm text-gray-500 mt-1">{exp.location}</p>
                )}
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {exp.bullets.filter(b => b.trim()).map((bullet, i) => (
                    <li key={i} className="text-gray-700 text-sm">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className={styles.section}>Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{edu.school}</h3>
                    <p className="text-gray-600">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className={styles.section}>Skills</h2>
          <div className="space-y-3">
            {skills.map((category) => (
              <div key={category.id}>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.filter(s => s.trim()).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
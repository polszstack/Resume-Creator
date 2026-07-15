'use client';

import { useState } from 'react';
import { useResumeState } from '@/hooks/useResumeState';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import TemplateSelector from '@/components/TemplateSelector';
import ResumePreview from '@/components/ResumePreview';
import PDFExport from '@/components/PDFExport';
import Toast from '@/components/Toast';

export default function Home() {
  const resume = useResumeState();
  const { resumeData } = resume;
  const [activeSection, setActiveSection] = useState<'edit' | 'preview'>('edit');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleImproveSummary = async () => {
    const textToImprove = resumeData.personalInfo.summary;
    
    if (!textToImprove || textToImprove.trim().length === 0) {
      showToast('Please enter a summary first', 'error');
      return;
    }

    try {
      const response = await fetch('/api/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToImprove,
          tone: 'professional'
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to improve summary');
      }
      
      const data = await response.json();
      resume.updatePersonalInfo('summary', data.improved);
      showToast('Summary improved successfully!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to improve summary', 'error');
    }
  };

  const handleImproveBullet = async (expId: string, bulletIndex: number) => {
    const exp = resumeData.experiences.find(e => e.id === expId);
    if (!exp) return;

    const textToImprove = exp.bullets[bulletIndex];
    
    if (!textToImprove || textToImprove.trim().length === 0) {
      showToast('Please enter text in the bullet point first', 'error');
      return;
    }

    try {
      const response = await fetch('/api/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToImprove,
          tone: 'professional'
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to improve bullet');
      }
      
      const data = await response.json();
      resume.updateBullet(expId, bulletIndex, data.improved);
      showToast('Bullet point improved!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to improve bullet point', 'error');
    }
  };

  const handleGenerateBullets = async (expId: string) => {
    const exp = resumeData.experiences.find(e => e.id === expId);
    if (!exp || !exp.jobTitle || exp.jobTitle.trim().length === 0) {
      showToast('Please fill in job title first', 'error');
      return;
    }

    try {
      const response = await fetch('/api/generate-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: exp.jobTitle,
          company: exp.company,
          keyAchievements: exp.bullets.filter(b => b.trim()).join('. ')
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate bullets');
      }
      
      const data = await response.json();
      resume.setBullets(expId, data.bullets);
      showToast('Bullet points generated!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to generate bullet points', 'error');
    }
  };

  const handleDeleteSkill = (categoryId: string, skillIndex: number) => {
    const category = resumeData.skills.find(s => s.id === categoryId);
    if (category && category.skills.length <= 1) {
      resume.deleteSkillCategory(categoryId);
    } else {
      const updatedSkills = category?.skills.filter((_, i) => i !== skillIndex) || [];
      resume.updateSkillCategory(categoryId, 'skills', updatedSkills.join(','));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                AI Resume Builder
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Create professional resumes with AI assistance
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveSection('edit')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeSection === 'edit'
                      ? 'bg-white shadow text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setActiveSection('preview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeSection === 'preview'
                      ? 'bg-white shadow text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Preview
                </button>
              </div>
              
              <PDFExport />
              
              <button
                onClick={resume.resetResume}
                className="px-4 py-2 text-sm text-red-700 hover:text-red-800 font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'edit' ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={resume.updatePersonalInfo}
              onImproveSummary={handleImproveSummary}
            />
            
            <ExperienceForm
              experiences={resumeData.experiences}
              onAdd={resume.addExperience}
              onUpdate={resume.updateExperience}
              onDelete={resume.deleteExperience}
              onUpdateBullet={resume.updateBullet}
              onAddBullet={resume.addBullet}
              onImproveBullet={handleImproveBullet}
              onGenerateBullets={handleGenerateBullets}
            />
            
            <EducationForm
              education={resumeData.education}
              onAdd={resume.addEducation}
              onUpdate={resume.updateEducation}
              onDelete={resume.deleteEducation}
            />
            
            <SkillsForm
              skills={resumeData.skills}
              onAddCategory={resume.addSkillCategory}
              onUpdateCategory={resume.updateSkillCategory}
              onUpdateSkill={resume.updateSkill}
              onAddSkill={resume.addSkill}
              onDeleteCategory={resume.deleteSkillCategory}
              onDeleteSkill={handleDeleteSkill}
            />
            
            <TemplateSelector
              selected={resumeData.template}
              onChange={resume.setTemplate}
            />
          </div>
        ) : (
          <ResumePreview data={resumeData} />
        )}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

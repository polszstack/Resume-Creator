import { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  experiences: [],
  education: [],
  skills: [],
  template: 'classic'
};

export function useResumeState() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isDirty, setIsDirty] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved resume');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isDirty) {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      setIsDirty(false);
    }
  }, [resumeData, isDirty]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
    setIsDirty(true);
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        id: Date.now().toString(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        bullets: ['']
      }]
    }));
    setIsDirty(true);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
    setIsDirty(true);
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.map((b, i) => (i === bulletIndex ? value : b))
            }
          : exp
      )
    }));
    setIsDirty(true);
  };

  const addBullet = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === expId
          ? { ...exp, bullets: [...exp.bullets, ''] }
          : exp
      )
    }));
    setIsDirty(true);
  };

  const setBullets = (expId: string, bullets: string[]) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === expId ? { ...exp, bullets } : exp
      )
    }));
    setIsDirty(true);
  };

  const deleteExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
    setIsDirty(true);
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        school: '',
        degree: '',
        field: '',
        graduationDate: '',
        gpa: ''
      }]
    }));
    setIsDirty(true);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
    setIsDirty(true);
  };

  const deleteEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    setIsDirty(true);
  };

  const addSkillCategory = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), category: '', skills: [''] }]
    }));
    setIsDirty(true);
  };

  const updateSkillCategory = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
    setIsDirty(true);
  };

  const updateSkill = (categoryId: string, skillIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.map((s, i) => (i === skillIndex ? value : s)) }
          : cat
      )
    }));
    setIsDirty(true);
  };

  const addSkill = (categoryId: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(cat =>
        cat.id === categoryId
          ? { ...cat, skills: [...cat.skills, ''] }
          : cat
      )
    }));
    setIsDirty(true);
  };

  const deleteSkillCategory = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
    setIsDirty(true);
  };

  const setTemplate = (template: 'classic' | 'modern' | 'minimal') => {
    setResumeData(prev => ({ ...prev, template }));
    setIsDirty(true);
  };

  const resetResume = () => {
    setResumeData(initialResumeData);
    localStorage.removeItem('resumeData');
    setIsDirty(true);
  };

  return {
    resumeData,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    updateBullet,
    addBullet,
    setBullets,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkillCategory,
    updateSkillCategory,
    updateSkill,
    addSkill,
    deleteSkillCategory,
    setTemplate,
    resetResume
  };
}
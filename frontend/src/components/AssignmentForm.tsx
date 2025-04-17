// src/components/AssignmentForm.tsx
import React, { useState } from 'react';
import { Subject } from '../types';

interface AssignmentFormProps {
  initialValues?: {
    title: string;
    content: string;
    subject: Subject;
  };
  onSubmit: (title: string, content: string, subject: Subject) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({
  initialValues = { title: '', content: '', subject: Subject.MATH },
  onSubmit,
  isSubmitting,
  error
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [subject, setSubject] = useState<Subject>(initialValues.subject);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) {
      setValidationError('Title is required');
      return;
    }
    
    if (!content.trim()) {
      setValidationError('Content is required');
      return;
    }
    
    setValidationError(null);
    await onSubmit(title, content, subject);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      {(error || validationError) && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error || validationError}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter assignment title"
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          disabled={isSubmitting}
          required
        >
          {Object.values(Subject).map((subj) => (
            <option key={subj} value={subj}>
              {subj.charAt(0).toUpperCase() + subj.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Assignment Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={6}
          placeholder="Enter assignment instructions, questions, or description..."
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
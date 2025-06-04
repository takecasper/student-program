import React, { useState } from 'react';
import { ChevronDown, Search, Calendar, Clock } from 'lucide-react';

const templates = [
  { id: 1, name: 'Basic Form', selected: true },
  { id: 2, name: 'Survey Form', selected: false },
  { id: 3, name: 'Assessment', selected: false },
  { id: 4, name: 'Feedback', selected: false },
  { id: 5, name: 'Quiz', selected: false },
];

const formElements = [
  { id: 1, name: 'Text Input', icon: '/svgs/text-input.svg' },
  { id: 2, name: 'Textarea', icon: '/svgs/textarea.svg' },
  { id: 3, name: 'Radio Button', icon: '/svgs/radio.svg' },
  { id: 4, name: 'Checkbox', icon: '/svgs/checkbox.svg' },
  { id: 5, name: 'Dropdown', icon: '/svgs/dropdown.svg' },
  { id: 6, name: 'Date Picker', icon: '/svgs/date.svg' },
];

const FormBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [activeSection, setActiveSection] = useState<'template' | 'elements'>('template');
  const [showSendForm, setShowSendForm] = useState(false);

  const toggleSection = (section: 'template' | 'elements') => {
    setActiveSection(section === activeSection ? section : section);
  };

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id);
    setShowSendForm(true);
  };

  const renderSendForm = () => {
    return (
      <div className="w-[306px] bg-[#D9D9D91A] rounded-lg shadow-none">
        <div className="p-4 bg-[#D9D9D933] border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">SEND</h2>
        </div>
        <div className="p-6 space-y-6 flex-1 overflow-auto">
          {/* Level */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Level</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Course/Session/Rotation"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Evaluator */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Evaluator</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Select evaluator"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Target */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Target</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Select Target"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Send Date/Time */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Send Date/Time</label>
            <div className="grid grid-cols-1 gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Select Date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Select Time"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Completion Due Date */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Completion Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Select Target"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="p-6 border-t border-gray-200">
          <button className="w-full bg-[#364699] text-white py-2.5 rounded-lg hover:bg-[#2d3a7c] transition-colors">
            Done
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex h-[calc(100vh-48px)]">
        {/* Left Sidebar - Only show when SEND form is not visible */}
        {!showSendForm && (
          <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col">
            {/* Template Section */}
            <div className="bg-[#D9D9D933]border-b border-gray-200">
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('template')}
              >
                <span className="text-sm font-medium text-gray-700">TEMPLATE</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transform transition-transform ${
                    activeSection === 'template' ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div
                className={`${activeSection === 'template' ? 'block' : 'hidden'} p-4 pt-0 space-y-3`}
              >
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                    <div className="bg-gray-100 rounded h-16 mb-2 flex items-center justify-center">
                      <div className="space-y-1">
                        <div className="h-1.5 bg-gray-300 rounded w-12"></div>
                        <div className="h-1.5 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 text-center">{template.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elements Section */}
            <div className="flex-1">
              <div
                className="p-4 flex items-center justify-between cursor-pointer border-b border-gray-200"
                onClick={() => toggleSection('elements')}
              >
                <span className="text-sm font-medium text-gray-700">ELEMENTS</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transform transition-transform ${
                    activeSection === 'elements' ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div className={`${activeSection === 'elements' ? 'block' : 'hidden'} p-4 space-y-2`}>
                {formElements.map(element => (
                  <div
                    key={element.id}
                    className="flex items-center gap-3 p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-3.5 h-3.5 bg-gray-400 rounded"></div>
                    </div>
                    <span className="text-sm text-gray-700">{element.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Content Area */}
        <div className="flex-1 p-6 flex gap-6">
          {/* Form Builder Area */}
          <div className="flex-1 bg-[#D9D9D91A] rounded-lg shadow-none ">
            <div className="p-4 bg-[#D9D9D933] border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-700">Form Builder</h2>
            </div>
            <div className="h-[calc(100%-57px)] flex flex-col items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">Build Your Form</h3>
                <p className="text-sm text-gray-500">
                  Drag elements from the left panel to start building your evaluation form
                </p>
              </div>
            </div>
          </div>

          {/* Send Form Area */}
          {showSendForm && renderSendForm()}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;

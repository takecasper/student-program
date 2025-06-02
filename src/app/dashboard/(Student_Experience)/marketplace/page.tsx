'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Bookmark } from 'lucide-react';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  status: 'not-started' | 'completed' | 'in-progress';
  image: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'not-started',
    image: '/program.png',
  },
  {
    id: '2',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'completed',
    image: '/program.png',
  },
  {
    id: '3',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'in-progress',
    image: '/program.png',
  },
  {
    id: '4',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'completed',
    image: '/program.png',
  },
  {
    id: '5',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'not-started',
    image: '/program.png',
  },
  {
    id: '6',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'in-progress',
    image: '/program.png',
  },
  {
    id: '7',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'completed',
    image: '/program.png',
  },
  {
    id: '8',
    title: 'Course Lorem',
    description:
      'Lorem ipsum dolor sit amet consectetur. Arcu nunc gravida a sem. Risus eiam adipiscing at nec egestas ut suspendisse fermentum a. Adipiscing.',
    price: '$35',
    status: 'not-started',
    image: '/program.png',
  },
];

const StatusBadge = ({ status }: { status: Course['status'] }) => {
  const statusConfig = {
    'not-started': { label: 'Not Started', className: 'bg-gray-100 text-gray-600' },
    completed: { label: 'Completed', className: 'bg-green-100 text-green-600' },
    'in-progress': { label: 'In Progress', className: 'bg-orange-100 text-orange-600' },
  };

  const config = statusConfig[status];

  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

const CourseCard = ({ course }: { course: Course }) => {
  const getActionButton = () => {
    switch (course.status) {
      case 'not-started':
        return (
          <button className="px-4 py-2 text-[12px] bg-[#364699] text-white rounded-full hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        );
      case 'completed':
        return (
          <button className="px-4 py-2 text-[12px] bg-[#364699] text-white rounded-full hover:bg-blue-700 transition-colors">
            Review
          </button>
        );
      case 'in-progress':
        return (
          <button className="px-4 py-2 text-[12px] bg-[#364699] text-white rounded-full hover:bg-blue-700 transition-colors">
            Resume
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 overflow-hidden">
      <div className="relative p-3">
        <div className="relative w-full h-[139px] rounded-[10px] overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            width={400}
            height={139}
            className="w-full h-full object-cover"
            quality={95}
          />
        </div>
      </div>

      <div className="">
        <div className="pl-4">
          <StatusBadge status={course.status} />
        </div>
        <div className="flex flex-col pb-4 px-4 pt-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
            {course.status !== 'completed' && (
              <span className="text-lg font-bold text-[#364699]">{course.price}</span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        </div>

        <div className="flex items-end justify-end gap-2 pb-2 pr-2">
          <button className="py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
            <Bookmark className="w-4 h-4 text-gray-600" />
          </button>
          {getActionButton()}
        </div>
      </div>
    </div>
  );
};

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'ALL', label: 'ALL' },
    { id: 'COURSES', label: 'COURSES' },
    { id: 'APPS', label: 'APPS' },
    { id: 'TESTS', label: 'TESTS' },
  ];

  const filteredCourses = mockCourses.filter(
    course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Marketplace</p>
              <h1 className="text-2xl font-semibold text-[#333333DE]">
                What Do You Need Help With?
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ShoppingCart className="w-5 h-5" />
                <span>CART</span>
              </button>
              <button className="text-blue-600 hover:text-blue-700">MY PURCHASES</button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Explore Courses, Apps, & Tests"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[20px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-sm font-medium text-gray-700 py-4">MARKETPLACE</span>

          <div className="flex items-center space-x-8">
            <div className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-[10px] font-medium rounded-full border transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#364699] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

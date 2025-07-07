'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PROGRAMS = [
  {
    key: 'casper',
    title: 'CASPER',
    description: 'Set up and configure test',
    image: '/images/abstract.png',
  },
  {
    key: 'video',
    title: 'VIDEO INTERVIEW',
    description: 'Set up and configure test',
    image: '/images/abstract.png',
  },
  {
    key: 'formative',
    title: 'FORMATIVE',
    description: 'Set up and configure test',
    image: '/images/abstract.png',
  },
];

const ProgramTypeSelection: React.FC = () => {
  const [selected, setSelected] = useState('video');

  return (
    <div className="min-h-screen bg-white flex flex-col items-start px-8 pt-8">
      <div className="max-w-5xl w-full mx-auto">
        <h2 className="text-[#364699] text-sm font-semibold mb-1 tracking-wide uppercase">
          TEST CONFIGURATION
        </h2>
        <p className="text-[#6b7280] text-sm mb-8">
          Provide basic information to create your program
        </p>
        <div className="mb-4 text-xs font-semibold text-[#222] tracking-wide">PROGRAM TYPE</div>
        <div className="flex gap-6">
          {PROGRAMS.map(program => {
            if (program.key === 'video') {
              return (
                <Link
                  key={program.key}
                  href="/dashboard/admission/video-interview"
                  className={`bg-white rounded-[10px] border transition-all flex flex-col items-start w-[240px] shadow-sm hover:shadow-md focus:outline-none px-0 pb-4 pt-0 cursor-pointer
                    ${selected === program.key ? 'border-[#364699] shadow-[0_2px_8px_rgba(54,70,153,0.10)] ring-2 ring-[#364699]' : 'border-[#e5e7eb]'}
                  `}
                  style={{
                    boxShadow:
                      selected === program.key
                        ? '0 2px 8px rgba(54,70,153,0.10)'
                        : '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                  onClick={() => setSelected(program.key)}
                >
                  <div className="w-full h-[120px] rounded-t-[10px] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      width={240}
                      height={120}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="px-4 pt-4 pb-2 w-full text-left">
                    <div className="text-base font-semibold text-[#222] mb-1">{program.title}</div>
                    <div className="text-sm text-[#6b7280]">{program.description}</div>
                  </div>
                </Link>
              );
            }
            return (
              <button
                key={program.key}
                type="button"
                onClick={() => setSelected(program.key)}
                className={`bg-white rounded-[10px] border transition-all flex flex-col items-start w-[240px] shadow-sm hover:shadow-md focus:outline-none px-0 pb-4 pt-0 cursor-pointer
                  ${selected === program.key ? 'border-[#364699] shadow-[0_2px_8px_rgba(54,70,153,0.10)] ring-2 ring-[#364699]' : 'border-[#e5e7eb]'}
                `}
                style={{
                  boxShadow:
                    selected === program.key
                      ? '0 2px 8px rgba(54,70,153,0.10)'
                      : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div className="w-full h-[120px] rounded-t-[10px] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={240}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="px-4 pt-4 pb-2 w-full text-left">
                  <div className="text-base font-semibold text-[#222] mb-1">{program.title}</div>
                  <div className="text-sm text-[#6b7280]">{program.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgramTypeSelection;

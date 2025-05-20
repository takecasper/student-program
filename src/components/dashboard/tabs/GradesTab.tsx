import { Card, CardContent } from '@/components/ui/card';
import { ChevronUpIcon, ChevronDownIcon, DownloadIcon } from '@radix-ui/react-icons';
import { Flag } from 'lucide-react';

type Trait = {
  label: string;
  value: number;
  color: string;
};

const traits: Trait[] = [
  { label: 'Leadership', value: 60, color: 'bg-[#FFD87C]' },
  { label: 'Self-Awareness', value: 80, color: 'bg-[#00A59B]' },
  { label: 'Collaboration', value: 40, color: 'bg-[#FA8D8F]' },
  { label: 'Communication', value: 80, color: 'bg-[#00A59B]' },
];

export function GradesTab() {
  return (
    <div className="w-full flex">
      {/* Grades Table with ScrollArea */}
      <Card className="border-none shadow-none bg-white w-2/3 rounded-none">
        <CardContent className="p-0 border-r pr-11 border-[#CCCCCC] rounded-none">
          <div className="flex flex-col gap-8 text-sm font-sans h-[425px] text-[#1B1B1B] bg-white relative overflow-auto pr-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-1 space-y-6">
                <div>
                  <div className="flex justify-between">
                    <h2 className="font-semibold uppercase text-xs">Undergraduate 2021–2025</h2>
                    <div className="cursor-pointer p-1 border border-[#3333331A] rounded-sm">
                      <DownloadIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-7">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300 mb-6" />
                      <div>
                        <p className="font-semibold">Neuroscience</p>
                        <p className="text-xs text-gray-500">Mar 7, 2025 – May 2, 2025</p>
                        <button className="text-[#364699] text-xs mt-3 cursor-pointer flex items-center">
                          Hide Details
                          <ChevronUpIcon className="w-6 h-4 text-[#364699] ml-3" />
                        </button>
                      </div>
                    </div>

                    {/* YEAR GRADES */}
                    <div className="flex gap-7 items-center">
                      {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((label, idx) => (
                        <div
                          key={label}
                          className="text-center flex flex-col justify-between h-full"
                        >
                          <p>{label}</p>
                          <div className="flex items-center justify-center gap-1 border border-gray-300 px-3 py-1 rounded-full">
                            <p className="font-semibold text-xs">88.00</p>
                            {idx % 2 === 1 ? (
                              <ChevronDownIcon className="w-3 h-3 text-red-500" />
                            ) : (
                              <ChevronUpIcon className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* COURSE DATA */}
                <div className="grid grid-cols-2 gap-6 gap-x-21 gap-y-8 text-sm">
                  {['Assignments', 'iQuiz', 'Lab', 'Exams'].map(section => (
                    <div key={section}>
                      <h4 className="font-medium mb-2.5">{section}</h4>
                      {section !== 'Exams' &&
                        ['1', '2', '3'].map(num => (
                          <div key={num} className="flex justify-between mb-2.5">
                            <p>
                              ↳ {section} {num}
                            </p>
                            <p className="font-semibold">78.00</p>
                          </div>
                        ))}
                      {section === 'Exams' && (
                        <>
                          <div className="flex justify-between mb-2.5">
                            <p>↳ Midterm Exam</p>
                            <p className="font-semibold">78.00</p>
                          </div>
                          <div className="flex justify-between mb-2.5">
                            <p>↳ Final Exam</p>
                            <p className="font-semibold">78.00</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Character Traits Card */}
      <Card className="shadow-none h-fit w-1/3 border-none">
        <CardContent className="p-0 pl-12">
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-gray-700 font-semibold text-sm">CHARACTER TRAITS</h3>
          </div>
          <div className="border rounded-xl p-5 space-y-6 shadow-sm">
            {traits.map(({ label, value, color }) => (
              <div key={label} className="space-y-1">
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <div className="relative w-full h-8 bg-white rounded-full border-[0.5px] border-[#CCCCCC] p-0.5">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full border-[0.5px] bg-white border-[#CCCCCC] p-0.5 flex items-center justify-center -ml-1 -mt-[1px]">
                    <div
                      className={`top-0 h-full w-full rounded-full flex items-center justify-center ${color}`}
                    >
                      <Flag className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

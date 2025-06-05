'use client';

import { Plus, Hourglass, ChevronDown, ArrowUpDown } from 'lucide-react';

export const SidebarTable = () => {
  const electives = [
    {
      title: 'EM-EMERG-New Westminster-Port Moody-RCH-/ERH',
      city: 'Port Moody',
      start: 'Mar 2 2026',
      end: 'March 29 2026',
      spots: '1 of 1',
      status: 'Available',
    },
    {
      title: 'EM-EMERG-New Westminster-Port Moody-RCH-/ERH',
      city: 'Port Moody',
      start: 'Mar 2 2026',
      end: 'March 29 2026',
      spots: '1 of 1',
      status: 'Waitlisted',
    },
    {
      title: 'EM-EMERG-New Westminster-Port Moody-RCH-/ERH',
      city: 'Port Moody',
      start: 'Mar 2 2026',
      end: 'March 29 2026',
      spots: '1 of 1',
      status: 'Available',
    },
  ];

  return (
    <div className="px-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Available Electives</h3>
      <table className="w-full text-sm text-left text-gray-700 border-collapse">
        <thead>
          <tr className="text-gray-500 bg-gray-300 font-medium border-b">
            <th className="py-2 pl-3">Elective</th>
            <th className="py-2 pl-3">City</th>
            <th className="py-2 pl-3">Start/End</th>
            <th className="py-2 pl-3">Spots</th>
            <th className="py-2 pl-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {electives.map((e, i) => (
            <tr key={i} className="border-b">
              <td className="py-3">{e.title}</td>
              <td className="py-3">{e.city}</td>
              <td className="py-3">
                {e.start} - {e.end}
              </td>
              <td className="py-3">{e.spots}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-md border border-gray-300 bg-white flex items-center justify-center"
                    title={e.status === 'Waitlisted' ? 'Waitlisted' : 'Add'}
                  >
                    {e.status === 'Waitlisted' ? (
                      <Hourglass className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <button
                    className="w-8 h-8 rounded-md border border-gray-300 bg-white flex items-center justify-center"
                    title={e.status === 'Waitlisted' ? 'Waitlisted' : 'Add'}
                  >
                      <ArrowUpDown className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 rounded-md border border-gray-300 bg-white flex items-center justify-center">
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

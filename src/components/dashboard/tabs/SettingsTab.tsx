import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function SettingsTab() {
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-6 pt-6">
        <Card className="bg-[#f5f5f5] border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-[#333333]">SETTINGS</CardTitle>
            <div className="flex gap-2">
              <button
                className="text-sm font-semibold text-[#364699] hover:text-[#364699] hover:bg-[#e5e7f4] py-1 px-3 rounded-lg cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing ? (
                <button
                  className="text-sm font-semibold text-[#364699] hover:text-[#364699] hover:bg-[#e5e7f4] py-1 px-3 rounded-lg cursor-pointer"
                  onClick={() => setIsEditing(false)}
                >
                  Save
                </button>
              ) : (
                <></>
              )}
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Language:</p>
              {isEditing ? (
                <Input className="h-8 text-sm bg-white" defaultValue="English" />
              ) : (
                <p className="text-sm">English</p>
              )}
            </div>
            <div className="grid grid-cols-2 items-center">
              <p className="text-sm text-[#6c6c6c]">Notification:</p>
              {isEditing ? (
                <Input className="h-8 text-sm bg-white" defaultValue="Always" />
              ) : (
                <p className="text-sm">Always</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <button
        onClick={() => logout()}
        className="group inline-flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 cursor-pointer mt-16"
      >
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
          />
        </svg>
        <span className="transition-all duration-200 group-hover:tracking-wide">Log Out</span>
      </button>
    </div>
  );
}

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function SettingsTab() {
  const [isEditing, setIsEditing] = useState(false);

  return (
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
  );
}

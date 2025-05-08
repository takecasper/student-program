import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export function SettingsTab() {
  return (
    <div className="grid grid-cols-2 gap-6 pt-6">
      <Card className="bg-[#f5f5f5] border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-[#333333]">SETTINGS</CardTitle>
          <button className="text-sm text-[#364699] hover:text-blue-800">Edit</button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Language:</p>
            <p className="text-sm">English</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Notification:</p>
            <p className="text-sm">Always</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

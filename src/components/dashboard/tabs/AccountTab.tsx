import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type AccountTabProps = {
  user: {
    email: string;
  };
};

export function AccountTab({ user }: AccountTabProps) {
  return (
    <div className="grid grid-cols-2 gap-6 pt-6">
      <Card className="bg-[#f5f5f5] border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-[#333333]">GENERAL INFO</CardTitle>
          <button className="text-sm text-[#364699] hover:text-blue-800">Edit</button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Email Address:</p>
            <p className="text-sm">{user.email}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Address:</p>
            <p className="text-sm">12 Agnes, Mississauga</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Phone:</p>
            <p className="text-sm">647-9811-4545</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Pager:</p>
            <p className="text-sm">--</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#f5f5f5] border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-[#333333]">ASSOCIATE INFO</CardTitle>
          <button className="text-sm text-[#364699] hover:text-blue-800">Edit</button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Grad Year:</p>
            <p className="text-sm">2024</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Student ID:</p>
            <p className="text-sm">234354545</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Facility ID:</p>
            <p className="text-sm">2323</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

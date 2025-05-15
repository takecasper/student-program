import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

type AccountTabProps = {
  user: {
    email: string;
    address: string;
    phone: string;
    pager: string;
  };
};

export function AccountTab({ user }: AccountTabProps) {
  const [editGeneralInfo, setEditGeneralInfo] = useState<boolean>(false)
  const [editAssociateInfo, setEditAssociateInfo] = useState<boolean>(false)
  const [generalInfo, setGeneralInfo] = useState({
    email: 'john.doe@example.com',
    address: '12 Agnes, Mississauga',
    phone: '647-9811-4545',
    pager: '--'
  });
  const [associateInfo, setAssociateInfo] = useState({
    gradYear: 2024,
    studentId: 234354545,
    facility: 2323
  });

  const handleGeneralInfo = (field: keyof typeof generalInfo, value: string) => {
    setGeneralInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAssociateInfo = (field: keyof typeof associateInfo, value: string) => {
    setAssociateInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-6 pt-6">
      <Card className="bg-[#f5f5f5] border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-[#333333]">GENERAL INFO</CardTitle>
          <div className='flex space-x-2'>
            {editGeneralInfo ?
              <>
                <button className="text-sm text-[#364699] hover:text-blue-800 cursor-pointer hover:bg-[#e5e7f4] h-8 px-3 rounded-md" onClick={() => setEditGeneralInfo(false)}>Cancel</button>
                <button className="text-sm text-[#364699] hover:text-blue-800 cursor-pointer hover:bg-[#e5e7f4] h-8 px-3 rounded-md" onClick={() => setEditGeneralInfo(false)}>Save</button>
              </>:
              <button className="text-sm text-[#364699] hover:text-blue-800 cursor-pointer hover:bg-[#e5e7f4] h-8 px-3 rounded-md" onClick={() => setEditGeneralInfo(true)}>Edit</button>
            }
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Email Address:</p>
            {editGeneralInfo ?
              <Input
                className="h-8 text-sm bg-white"
                value={generalInfo.email}
                onChange={e => handleGeneralInfo('email', e.target.value)}
              />:<p className="text-sm">{generalInfo.email}</p>
            }
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Address:</p>
            {editGeneralInfo ?
              <Input
                className="h-8 text-sm bg-white"
                value={generalInfo.address}
                onChange={e => handleGeneralInfo('address', e.target.value)}
              />:<p className="text-sm">{generalInfo.address}</p>
            }
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Phone:</p>
            {editGeneralInfo ?
              <Input
                className="h-8 text-sm bg-white"
                value={generalInfo.phone}
                onChange={e => handleGeneralInfo('phone', e.target.value)}
              />:<p className="text-sm">{generalInfo.phone}</p>
            }
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Pager:</p>
            {editGeneralInfo ?
              <Input
                className="h-8 text-sm bg-white"
                value={generalInfo.pager}
                onChange={e => handleGeneralInfo('pager', e.target.value)}
              />:<p className="text-sm">{generalInfo.pager}</p>
            }
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#f5f5f5] border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-[#333333]">ASSOCIATE INFO</CardTitle>
          <div className='flex space-x-2'>
            {editAssociateInfo ?
              <>
                <button className="text-sm text-[#364699] hover:text-blue-800 cursor-pointer hover:bg-[#e5e7f4] h-8 px-3 rounded-md" onClick={() => setEditAssociateInfo(false)}>Cancel</button>
                <button className="text-sm text-[#364699] hover:text-blue-800 cursor-pointer hover:bg-[#e5e7f4] h-8 px-3 rounded-md" onClick={() => setEditAssociateInfo(false)}>Save</button>
              </>:
              <button className="text-sm text-[#364699] hover:text-blue-800 cursor-pointer hover:bg-[#e5e7f4] h-8 px-3 rounded-md" onClick={() => setEditAssociateInfo(true)}>Edit</button>
            }
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Grad Year:</p>
            {editAssociateInfo ?
              <Input
                className="h-8 text-sm bg-white"
                value={associateInfo.gradYear}
                onChange={e => handleAssociateInfo('gradYear', e.target.value)}
              />:<p className="text-sm">{associateInfo.gradYear}</p>
            }
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Student ID:</p>
            {editAssociateInfo ?
              <Input
                className="h-8 text-sm bg-white"
                value={associateInfo.studentId}
                onChange={e => handleAssociateInfo('studentId', e.target.value)}
              />:<p className="text-sm">{associateInfo.studentId}</p>
            }
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-sm text-[#6c6c6c]">Facility ID:</p>
            {editAssociateInfo ?
              <Input
                className="h-8 text-sm bg-white"
                value={associateInfo.facility}
                onChange={e => handleAssociateInfo('facility', e.target.value)}
              />:<p className="text-sm">{associateInfo.facility}</p>
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

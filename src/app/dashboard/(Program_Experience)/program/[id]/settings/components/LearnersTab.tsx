import { useState } from 'react';
import { Search, UserRound } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';

type User = {
  id: string;
  name: string;
  image: string;
};

const initialUsers: User[] = [
  {
    name: 'Isabella Ding',
    id: '234354545',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Isabella Gordon',
    id: '234354546',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    name: 'Isabelle Lang',
    id: '234354547',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export default function LearnersTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [addedUsers, setAddedUsers] = useState<string[]>([]);

  const toggleUser = (id: string) => {
    setAddedUsers(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id],
    );
  };

  const filteredUsers = initialUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full px-2">
      <div className="relative mb-4">
        <Input
          value={searchTerm}
          placeholder="Search student name"
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-4 pr-10 py-6 text-base rounded-full"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search />
        </div>
      </div>

      <div className="border-none rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#D9D9D91A] text-[#33333399] text-[12px] font-normal px-5">
                Student Name
              </TableHead>
              <TableHead className="bg-[#D9D9D91A] text-[#33333399] text-[12px] font-normal px-5">
                Student ID
              </TableHead>
              <TableHead className="bg-[#D9D9D91A] text-[#33333399] text-[12px] font-normal px-5 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500 py-6">
                  <div className='flex items-center justify-center flex-col gap-4 min-h-[25rem]'>
                    <UserRound className="w-[180px] h-[180px] text-[#33333333] " />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => {
                const isAdded = addedUsers.includes(user.id);

                return (
                  <TableRow key={user.id}>
                    <TableCell className="flex items-center gap-4 py-4">
                      <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{user.id}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="link"
                        className={`font-semibold ${isAdded ? 'text-red-600' : 'text-indigo-700'}`}
                        onClick={() => toggleUser(user.id)}
                      >
                        {isAdded ? 'Remove' : 'Add'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

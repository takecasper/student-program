import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AdminSidebarProps = {
  onClose: () => void;
  isOpen: boolean;
};

const AdminSidebar = ({ onClose, isOpen }: AdminSidebarProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 h-[calc(100vh-103px)] z-40 flex justify-end">
      <div className="bg-white w-[485px] h-full overflow-y-auto shadow-none border-l-2 border-[#f5f5f5] animate-in slide-in-from-right">
        <div className="py-[20px] px-[24px]">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-[16px] font-bold text-[#333333DE]">ADMINISTRATOR</h2>
            <div className="flex flex-col items-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="cursor-pointer rounded-[4px] h-[24px] w-[24px] border-[#d9d9d9]"
              >
                <X className="h-4 w-4 text-[#333333DE]" />
              </Button>
              <Button className="h-[32px] bg-[#364699] text-white rounded-full hover:bg-[#2d3a80] text-xs px-4">
                Add Users
                <Image
                  src="/svgs/add-white.svg"
                  alt="Add"
                  width={12}
                  height={12}
                  className="ml-2"
                />
              </Button>
            </div>
          </div>

          {/* User List */}
          <div className="space-y-6">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/avatar.png"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm text-[#333333]">Isabella Ding</p>
                      <p className="text-xs text-[#6c6c6c]">Instructor</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6 border rounded-[4px]">
                        <Image src="/svgs/edit.svg" alt="Edit" width={12} height={12} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 border rounded-[4px]">
                        <Image src="/svgs/delete.svg" alt="Delete" width={12} height={12} />
                      </Button>
                    </div>
                  </div>
                  {index < 5 && <div className="border-t border-[#f5f5f5] mt-6" />}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

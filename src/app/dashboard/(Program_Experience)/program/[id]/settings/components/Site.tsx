/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import Image from 'next/image';
import { useState } from 'react';
import { Plus, SendHorizontal } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';

import { UserData } from '../types';

type SiteSettingsData = {
  id: string;
  siteName: string;
  contact: string;
  address: string;
  relatedSite: string[];
};

const initialTableData: SiteSettingsData[] = [
  {
    id: '1',
    siteName: 'Hospital / Campus A',
    contact: 'Contact infor',
    address: '11 King Street, Toronto',
    relatedSite: ['Site Name', 'Site Name'],
  },
];

const SiteSettings = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [tableData, setTableData] = useState<SiteSettingsData[]>(initialTableData);
  const [newSiteSettings, setNewSiteSettings] = useState<SiteSettingsData>({
    siteName: '',
    contact: '',
    address: '',
    relatedSite: [],
    id: crypto.randomUUID(),
  });

  return (
    <div className='w-full'>
      <div className="flex items-center justify-between">
        <h4 className="text-[12px] text-[#4f4f4f] font-medium mb-4">GRADE-SHEET</h4>

        <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
          <Image width={16} height={16} src={'/svgs/system_update_alt.svg'} alt="update" />
        </Button>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6`}>
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Site Name
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Contact
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Address
              </TableHead>
              <TableHead className="text-[#6c6c6c] bg-[#fbfbfb] border-[#f5f5f5] font-medium">
                Related Site
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index} className="border-b border-[#f5f5f5]">
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className=" flex items-center gap-2">{item.siteName}</div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className=" flex items-center gap-2">{item.contact}</div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className=" flex items-center gap-2">{item.address}</div>
                </TableCell>
                <TableCell className="text-[#333333DE] font-medium items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="px-3 flex items-center justify-start gap-2">
                      {item.relatedSite.map((site, index) => {
                        return (
                          <p
                            key={index}
                            className="flex items-center gap-2 rounded-[20px] border border-[#d9d9d9] text-[#4e4e4e] px-2 py-[6px]"
                          >
                            <b className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#cccccc] border-3 border-[#d9d9d9]">
                              <Image
                                width={8}
                                height={8}
                                src={'/svgs/home_health.svg'}
                                alt="update"
                              />
                            </b>

                            {site}
                          </p>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/delete.svg'} alt="delete" />
                      </Button>

                      <Button className="cursor-pointer hover:bg-transparent shadow-none bg-transparent border border-[#ebebeb] rounded-[4px] w-[24px] h-[24px] p-0 flex items-center justify-center">
                        <Image width={11} height={11} src={'/svgs/edit.svg'} alt="edit" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {isAdding ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-left bg-[#fcfcfc] text-[#333333] font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      placeholder="Type Site Name"
                      value={newSiteSettings.siteName}
                      className="flex-2 h-[52px] !w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      onChange={e =>
                        setNewSiteSettings({ ...newSiteSettings, siteName: e.target.value })
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Contact"
                      value={newSiteSettings.contact}
                      className="flex-2 h-[52px] !w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      onChange={e =>
                        setNewSiteSettings({ ...newSiteSettings, contact: e.target.value })
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Address"
                      value={newSiteSettings.address}
                      className="flex-2 h-[52px] !w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      onChange={e =>
                        setNewSiteSettings({ ...newSiteSettings, address: e.target.value })
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Related Site"
                      value={newSiteSettings.relatedSite}
                      className="flex-2 h-[52px] !w-[20%] rounded-[5px] placeholder:text-[#858585] placeholder:font-medium"
                      onChange={e =>
                        setNewSiteSettings({ ...newSiteSettings, address: e.target.value })
                      }
                    />

                    <Button
                      onClick={() => {
                        setIsAdding(false);
                        setTableData([...tableData, newSiteSettings]);
                        setNewSiteSettings({
                          siteName: '',
                          contact: '',
                          address: '',
                          relatedSite: [],
                          id: crypto.randomUUID(),
                        });
                      }}
                      className="bg-transparent hover:bg-transparent cursor-pointer text-white rounded-[4px] h-[30px] px-2"
                    >
                      <SendHorizontal width={24} height={24} className="bg-none text-[#334599]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-left bg-[#F5F5F5] text-[#333333] font-medium"
                >
                  <Button
                    onClick={() => setIsAdding(true)}
                    className="text-[14px] hover:bg-transparent text-[#364699] font-bold hover:bg-[] cursor-pointer bg-transparent shadow-none"
                  >
                    <div className="bg-[#6069aa] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center mr-2">
                      <Plus className="w-[9px] h-[9px] text-white" />
                    </div>
                    Add New
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SiteSettings;

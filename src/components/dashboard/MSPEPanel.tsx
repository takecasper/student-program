/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, ChevronsRightLeft } from 'lucide-react';

import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';

const EvalSidebar = ({ setShowPanel }: { setShowPanel: Function }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showFullPage, setShowFullPage] = useState<boolean>(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log('showFullPage', showFullPage);

  return showFullPage ? (
    <div className="absolute z-20 right-4 top-[85px] h-[calc(100vh-101px)] w-[calc(100vw-13.25rem)] border-l border-gray-200 bg-white shadow-md font-sans rounded-b-2xl flex shrink-0 justify-between">
      <button
        onClick={() => setShowPanel(false)}
        className="absolute top-6 right-6 text-gray-500 hover:text-black cursor-pointer z-10"
      >
        ✕
      </button>

      <div
        className={`${showComments ? 'w-2/3' : 'px-[10rem] w-3/3'} overflow-auto h-full p-6 relative mr-10`}
      >
        <Button
          onClick={() => setShowComments(true)}
          className="hover:bg-white p-0 cursor-pointer w-[68px] h-[30px] absolute top-[6rem] left-[27rem] bg-white border-[#D9D9D9] rounded-[8px] border flex justify-center items-center gap-2"
        >
          <div className="relative z-[20] flex -space-x-3">
            <img
              className="w-[20px] h-[20px] rounded-full border-2 border-[#D9D9D9]"
              src="/images/avatar.png"
              alt="User 1"
            />
            <img
              className="w-[20px] h-[20px] rounded-full border-2 border-[#D9D9D9]"
              src="/images/avatar.png"
              alt="User 2"
            />
          </div>

          <div className="relative z-[20] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#B22234] text-white font-bold text-sm">
            1
          </div>

          <div className="z-[1] absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-[#D9D9D9] transform rotate-45"></div>
        </Button>

        <Button
          onClick={() => setShowComments(true)}
          className="hover:bg-white p-0 cursor-pointer w-[68px] h-[30px] absolute top-[16rem] left-[12rem] bg-white border-[#D9D9D9] rounded-[8px] border flex justify-center items-center gap-2"
        >
          <div className="relative z-[20] flex -space-x-3">
            <img
              className="w-[20px] h-[20px] rounded-full border-2 border-[#D9D9D9]"
              src="/images/avatar.png"
              alt="User 1"
            />
            <img
              className="w-[20px] h-[20px] rounded-full border-2 border-[#D9D9D9]"
              src="/images/avatar.png"
              alt="User 2"
            />
          </div>

          <div className="relative z-[20] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#B22234] text-white font-bold text-sm">
            1
          </div>

          <div className="z-[1] absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-[#D9D9D9] transform rotate-45"></div>
        </Button>

        <div className=" w-full border border-[#D9D9D9] rounded-xl">
          <img src="/images/mspe.png" alt="mspe-preview" className="w-full" />
        </div>
      </div>

      <div
        className={`${showComments ? 'w-1/3' : 'hidden'} flex flex-col items-center justify-between border-l border-[#D9D9D9] h-full relative px-6 pt-14`}
      >
        {/* Header */}
        <div className="h-auto">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[20px] text-[#333333DE] font-semibold mb-1">
                Review Letter (Isabella Ding)
              </h2>
              <p className="text-[16px] text-[#33333399]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet risus id metus
                rutrum, sed sodales purus scelerisque.
              </p>
            </div>
          </div>

          {/* Comments Title */}
          <div className="mt-6 pt-4 h-full ">
            <p className="text-[#333333DE] flex items-center gap-2 font-semibold pb-3 border-b mb-8">
              <MessageSquare fill="#4e4e4e" color="#4e4e4e" width={16} height={16} /> Comments (2)
            </p>

            {/* Comment */}
            <div className="max-h-[200px] flex-1 h-full overflow-y-auto">
              <div className="flex gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/avatar.png" alt="Mock user" />
                </Avatar>
                <div>
                  <p className="font-medium text-base">
                    Isabella Ding{' '}
                    <span className="text-base text-gray-400 ml-2 font-normal">2h ago</span>
                  </p>
                  <p className="text-base text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet risus
                  </p>
                  <div className="flex space-x-8 text-base text-blue-600 mt-4 ml-3">
                    <button className="cursor-pointer text-base text-[#333333DE]">Like</button>
                    <button className="cursor-pointer text-base text-[#333333DE]">Reply</button>
                  </div>
                </div>
              </div>

              {/* Nested Reply */}
              <div className="mt-4 pl-14 relative">
                <div className=" absolute h-[calc(100%+1.5rem)] w-[1px] border-[#F5F5F5] border left-5 -top-15"></div>
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/avatar.png" alt="Mock user" />
                  </Avatar>
                  <div>
                    <div className="text-base font-semibold">
                      Isabella Ding{' '}
                      <span className="text-base text-gray-400 ml-2 font-normal">1h ago</span>
                    </div>
                    <p className="text-base text-gray-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="h-[200px] relative bottom-0 w-full px-8 py-4 bg-white border-t border-gray-200 right-0 rounded-br-2xl">
          <div className="flex items-end gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatar.png" alt="Mock user" />
            </Avatar>
            <textarea
              className="flex-1 border border-gray-300 rounded-lg p-3 text-base"
              placeholder="Comment as Isabella Ding"
              rows={3}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-3">
            <button className="px-6 py-2 border border-gray-300 rounded-full bg-white text-xs font-medium hover:bg-gray-100 mr-3 cursor-pointer">
              Back
            </button>
            <button className="bg-[#364699] text-white text-[12px] font-medium py-3 px-7 rounded-full hover:bg-blue-700 transition cursor-pointer">
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      ref={wrapperRef}
      className=" absolute z-10 right-4 top-[85px] h-[calc(100vh-101px)] w-[515px] md:w-2/5 lg:w-1/3 border-l border-gray-200 bg-white p-6 shadow-md font-sans rounded-br-2xl flex flex-col"
    >
      <button
        onClick={() => setShowPanel(false)}
        className="absolute top-6 right-6 text-gray-500 hover:text-black cursor-pointer"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-9">Review Letter (Isabella Ding)</h2>
      {/* Comments toggle */}
      <div className="text-[#333333DE] flex items-center gap-2 font-medium mb-3">
        <MessageSquare fill="#4e4e4e" color="#4e4e4e" width={16} height={16} /> Comments (2)
      </div>

      <div className="overflow-hidden rounded-xl border border-[#D9D9D9] relative object-cover h-full">
        <Button
          onClick={() => setShowFullPage(true)}
          className="cursor-pointer border-[#3333331A] w-[24px] h-[24px] bg-white absolute top-4 right-4 z-10 rounded-[4px] shadow-md hover:bg-gray-100 transition"
        >
          <ChevronsRightLeft color="#333333DE" width={16} height={16} className="rotate-[-45deg]" />
        </Button>

        <img src="/images/mspe.png" alt="mspe-preview" />
      </div>

      {/* Acknowledgment checkbox */}
      {/* <div className="flex items-start space-x-2 mb-30 mt-16 cursor-pointer">
        <input
          type="checkbox"
          id="ack"
          className="mt-1 cursor-pointer"
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
        />
        <label htmlFor="ack" className="text-base text-gray-700 pl-8 cursor-pointer">
          I have reviewed my MSPE letter and have no feedback. I understand that I will no longer be
          able to view my MSPE letter or provide additional feedback once submitted.
        </label>
      </div> */}

      {/* Sticky Footer */}
      <div className="absolute bottom-0 left-0 w-full px-8 py-4 bg-white border-t border-gray-200 flex justify-end gap-3 rounded-br-2xl">
        <button
          onClick={() => setShowFullPage(true)}
          className="bg-white border border-[#364699] text-[#333333DE] text-[12px] font-medium py-3 px-7 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          Review & Comment
        </button>
        <button className="bg-[#364699] text-white text-[12px] font-medium py-3 px-7 rounded-full hover:bg-blue-700 transition cursor-pointer">
          Accept
        </button>
      </div>
    </div>
  );
};

export default EvalSidebar;

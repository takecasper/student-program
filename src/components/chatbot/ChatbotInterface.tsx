'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotInterface = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      icon: <Image src="/svgs/bulb.svg" alt="Ideas" width={24} height={24} />,
      title: 'Get Ideas for a project',
      onClick: () => console.log('Get Ideas clicked'),
    },
    {
      icon: <Image src="/svgs/pencils.svg" alt="Write" width={24} height={24} />,
      title: 'Help me write something',
      onClick: () => console.log('Help write clicked'),
    },
    {
      icon: <Image src="/svgs/book.svg" alt="Explain" width={24} height={24} />,
      title: 'Explain a concept',
      onClick: () => console.log('Explain clicked'),
    },
    {
      icon: <Image src="/svgs/copy.svg" alt="Summarize" width={24} height={24} />,
      title: 'Summarize this text',
      onClick: () => console.log('Summarize clicked'),
    },
  ];

  return (
    <div className="fixed bottom-8 right-12">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[338px] h-[500px] bg-white rounded-xl shadow-lg absolute bottom-20 right-0 z-30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#4355B9] p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Image src="/chatbot-logo.png" alt="Bot Avatar" width={40} height={40} />
                </div>
                <div className="flex flex-col">
                  <p className="text-white font-medium">OnePlatform Bot</p>
                  <span className="text-white text-sm">Chatbot</span>
                </div>
              </div>
              <button className="text-white" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 flex-1 overflow-y-auto">
              {/* Chat Message with animation */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-end justify-between gap-2"
              >
                <div className="border rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/chatbot-logo.png" alt="Bot Avatar" />
                  </Avatar>
                </div>
                <div className="flex flex-col bg-[#F5F5F5] rounded-lg p-2">
                  <p className="text-gray-800">Hey there! 👋</p>
                  <p className="text-gray-600 text-sm mt-1">
                    I&apos;m your AI assistant—ready to help you brainstorm, summarize, research, or
                    just chat things out. What are you working on today?
                  </p>
                </div>
              </motion.div>

              {/* Options Grid with animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-2 mt-4"
              >
                {options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={option.onClick}
                    className="flex items-center cursor-pointer gap-2 p-3 text-left rounded-[5px] bg-[#F5F5F5] hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="text-sm text-gray-700">{option.title}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Input Area with animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-t p-4"
            >
              <div className="flex items-center gap-2 border-none rounded-lg p-2">
                <input
                  type="text"
                  placeholder="Type a question..."
                  className="flex-1 outline-none text-sm border-none bg-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#4355B9] cursor-pointer"
                >
                  <span className="transform rotate-90">➤</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full transition-colors z-40"
      >
        <div className="bg-white">
          <Image src="/acuity.png" alt="Bot Avatar" width={50} height={50} />
        </div>
      </motion.button>
    </div>
  );
};

export default ChatbotInterface;

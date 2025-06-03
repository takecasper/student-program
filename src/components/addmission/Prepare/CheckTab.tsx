'use client';

import { useState } from 'react';

export default function CheckTab() {
  const [bitrate, setBitrate] = useState('');
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleCheck = () => {
    const speed = parseFloat(bitrate);
    const isGood = !isNaN(speed) && speed >= 1.5;
    setIsValid(isGood);
    setChecked(true);
  };

  return (
    <div className="ml-0.5">
      <div className='mb-2'>
        <p className="text-sm text-[#333333DE] mt-1">
          You will need to have a high speed internet connection with a{' '}
          <strong>download bitrate of at least 1.5 Mbps</strong>.
        </p>
      </div>

      <div className="flex items-center space-x-3 mb-1">
        <input
          type="text"
          value={bitrate}
          onChange={e => setBitrate(e.target.value)}
          placeholder="24MBps"
          className="border border-gray-300 rounded-xl px-4 py-5 w-48 text-sm"
        />
        <button
          onClick={handleCheck}
          className="bg-[#364699] text-white text-sm rounded-3xl py-5 px-10 cursor-pointer"
        >
          Check
        </button>
      </div>

      {checked && (
        <div className="space-y-1 text-sm">
          {isValid ? (
            <>
              <p className="text-[#00a59b]">✓ Download bitrate looks good!</p>
              <p className="text-[#00a59b]">✓ Using latest version of Chrome (V1.30)</p>
            </>
          ) : (
            <p className="text-red-600">✘ Your download speed is too low.</p>
          )}
        </div>
      )}
    </div>
  );
}

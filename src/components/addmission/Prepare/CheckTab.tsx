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
      <div>
        <p className="text-sm text-[#333333DE] mt-1">
          You will need to have a high speed internet connection with a{' '}
          <strong>download bitrate of at least 1.5 Mbps</strong>.
        </p>

        <ol className="list-decimal ml-3 my-9 space-y-6 font-normal text-sm text-[#333333DE]">
          <li>
            <a
              href="https://fast.com"
              target="_blank"
              className="text-blue-600 underline"
              rel="noopener noreferrer"
            >
              Click Here
            </a>{' '}
            to run speed test <br />
            (link will open in new window)
          </li>
          <li>Wait a few seconds for the numbers to stop changing.</li>
          <li>Copy and paste the number in the field below.</li>
          <li>Press the check button to check your download speed.</li>
          <li>Please keep the link open to test Upload Speed on the next page.</li>
        </ol>
      </div>

      <div className="flex items-center space-x-3 mb-1">
        <input
          type="text"
          value={bitrate}
          onChange={e => setBitrate(e.target.value)}
          placeholder="Enter download bitrate here"
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
              <p className="text-green-600">✔ Download bitrate looks good!</p>
              <p className="text-green-600">✔ Using latest version of Chrome (V1.30)</p>
            </>
          ) : (
            <p className="text-red-600">✘ Your download speed is too low.</p>
          )}
        </div>
      )}
    </div>
  );
}

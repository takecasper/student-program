'use client';

import Link from 'next/link';
import Image from 'next/image';
import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import { useUserStore } from '@/store/user';

import { users } from '@/data/mockUserData';
import { CircleAlert, ScanFace, IdCard, Car, SmilePlus, Glasses, Landmark } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import { countries } from 'countries-list';
import 'react-phone-input-2/lib/style.css';
import ProgressBar from '@/components/ui/progressbar';

interface StepLabels {
  label: string;
}

type IDOption = {
  label: string;
  sublabel: string;
  icon: JSX.Element;
  value: string;
};

const stepLabels: StepLabels[] = [
  { label: 'Register Account' },
  { label: 'Verify Email' },
  { label: 'Personal Details' },
  { label: 'ID Verification' },
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const countryEntries = Object.entries(countries).map(([code, data]) => ({
  code,
  name: data.name,
}));

const options: IDOption[] = [
  {
    label: 'Passport',
    sublabel: 'Face photo page',
    icon: <ScanFace className="text-indigo-500 w-5 h-5" />,
    value: 'passport',
  },
  {
    label: 'Driver’s License',
    sublabel: 'Front and Back',
    icon: <Car className="text-indigo-500 w-5 h-5" />,
    value: 'license',
  },
  {
    label: 'Identity Card',
    sublabel: 'Face photo page',
    icon: <IdCard className="text-indigo-500 w-5 h-5" />,
    value: 'idcard',
  },
  {
    label: 'Residence Permit',
    sublabel: 'Face photo page',
    icon: <Landmark className="text-indigo-500 w-5 h-5" />,
    value: 'residence',
  },
];

export default function LoginPage() {
  const [country, setCountry] = useState('');
  const [isoCode, setIsoCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<number>(0);
  const [idVerificationstep, setIdVerificationStep] = useState<number>(0);
  const [dialCode, setDialCode] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const handleSubmit0 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!country) {
      setError('Please select country');
      return;
    }
    nextStep();
  };

  const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmError('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (password.length < 10) {
      setPasswordError('Password needs to be 10 or more characters');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmError('Entered Wrong Password');
      valid = false;
    }

    if (!valid) return;

    try {
      const success = await login(email, password);

      if (success) {
        const userType: 'program_experience' | 'student' =
          users.find(user => user.email === email)?.role || 'student';

        useUserStore.getState().setUser({
          email,
          type: userType,
          name: 'Mock User',
          avatar: '/avatar.png',
          id: crypto.randomUUID(),
          address: 'Toronto, Canada',
        });

        // router.replace('/dashboard');
        nextStep();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleSubmit3 = () => {
    nextStep();
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countryEntries.find(c => c.code === code);
    if (country) {
      setCountry(country.name);
      setIsoCode(code);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const backStep = () => {
    setStep(step - 1);
  };

  const nextIdVerificationStep = () => {
    setIdVerificationStep(idVerificationstep + 1);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f5f5f5] p-10 pb-22 px-19">
      {/* Left Panel - Blue Background */}
      <div className="w-full md:w-1/2 bg-[#364699] relative p-14 flex flex-col rounded-2xl justify-between">
        {/* Profile Cards */}
        <Image src="/logo.png" alt="Acuity Insights Logo" width={96} height={34} className="mb-1" />
        <div className="flex justify-center items-center w-full">
          <Image
            src="/sign-up.png"
            alt="Acuity Insights Logo"
            width={383}
            height={327}
            className="mb-1 items-center"
          />
        </div>
        <div className=" text-white text-center ">
          <h1 className=" text-[32px] mb-4">Welcome!</h1>
          <div className="text-[16px]">See the potential that others miss</div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-16 h-2 bg-[#00A59B] rounded-full"></div>
          <div className="w-16 h-2 bg-white rounded-full"></div>
          <div className="w-16 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Right Panel - White Background */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center justify-center rounded-r-2xl">
        {/* Logo */}
        <div className="w-28 h-28 bg-[#364699] border-4 border-[#D2D2FF] rounded-full flex items-center justify-center text-white mb-12">
          <div className="text-center">
            <Image src="/logo.png" alt="Acuity Insights Logo" width={69} height={80} />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-5xl text-[#333333] mb-2">Sign Up</h1>
        <p className="text-gray-500 mb-4 text-center text-sm">
          Learn, Grow, Achieve - Your Path to Knowledge
        </p>

        {step ? <ProgressBar currentStep={step} stepLabels={stepLabels} /> : <></>}

        {/* Error message */}
        {error && (
          <div className="w-full max-w-md mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm mt-10">
            {error}
          </div>
        )}

        {/* Step 0 page */}
        {step == 0 && (
          <form onSubmit={handleSubmit0} className="w-full max-w-md space-y-4 mb-8 mt-[59px]">
            <div className="">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  onChange={handleChange}
                  className="w-full relative border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#364699] appearance-none"
                >
                  <option value="">Select Country</option>
                  {countryEntries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>

                {/* Down Arrow Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-9">
              <div className="w-8 h-8 block relative">
                <CircleAlert size={30} />
              </div>
              <div className="inline-block">
                <p className="text-sm font-bold">
                  Your location will no longer be able to be changed after this point.
                </p>
                <p className="text-xs mt-2">
                  Changing your location may affect where your data is stored. It will not affect
                  the availability of programs or schools, or admissions eligibility.
                </p>
              </div>
            </div>

            {/* Privacy Policy Link */}
            <div className="text-sm text-[#333333] border-t border-[#33333399] text-center w-full pt-4 mt-[59px]">
              For more information on data residency, please access our
              <br />
              <Link href="#" className="text-[#364699] font-medium">
                Privacy Policy
              </Link>
            </div>

            <div className="w-full justify-center mt-[53px] items-center">
              <button
                type="submit"
                className="bg-[#364699] cursor-pointer text-white rounded-full py-3 px-8 flex items-center justify-center gap-2 hover:bg-[#2d3a7d] transition-colors m-auto"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Step 1 page */}
        {step == 1 && (
          <form onSubmit={handleSubmit1} className="w-full max-w-md space-y-4 mb-8 mt-[59px]">
            <div className="text-sm font-bold text-[#333333DE]">Register Account</div>
            <div className="flex space-x-4">
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#364699]"
                placeholder="First Name"
              />
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#364699]"
                placeholder="Last Name"
              />
            </div>

            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full rounded-lg py-3 px-4 focus:outline-none focus:ring-2 ${
                  emailError
                    ? 'border border-red-500 focus:ring-red-500'
                    : 'border border-gray-300 focus:ring-[#364699]'
                }`}
                placeholder="Email"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full rounded-lg py-3 px-4 focus:outline-none focus:ring-2 ${
                  passwordError
                    ? 'border border-red-500 focus:ring-red-500'
                    : 'border border-gray-300 focus:ring-[#364699]'
                }`}
                placeholder="Password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`w-full rounded-lg py-3 px-4 focus:outline-none focus:ring-2 ${
                  confirmError
                    ? 'border border-red-500 focus:ring-red-500'
                    : 'border border-gray-300 focus:ring-[#364699]'
                }`}
                placeholder="Confirm Password"
              />
              {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className=" float-right cursor-pointer bg-[#364699] text-white rounded-full py-3 px-10 flex items-center justify-center gap-2 hover:bg-[#2d3a7d] transition-colors"
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border border-white border-t-transparent rounded-full"></div>
              ) : (
                'Next'
              )}
            </button>
          </form>
        )}

        {/* Step 2 page */}
        {step == 2 && (
          <div className="w-full max-w-md space-y-4 mb-8 mt-[59px]">
            <div className=" text-[#333333DE] text-sm font-bold">Verify Email</div>

            <div className="mt-4 text-xs">
              We have sent a confirmation email to
              <br />
              <b>{email}</b>
            </div>

            <div className="text-xs text-[#33333399] font-[500] mb-[39px] mt-6">
              Please check your email and follow the enclosed link to confirm your email address and
              proceed with regristration
            </div>
            {/* Resend Email Link */}
            <div className="text-xs text-[#33333399] w-full leading-5">
              Don&apos;t forget to check your <b>SPAM</b> folder, just in case.
              <br />
              <Link href="#" className="text-[#364699] font-medium pt-2">
                Resend Email
              </Link>
            </div>

            <div className="w-full flex justify-between mt-[107px] items-center">
              <button
                type="button"
                onClick={() => backStep()}
                className="border-[#364699] border-2 cursor-pointer text-[#2d3a7d] rounded-full py-3 px-8 hover:bg-[#85858533] transition-colors"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={() => nextStep()}
                className="bg-[#364699] cursor-pointer text-white rounded-full py-3 px-11 hover:bg-[#2d3a7d] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 page */}
        {step == 3 && (
          <form onSubmit={handleSubmit3} className="w-full max-w-md space-y-4 mb-8 mt-[59px]">
            <div className="text-sm font-bold text-gray-800">Personal Details</div>
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="flex gap-2">
                <div className="w-[150px]">
                  <PhoneInput
                    country={isoCode.toLowerCase()}
                    value={dialCode}
                    onChange={value => setDialCode(value)}
                    enableSearch
                    inputStyle={{
                      width: '100%',
                      height: '44px',
                      borderRadius: '0.5rem',
                      fontSize: '14px',
                      border: '1px solid #D1D5DB',
                    }}
                    buttonStyle={{
                      border: 'none',
                      background: 'transparent',
                    }}
                    containerStyle={{
                      width: '100%',
                    }}
                    dropdownStyle={{
                      maxHeight: '150px',
                    }}
                    inputProps={{
                      name: 'phone',
                      required: true,
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="1111234"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#364699] text-sm"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Day"
                  value={day}
                  onChange={e => setDay(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#364699]"
                />
                <select
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#364699] cursor-pointer"
                >
                  <option value="">Month</option>
                  {months.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Year"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#364699]"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex text-sm font-medium text-gray-700 mb-1 items-center gap-1">
                Location
                <span
                  title="We auto-detect your location"
                  className="text-gray-400 cursor-help text-xs"
                >
                  <CircleAlert size={12} />
                </span>
              </label>
              <div className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-800">
                {country}
              </div>
            </div>

            <div className="w-full flex justify-between mt-[36px] items-center">
              <button
                type="button"
                onClick={() => backStep()}
                className="border-[#364699] border-2 cursor-pointer text-[#2d3a7d] rounded-full py-3 px-8 hover:bg-[#85858533] transition-colors"
              >
                Go Back
              </button>
              <button
                type="submit"
                onClick={() => nextStep()}
                className="bg-[#364699] cursor-pointer text-white rounded-full py-3 px-11 hover:bg-[#2d3a7d] transition-colors"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Step 4 page */}
        {step == 4 && (
          <div className="w-full max-w-xl mx-auto text-center space-y-6 mt-[59px]">
            {idVerificationstep == 0 ? (
              <>
                {/* Header */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">ID Verification</h2>
                  <p className="text-sm text-gray-500 mt-1">It must be an Official Photo ID</p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  {options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSelected(opt.value)}
                      className={`border cursor-pointer rounded-xl px-4 py-4 flex items-start text-left space-x-2 hover:shadow-sm focus:outline-none transition ${
                        selected === opt.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-indigo-100">
                        {opt.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-800">{opt.label}</div>
                        <div className="text-xs text-gray-500">{opt.sublabel}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="w-full flex justify-between mt-[48px] items-center">
                  <button
                    type="button"
                    onClick={() => backStep()}
                    className="border-[#364699] border-2 cursor-pointer text-[#2d3a7d] rounded-full py-3 px-8 hover:bg-[#85858533] transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    onClick={() => nextIdVerificationStep()}
                    className="bg-[#364699] cursor-pointer text-white rounded-full py-3 px-11 hover:bg-[#2d3a7d] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : idVerificationstep == 1 ? (
              <>
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800">
                  ID Verification - Take a Selfie
                  <p className="text-sm text-gray-500 mt-1">We’ll compare it with your document</p>
                </h2>

                {/* Timeline */}
                <div className="mt-8 flex flex-col items-start relative pl-14 text-left">
                  {/* Step 1 */}
                  <div className="flex items-center gap-4 relative">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-400 flex items-center justify-center text-indigo-500 bg-white z-10">
                      <SmilePlus className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600 leading-snug">
                      Face forward and make sure your eyes are clearly visible
                    </p>
                  </div>

                  {/* Vertical line between steps */}
                  <div className="w-1 h-[49px] bg-indigo-200 ml-[18px] my-1" />

                  {/* Step 2 */}
                  <div className="flex items-center gap-4 relative">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-400 flex items-center justify-center text-black bg-white z-10">
                      <Glasses className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600 leading-snug">
                      Remove your glasses, if necessary
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center mt-[48px] items-center">
                  <button
                    type="button"
                    onClick={() => nextStep()}
                    className="bg-[#364699] cursor-pointer text-white rounded-full py-3 px-11 hover:bg-[#2d3a7d] transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        )}

        {/* Step 5 page */}
        {step == 5 && (
          <div className="w-full max-w-xl mx-auto text-center space-y-6 mt-[59px]">
            {!showTerms ? (
              <>
                <div className="p-6 rounded-md text-center m-auto max-w-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    ID Verification - Complete
                  </h2>
                  <p className="text-sm text-gray-700">
                    Your account details are pending a manual verification against the government ID
                    you submitted. This normally takes{' '}
                    <span className="font-medium">1–2 business days</span> and we will notify you
                    when we complete our review by email.
                  </p>
                </div>
                <div className="w-full flex justify-center mt-[48px] items-center">
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="bg-[#364699] cursor-pointer text-white rounded-full py-3 px-11 hover:bg-[#2d3a7d] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="max-w-sm w-full text-center m-auto">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Terms of Use</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Please review and accept the following terms and conditions
                  </p>
                  <div className="bg-white p-4 rounded-md border max-h-48 overflow-y-auto text-left">
                    <h3 className="font-semibold mb-2">1. Acceptance</h3>
                    <p className="text-sm text-gray-700">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et vulputate
                      justo, vitae rutrum lorem. Nullam eget eros lorem. Morbi velit mi, viverra ut
                      consectetur vel, maximus sed arcu. Suspendisse ullamcorper, magna vel congue
                      porttitor, quam nisi ultricies turpis, non lacinia enim lacus sit amet eros.
                      Aliquam dignissim enim enim, vitae malesuada odio sodales vel. Proin lobortis
                      mollis consectetur. Vivamus venenatis tellus sit amet rhoncus mattis. Ut et
                      est ornare, rhoncus arcu tincidunt, Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Proin et vulputate justo, vitae rutrum lorem. Nullam eget
                      eros lorem. Morbi velit mi, viverra ut consectetur vel, maximus sed arcu.
                      Suspendisse ullamcorper, magna vel congue porttitor, quam nisi ultricies
                      turpis, non lacinia enim lacus sit amet eros. Aliquam dignissim enim enim,
                      vitae malesuada odio sodales vel. Proin lobortis mollis consectetur. Vivamus
                      venenatis tellus sit amet rhoncus mattis. Ut et est ornare, rhoncus arcu
                      tincidunt
                    </p>
                  </div>
                  <div className="w-full flex justify-end mt-[48px] items-center">
                    <button
                      type="button"
                      onClick={() => router.push('/')}
                      className="bg-[#364699] cursor-pointer text-white rounded-full py-3 px-11 hover:bg-[#2d3a7d] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

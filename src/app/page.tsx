import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f5f5f5] p-10">
      {/* Left Panel - Blue Background */}
      <div className="w-full md:w-1/2 bg-[#364699] relative p-8 flex flex-col rounded-2xl">
        {/* Profile Cards */}
        <div className="flex flex-col md:flex-row gap-6 mt-auto mb-16 relative  items-center justify-center">
          <div className="border -rotate-6 border-white rounded-xl p-4 w-64 text-white mb-8">
            <Image
              src="/logo.png"
              alt="Acuity Insights Logo"
              width={60}
              height={80}
              className="mb-1"
            />
            <h2 className="text-2xl font-bold leading-tight">See the potential that others miss</h2>
          </div>
          {/* First Card left */}
          <div className="transform rotate-6 bg-[#fcedca] rounded-xl overflow-hidden w-48 h-72">
            <div className="relative h-3/4">
              <Image
                src="/sophia.png"
                alt="Student profile"
                width={150}
                height={200}
                className="object-cover w-full h-full"
              />
              <button className="absolute top-4 left-4 bg-[#364699] text-white text-xs py-1 px-3 rounded-full">
                Read Case Study
              </button>
            </div>
            <div className="p-3">
              <p className="font-medium">Sophia Carter</p>
              <p className="text-xs text-gray-700">Enrolled at UTF in 2024</p>
            </div>
          </div>

          {/* Second Card */}
          <div className="transform -rotate-3 bg-[#70c0b8] rounded-xl overflow-hidden w-48 h-72 z-10">
            <div className="relative h-3/4">
              <Image
                src="/ethan.png"
                alt="Student profile"
                width={150}
                height={200}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 left-4 bg-[#364699] text-white text-xs py-1 px-3 rounded-full">
                Read Case Study
              </button>
            </div>
            <div className="p-3">
              <p className="font-medium">Sophia Ethan Parker</p>
              <p className="text-xs text-gray-700">Enrolled at UTF in 2024</p>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-8 h-2 bg-white rounded-full"></div>
          <div className="w-8 h-2 bg-white/50 rounded-full"></div>
        </div>

        {/* Decorative Dots */}
        <div className="absolute top-32 left-64 w-4 h-4 rounded-full bg-[#606aaa]/50"></div>
        <div className="absolute top-72 left-1/3 w-4 h-4 rounded-full bg-[#606aaa]/50"></div>
        <div className="absolute bottom-32 right-1/3 w-4 h-4 rounded-full bg-[#606aaa]/50"></div>
      </div>

      {/* Right Panel - White Background */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col items-center justify-center  rounded-r-2xl">
        {/* Logo */}
        <div className="w-20 h-20 bg-[#364699] border border-[#D2D2FF] rounded-full flex items-center justify-center text-white mb-12">
          <div className="text-center">
            <Image src="/logo.png" alt="Acuity Insights Logo" width={60} height={80} />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-5xl text-[#333333] mb-2">Hello Again!</h1>
        <p className="text-gray-500 mb-12 text-center text-sm">
          Learn, Grow, Achieve - Your Path to Knowledge
        </p>

        {/* Login Buttons */}
        <div className="w-full max-w-md space-y-4 mb-12">
          <Link
            href="/dashboard"
            className="w-full border border-gray-200 rounded-full py-3 px-4 flex items-center justify-center gap-2"
          >
            <div className="w-6 h-6 bg-[#364699] rounded-full flex items-center justify-center">
              <Image src="/logo.png" alt="Acuity Insights Logo" width={15} height={15} />
            </div>
            <span className="text-[#333333]">Continue with Acuity Account</span>
          </Link>

          <button className="w-full border border-gray-200 rounded-full py-3 px-4 flex items-center justify-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                  fill="#34A853"
                />
                <path
                  d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span className="text-[#333333]">Continue with Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-sm text-[#333333]">
          Don&apos;t have an account yet?{' '}
          <Link href="/signup" className="text-[#364699] font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

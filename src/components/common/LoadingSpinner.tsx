export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#364699]"></div>
    </div>
  );
}

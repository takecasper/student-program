export async function GET() {
  // Generate a random buffer of data (1MB)
  const size = 1024 * 1024; // 1MB
  const buffer = new ArrayBuffer(size);

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache',
    },
  });
}

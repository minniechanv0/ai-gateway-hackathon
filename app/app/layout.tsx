export const metadata = {
  title: "AI Gateway Hackathon",
  description: "Dual agents demo on Vercel + AI Gateway + Gemini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

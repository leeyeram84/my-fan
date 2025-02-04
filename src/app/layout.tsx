import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/lib/providers/ThemeProvider';
import Providers from '@/lib/providers/QueryProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Session from '@/components/layout/Session';
import ScrollTop from '@/components/layout/ScrollTop';
import '@/styles/globals.css';
import { Toaster } from 'sonner';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'My-Fan',
  description:
    '내가 응원하는 아티스트의 정보와 스케줄을 확인하고, 게시글과 채팅으로 K-POP 팬들과 소통할 수 있는 서비스 My-Fan(마이팬)입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ko'
      suppressHydrationWarning
    >
      <link
        rel='icon'
        href='/icons/logo-fullname.png'
        sizes='any'
      />
      <link
        rel='preload'
        href='/fonts/PretendardVariable.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <body className={`${pretendard.variable} flex flex-col min-h-screen antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Session>
              <Header />
              <main className='flex-1'>{children}</main>
              <Footer />
            </Session>
          </Providers>
          <Toaster position='bottom-right' />
          <ScrollTop />
        </ThemeProvider>
      </body>
    </html>
  );
}

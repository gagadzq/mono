import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header/index';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '爬爬的小破站',
  description: '个人博客——记录学习笔记 / 生活日常',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='app'>
          <div className='app-wrap'>
            <Header></Header>
            <div className="container-scroll">
              <div className="container">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

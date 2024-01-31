'use client';

import { Inter } from "next/font/google";
import Sidebar from '@/components/Sidebar';
import "./globals.css";

import { useState, useEffect } from "react";
import { userId } from '@/atoms/userId';
import { useAtom } from 'jotai';
import Login from '@/components/Login';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useAtom(userId);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setId(userId);
    setLoading(false);
  }, [id]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="root-layout">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content">
            {loading ? null : id === null ? <Login /> : children}
          </div>
        </div>
      </body>
    </html>
  );
}

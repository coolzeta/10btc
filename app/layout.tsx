import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://10btc.top'),
  title: {
    default: '10btc.top - 比特币技术原理与稀缺性分析',
    template: '%s | 10btc.top'
  },
  description: '深入解析比特币技术原理：区块链、挖矿机制、密码学、减半效应。理解SF值模型，探索为什么10 BTC将成为稀缺资产。技术科普与价值分析。',
  keywords: [
    '比特币',
    'Bitcoin',
    'BTC',
    '区块链',
    '加密货币',
    '挖矿',
    'SHA-256',
    '工作量证明',
    'PoW',
    '减半',
    '稀缺性',
    'SF值',
    '十币称侯',
    '数字货币',
    '去中心化',
    '密码学',
    '公钥加密',
    '私钥',
    '比特币原理',
    '比特币技术'
  ],
  authors: [{ name: '10btc.top' }],
  creator: '10btc.top',
  publisher: '10btc.top',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://10btc.top',
    title: '10btc.top - 比特币技术原理与稀缺性分析',
    description: '深入解析比特币技术原理：区块链、挖矿、密码学。理解为什么10 BTC是稀缺资产。',
    siteName: '10btc.top',
  },
  twitter: {
    card: 'summary_large_image',
    title: '10btc.top - 比特币技术原理',
    description: '深入解析比特币技术原理与稀缺性',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://10btc.top',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '10btc.top',
    description: '比特币技术原理与稀缺性分析',
    url: 'https://10btc.top',
    inLanguage: 'zh-CN',
    about: {
      '@type': 'Thing',
      name: '比特币',
      sameAs: [
        'https://zh.wikipedia.org/wiki/比特币',
        'https://bitcoin.org',
      ]
    },
    keywords: '比特币, 区块链, 加密货币, 技术原理, 稀缺性, 十币称侯'
  };

  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FadeInUp, FadeIn, SlideInLeft, SlideInRight, ScaleIn, StaggerContainer, StaggerItem } from './components/Animations';

export default function Home() {
  const [blockHeight, setBlockHeight] = useState(820450);
  const [hashRate, setHashRate] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // 视差效果
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  // 鼠标追踪
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 100);
      mouseY.set((clientY / innerHeight - 0.5) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // 模拟区块高度增长（平均10分钟一个块）
    const blockInterval = setInterval(() => {
      setBlockHeight(prev => prev + 1);
    }, 600000);

    // 模拟算力波动
    const hashInterval = setInterval(() => {
      setHashRate(Math.random());
    }, 2000);

    return () => {
      clearInterval(blockInterval);
      clearInterval(hashInterval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero - 比特币是什么 */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 交互式背景 */}
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          
          {/* 鼠标追踪光晕 */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(247,147,26,0.8) 0%, transparent 70%)',
              x: useTransform(mouseXSpring, (x) => x * 2),
              y: useTransform(mouseYSpring, (y) => y * 2),
              left: '50%',
              top: '50%',
            }}
          />
          
          {/* 动态粒子背景 */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                }}
                animate={{
                  y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
                  x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
          
          {/* 区块链网格背景 */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              x: useTransform(mouseXSpring, (x) => x * 0.5),
              y: useTransform(mouseYSpring, (y) => y * 0.5),
            }}
          >
            <div className="grid grid-cols-8 gap-4 p-8">
              {[...Array(64)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="aspect-square border border-orange-500/30 rounded"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: i * 0.01,
                    duration: 0.5,
                  }}
                  whileHover={{ scale: 1.2, borderColor: 'rgba(247,147,26,0.8)' }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="container mx-auto px-6 relative z-10"
          style={{ opacity }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* 10 BTC 标识 */}
            <FadeIn delay={0.2}>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 text-5xl md:text-7xl font-black">
                  <motion.span 
                    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent"
                    animate={{ 
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    10
                  </motion.span>
                  <motion.span 
                    className="text-7xl md:text-9xl"
                    animate={{ 
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 6,
                      delay: 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ₿
                  </motion.span>
                </div>
              </div>
            </FadeIn>

            <FadeInUp delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                比特币：一种点对点的<br />
                <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  电子现金系统
                </span>
              </h1>
            </FadeInUp>

            {/* 十币称侯副标题 */}
            <FadeIn delay={0.6}>
              <div className="mb-8">
                <div className="inline-block px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
                  <span className="text-orange-400 font-semibold">十币称侯</span>
                  <span className="text-gray-500 mx-2">·</span>
                  <span className="text-gray-400 text-sm">理解原理，把握未来</span>
                </div>
              </div>
            </FadeIn>

            <FadeInUp delay={0.8}>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                无需信任第三方的数字货币，通过密码学和分布式网络实现去中心化
              </p>
            </FadeInUp>

            {/* 核心特性 */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <StaggerItem>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all hover:scale-105">
                  <div className="text-3xl mb-3">🔗</div>
                  <div className="text-lg font-semibold text-white mb-2">去中心化</div>
                  <div className="text-sm text-gray-400">无单点故障</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all hover:scale-105">
                  <div className="text-3xl mb-3">🔐</div>
                  <div className="text-lg font-semibold text-white mb-2">密码学保护</div>
                  <div className="text-sm text-gray-400">安全不可篡改</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all hover:scale-105">
                  <div className="text-3xl mb-3">⚡</div>
                  <div className="text-lg font-semibold text-white mb-2">点对点</div>
                  <div className="text-sm text-gray-400">无需中介</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-lg rounded-xl p-6 border border-orange-500/50 ring-2 ring-orange-500/30 hover:scale-105 transition-all">
                  <div className="text-3xl mb-3">💎</div>
                  <div className="text-lg font-semibold text-orange-400 mb-2">2100万上限</div>
                  <div className="text-sm text-gray-400">10 BTC = 0.048%</div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <FadeInUp delay={1.2}>
              <a href="#blockchain" className="inline-block px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                深入了解原理
              </a>
            </FadeInUp>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-orange-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* 区块链原理 */}
      <section id="blockchain" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                区块链：分布式账本
              </h2>
              <p className="text-xl text-gray-400">所有交易记录在全网共享的账本上</p>
            </div>
          </FadeInUp>

          {/* 区块结构可视化 */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {[
              { id: 'Block #818', hash: '0000...4a2f', txs: 2847, prev: '0000...9c1b' },
              { id: 'Block #819', hash: '0000...7e3d', txs: 3124, prev: '0000...4a2f', current: true },
              { id: 'Block #820', hash: '????...????', txs: '???', prev: '0000...7e3d', next: true }
            ].map((block, i) => (
              <StaggerItem key={i}>
                <div 
                  className={`relative bg-white/5 backdrop-blur-lg rounded-xl p-6 border transition-all hover:scale-105 ${
                    block.current ? 'border-orange-500 ring-2 ring-orange-500/50' : 
                    block.next ? 'border-white/10 opacity-50' : 
                    'border-white/10'
                  }`}
                >
                  <div className="text-sm text-gray-400 mb-4">{block.id}</div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">区块哈希</div>
                      <div className="font-mono text-sm text-orange-400">{block.hash}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-1">交易数量</div>
                      <div className="font-semibold text-white">{block.txs}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-1">前块哈希</div>
                      <div className="font-mono text-sm text-gray-400">{block.prev}</div>
                    </div>
                  </div>

                  {i < 2 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-orange-500 text-2xl hidden lg:block">
                      →
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* 区块链特性 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SlideInLeft>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="text-2xl font-bold mb-4 text-white">链式结构</h3>
                <p className="text-gray-400 leading-relaxed">
                  每个区块包含前一个区块的哈希值，形成不可断裂的链条。修改历史记录需要重新计算之后所有区块，在算力分散的网络中几乎不可能。
                </p>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-2xl font-bold mb-4 text-white">全网共识</h3>
                <p className="text-gray-400 leading-relaxed">
                  所有节点保存相同的账本副本。通过工作量证明（PoW）机制达成共识，确保账本的一致性和不可篡改性。
                </p>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* 挖矿原理 */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                挖矿：工作量证明
              </h2>
              <p className="text-xl text-gray-400">通过计算寻找符合条件的哈希值</p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* 哈希计算演示 */}
            <SlideInLeft>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <h3 className="text-xl font-bold mb-6 text-white">SHA-256 哈希计算</h3>
              
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-2">输入数据</div>
                    <div className="font-mono text-sm text-white break-all">
                      Block #819 + Transactions + Nonce: 2847562
                    </div>
                  </div>

                  <div className="text-center text-2xl text-orange-500">↓</div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-2">输出哈希</div>
                    <div className="font-mono text-sm text-orange-400 break-all">
                      0000000000000000000487a2f3e1b9c4d7f2a8e5c3b1a9d7e5f3c1b9a7e5d3f1
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="text-sm text-gray-300">
                    <strong className="text-orange-400">目标：</strong> 找到以多个 0 开头的哈希值<br />
                    <strong className="text-orange-400">难度：</strong> 前导 0 越多越难
                  </div>
                </div>
              </div>
            </SlideInLeft>

            {/* 挖矿流程 */}
            <SlideInRight>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <h3 className="text-xl font-bold mb-6 text-white">挖矿流程</h3>
              
                <div className="space-y-4">
                  {[
                    { step: 1, title: '收集交易', desc: '从内存池选择待确认交易' },
                    { step: 2, title: '组装区块', desc: '打包交易并添加区块头信息' },
                    { step: 3, title: '暴力计算', desc: '不断改变 Nonce 值计算哈希' },
                    { step: 4, title: '验证结果', desc: '检查哈希是否满足难度要求' },
                    { step: 5, title: '广播区块', desc: '向全网发布新区块' }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-black font-bold flex items-center justify-center text-sm">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SlideInRight>
          </div>

          {/* 难度调整 */}
          <ScaleIn>
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">~10 分钟</div>
                  <div className="text-sm text-gray-400">目标出块时间</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">2016 块</div>
                  <div className="text-sm text-gray-400">难度调整周期</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">自动</div>
                  <div className="text-sm text-gray-400">难度动态调整</div>
                </div>
              </div>
              <div className="mt-6 text-center text-sm text-gray-400">
                算力增加 → 难度上升 | 算力减少 → 难度下降
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* 密码学基础 */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                密码学：安全的基石
              </h2>
              <p className="text-xl text-gray-400">公钥加密和数字签名</p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* 地址生成 */}
            <SlideInLeft>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <h3 className="text-xl font-bold mb-6 text-white">地址生成过程</h3>
              
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">1. 私钥（随机数）</div>
                    <div className="bg-black/30 rounded p-3 font-mono text-xs text-red-400 break-all">
                      E9873D79C6D87DC0FB6A577...
                    </div>
                  </div>

                  <div className="text-center text-orange-500">↓ ECDSA</div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">2. 公钥</div>
                    <div className="bg-black/30 rounded p-3 font-mono text-xs text-yellow-400 break-all">
                      04A34B99F22C790C4E36B...
                    </div>
                  </div>

                  <div className="text-center text-orange-500">↓ SHA-256 + RIPEMD-160</div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">3. 比特币地址</div>
                    <div className="bg-black/30 rounded p-3 font-mono text-xs text-green-400 break-all">
                      1A1zP1eP5QGefi2DMPTfTL5...
                    </div>
                  </div>
                </div>
              </div>
            </SlideInLeft>

            {/* 交易签名 */}
            <SlideInRight>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <h3 className="text-xl font-bold mb-6 text-white">交易验证</h3>
              
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="font-semibold text-white">发送方</div>
                    </div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      用<span className="text-red-400 font-semibold">私钥</span>对交易数据签名，证明自己拥有这笔资金的控制权
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div className="font-semibold text-white">验证节点</div>
                    </div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      用<span className="text-yellow-400 font-semibold">公钥</span>验证签名，确认交易确实由私钥持有者发起
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mt-6">
                    <div className="text-sm text-gray-300">
                      ✓ 私钥签名 = 证明所有权<br />
                      ✓ 公钥验证 = 确认真实性<br />
                      ✓ 私钥丢失 = 永久失去控制
                    </div>
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>

          {/* 安全特性 */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 text-center hover:scale-105 hover:border-orange-500/30 transition-all">
                <div className="text-3xl mb-3">🔒</div>
                <div className="font-bold text-white mb-2">2²⁵⁶ 私钥空间</div>
                <div className="text-sm text-gray-400">暴力破解几乎不可能</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 text-center hover:scale-105 hover:border-orange-500/30 transition-all">
                <div className="text-3xl mb-3">✍️</div>
                <div className="font-bold text-white mb-2">数字签名</div>
                <div className="text-sm text-gray-400">防止交易被伪造</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 text-center hover:scale-105 hover:border-orange-500/30 transition-all">
                <div className="text-3xl mb-3">🔐</div>
                <div className="font-bold text-white mb-2">单向函数</div>
                <div className="text-sm text-gray-400">从公钥推导不出私钥</div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 减半机制 */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                减半机制：固定供应
              </h2>
              <p className="text-xl text-gray-400">每 210,000 个区块奖励减半</p>
            </div>
          </FadeInUp>

          <div className="max-w-3xl mx-auto">
            {/* 减半历史 */}
            <div className="space-y-6 mb-12">
              {[
                { era: '2009-2012', blocks: '0 - 210,000', reward: '50 BTC', total: '10,500,000', percent: '50%' },
                { era: '2012-2016', blocks: '210,001 - 420,000', reward: '25 BTC', total: '5,250,000', percent: '25%' },
                { era: '2016-2020', blocks: '420,001 - 630,000', reward: '12.5 BTC', total: '2,625,000', percent: '12.5%' },
                { era: '2020-2024', blocks: '630,001 - 840,000', reward: '6.25 BTC', total: '1,312,500', percent: '6.25%' },
                { era: '2024-2028', blocks: '840,001 - 1,050,000', reward: '3.125 BTC', total: '656,250', percent: '3.125%', current: true }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 border ${
                    item.current ? 'border-orange-500 ring-2 ring-orange-500/50' : 'border-white/10'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">时期</div>
                      <div className="font-semibold text-white">{item.era}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">区块奖励</div>
                      <div className="font-bold text-orange-400">{item.reward}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">产出总量</div>
                      <div className="text-white">{item.total} BTC</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">占总供应</div>
                      <div className="text-gray-400">{item.percent}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 供应曲线 */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6 text-center text-white">总供应量</h3>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-orange-400 mb-2">21,000,000</div>
                <div className="text-gray-400">永久上限</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">已发行</span>
                  <span className="text-white font-semibold">~19.5M (93%)</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" style={{ width: '93%' }} />
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-400 text-center">
                预计 2140 年左右完全挖完
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 稀缺性分析 */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                数学定义的<span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">稀缺性</span>
              </h2>
              <p className="text-xl text-gray-400">固定供应 + 减半机制 = 绝对稀缺</p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StaggerItem>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:border-orange-500/50 hover:scale-105 transition-all">
                <div className="text-3xl mb-3">💎</div>
                <div className="text-2xl font-bold text-orange-400 mb-2">21,000,000</div>
                <div className="text-sm text-gray-400">永久总供应上限</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:border-orange-500/50 hover:scale-105 transition-all">
                <div className="text-3xl mb-3">📉</div>
                <div className="text-2xl font-bold text-orange-400 mb-2">0.9%</div>
                <div className="text-sm text-gray-400">年通胀率（减半后）</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:border-orange-500/50 hover:scale-105 transition-all">
                <div className="text-3xl mb-3">🔒</div>
                <div className="text-2xl font-bold text-orange-400 mb-2">≈ 4M</div>
                <div className="text-sm text-gray-400">永久丢失的比特币</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-lg rounded-xl p-6 border border-orange-500/50 ring-2 ring-orange-500/30 text-center hover:scale-105 transition-all">
                <div className="text-3xl mb-3">👑</div>
                <div className="text-2xl font-bold text-orange-400 mb-2">0.048%</div>
                <div className="text-sm text-gray-300 font-semibold">10 BTC 占总供应</div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* SF值模型 */}
            <SlideInLeft>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <h3 className="text-2xl font-bold mb-6 text-white">存量-流量比（SF）</h3>
              
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-400">比特币（2024后）</div>
                      <div className="text-xs text-gray-500 mt-1">需要108年产出等量</div>
                    </div>
                    <div className="text-3xl font-bold text-orange-400">108</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-400">黄金</div>
                      <div className="text-xs text-gray-500 mt-1">需要62年产出等量</div>
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">62</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-400">白银</div>
                      <div className="text-xs text-gray-500 mt-1">需要22年产出等量</div>
                    </div>
                    <div className="text-3xl font-bold text-gray-400">22</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                  <div className="text-sm text-gray-300">
                    SF值 = 总存量 ÷ 年产量<br />
                    <span className="text-orange-400 font-semibold">比特币是人类历史上SF值最高的资产</span>
                  </div>
                </div>
              </div>
            </SlideInLeft>

            {/* 持有分布 */}
            <SlideInRight>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-orange-500/30 transition-all">
                <h3 className="text-2xl font-bold mb-6 text-white">持有者分布</h3>
              
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-400">持有 ≥ 10 BTC</span>
                      <span className="text-orange-400 font-semibold">~155,000 地址</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500" style={{ width: '0.3%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-400">持有 ≥ 1 BTC</span>
                      <span className="text-gray-300">~1,000,000 地址</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-500 to-gray-600" style={{ width: '2%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-400">持有 ≥ 0.1 BTC</span>
                      <span className="text-gray-300">~3,500,000 地址</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-600 to-gray-700" style={{ width: '7%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-400">总地址数</span>
                      <span className="text-gray-300">~50,000,000 地址</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-700" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">全球人口占比</div>
                    <div className="text-3xl font-bold text-orange-400 mb-1">0.02%</div>
                    <div className="text-xs text-gray-500">拥有10枚以上比特币的地址</div>
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>

          {/* 稀缺性结论 */}
          <ScaleIn>
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-6 text-center text-white">十币称侯的逻辑</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔢</div>
                  <h4 className="font-semibold mb-2 text-white">数学保证</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    代码写死的2100万上限，任何人无法改变
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-3">⏰</div>
                  <h4 className="font-semibold mb-2 text-white">时间稀释</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    每四年减半，通胀率持续降低至接近零
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h4 className="font-semibold mb-2 text-white">全球竞争</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    80亿人口，却只有155,000个地址持有≥10 BTC
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-gray-300 italic text-lg">
                  "稀缺性不是由市场供需决定，而是由数学和代码保证"
                </p>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* 技术总结 */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeInUp>
            <div className="bg-gradient-to-r from-orange-600/20 via-yellow-500/20 to-orange-600/20 backdrop-blur-lg rounded-3xl p-12 border border-orange-500/30 hover:border-orange-500/50 transition-all">
              <h3 className="text-3xl font-bold text-center mb-8 text-white">
                技术创新的结合
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  比特币并非单一技术突破，而是多个成熟技术的巧妙组合：
                </p>
                
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span><strong className="text-white">密码学</strong>：确保交易安全和所有权证明</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span><strong className="text-white">分布式网络</strong>：消除单点故障和中心化控制</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span><strong className="text-white">工作量证明</strong>：通过算力竞争达成共识</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span><strong className="text-white">经济激励</strong>：矿工奖励驱动网络安全</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">•</span>
                    <span><strong className="text-white">固定供应</strong>：数学保证的稀缺性</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <div className="text-7xl mb-4">₿</div>
                <p className="text-gray-400 italic">
                  "一个纯粹的点对点电子现金系统"<br />
                  <span className="text-sm">— 中本聪，2008</span>
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-6xl text-center">
          <FadeIn>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              10btc.top
            </div>
            <p className="text-gray-500 text-sm mb-2">
              理解比特币的技术原理
            </p>
            <p className="text-gray-700 text-xs">
              技术科普 · 去中心化 · 开放透明
            </p>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Calendar, Code2, UsersRound, Landmark } from 'lucide-react';
import { statsData } from '@/data/stats';

const statColorStyles = [
  {
    iconBg: 'bg-blue-600/30 text-blue-400 border-blue-500/30',
    numberColor: 'text-[#4285F4]',
    borderHover: 'hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(66,133,244,0.2)]',
    icon: <Users className="h-5 w-5" />,
  },
  {
    iconBg: 'bg-red-600/30 text-red-400 border-red-500/30',
    numberColor: 'text-[#EA4335]',
    borderHover: 'hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(234,67,53,0.2)]',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    iconBg: 'bg-yellow-600/30 text-yellow-400 border-yellow-500/30',
    numberColor: 'text-[#FBBC05]',
    borderHover: 'hover:border-yellow-500/50 hover:shadow-[0_0_25px_rgba(251,188,5,0.2)]',
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    iconBg: 'bg-green-600/30 text-green-400 border-green-500/30',
    numberColor: 'text-[#34A853]',
    borderHover: 'hover:border-green-500/50 hover:shadow-[0_0_25px_rgba(52,168,83,0.2)]',
    icon: <UsersRound className="h-5 w-5" />,
  },
  {
    iconBg: 'bg-blue-600/30 text-blue-400 border-blue-500/30',
    numberColor: 'text-[#4285F4]',
    borderHover: 'hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(66,133,244,0.2)]',
    icon: <Landmark className="h-5 w-5" />,
  },
];

interface CounterProps {
  target: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-10 bg-[#0B0F17] z-20 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {statsData.map((stat, idx) => {
            const style = statColorStyles[idx % statColorStyles.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 ${style.borderHover}`}
              >
                {/* Icon Circle */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${style.iconBg} shadow-inner`}>
                  {style.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${style.numberColor}`}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <span className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 font-normal">
                    {stat.description}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

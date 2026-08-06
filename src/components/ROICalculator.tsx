import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign, Target, TrendingUp, Users, MessageCircle, Calculator } from 'lucide-react';
import { AGENCY } from '@/data/content';
import { SectionHeading } from './SectionHeading';

function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

function formatINRShort(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n}K`;
}

export function ROICalculator() {
  const [budget, setBudget] = useState(5000);
  const [targetSales, setTargetSales] = useState(50000);

  const calc = useMemo(() => {
    // Realistic Indian market model with diminishing returns
    // ₹1,000 → ~300 visitors, ₹5,000 → ~750 visitors
    const traffic = Math.round(280 * Math.pow(budget / 1000, 0.6));
    const conversionRate = 0.03;
    const leads = Math.round(traffic * conversionRate);

    // Estimated realistic ROAS: 2.5x–3.5x for low budgets, scaling sublinearly
    const roas = 2.5 + 2 * Math.pow(budget / 100000, 0.5);

    // 6-month projection with compounding growth from target sales
    const chartData = Array.from({ length: 6 }, (_, i) => {
      const growth = 1 + i * 0.15;
      return {
        month: `M${i + 1}`,
        revenue: Math.round((targetSales * growth) / 1000),
        budget: Math.round((budget * growth) / 1000),
      };
    });

    const projectedRevenue = chartData.reduce((sum, d) => sum + d.revenue * 1000, 0);

    return { traffic, leads, roas, projectedRevenue, chartData };
  }, [budget, targetSales]);

  return (
    <section id="roi" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="ROI Estimator"
          title={<>Interactive <span className="gradient-text">ROI Growth</span> Calculator</>}
          subtitle="Built for Indian startups & small businesses. Drag the sliders to see realistic projections for your budget."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-3xl p-8"
          >
            <div className="space-y-8">
              {/* Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <DollarSign className="w-4 h-4 text-violet-400" />
                    Monthly Marketing Budget
                  </label>
                  <span className="text-xl font-bold gradient-text">{formatINR(budget)}</span>
                </div>
                <input type="range" min={500} max={100000} step={500} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs text-slate-500 mt-2"><span>₹500</span><span>₹1L</span></div>
              </div>

              {/* Target Sales Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <Target className="w-4 h-4 text-violet-400" />
                    Target Monthly Sales
                  </label>
                  <span className="text-xl font-bold gradient-text">{formatINR(targetSales)}</span>
                </div>
                <input type="range" min={5000} max={500000} step={5000} value={targetSales} onChange={(e) => setTargetSales(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs text-slate-500 mt-2"><span>₹5K</span><span>₹5L</span></div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><Users className="w-3.5 h-3.5 text-violet-400" /> Projected Visitors</div>
                  <div className="text-2xl font-bold text-violet-400">{calc.traffic.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">visitors / month</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><TrendingUp className="w-3.5 h-3.5 text-violet-400" /> High-Intent Leads</div>
                  <div className="text-2xl font-bold text-violet-400">{calc.leads.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">leads / month</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><Calculator className="w-3.5 h-3.5 text-violet-400" /> Estimated ROAS</div>
                  <div className="text-2xl font-bold text-violet-400">{calc.roas.toFixed(1)}x</div>
                  <div className="text-xs text-slate-500">return on ad spend</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><DollarSign className="w-3.5 h-3.5 text-cyan-400" /> 6-Mo Revenue</div>
                  <div className="text-2xl font-bold text-cyan-400">{formatINR(calc.projectedRevenue)}</div>
                  <div className="text-xs text-slate-500">projected total</div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={AGENCY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow w-full"
              >
                <MessageCircle className="w-5 h-5" />
                Get Strategy for My Budget on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-3xl p-8 flex flex-col"
          >
            <h3 className="font-display font-bold text-lg mb-1">6-Month Projected Revenue Growth</h3>
            <p className="text-sm text-slate-400 mb-6">Compounding growth model based on your inputs</p>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calc.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="budGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00F0FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatINRShort(v)} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(11,15,25,0.95)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '12px', fontSize: '13px' }}
                    labelStyle={{ color: '#8B5CF6' }}
                    formatter={(value) => [`₹${value}K`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#revGradient)" />
                  <Area type="monotone" dataKey="budget" stroke="#00F0FF" strokeWidth={2} fill="url(#budGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-violet-electric" /> Revenue</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400" /> Budget</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

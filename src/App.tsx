import { motion } from "motion/react";
import { 
  Cloud, 
  RefreshCw, 
  BarChart3, 
  Smartphone, 
  ShieldCheck, 
  Zap,
  ShoppingBag,
  Store,
  PieChart,
  Car,
  Wifi,
  Database
} from "lucide-react";
import type { ReactNode } from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Cloud className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Park<span className="text-brand-600">Ease</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-500 transition-colors">Features</a>
            <a href="#projects" className="text-sm font-medium text-slate-600 hover:text-brand-500 transition-colors">Solutions</a>
            <a href="#market" className="text-sm font-medium text-slate-600 hover:text-brand-500 transition-colors">Market Analysis</a>
            <a href="#tech" className="text-sm font-medium text-slate-600 hover:text-brand-500 transition-colors">Tech Stack</a>
          </div>
          <button className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm shadow-brand-500/20 active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  Next-Gen Smart City SaaS
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tight mb-8">
                  Simplify <br/><span className="text-brand-600">Commerce,</span><br/>Master Space.
                </h1>
                <p className="text-xl text-slate-500 mb-10 max-w-md leading-relaxed font-medium">
                  ParkEase is the ultimate cloud platform for smart logistics, synchronization, and financial reporting. Designed specifically for modern businesses to thrive.
                </p>
                <div className="flex flex-wrap gap-6 items-center mb-12">
                  <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-brand-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95">
                    Get Started Free
                  </button>
                  <div className="flex gap-8">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900">2.4k+</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Merchants</span>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900">98%</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Efficiency</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col p-1">
                  <div className="h-12 bg-white border-b border-slate-200 flex items-center px-6 gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-6 h-6 w-64 bg-slate-50 rounded-full border border-slate-100 flex items-center px-3">
                      <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    </div>
                  </div>
                  <div className="flex-1 p-8 grid grid-cols-2 gap-6 bg-slate-50/50">
                    <div className="space-y-6">
                      <div className="bg-brand-600 rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl shadow-brand-600/20">
                        <div className="text-[10px] uppercase opacity-70 font-black tracking-widest">Live Parking Slots</div>
                        <div className="text-5xl font-black italic tracking-tighter mt-4">142 / 200</div>
                      </div>
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Inventory Sync</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] rounded-full font-bold">ACTIVE</span>
                        </div>
                        <div className="space-y-3">
                          <div className="h-2 bg-slate-100 w-full rounded-full"></div>
                          <div className="h-2 bg-slate-100 w-3/4 rounded-full"></div>
                          <div className="h-2 bg-slate-100 w-1/2 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20">
                        <div className="text-[10px] uppercase opacity-50 font-black tracking-widest mb-6 block">Revenue Insights</div>
                        <div className="flex items-end gap-1.5 h-20 mb-6">
                          {[40, 60, 90, 70, 50, 80].map((h, i) => (
                            <div key={i} className="flex-1 bg-brand-500 rounded-t-lg transition-all hover:bg-brand-400" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                        <div className="text-2xl font-black">Rp 12,45M</div>
                      </div>
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <Zap className="text-amber-500 w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing</div>
                          <div className="text-sm font-bold text-slate-900">8.4 req/s</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative Accents */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Features - ParkEase */}
        <section id="features" className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20">
              <div className="max-w-2xl">
                <div className="text-brand-600 font-black text-xs uppercase tracking-[0.2em] mb-4">Core Ecosystem</div>
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none">Unified Operations.</h2>
              </div>
              <p className="text-slate-500 max-w-md mt-6 md:mt-0 font-medium">Direct integration with major Indonesian marketplaces including Tokopedia and TikTok Shop.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard 
                icon={<RefreshCw className="w-6 h-6 text-brand-500" />}
                title="Real-time Sync"
                description="Synchronize inventory across Shopee, Tokopedia, TikTok Shop, and Offline stores instantly."
              />
              <FeatureCard 
                icon={<ShoppingBag className="w-6 h-6 text-brand-500" />}
                title="Order Management"
                description="Process orders from different platforms in a single workflow without switching apps."
              />
              <FeatureCard 
                icon={<PieChart className="w-6 h-6 text-brand-500" />}
                title="Profit & Loss Report"
                description="Automatic calculation of revenue and expenses for simple and accurate financial health checks."
              />
            </div>
          </div>
        </section>

        {/* Feature Focus Section - ParkEase */}
        <section id="projects" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="flex-1">
                <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-slate-900/10">
                  <Car className="text-white w-8 h-8" />
                </div>
                <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
                  Beyond Retail: <br/><span className="text-brand-600 underline underline-offset-8 decoration-brand-100">ParkEase</span> Smart City.
                </h2>
                <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                  Manage real-time logistics and urban infrastructure. Detect available slots automatically with cloud-connected IoT sensors.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Real-time Information</h4>
                      <p className="text-sm text-slate-500">Drivers can check slot availability via smartphone before arrival.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Slot Reservation</h4>
                      <p className="text-sm text-slate-500">Guaranteed parking spots for premium users at busy malls and hospitals.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                     <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
                        <Smartphone className="w-8 h-8 mb-4 text-blue-400" />
                        <div className="text-2xl font-black">Mobile App</div>
                        <div className="mt-2 text-xs text-slate-400">Driver Interface</div>
                     </div>
                     <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
                        <Wifi className="w-8 h-8 mb-4 text-blue-200" />
                        <div className="text-2xl font-black">IoT Enabled</div>
                        <div className="mt-2 text-xs text-blue-100">Live Sensor Sync</div>
                     </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-100 rounded-3xl p-6 text-slate-900">
                        <Database className="w-8 h-8 mb-4 text-slate-500" />
                        <div className="text-2xl font-black">Cloud DB</div>
                        <div className="mt-2 text-xs text-slate-500">PostgreSQL Scalability</div>
                     </div>
                     <div className="bg-slate-50 rounded-3xl p-6 text-slate-900 border border-slate-200">
                        <PieChart className="w-8 h-8 mb-4 text-brand-500" />
                        <div className="text-2xl font-black">Analytics</div>
                        <div className="mt-2 text-xs text-slate-500">Usage Reports</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Analysis & Strategy */}
        <section id="market" className="py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/10 blur-[120px] rounded-full translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24">
              <div>
                <div className="text-brand-400 font-black text-xs uppercase tracking-[0.2em] mb-6">Market Intelligence</div>
                <h2 className="text-5xl font-black mb-10 leading-none">The Strategy.</h2>
                <div className="space-y-12">
                  <div className="pl-8 border-l-4 border-brand-500">
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">The Bottleneck</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Manual parking management causes urban friction. Drivers lose hours, and capacity remains underutilized. MSMEs face similar friction with disjointed marketplace data.
                    </p>
                  </div>
                  <div className="pl-8 border-l-4 border-slate-700">
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">Target Verticals</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Shopping malls, medical campuses, transit hubs, and commercial skyscrapers requiring high-precision logistical oversight.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-[2.5rem] p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -m-6 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl group-hover:bg-brand-500/40 transition-all duration-500" />
                <h3 className="text-2xl font-bold mb-6">Market Potential</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-slate-700 pb-4">
                    <span className="text-slate-400">Urban Vehicle Growth</span>
                    <span className="text-xl font-mono text-brand-400">+12% Year-on-Year</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-slate-700 pb-4">
                    <span className="text-slate-400">SaaS Adoption Rate</span>
                    <span className="text-xl font-mono text-brand-400">High Growth</span>
                  </div>
                  <p className="text-sm text-slate-500 italic mt-6">
                    "Increasing urban density drives the critical need for efficient parking capacity management through scalable SaaS solutions."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Analysis Section */}
        <section id="analysis" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Structural Market Analysis</h2>
                <p className="text-slate-600">Addressing the critical bottlenecks in both digital commerce and urban infrastructure.</p>
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-1 bg-brand-500 rounded-full" />
                <div className="w-4 h-1 bg-slate-200 rounded-full" />
                <div className="w-4 h-1 bg-slate-200 rounded-full" />
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Problem Analysis - ParkEase Context */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200">
                <div className="text-red-500 font-black text-xs uppercase tracking-widest mb-4">The Challenge</div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Identifying Inefficiencies</h3>
                <ul className="space-y-6">
                  <ProblemItem 
                    title="Time Waste & Congestion" 
                    desc="Drivers spend excessive time circling for spots, leading to internal traffic jams." 
                  />
                  <ProblemItem 
                    title="Manual Management" 
                    desc="Conventional systems lack real-time data, making them opaque to both managers and users." 
                  />
                  <ProblemItem 
                    title="MSME Data Silos" 
                    desc="Retailers struggle with disjointed stock data across multiple marketplace platforms." 
                  />
                </ul>
              </div>

              {/* Solution Framework */}
              <div className="bg-brand-500 p-10 rounded-[2.5rem] text-white">
                <div className="text-brand-200 font-black text-xs uppercase tracking-widest mb-4">The Solution</div>
                <h3 className="text-2xl font-bold mb-6">Multidimensional SaaS Approach</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="text-3xl font-black mb-2">99%</div>
                    <div className="text-xs font-bold text-brand-100 italic uppercase">Sync Accuracy</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="text-3xl font-black mb-2">R-Time</div>
                    <div className="text-xs font-bold text-brand-100 italic uppercase">Monitoring</div>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                   <p className="text-brand-50 leading-relaxed italic">
                     "By leveraging Cloud Computing, Mobile Apps, and IoT Sensors, we create a transparent and efficient management ecosystem."
                   </p>
                   <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Smartphone className="text-brand-500 w-5 h-5" />
                      </div>
                      <div className="text-sm">
                        <div className="font-bold">Omnichannel Native</div>
                        <div className="text-brand-200 text-xs text-nowrap">Unified backend API architecture</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black tracking-tighter">Engineered for Scale.</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <TechItem label="Frontend" tech="React.js / Flutter" />
              <TechItem label="Backend" tech="Node.js / Express" />
              <TechItem label="Database" tech="PostgreSQL" />
              <TechItem label="Hardware" tech="IoT Sensors" />
              <TechItem label="Infra" tech="AWS / Vercel" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brand-600 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-brand-600/40">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent)]" />
               <h2 className="text-4xl md:text-7xl font-black text-white mb-12 relative z-10 max-w-4xl mx-auto leading-none tracking-tighter">
                 Scale Your Smart Operations Today.
               </h2>
               <div className="flex flex-wrap justify-center gap-6 relative z-10">
                 <button className="px-12 py-6 bg-white text-brand-600 rounded-full text-xl font-black hover:scale-105 transition-transform shadow-2xl">
                   Join ParkEase
                 </button>
                 <button className="px-12 py-6 bg-slate-900 text-white rounded-full text-xl font-black hover:bg-slate-800 transition-colors">
                   ParkEase Demo
                 </button>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
              <Cloud className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 uppercase">Park<span className="text-brand-600">Ease</span></span>
          </div>
          <p className="text-slate-500 text-sm mb-8">© 2026 ParkEase SaaS Ecosystem. All rights reserved.</p>
          <div className="flex justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-500">Privacy Policy</a>
            <a href="#" className="hover:text-brand-500">Terms of Service</a>
            <a href="#" className="hover:text-brand-500">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="p-10 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
    >
      <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-500">
        <div className="group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}

function TechItem({ label, tech }: { label: string, tech: string }) {
  return (
    <div className="p-10 rounded-[2rem] border border-slate-100 hover:border-brand-500 transition-all group bg-slate-50/50">
      <div className="text-[10px] uppercase font-black text-slate-400 mb-2 group-hover:text-brand-600 transition-colors tracking-widest">{label}</div>
      <div className="text-lg font-black text-slate-800 tracking-tight">{tech}</div>
    </div>
  );
}

function ProblemItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="flex gap-4">
      <div className="mt-1 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
      <div>
        <div className="font-bold text-slate-900">{title}</div>
        <div className="text-sm text-slate-500">{desc}</div>
      </div>
    </li>
  );
}

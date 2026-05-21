import { useEffect, useState, ReactNode, FormEvent } from "react";
import { 
  Cloud, 
  ShoppingBag, 
  Zap, 
  ChevronRight, 
  PieChart, 
  BarChart3, 
  Car, 
  Smartphone, 
  Wifi, 
  Database,
  User,
  LogOut,
  LogIn,
  Store,
  ShieldCheck,
  RefreshCw,
  Plus,
  Package,
  Activity,
  Trash2,
  X,
  PlusCircle,
  HelpCircle,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Struktur tipe data internal
interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  price: number;
  createdAt: string;
}

interface ParkingSlot {
  id: string;
  name: string;
  area: string;
  status: "Tersedia" | "Terisi";
  type: "Mobil" | "Motor";
}

// Data default Indonesia
const DEFAULT_PRODUCTS: Product[] = [
  { id: "1", name: "Sensor Ground Loop IoT v2", sku: "PE-GL-IOT2", stock: 34, price: 450000, createdAt: "2026-05-18" },
  { id: "2", name: "Kamera LPR Smart-Vision Pro", sku: "PE-CAM-LPR1", stock: 12, price: 1850000, createdAt: "2026-05-18" },
  { id: "3", name: "E-Barrier Gate Otomatis", sku: "PE-BAR-GATE", stock: 8, price: 5400000, createdAt: "2026-05-19" },
  { id: "4", name: "Terminal Pembayaran Mandiri", sku: "PE-TERM-PAY", stock: 15, price: 3200000, createdAt: "2026-05-20" },
];

const DEFAULT_SLOTS: ParkingSlot[] = [
  { id: "A-1", name: "Slot A-1", area: "Utara", status: "Tersedia", type: "Mobil" },
  { id: "A-2", name: "Slot A-2", area: "Utara", status: "Terisi", type: "Mobil" },
  { id: "A-3", name: "Slot A-3", area: "Utara", status: "Tersedia", type: "Mobil" },
  { id: "B-1", name: "Slot B-1", area: "Selatan", status: "Terisi", type: "Mobil" },
  { id: "B-2", name: "Slot B-2", area: "Selatan", status: "Terisi", type: "Motor" },
  { id: "B-3", name: "Slot B-3", area: "Selatan", status: "Tersedia", type: "Motor" },
  { id: "C-1", name: "Slot C-1", area: "Barat", status: "Tersedia", type: "Mobil" },
  { id: "C-2", name: "Slot C-2", area: "Barat", status: "Terisi", type: "Mobil" },
];

export default function App() {
  const [user, setUser] = useState<{ displayName: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [products, setProducts] = useState<Product[]>([]);
  const [parkingLots, setParkingLots] = useState<ParkingSlot[]>([]);
  
  // State untuk form tambah produk (Modal internal yang sangat elegan)
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdSku, setNewProdSku] = useState("");
  const [newProdStock, setNewProdStock] = useState<number>(10);
  const [newProdPrice, setNewProdPrice] = useState<number>(150000);

  // Load data dari localStorage (Offline First)
  useEffect(() => {
    // Simulasi loading screen singkat agar terlihat sangat profesional
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem("pe_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setView("dashboard");
      }

      const storedProducts = localStorage.getItem("pe_products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(DEFAULT_PRODUCTS);
        localStorage.setItem("pe_products", JSON.stringify(DEFAULT_PRODUCTS));
      }

      const storedSlots = localStorage.getItem("pe_slots");
      if (storedSlots) {
        setParkingLots(JSON.parse(storedSlots));
      } else {
        setParkingLots(DEFAULT_SLOTS);
        localStorage.setItem("pe_slots", JSON.stringify(DEFAULT_SLOTS));
      }

      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Update data ke localStorage setiap kali ada perubahan
  const updateLocalProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem("pe_products", JSON.stringify(newProds));
  };

  const updateLocalSlots = (newSlots: ParkingSlot[]) => {
    setParkingLots(newSlots);
    localStorage.setItem("pe_slots", JSON.stringify(newSlots));
  };

  // Simulasi login demo instan (Tanpa Firebase database/auth yang rumit)
  const handleDemoLogin = () => {
    const demoUser = { displayName: "Steven Bernando", email: "stevenbernando09@gmail.com" };
    setUser(demoUser);
    localStorage.setItem("pe_user", JSON.stringify(demoUser));
    setView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("pe_user");
    setView("landing");
  };

  // Logika Tambah Produk
  const handleCreateProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProd: Product = {
      id: crypto.randomUUID(),
      name: newProdName,
      sku: newProdSku.trim() || "PE-" + Math.random().toString(36).substring(3, 8).toUpperCase(),
      stock: Number(newProdStock) || 0,
      price: Number(newProdPrice) || 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newProd, ...products];
    updateLocalProducts(updated);

    // Reset Form & Tutup Modal
    setNewProdName("");
    setNewProdSku("");
    setNewProdStock(10);
    setNewProdPrice(150000);
    setShowAddModal(false);
  };

  // Logika Hapus Produk
  const handleDeleteProduct = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini secara permanen dari penyimpanan lokal?")) {
      const updated = products.filter(p => p.id !== id);
      updateLocalProducts(updated);
    }
  };

  // Logika Interaktif Klik Slot Map (Toggle Status Parkir secara Live)
  const handleToggleSlotStatus = (slotId: string) => {
    const updated = parkingLots.map(slot => {
      if (slot.id === slotId) {
        return {
          ...slot,
          status: slot.status === "Tersedia" ? "Terisi" as const : "Tersedia" as const
        };
      }
      return slot;
    });
    updateLocalSlots(updated);
  };

  // Hitung jumlah slot yang terisi vs tersedia secara dinamis
  const totalSlotsCount = parkingLots.length;
  const filledSlotsCount = parkingLots.filter(s => s.status === "Terisi").length;
  const availableSlotsCount = parkingLots.filter(s => s.status === "Tersedia").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">Memuat Sistem ParkEase...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-slate-900 selection:text-white antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setView("landing")}>
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/10">
              <Cloud className="text-white w-5 h-5 pointer-events-none" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900 uppercase">Park<span className="text-slate-500">Ease</span></span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                if (user) {
                  setView(view === "landing" ? "dashboard" : "landing");
                } else {
                  handleDemoLogin();
                }
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 tracking-wide transition-colors uppercase"
            >
              {user ? (view === "landing" ? "Kembali ke Dasbor" : "Halaman Utama") : "Uji Coba Demo"}
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[11px] font-bold text-slate-900 tracking-tight">{user.displayName}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest leading-none mt-0.5">Akun Demo</span>
                </div>
                <button 
                  onClick={handleLogout}
                  title="Keluar"
                  className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all border border-slate-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleDemoLogin}
                className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-2.5 rounded-full text-xs font-bold transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                MASUK DEMO
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container with Page Swaps */}
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingView onGetStarted={user ? () => setView("dashboard") : handleDemoLogin} />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <div>
                <div className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.3em] mb-4">DASBOR INTERNAL OFFLINE</div>
                <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Selamat Datang, {user?.displayName?.split(' ')[0]}.</h1>
                <p className="text-sm text-slate-500 mt-2 font-medium">Semua data disimpan secara aman & instan di Lokal Storage peramban Anda.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  <Plus className="w-4 h-4" /> TAMBAH PRODUK
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <Package className="w-8 h-8 mb-6 text-slate-500" />
                <div className="text-5xl font-bold mb-1 tracking-tight">{products.length}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Kuantitas SKU Produk</div>
              </div>
              
              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-elegant relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <Car className="w-8 h-8 mb-6 text-slate-400" />
                <div className="text-5xl font-bold mb-1 text-slate-900 tracking-tight">{availableSlotsCount} <span className="text-sm text-slate-400 font-medium">dari {totalSlotsCount}</span></div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slot ParkEase Tersedia (Utara & Selatan)</div>
              </div>

              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-elegant sm:col-span-2 lg:col-span-1">
                <Activity className="w-8 h-8 mb-6 text-slate-900" />
                <div className="text-5xl font-bold mb-1 tracking-tight">99.8%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Akurasi Validasi Sensor Lokal</div>
              </div>
            </div>

            {/* Main Interactive Sections */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Product Sync & Inventory Manager */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-elegant overflow-hidden">
                  <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Manajemen Inventaris Lokal</h3>
                      <p className="text-xs text-slate-400 mt-1">Kelola barang demo & perangkat IoT komersial Anda secara langsung.</p>
                    </div>
                    <RefreshCw className="w-4 h-4 text-slate-400 animate-spin-slow" />
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/30">
                          <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Produk</th>
                          <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">SKU</th>
                          <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Stok</th>
                          <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Harga Satuan</th>
                          <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Opsi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-10 py-24 text-center text-slate-400 italic">
                              <div className="max-w-xs mx-auto">
                                <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="font-bold text-slate-800 text-sm mb-1">Belum ada perangkat inventaris</p>
                                <p className="text-xs text-slate-400 mb-4">Tambahkan produk baru secara instan di peramban lokal Anda.</p>
                                <button 
                                  onClick={() => setShowAddModal(true)}
                                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                                >
                                  Mulai Tambah Pertama
                                </button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          products.map((p) => (
                            <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <td className="px-10 py-6 font-bold text-slate-900">{p.name}</td>
                              <td className="px-6 py-6 font-mono text-xs text-slate-500">{p.sku}</td>
                              <td className="px-6 py-6 font-bold text-slate-900">
                                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-800'}`}>
                                  {p.stock} Unit
                                </span>
                              </td>
                              <td className="px-6 py-6 font-bold text-slate-900">
                                Rp {p.price?.toLocaleString()}
                              </td>
                              <td className="px-10 py-6 text-right">
                                <button 
                                  onClick={() => handleDeleteProduct(p.id)}
                                  title="Hapus Produk"
                                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Interactive Live Parking Grid (Map Dashboard) */}
              <div className="space-y-8">
                {/* Visual Map Simulator */}
                <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-elegant">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Peta Grid ParkEase</h3>
                      <p className="text-xs text-slate-400 mt-1">Simulator Interaktif IoT Kota Pintar</p>
                    </div>
                    <Car className="w-5 h-5 text-slate-400" />
                  </div>

                  <p className="text-xs font-medium text-slate-500 leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    💡 **Petunjuk**: Klik kotak slot parkir di bawah ini untuk mensimulasikan sensor terisi / kosong. Perhatikan status data di atas akan berubah secara langsung!
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {parkingLots.map((slot) => {
                      const isOccupied = slot.status === "Terisi";
                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleToggleSlotStatus(slot.id)}
                          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group select-none active:scale-95 ${
                            isOccupied 
                              ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/15" 
                              : "bg-white border-slate-200 text-slate-800 hover:border-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-sans font-black tracking-widest">{slot.name}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                              isOccupied ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-500"
                            }`}>
                              {slot.type}
                            </span>
                          </div>
                          
                          <div className="mt-8 flex justify-between items-end">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status:</div>
                              <div className="text-sm font-bold tracking-tight">{slot.status}</div>
                            </div>
                            <MapPin className={`w-4 h-4 ${isOccupied ? "text-slate-400" : "text-slate-300 group-hover:text-slate-900"}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* System Status Node Connections */}
                <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
                  <h3 className="text-[10px] font-black mb-6 text-slate-400 tracking-widest uppercase">Diagnostik Konsol</h3>
                  <div className="space-y-4">
                    <SystemNode label="Perlengkapan Lokal" status="Aktif" />
                    <SystemNode label="Lokal Storage" status="Tersimpan" />
                    <SystemNode label="Metode Enkripsi" status="Offline-SHA" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Product Modal Component */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            {/* Content Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl relative z-10 w-full max-w-lg overflow-hidden p-10"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Tambah Produk Baru</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Perangkat / Produk</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sensor Ultrasonik IoT v3"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-slate-900 text-sm font-medium text-slate-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SKU Kode (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: PE-SENS-03"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-slate-900 text-sm font-mono text-slate-900 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Jumlah Stok</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-slate-900 text-sm font-bold text-slate-900 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Harga Satuan (Rp)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={5000}
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-slate-900 text-sm font-bold text-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-xs font-bold transition-all text-center"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-lg text-center"
                  >
                    Simpan Perangkat
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Cloud className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 uppercase">Park<span className="text-slate-400">Ease</span></span>
          </div>
          <p className="text-slate-500 text-xs font-medium mb-8">© 2026 Ekosistem SaaS ParkEase. Hak cipta dilindungi undang-undang.</p>
          <div className="flex justify-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Ketentuan Layanan</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Dokumentasi API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LandingView({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-900/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-slate-900/5 blur-[100px] rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 text-slate-900 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-10 border border-slate-100">
                  <Zap className="w-3.5 h-3.5" />
                  SaaS Kota Pintar Generasi Baru
                </div>
                <h1 className="text-7xl md:text-[92px] font-bold text-slate-900 leading-[1.02] tracking-[-0.04em] mb-10">
                  Sederhanakan <br/><span className="text-slate-400">Dagang,</span><br/>Kuasai Ruang.
                </h1>
                <p className="text-xl text-slate-500 mb-12 max-w-md leading-relaxed font-medium">
                  ParkEase adalah platform cloud terkurasi untuk logistik pintar, sinkronisasi, dan laporan keuangan. Dirancang khusus untuk bisnis modern.
                </p>
                <div className="flex flex-wrap gap-8 items-center">
                  <button 
                    onClick={onGetStarted}
                    className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-premium active:scale-95"
                  >
                    Mulai Gratis Sekarang
                  </button>
                  <div className="flex gap-10">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-slate-900 tracking-tight">2.4k+</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-1">Mitra Bisnis</span>
                    </div>
                    <div className="w-px h-12 bg-slate-100" />
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-slate-900 tracking-tight">98%</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-1">Efisiensi</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative hidden lg:block perspective-2000"
              >
                <div className="relative w-full aspect-[4/3] bg-white/70 backdrop-blur-xl border border-white/20 shadow-elegant rounded-[3.5rem] overflow-hidden flex flex-col p-1 transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-1000">
                  <div className="h-14 bg-white/50 border-b border-slate-100/50 flex items-center px-8 gap-2.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <div className="flex-1 p-10 grid grid-cols-2 gap-8 bg-slate-50/30">
                    <div className="space-y-8">
                      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-premium">
                        <div className="text-[11px] font-black tracking-widest uppercase opacity-70">Tersedia</div>
                        <div className="text-6xl font-bold tracking-tighter mt-6">142<span className="text-2xl opacity-50 ml-2">/ 200</span></div>
                      </div>
                      <div className="bg-white rounded-[2.5rem] shadow-elegant border border-slate-100 p-8">
                        <div className="flex justify-between items-center mb-8">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Live Sync</span>
                          <span className="px-3.5 py-1.5 bg-slate-100 text-slate-800 text-[10px] rounded-full font-bold border border-slate-200">ONLINE</span>
                        </div>
                        <div className="space-y-4">
                          <div className="h-2 bg-slate-100 w-full rounded-full"></div>
                          <div className="h-2 bg-slate-100 w-4/5 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div className="bg-slate-800 rounded-[2.5rem] p-8 text-white shadow-2xl">
                        <div className="text-[11px] font-black tracking-widest opacity-40 uppercase mb-8">Pertumbuhan</div>
                        <div className="flex items-end gap-2 h-24 mb-8">
                          {[30, 50, 40, 80, 60, 95].map((h, i) => (
                            <div key={i} className="flex-1 bg-slate-500/80 rounded-t-lg transition-all hover:bg-slate-400" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                        <div className="text-3xl font-bold">Rp 12.4M</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="py-40 bg-slate-50/50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-24">
              <div className="max-w-2xl">
                <div className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.3em] mb-6">EKOSISTEM CERDAS</div>
                <h2 className="text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">Operasi yang <br/>Benar-benar Terintegrasi.</h2>
              </div>
              <p className="text-slate-500 text-lg max-w-sm mt-8 md:mt-0 font-medium leading-relaxed">Terhubung langsung dengan ekosistem digital utama Indonesia tanpa hambatan.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<RefreshCw className="w-6 h-6" />}
                title="Sinkronisasi Absolut"
                description="Padukan inventaris di seluruh marketplace dan toko retail Anda secara real-time dengan akurasi 99%."
              />
              <FeatureCard 
                icon={<ShoppingBag className="w-6 h-6" />}
                title="Sentralisasi Pesanan"
                description="Kelola seluruh alur kerja penjualan dari satu dasbor elegan tanpa kehilangan detail terkecil sekalipun."
              />
              <FeatureCard 
                icon={<PieChart className="w-6 h-6" />}
                title="Analitik Keuangan"
                description="Dapatkan laporan laba rugi instan yang dirangkum dengan standar akuntansi profesional bagi UMKM."
              />
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col lg:flex-row items-center gap-24">
               <div className="flex-1">
                 <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-slate-900/10">
                   <Car className="text-white w-7 h-7" />
                 </div>
                 <h2 className="text-6xl font-bold text-slate-900 mb-10 leading-[1.05] tracking-tight">
                   Lebih dari Retail: <br/><span className="text-slate-400 underline underline-offset-[12px] decoration-slate-100 decoration-4">ParkEase</span> Kota Pintar.
                 </h2>
                 <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
                   Kelola logistik dan infrastruktur kota secara real-time. Deteksi slot kosong secara otomatis dengan sensor IoT yang terhubung ke cloud.
                 </p>
                 <div className="space-y-6">
                   <div className="flex gap-5 items-start">
                     <div className="mt-1 w-6 h-6 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200">
                       <div className="w-2 h-2 rounded-full bg-slate-900" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900 text-lg">Informasi Real-time</h4>
                       <p className="text-slate-500 font-medium leading-relaxed">Pengemudi dapat mengecek ketersediaan slot via smartphone sebelum tiba.</p>
                     </div>
                   </div>
                   <div className="flex gap-5 items-start">
                     <div className="mt-1 w-6 h-6 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200">
                       <div className="w-2 h-2 rounded-full bg-slate-900" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900 text-lg">Reservasi Slot</h4>
                       <p className="text-slate-500 font-medium leading-relaxed">Jaminan tempat parkir bagi pengguna premium di mal dan rumah sakit yang ramai.</p>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="flex-1 relative">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6 pt-12">
                     <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
                        <Smartphone className="w-8 h-8 mb-6 text-slate-500" />
                        <div className="text-2xl font-bold">Aplikasi Mobile</div>
                        <div className="mt-3 text-[11px] font-black uppercase text-slate-600 tracking-widest">Antarmuka Pengemudi</div>
                     </div>
                     <div className="bg-slate-800 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/10">
                        <Wifi className="w-8 h-8 mb-6 text-slate-400" />
                        <div className="text-2xl font-bold">Sinkronisasi IoT</div>
                        <div className="mt-3 text-[11px] font-black uppercase text-slate-500 tracking-widest">Grid Sensor Langsung</div>
                     </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-100 rounded-[2.5rem] p-10 text-slate-900 border border-slate-200">
                        <Database className="w-8 h-8 mb-6 text-slate-400" />
                        <div className="text-2xl font-bold">Database Cloud</div>
                        <div className="mt-3 text-[11px] font-black uppercase text-slate-400 tracking-widest">Inti PostgreSQL</div>
                     </div>
                     <div className="bg-slate-50 rounded-[2.5rem] p-10 text-slate-900 border border-slate-200">
                        <PieChart className="w-8 h-8 mb-6 text-slate-300" />
                        <div className="text-2xl font-bold">Analitik</div>
                        <div className="mt-3 text-[11px] font-black uppercase text-slate-400 tracking-widest">Laporan Heatmap</div>
                     </div>
                  </div>
                </div>
              </div>
             </div>
          </div>
        </section>

        {/* Bagian Analisis Detail */}
        <section id="analysis" className="py-40 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-4">
              <div className="max-w-xl">
                <h2 className="text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">Analisis Pasar Struktural.</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">Mengatasi hambatan kritis baik dalam perdagangan digital maupun infrastruktur kota modern.</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Analisis Masalah - Konteks ParkEase */}
              <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-elegant">
                <div className="text-slate-900 font-bold text-[11px] uppercase tracking-[0.2em] mb-10">TANTANGAN</div>
                <h3 className="text-3xl font-bold mb-10 text-slate-900 tracking-tight">Mengidentifikasi Inefisiensi</h3>
                <ul className="space-y-8">
                  <ProblemItem 
                    title="Pemborosan Waktu & Kemacetan" 
                    desc="Pengemudi menghabiskan terlalu banyak waktu berkeliling demi mendapat tempat parkir, memicu kemacetan internal." 
                  />
                  <ProblemItem 
                    title="Kebocoran Pendapatan" 
                    desc="Tanpa sistem digital, banyak transaksi parkir yang tidak tercatat dengan benar, mengurangi potensi PAD." 
                  />
                  <ProblemItem 
                    title="Kurangnya Data Operasional" 
                    desc="Pengelola gedung seringkali tidak memiliki data heatmap untuk mengoptimalkan rotasi kendaraan." 
                  />
                </ul>
              </div>

              {/* Kerangka Solusi */}
              <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-3xl rounded-full"></div>
                <div className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] mb-10">SOLUSI KAMI</div>
                <h3 className="text-3xl font-bold mb-10 tracking-tight">Pendekatan SaaS Multidimensi</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="text-4xl font-bold mb-2">99%</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">SINKRONISASI</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="text-4xl font-bold mb-2">LIVE</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">PEMANTAUAN</div>
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                   <p className="text-slate-300 text-lg leading-relaxed font-medium italic opacity-80">
                     "Memanfaatkan Teknologi Cloud & IoT untuk menciptakan ekosistem manajemen yang transparan dan efisien."
                   </p>
                   <div className="flex items-center gap-5 pt-8 border-t border-white/10">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                        <Smartphone className="text-slate-900 w-6 h-6" />
                      </div>
                      <div className="text-sm">
                        <div className="font-bold text-lg">Arsitektur API Terpadu</div>
                        <div className="text-slate-400 text-xs font-semibold">Native Cloud Infrastructure</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teknologi */}
        <section id="tech" className="py-40 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <div className="text-slate-900 font-bold text-[11px] uppercase tracking-[0.3em] mb-6">TUMPUKAN TEKNOLOGI</div>
              <h2 className="text-6xl font-bold tracking-tight text-slate-900">Dirancang untuk Skala Global.</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
              <TechItem label="Frontend" tech="React / Flutter" />
              <TechItem label="Backend" tech="Inti Node.js" />
              <TechItem label="Database" tech="PostgreSQL" />
              <TechItem label="Perangkat Keras" tech="Sensor IoT" />
              <TechItem label="Infrastruktur" tech="Cloud Native" />
            </div>
          </div>
        </section>

        {/* Bagian CTA */}
        <section className="pb-40 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900 rounded-[4rem] p-20 md:p-32 text-center relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,23,42,0.4),transparent)]" />
               <div className="relative z-10">
                 <div className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.4em] mb-10">SIAP UNTUK BERKEMBANG?</div>
                 <h2 className="text-5xl md:text-8xl font-bold text-white mb-16 max-w-4xl mx-auto leading-[1.05] tracking-tight">
                   Mulai Operasi Pintar Anda Hari Ini.
                 </h2>
                 <div className="flex flex-wrap justify-center gap-8">
                   <button 
                     onClick={onGetStarted}
                     className="px-14 py-6 bg-white text-slate-900 rounded-full text-lg font-bold hover:bg-slate-100 transition-all shadow-premium hover:scale-[1.02] active:scale-95"
                   >
                     Mulai Gratis Sekarang
                   </button>
                   <button className="px-14 py-6 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full text-lg font-bold hover:bg-white/10 transition-all active:scale-95">
                     Jadwalkan Demo
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -12 }}
      className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-elegant hover:shadow-premium transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-slate-900 transition-colors duration-700">
        <div className="text-slate-900 group-hover:text-white transition-colors duration-700">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}

function TechItem({ label, tech }: { label: string, tech: string }) {
  return (
    <div className="p-12 rounded-[3rem] border border-slate-100 hover:border-slate-900 transition-all duration-500 group bg-white hover:bg-slate-50">
      <div className="text-[10px] uppercase font-bold text-slate-400 mb-4 group-hover:text-slate-900 transition-colors tracking-[0.2em]">{label}</div>
      <div className="text-xl font-bold text-slate-900 tracking-tight">{tech}</div>
    </div>
  );
}

function SystemNode({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100">
      <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{label}</div>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-900 shadow-sm animate-pulse" />
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{status}</span>
      </div>
    </div>
  );
}

function ProblemItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="flex gap-4">
      <div className="mt-1 w-2 h-2 rounded-full bg-slate-900 flex-shrink-0" />
      <div>
        <div className="font-bold text-slate-900">{title}</div>
        <div className="text-sm text-slate-500">{desc}</div>
      </div>
    </li>
  );
}

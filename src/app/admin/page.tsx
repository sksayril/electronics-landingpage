"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Calendar, 
  Clock, 
  Search, 
  Trash2, 
  Download, 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle,
  FileText
} from "lucide-react";
import Link from "next/link";

interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  // Fetch enquiries on mount
  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/enquiries");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch enquiries");
      }
      setEnquiries(data.data);
      setFilteredEnquiries(data.data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Filter enquiries when search query changes
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredEnquiries(enquiries);
    } else {
      const filtered = enquiries.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.mobile.includes(query) ||
          (item.message && item.message.toLowerCase().includes(query))
      );
      setFilteredEnquiries(filtered);
    }
  }, [searchQuery, enquiries]);

  // Handle delete enquiry
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete enquiry");
      }

      setDeleteStatus("Enquiry deleted successfully!");
      setTimeout(() => setDeleteStatus(null), 3000);
      
      // Update state
      setEnquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete enquiry");
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) return;

    const headers = ["Name", "Email", "Mobile", "Message", "Submission Date"];
    const rows = filteredEnquiries.map((item) => [
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.email.replace(/"/g, '""')}"`,
      `"${item.mobile.replace(/"/g, '""')}"`,
      `"${(item.message || "").replace(/"/g, '""')}"`,
      `"${new Date(item.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KEUKEN_Enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate quick metrics
  const totalEnquiries = enquiries.length;
  
  const todayEnquiries = enquiries.filter((item) => {
    const itemDate = new Date(item.createdAt);
    const today = new Date();
    return (
      itemDate.getDate() === today.getDate() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const latestTime = enquiries.length > 0 
    ? new Date(enquiries[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "No data";

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-red selection:text-white">
      {/* Top Banner Background */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-brand-red/10 to-transparent pointer-events-none"></div>

      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2 hover:bg-zinc-900 rounded-full border border-zinc-800 text-gray-400 hover:text-white transition-all"
              aria-label="Back to Store"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wider text-white">
                KEUKEN Connect
              </h1>
              <p className="text-xs text-brand-red font-bold tracking-widest uppercase">
                Admin Control Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchEnquiries}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-850 text-gray-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all cursor-pointer flex items-center justify-center"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleExportCSV}
              disabled={filteredEnquiries.length === 0}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-brand-red text-white disabled:bg-zinc-900 disabled:text-zinc-650 disabled:border-zinc-850 border border-zinc-800 hover:border-brand-red font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-8">
        
        {/* Delete notification */}
        {deleteStatus && (
          <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 animate-slide-up">
            <CheckCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{deleteStatus}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
              <Users className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Enquiries</p>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{loading ? "..." : totalEnquiries}</h3>
            <p className="text-[11px] text-gray-500 mt-1 font-light">All-time customer requests logged</p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
              <Calendar className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Today's Submissions</p>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{loading ? "..." : todayEnquiries}</h3>
            <p className="text-[11px] text-gray-500 mt-1 font-light">Enquiries received today</p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
              <Clock className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Latest Enquiry Time</p>
            <h3 className="text-2xl font-extrabold mt-3.5 text-white">{loading ? "..." : latestTime}</h3>
            <p className="text-[11px] text-gray-500 mt-1 font-light">Time of the most recent submission</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Controls Bar */}
          <div className="p-6 border-b border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/40">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, mobile..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-all"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
            </div>

            <div className="text-xs text-gray-450 font-medium">
              Showing {filteredEnquiries.length} of {totalEnquiries} enquiries
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="h-8 w-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-400 font-medium">Loading enquiries from MongoDB...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center space-y-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-white">Error Loading Data</p>
                <p className="text-xs text-gray-500 max-w-sm mx-auto font-light leading-relaxed">{error}</p>
                <button
                  onClick={fetchEnquiries}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-zinc-800 text-gray-500">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-white">No Enquiries Found</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto font-light leading-relaxed">
                  {searchQuery ? "No entries match your search query." : "When customers fill out the enquiry form, they will appear here."}
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-gray-400 font-bold uppercase tracking-wider border-b border-zinc-850">
                    <th className="px-6 py-4">Customer Details</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {filteredEnquiries.map((item) => (
                    <tr 
                      key={item._id} 
                      className="hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="px-6 py-4.5">
                        <div className="font-bold text-white text-sm">{item.name}</div>
                      </td>
                      <td className="px-6 py-4.5 space-y-1">
                        <div className="text-gray-300 font-medium">{item.email}</div>
                        <div className="text-gray-500 text-[11px] font-semibold tracking-wide flex items-center gap-1">
                          <span>📞</span> {item.mobile}
                        </div>
                      </td>
                      <td className="px-6 py-4.5 max-w-xs sm:max-w-md">
                        {item.message ? (
                          <p className="text-gray-400 font-light leading-relaxed break-words whitespace-pre-wrap">
                            {item.message}
                          </p>
                        ) : (
                          <span className="text-gray-600 italic font-light">No message provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4.5 text-gray-400 font-medium">
                        <div>
                          {new Date(item.createdAt).toLocaleDateString([], { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {new Date(item.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-gray-500 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-brand-red/10"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}

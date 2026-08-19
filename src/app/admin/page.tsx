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
  FileText,
  Package,
  Plus,
  Edit2,
  Upload,
  X,
  Star,
  Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message?: string;
  createdAt: string;
}

interface PartnerItem {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  message: string;
  createdAt: string;
}

interface ProductItem {
  _id: string;
  name: string;
  model: string;
  category: "tvs" | "appliances" | "ac" | "monitors";
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  mrp: number;
  price: number;
  badge?: string;
  tab: "trending" | "new" | "bestseller";
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<"enquiries" | "products" | "partners">("enquiries");
  
  // Enquiries State
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<EnquiryItem[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [enquiriesError, setEnquiriesError] = useState<string | null>(null);
  const [searchEnquiryQuery, setSearchEnquiryQuery] = useState("");
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  // Products State
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [searchProductQuery, setSearchProductQuery] = useState("");

  // Partners State
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<PartnerItem[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [partnersError, setPartnersError] = useState<string | null>(null);
  const [searchPartnerQuery, setSearchPartnerQuery] = useState("");

  // Product Modal & Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formModel, setFormModel] = useState("");
  const [formCategory, setFormCategory] = useState<"tvs" | "appliances" | "ac" | "monitors">("tvs");
  const [formTab, setFormTab] = useState<"trending" | "new" | "bestseller">("trending");
  const [formPrice, setFormPrice] = useState("");
  const [formMrp, setFormMrp] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formRating, setFormRating] = useState("4.8");
  const [formReviews, setFormReviews] = useState("10");
  const [formFeatures, setFormFeatures] = useState("");
  const [formBadge, setFormBadge] = useState("");

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    setEnquiriesError(null);
    try {
      const response = await fetch("/api/admin/enquiries");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch enquiries");
      }
      setEnquiries(data.data);
      setFilteredEnquiries(data.data);
    } catch (err: any) {
      setEnquiriesError(err.message || "An unexpected error occurred");
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    setProductsError(null);
    try {
      const response = await fetch("/api/admin/products");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch products");
      }
      setProducts(data.data);
      setFilteredProducts(data.data);
    } catch (err: any) {
      setProductsError(err.message || "An unexpected error occurred");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch partners
  const fetchPartners = async () => {
    setLoadingPartners(true);
    setPartnersError(null);
    try {
      const response = await fetch("/api/admin/partners");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch partner requests");
      }
      setPartners(data.data);
      setFilteredPartners(data.data);
    } catch (err: any) {
      setPartnersError(err.message || "An unexpected error occurred");
    } finally {
      setLoadingPartners(false);
    }
  };

  // Fetch all on mount
  useEffect(() => {
    fetchEnquiries();
    fetchProducts();
    fetchPartners();
  }, []);

  // Filter enquiries when search query changes
  useEffect(() => {
    const query = searchEnquiryQuery.toLowerCase().trim();
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
  }, [searchEnquiryQuery, enquiries]);

  // Filter products when search query changes
  useEffect(() => {
    const query = searchProductQuery.toLowerCase().trim();
    if (!query) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.model.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tab.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchProductQuery, products]);

  // Filter partners when search query changes
  useEffect(() => {
    const query = searchPartnerQuery.toLowerCase().trim();
    if (!query) {
      setFilteredPartners(partners);
    } else {
      const filtered = partners.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.mobile.includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.message.toLowerCase().includes(query)
      );
      setFilteredPartners(filtered);
    }
  }, [searchPartnerQuery, partners]);

  // Handle delete enquiry
  const handleDeleteEnquiry = async (id: string) => {
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
      setEnquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete enquiry");
    }
  };
  // Handle delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      setDeleteStatus("Product deleted successfully!");
      setTimeout(() => setDeleteStatus(null), 3000);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  // Handle delete partner request
  const handleDeletePartner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner request?")) return;

    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete partner request");
      }

      setDeleteStatus("Partner request deleted successfully!");
      setTimeout(() => setDeleteStatus(null), 3000);
      setPartners((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete partner request");
    }
  };

  // Handle S3 Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setFormImage(data.url);
    } catch (err: any) {
      setUploadError(err.message || "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle Product save
  const handleProductSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formModel || !formCategory || !formImage || !formPrice || !formMrp) {
      alert("Please fill out all required fields and upload an image.");
      return;
    }

    setSavingProduct(true);

    const productData = {
      name: formName,
      model: formModel,
      category: formCategory,
      image: formImage,
      rating: parseFloat(formRating) || 4.8,
      reviews: parseInt(formReviews) || 10,
      features: formFeatures.split(",").map((f) => f.trim()).filter((f) => f !== ""),
      mrp: parseFloat(formMrp),
      price: parseFloat(formPrice),
      badge: formBadge || undefined,
      tab: formTab,
    };

    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct._id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product");
      }

      setDeleteStatus(editingProduct ? "Product updated successfully!" : "Product created successfully!");
      setTimeout(() => setDeleteStatus(null), 3000);
      setShowProductModal(false);
      resetProductForm();
      fetchProducts();
    } catch (err: any) {
      alert(err.message || "Failed to save product");
    } finally {
      setSavingProduct(false);
    }
  };

  // Open modal for editing
  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormModel(product.model);
    setFormCategory(product.category);
    setFormTab(product.tab);
    setFormPrice(product.price.toString());
    setFormMrp(product.mrp.toString());
    setFormImage(product.image);
    setFormRating(product.rating.toString());
    setFormReviews(product.reviews.toString());
    setFormFeatures(product.features.join(", "));
    setFormBadge(product.badge || "");
    setShowProductModal(true);
  };

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingProduct(null);
    resetProductForm();
    setShowProductModal(true);
  };

  // Reset product form
  const resetProductForm = () => {
    setFormName("");
    setFormModel("");
    setFormCategory("tvs");
    setFormTab("trending");
    setFormPrice("");
    setFormMrp("");
    setFormImage("");
    setFormRating("4.8");
    setFormReviews("10");
    setFormFeatures("");
    setFormBadge("");
    setUploadError(null);
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

  // Format INR Currency
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate quick metrics
  const totalEnquiries = enquiries.length;
  const totalProducts = products.length;
  
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

      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-45">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2 hover:bg-zinc-900 rounded-full border border-zinc-800 text-gray-400 hover:text-white transition-all animate-fade-in"
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
              onClick={activeView === "enquiries" ? fetchEnquiries : activeView === "products" ? fetchProducts : fetchPartners}
              className="p-2.5 bg-zinc-900 hover:bg-zinc-850 text-gray-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all cursor-pointer flex items-center justify-center"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${(loadingEnquiries || loadingProducts || loadingPartners) ? "animate-spin" : ""}`} />
            </button>
            {activeView === "enquiries" && (
              <button
                onClick={handleExportCSV}
                disabled={filteredEnquiries.length === 0}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-brand-red text-white disabled:bg-zinc-900 disabled:text-zinc-650 disabled:border-zinc-850 border border-zinc-800 hover:border-brand-red font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>
            )}
            {activeView === "products" && (
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white border border-brand-red hover:scale-102 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-brand-red/10"
              >
                <Plus className="h-4 w-4" /> Add Product
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-8">
        
        {/* Actions/Status Notifications */}
        {deleteStatus && (
          <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 animate-slide-up">
            <CheckCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{deleteStatus}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
              <Users className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Enquiries</p>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{loadingEnquiries ? "..." : totalEnquiries}</h3>
            <p className="text-[11px] text-gray-500 mt-1 font-light">All-time customer requests logged</p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
              <Calendar className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Today's Submissions</p>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{loadingEnquiries ? "..." : todayEnquiries}</h3>
            <p className="text-[11px] text-gray-500 mt-1 font-light">Enquiries received today</p>
          </div>

          {/* Card 3 (New: Products count) */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
              <Package className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Products</p>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{loadingProducts ? "..." : totalProducts}</h3>
            <p className="text-[11px] text-gray-500 mt-1 font-light">Dynamic store inventory items</p>
          </div>

          {/* Card 4 */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Partner Requests</p>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{loadingPartners ? "..." : partners.length}</h3>
            <p className="text-[11px] text-gray-500 mt-1 font-light">Submissions for business partnership</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-zinc-900 bg-zinc-950/40 p-1 w-full max-w-md rounded-xl border border-zinc-850">
          <button
            onClick={() => setActiveView("enquiries")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeView === "enquiries" 
                ? "bg-zinc-900 text-white border border-zinc-800" 
                : "text-gray-500 hover:text-white"
            }`}
          >
            <Users className="h-4 w-4" /> Enquiries
          </button>
          <button
            onClick={() => setActiveView("products")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeView === "products" 
                ? "bg-zinc-900 text-white border border-zinc-800" 
                : "text-gray-500 hover:text-white"
            }`}
          >
            <Package className="h-4 w-4" /> Products
          </button>
          <button
            onClick={() => setActiveView("partners")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeView === "partners" 
                ? "bg-zinc-900 text-white border border-zinc-800" 
                : "text-gray-500 hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" /> Partners
          </button>
        </div>

        {/* Main Content Area */}
        <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* ENQUIRIES VIEW */}
          {activeView === "enquiries" && (
            <div>
              {/* Controls Bar */}
              <div className="p-6 border-b border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/40">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    value={searchEnquiryQuery}
                    onChange={(e) => setSearchEnquiryQuery(e.target.value)}
                    placeholder="Search by name, email, mobile..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-all"
                  />
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                </div>

                <div className="text-xs text-gray-400 font-medium">
                  Showing {filteredEnquiries.length} of {totalEnquiries} enquiries
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                {loadingEnquiries ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-gray-450 font-medium">Loading enquiries from MongoDB...</p>
                  </div>
                ) : enquiriesError ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">Error Loading Data</p>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto font-light leading-relaxed">{enquiriesError}</p>
                    <button
                      onClick={fetchEnquiries}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                ) : filteredEnquiries.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-zinc-800 text-gray-550">
                      <FileText className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">No Enquiries Found</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto font-light leading-relaxed">
                      {searchEnquiryQuery ? "No entries match your search query." : "When customers fill out the enquiry form, they will appear here."}
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-950 text-gray-450 font-bold uppercase tracking-wider border-b border-zinc-850">
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
                            <div className="text-gray-550 text-[11px] font-semibold tracking-wide flex items-center gap-1">
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
                          <td className="px-6 py-4.5 text-gray-450 font-medium">
                            <div>
                              {new Date(item.createdAt).toLocaleDateString([], { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </div>
                            <div className="text-[10px] text-gray-600 mt-0.5">
                              {new Date(item.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4.5 text-right">
                            <button
                              onClick={() => handleDeleteEnquiry(item._id)}
                              className="p-2 text-gray-550 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center border border-transparent"
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
          )}

          {/* PRODUCTS VIEW */}
          {activeView === "products" && (
            <div>
              {/* Controls Bar */}
              <div className="p-6 border-b border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/40">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    value={searchProductQuery}
                    onChange={(e) => setSearchProductQuery(e.target.value)}
                    placeholder="Search by name, model, category..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-all"
                  />
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                </div>

                <div className="text-xs text-gray-400 font-medium flex items-center gap-3">
                  <span>Showing {filteredProducts.length} of {totalProducts} products</span>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                {loadingProducts ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-gray-450 font-medium">Loading inventory from MongoDB...</p>
                  </div>
                ) : productsError ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">Error Loading Data</p>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto font-light leading-relaxed">{productsError}</p>
                    <button
                      onClick={fetchProducts}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-zinc-800 text-gray-550">
                      <Package className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">No Products Found</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto font-light leading-relaxed">
                      {searchProductQuery ? "No entries match your search query." : "Add products to display them dynamically on the landing page."}
                    </p>
                    <button
                      onClick={handleOpenAdd}
                      className="px-4 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
                    >
                      <Plus className="h-4 w-4" /> Add Product
                    </button>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-950 text-gray-450 font-bold uppercase tracking-wider border-b border-zinc-850">
                        <th className="px-6 py-4">Thumbnail</th>
                        <th className="px-6 py-4">Product Details</th>
                        <th className="px-6 py-4">Category & Tab</th>
                        <th className="px-6 py-4">Pricing</th>
                        <th className="px-6 py-4">Ratings</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {filteredProducts.map((item) => (
                        <tr 
                          key={item._id} 
                          className="hover:bg-zinc-900/30 transition-colors"
                        >
                          <td className="px-6 py-3">
                            <div className="relative h-14 w-14 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                sizes="56px"
                                className="object-cover" 
                              />
                            </div>
                          </td>
                          <td className="px-6 py-3 max-w-xs sm:max-w-md">
                            <div className="font-bold text-white text-sm line-clamp-1">{item.name}</div>
                            <div className="text-[11px] text-gray-500 font-mono mt-0.5">{item.model}</div>
                          </td>
                          <td className="px-6 py-3 space-y-1">
                            <div className="inline-block bg-zinc-900 border border-zinc-800 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              {item.category === "tvs" ? "TV & Audio" : item.category === "appliances" ? "Appliance" : item.category === "ac" ? "Aircon" : "Laptop/Monitor"}
                            </div>
                            <div className="block">
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
                                item.tab === "trending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                item.tab === "new" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                                "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              }`}>
                                {item.tab}
                              </span>
                              {item.badge && (
                                <span className="ml-1 text-[9px] bg-brand-red/10 text-brand-red border border-brand-red/20 font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-3 font-semibold space-y-0.5">
                            <div className="text-brand-red font-bold text-sm">{formatPrice(item.price)}</div>
                            <div className="text-gray-500 text-[10px] line-through">{formatPrice(item.mrp)}</div>
                          </td>
                          <td className="px-6 py-3 font-medium text-gray-400">
                            <div className="flex items-center gap-1">
                              <span className="text-amber-500">★</span> 
                              <span>{item.rating}</span>
                            </div>
                            <div className="text-[10px] text-gray-550 mt-0.5">({item.reviews} reviews)</div>
                          </td>
                          <td className="px-6 py-3 text-right space-x-1">
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                              title="Edit Product"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(item._id)}
                              className="p-2 text-gray-550 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                              title="Delete Product"
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
          )}

          {/* PARTNERS VIEW */}
          {activeView === "partners" && (
            <div>
              {/* Controls Bar */}
              <div className="p-6 border-b border-zinc-850 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900/40">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    value={searchPartnerQuery}
                    onChange={(e) => setSearchPartnerQuery(e.target.value)}
                    placeholder="Search by name, email, location..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-red transition-all"
                  />
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                </div>

                <div className="text-xs text-gray-400 font-medium">
                  Showing {filteredPartners.length} of {partners.length} requests
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                {loadingPartners ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-gray-455 font-medium">Loading partner requests from MongoDB...</p>
                  </div>
                ) : partnersError ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      <Clock className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">Error Loading Data</p>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto font-light leading-relaxed">{partnersError}</p>
                    <button
                      onClick={fetchPartners}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                ) : filteredPartners.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-zinc-800 text-gray-550">
                      <FileText className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-white">No Partner Requests Found</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto font-light leading-relaxed">
                      {searchPartnerQuery ? "No entries match your search query." : "When business owners submit partnership applications, they will appear here."}
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-950 text-gray-455 font-bold uppercase tracking-wider border-b border-zinc-850">
                        <th className="px-6 py-4">Partner Details</th>
                        <th className="px-6 py-4">Contact Info</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Requirements</th>
                        <th className="px-6 py-4">Date & Time</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {filteredPartners.map((item) => (
                        <tr 
                          key={item._id} 
                          className="hover:bg-zinc-900/30 transition-colors"
                        >
                          <td className="px-6 py-4.5">
                            <div className="font-bold text-white text-sm">{item.name}</div>
                          </td>
                          <td className="px-6 py-4.5 space-y-1">
                            <div className="text-gray-300 font-medium">{item.email}</div>
                            <div className="text-gray-550 text-[11px] font-semibold tracking-wide flex items-center gap-1">
                              <span>📞</span> {item.mobile}
                            </div>
                          </td>
                          <td className="px-6 py-4.5 text-gray-300 font-medium">
                            {item.location}
                          </td>
                          <td className="px-6 py-4.5 max-w-xs sm:max-w-md">
                            <p className="text-gray-400 font-light leading-relaxed break-words whitespace-pre-wrap">
                              {item.message}
                            </p>
                          </td>
                          <td className="px-6 py-4.5 text-gray-455 font-medium">
                            <div>
                              {new Date(item.createdAt).toLocaleDateString([], { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </div>
                            <div className="text-[10px] text-gray-600 mt-0.5">
                              {new Date(item.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4.5 text-right">
                            <button
                              onClick={() => handleDeletePartner(item._id)}
                              className="p-2 text-gray-550 hover:text-brand-red hover:bg-brand-red/10 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center border border-transparent font-medium"
                              title="Delete Partner Request"
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
          )}

        </div>

      </main>

      {/* ADD/EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-slide-up max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-850 flex justify-between items-center bg-zinc-950/40">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  {editingProduct ? "Edit Product Details" : "Create New Product"}
                </h3>
                <p className="text-xs text-gray-500 font-light mt-0.5">
                  Provide inventory attributes and upload asset to S3 bucket
                </p>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1.5 hover:bg-zinc-800 rounded-lg text-gray-450 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable form) */}
            <form onSubmit={handleProductSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KEUKEN UltraGear OLED Monitor"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>

                {/* Model Number */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Model Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. OLED55C4PSA"
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>

                {/* Category Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Category Tag *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-brand-red cursor-pointer transition-all"
                  >
                    <option value="tvs">TVs & Audio</option>
                    <option value="appliances">Home Appliances</option>
                    <option value="ac">Air Conditioners</option>
                    <option value="monitors">Laptops & Monitors</option>
                  </select>
                </div>

                {/* Tab Placement */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Display Tab Placement *
                  </label>
                  <select
                    value={formTab}
                    onChange={(e) => setFormTab(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-brand-red cursor-pointer transition-all"
                  >
                    <option value="trending">Trending Now</option>
                    <option value="new">New Arrivals</option>
                    <option value="bestseller">Best Sellers</option>
                  </select>
                </div>

                {/* Price (Selling) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Selling Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 139990"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>

                {/* MRP (Price reference) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    MRP Reference (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 189990"
                    value={formMrp}
                    onChange={(e) => setFormMrp(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>

                {/* Rating (1.0 - 5.0) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Simulated Rating (1.0 - 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>

                {/* Reviews count */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Simulated Reviews Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formReviews}
                    onChange={(e) => setFormReviews(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>

                {/* Promo Badge overlay */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Promo Badge (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HOT DEAL, 2026 MODEL, BESTSELLER"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-red transition-all"
                  />
                </div>

                {/* Key Features bullet lists */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Key Features (comma-separated list)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. α9 AI Processor Gen7, Pixel Dimming OLED, Brightness Booster Max, 144Hz VRR Gaming"
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-red transition-all resize-y"
                  />
                  <span className="text-[10px] text-gray-500 block leading-normal">
                    Separate features with a comma. These will render as bullet items in product showcases.
                  </span>
                </div>

                {/* Image Upload Area */}
                <div className="space-y-1.5 md:col-span-2 border-t border-zinc-850 pt-5 mt-2">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">
                    Product Image (AWS S3 Upload) *
                  </label>
                  
                  {uploadError && (
                    <p className="text-xs text-brand-red font-semibold">{uploadError}</p>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Thumbnail Preview */}
                    <div className="h-28 w-28 border border-zinc-850 bg-zinc-950 rounded-xl overflow-hidden relative shrink-0 flex items-center justify-center text-gray-700">
                      {formImage ? (
                        <Image 
                          src={formImage} 
                          alt="Form Preview" 
                          fill 
                          sizes="112px"
                          className="object-cover" 
                        />
                      ) : uploadingImage ? (
                        <div className="h-6 w-6 border border-zinc-650 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Package className="h-10 w-10 text-zinc-800" />
                      )}
                    </div>

                    {/* S3 File Upload Picker */}
                    <div className="flex-1 w-full">
                      <label className="border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 rounded-xl p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all min-h-[112px]">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                        <Upload className="h-5 w-5 text-gray-500 mb-1" />
                        <span className="text-xs text-gray-400 font-bold">
                          {uploadingImage ? "Uploading asset to AWS..." : "Choose Local Image File"}
                        </span>
                        <span className="text-[10px] text-gray-600 mt-1 font-light block">
                          Uploads directly to S3 Bucket (streaming-bucket-123)
                        </span>
                      </label>
                    </div>
                  </div>

                  {formImage && (
                    <div className="bg-zinc-950/80 border border-zinc-850 p-3 rounded-lg flex items-center justify-between text-[11px] font-mono text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-none">
                      <span className="truncate">{formImage}</span>
                      <button
                        type="button"
                        onClick={() => setFormImage("")}
                        className="text-brand-red hover:underline ml-2 uppercase text-[9px] font-bold tracking-wider cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </form>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-850 flex justify-end gap-3 bg-zinc-950/40">
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-gray-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all cursor-pointer font-bold text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProductSave}
                disabled={savingProduct || uploadingImage || !formImage}
                className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-hover disabled:bg-zinc-900 disabled:text-zinc-650 disabled:border-zinc-850 text-white border border-brand-red hover:scale-102 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-brand-red/10"
              >
                {savingProduct ? "Saving..." : "Save Product"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

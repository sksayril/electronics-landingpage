"use client";

import { useState } from "react";
import { Tv, Refrigerator, Wind, Disc, Smartphone, Check, Wifi, Power, Settings } from "lucide-react";

interface Device {
  id: string;
  name: string;
  type: "tv" | "fridge" | "ac" | "washer";
  icon: React.ReactNode;
  status: string;
  info: string;
  controls: {
    label: string;
    value: string;
    options: string[];
  }[];
}

export default function ThinQSection() {
  const [selectedDevice, setSelectedDevice] = useState<string>("tv");
  const [deviceStates, setDeviceStates] = useState<Record<string, Record<string, string>>>({
    tv: { Power: "ON", Mode: "Gaming Low Latency" },
    fridge: { Temperature: "-18°C Super Freeze", InstaLight: "OFF" },
    ac: { Temperature: "22°C Eco Cool", FanSpeed: "Auto" },
    washer: { Cycle: "Cotton Quick Wash", Status: "Spinning (12 mins left)" },
  });

  const [notification, setNotification] = useState<string | null>(null);

  const devices: Device[] = [
    {
      id: "tv",
      name: "OLED evo TV",
      type: "tv",
      icon: <Tv className="h-6 w-6" />,
      status: "Connected - Active",
      info: "Optimize your visual settings, switch audio outputs, or launch your Xbox Cloud Gaming dashboard straight from your phone.",
      controls: [
        { label: "Power", value: "ON", options: ["ON", "OFF"] },
        { label: "Mode", value: "Gaming Low Latency", options: ["Cinema", "Sports", "Gaming Low Latency", "Standard"] },
      ],
    },
    {
      id: "fridge",
      name: "InstaView Refrigerator",
      type: "fridge",
      icon: <Refrigerator className="h-6 w-6" />,
      status: "Connected - Standby",
      info: "Monitor filters, toggle the express freezing cycle, and receive instant alert notifications if the door is left open.",
      controls: [
        { label: "Temperature", value: "-18°C Super Freeze", options: ["-15°C Regular", "-18°C Super Freeze", "-22°C Deep Freeze"] },
        { label: "InstaLight", value: "OFF", options: ["ON", "OFF"] },
      ],
    },
    {
      id: "ac",
      name: "Dual Inverter AC",
      type: "ac",
      icon: <Wind className="h-6 w-6" />,
      status: "Connected - Cool Active",
      info: "Control climate schedules, monitor live power usage diagnostics, and cool down your room prior to arriving home.",
      controls: [
        { label: "Temperature", value: "22°C Eco Cool", options: ["18°C Turbo", "22°C Eco Cool", "24°C Comfort"] },
        { label: "FanSpeed", value: "Auto", options: ["Low", "Medium", "High", "Auto"] },
      ],
    },
    {
      id: "washer",
      name: "AI Direct Drive Washer",
      type: "washer",
      icon: <Disc className="h-6 w-6" />,
      status: "Connected - Washing Cycle",
      info: "Select optimal fabric wash guides, monitor cycle completion timelines, and load detergent refill orders automatically.",
      controls: [
        { label: "Cycle", value: "Cotton Quick Wash", options: ["Delicates", "Cotton Quick Wash", "Steam Sanitized", "Eco Save"] },
        { label: "Status", value: "Spinning (12 mins left)", options: ["Soaking", "Washing", "Spinning (12 mins left)", "Complete"] },
      ],
    },
  ];

  const handleControlChange = (deviceId: string, label: string, value: string) => {
    setDeviceStates((prev) => ({
      ...prev,
      [deviceId]: {
        ...prev[deviceId],
        [label]: value,
      },
    }));
    triggerNotification(`KEUKEN Connect App updated ${devices.find(d => d.id === deviceId)?.name} ${label} to "${value}"`);
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const activeDeviceDetails = devices.find((d) => d.id === selectedDevice)!;

  return (
    <section id="thinq" className="py-20 bg-zinc-900 text-white relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-950/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-brand-red text-xs sm:text-sm font-bold tracking-widest uppercase bg-brand-red/10 px-4 py-1.5 rounded-full">
            SMART IOT HOME ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase mt-4 tracking-tight leading-tight font-sans">
            KEUKEN Connect™ Smart Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-xl mx-auto font-light">
            Manage your entire home ecosystem seamlessly from your smartphone. Adjust settings, check energy usage, and automate routines.
          </p>
        </div>

        {/* Live Notification Popup */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#A50034] text-white py-3.5 px-6 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-slide-up max-w-md">
            <div className="h-5 w-5 bg-white/25 rounded-full flex items-center justify-center animate-ping"></div>
            <Wifi className="h-4 w-4 absolute left-7 text-white" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">{notification}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Device Nodes Navigator */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-gray-300 border-b border-white/10 pb-3">
              Home Appliances
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {devices.map((device) => {
                const isActive = selectedDevice === device.id;
                return (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-brand-red border-transparent text-white shadow-xl scale-102"
                        : "bg-zinc-800/80 border-zinc-700/60 hover:bg-zinc-800 text-gray-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon container */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${
                          isActive ? "bg-white/20" : "bg-zinc-700"
                        }`}
                      >
                        {device.icon}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sm sm:text-base leading-snug">{device.name}</h4>
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? "text-red-200" : "text-gray-400"}`}>
                          {deviceStates[device.id]["Power"] === "OFF" ? "OFFLINE" : device.status}
                        </span>
                      </div>
                    </div>
                    {/* Status Dot */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold opacity-75 hidden sm:inline">
                        {deviceStates[device.id]["Power"] === "OFF" ? "Off" : "Connected"}
                      </span>
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          deviceStates[device.id]["Power"] === "OFF"
                            ? "bg-gray-500"
                            : "bg-emerald-400 animate-pulse-ring"
                        }`}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Smartphone Simulator */}
          <div className="lg:col-span-7 flex justify-center items-center">
            
            {/* Phone shell */}
            <div className="relative w-80 h-[580px] bg-zinc-950 border-[6px] border-zinc-800 rounded-[38px] shadow-2xl p-4 overflow-hidden flex flex-col justify-between">
              
              {/* Phone speaker/camera notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 bg-zinc-800 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-black rounded-full"></div>
              </div>

              {/* Status Header */}
              <div className="relative pt-2 pb-3 px-3 border-b border-zinc-900 flex justify-between items-center text-[10px] text-gray-500 font-bold tracking-wider">
                <span className="text-white">9:41 AM</span>
                <span className="text-brand-red flex items-center gap-1">
                  <Wifi className="h-3 w-3" /> KEUKEN Connect
                </span>
              </div>

              {/* Screen Content */}
              <div className="flex-1 overflow-y-auto px-1 py-4 no-scrollbar">
                
                {/* KEUKEN Connect App logo and greeting */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-7 w-7 rounded-full bg-brand-red flex items-center justify-center text-white">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs leading-none">Smart Home</h3>
                    <span className="text-[9px] text-gray-400 font-medium">All systems normal</span>
                  </div>
                </div>

                {/* Dashboard active view */}
                <div className="space-y-4">
                  <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800/80">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">Active Control</span>
                      <Settings className="h-4 w-4 text-gray-500" />
                    </div>
                    
                    <h4 className="font-bold text-base text-white">{activeDeviceDetails.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed font-light mb-4">
                      {activeDeviceDetails.info}
                    </p>

                    {/* Interactive Controls */}
                    <div className="space-y-3.5 pt-3 border-t border-zinc-800">
                      {activeDeviceDetails.controls.map((ctrl, cIdx) => (
                        <div key={cIdx} className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                            {ctrl.label}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-black rounded-lg p-1">
                            {ctrl.options.map((opt) => {
                              const isSelected = deviceStates[activeDeviceDetails.id][ctrl.label] === opt;
                              return (
                                <button
                                  key={opt}
                                  onClick={() => handleControlChange(activeDeviceDetails.id, ctrl.label, opt)}
                                  className={`text-[9px] font-bold py-1.5 px-2 rounded-md transition-all cursor-pointer text-center ${
                                    isSelected
                                      ? "bg-brand-red text-white shadow-sm"
                                      : "text-gray-400 hover:text-white hover:bg-zinc-900"
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* IoT Quick metrics */}
                  <div className="bg-zinc-900/60 rounded-xl p-3 border border-zinc-800/40 grid grid-cols-2 gap-3 text-center">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-gray-500 uppercase">Power Saver</span>
                      <span className="text-sm font-extrabold text-emerald-400 mt-0.5">85% Eco</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-gray-500 uppercase">Monthly Saving</span>
                      <span className="text-sm font-extrabold text-brand-red mt-0.5">₹1,240 saved</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Home Indicator bar */}
              <div className="pt-2 flex justify-center">
                <div className="w-24 h-1 bg-zinc-800 rounded-full"></div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Product from "../../../models/Product";

const DEFAULT_PRODUCTS = [
  {
    name: "KEUKEN OLED evo AI C4 55\" Smart TV",
    model: "OLED55C4PSA",
    category: "tvs",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 248,
    features: ["α9 AI Processor Gen7", "Pixel Dimming OLED", "Brightness Booster Max", "144Hz VRR Gaming"],
    mrp: 189990,
    price: 139990,
    badge: "HOT DEAL",
    tab: "trending"
  },
  {
    name: "InstaView® French Door Refrigerator",
    model: "GR-X29FMBIL",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1571175432247-f404af3a0ca5?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 112,
    features: ["Knock Twice to See Inside", "UVnano™ Water Dispenser", "Dual Craft Ice Maker", "KEUKEN Connect™ Wifi"],
    mrp: 249990,
    price: 194990,
    badge: "PREMIUM",
    tab: "trending"
  },
  {
    name: "AI Direct Drive™ 9kg Front Load Washer",
    model: "FHP1209Z5M",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 319,
    features: ["AI DD™ Fabric Sensor", "TurboWash™ 39 Mins", "Steam™ Allergen Removal", "6 Motion Technology"],
    mrp: 58990,
    price: 43990,
    badge: "AI SMART",
    tab: "trending"
  },
  {
    name: "UltraGear™ 34\" Curved OLED Gaming Monitor",
    model: "34GS95QE",
    category: "monitors",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 86,
    features: ["0.03ms Response Time", "240Hz Refresh Rate", "VESA DisplayHDR 400", "AMD FreeSync Premium"],
    mrp: 99990,
    price: 79990,
    badge: "GAMING EXCLUSIVE",
    tab: "trending"
  },
  {
    name: "DUALCOOL Inverter 1.5 Ton 5-Star AC",
    model: "TS-Q19YNZE",
    category: "ac",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 43,
    features: ["AI Convertible 6-in-1 Cooling", "PM 1.0 Smart Air Filter", "Ocean Black Anti-Corrosive", "ADC Safety Sensors"],
    mrp: 72990,
    price: 47990,
    badge: "2026 MODEL",
    tab: "new"
  },
  {
    name: "KEUKEN Gram 16\" Intel Core Ultra 7 Laptop",
    model: "16Z90S-G.AH78A2",
    category: "monitors",
    image: "https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 31,
    features: ["Intel® Core™ Ultra 7 Evo", "1.19kg Super Lightweight", "16:10 WQXGA IPS Display", "77Wh Battery Capacity"],
    mrp: 142990,
    price: 119990,
    badge: "NEW",
    tab: "new"
  },
  {
    name: "KEUKEN UHD 4K 43\" Smart WebOS TV",
    model: "43UR7500PSC",
    category: "tvs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 1485,
    features: ["α5 AI Processor 4K Gen6", "webOS 23 Smart Platform", "HDR10 Pro Detail Enhancement", "Game Optimizer Module"],
    mrp: 49990,
    price: 32990,
    badge: "BESTSELLER",
    tab: "bestseller"
  },
  {
    name: "TrueSteam™ 14 Place Settings Dishwasher",
    model: "DFB424FP",
    category: "appliances",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 955,
    features: ["TrueSteam™ High Temp Sanitizing", "QuadWash™ Multi-Directional Blades", "EasyRack™ Plus Adjustable Rack", "Inverter Direct Drive Motor"],
    mrp: 64990,
    price: 52990,
    badge: "99% SANITIZED",
    tab: "bestseller"
  }
];

export async function GET() {
  try {
    await connectDB();
    let products = await Product.find().sort({ createdAt: -1 });

    if (products.length === 0) {
      console.log("No products found in DB. Seeding default products...");
      await Product.insertMany(DEFAULT_PRODUCTS);
      products = await Product.find().sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    console.error("Fetch public products error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

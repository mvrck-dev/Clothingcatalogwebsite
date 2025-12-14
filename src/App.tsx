import React, { useState, useMemo, useEffect } from 'react';
import Papa from 'papaparse';
import catalogData from './data/catalog.csv?raw';

// Types
interface Product {
  id: string;
  item: string;
  color: string;
  fabric_and_work: string;
  quality: string;
  price: number;
  images: string; // Comma-separated filenames
  video?: string;
}

// Translations
const translations = {
  en: {
    browse: 'Browse Catalog',
    search: 'Search',
    searchPlaceholder: 'Search products...',
    item: 'Item',
    color: 'Color',
    fabric: 'Fabric & Work',
    quality: 'Quality',
    priceRange: 'Price Range (€)',
    clearFilters: 'Clear Filters',
    productsFound: 'products found',
    noProductsFound: 'No products match your search criteria.',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    reportIssue: 'Report Issue',
    aboutUsTitle: 'About Auralane',
    contactUsTitle: 'Contact Us',
    call: 'Call',
    sms: 'SMS',
    whatsapp: 'WhatsApp',
    close: 'Close',
    back: 'Back',
    loadingCatalog: 'Loading catalog...',
    owner: 'Owner',
    maintainedBy: 'Maintained by',
    websiteDesigner: 'Website Designer'
  },
  fi: {
    browse: 'Selaa luetteloa',
    search: 'Hae',
    searchPlaceholder: 'Hae tuotteita...',
    item: 'Tuote',
    color: 'Väri',
    fabric: 'Kangas ja työ',
    quality: 'Laatu',
    priceRange: 'Hintaluokka (€)',
    clearFilters: 'Tyhjennä suodattimet',
    productsFound: 'tuotetta löydetty',
    noProductsFound: 'Hakuehtosi eivät tuottaneet tuloksia.',
    aboutUs: 'Tietoa meistä',
    contactUs: 'Ota yhteyttä',
    reportIssue: 'Ilmoita ongelmasta',
    aboutUsTitle: 'Tietoa Auralane',
    contactUsTitle: 'Ota yhteyttä',
    call: 'Soita',
    sms: 'Tekstiviesti',
    whatsapp: 'WhatsApp',
    close: 'Sulje',
    back: 'Takaisin',
    loadingCatalog: 'Ladataan luetteloa...',
    owner: 'Omistaja',
    maintainedBy: 'Ylläpitäjä',
    websiteDesigner: 'Verkkosivuston suunnittelija'
  }
};

// Product Data Translations
const productTranslations: Record<string, string> = {
  // Items
  "Saree": "Sari",

  // Colors
  "Golden": "Kultainen",
  "Maroon": "Kastanjanruskea",
  "Orange Pink": "Oranssi vaaleanpunainen",
  "Pink & Purple": "Vaaleanpunainen & Purppura",
  "Pink": "Vaaleanpunainen",
  "Purple & Green": "Purppura & Vihreä",
  "Purple & White": "Purppura & Valkoinen",
  "White & Red": "Valkoinen & Punainen",
  "White Red Yellow": "Valkoinen Punainen Keltainen",
  "Yellow & Red": "Keltainen & Punainen",
  "Yellow & Sky blue": "Keltainen & Taivaansininen",

  // Fabrics
  "Pure viscose weaving jacquard saree with sequence work pure viscose matching blouse .": "Puhdas viskoosi kudonta jacquard sari, jossa on sekvenssityö puhdas viskoosi vastaava pusero.",
  "Pure Viscose Georgette Saree With Fancy Zari & Fancy Jecquard Border & Fancy Viscose Jecquard Blouse": "Puhdas viskoosi georgette sari, jossa on hieno Zari & hieno Jecquard-reunus & hieno viskoosi Jecquard-pusero",
  "soft beautiful Chinon saree with traditional bandej butta heavy bandej pallu with handwork & muslin bandej blouse": "pehmeä kaunis Chinon-sari, jossa on perinteinen bandej butta raskas bandej pallu käsityöllä & musliini bandej pusero",
  "Crush Silk Saree With Fancy Sequince Embroderiy Work & Fancy Blouse": "Crush Silkki -sari, jossa on hieno paljettikirjailutyö & hieno pusero",
  "fesive season": "juhlakausi",
  "Saree already full demanded best quality": "Sari on jo täysin kysytty parasta laatua",
  "Best Selling Product": "Myydyin tuote",
  "We Believe in Quality": "Uskomme laatuun"
};

const tData = (text: string, lang: 'en' | 'fi') => {
  if (lang === 'en') return text;
  return productTranslations[text] || text;
};

// Product card with image carousel
function ProductCard({ product, lang }: { product: Product; lang: 'en' | 'fi' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine images and video into a single media array
  const media = useMemo(() => {
    const items: { type: 'image' | 'video', src: string }[] = [];

    if (product.images) {
      String(product.images).split(',').forEach(img => {
        items.push({
          type: 'image',
          src: `/products/images/${product.id}/${img.trim()}`
        });
      });
    }

    if (product.video) {
      items.push({
        type: 'video',
        src: `/products/videos/${product.id}/${product.video.trim()}`
      });
    }

    return items;
  }, [product.images, product.video, product.id]);

  const nextMedia = () => {
    if (media.length <= 1) return;
    setCurrentIndex((curr) => (curr + 1) % media.length);
  };

  const prevMedia = () => {
    if (media.length <= 1) return;
    setCurrentIndex((curr) => (curr - 1 + media.length) % media.length);
  };

  const currentMedia = media[currentIndex];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="relative bg-gray-100 group overflow-hidden">
        {media.length > 0 ? (
          currentMedia.type === 'video' ? (
            <video
              src={currentMedia.src}
              className="w-full h-[400px] object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={currentMedia.src}
              alt={`${product.id} - ${currentIndex + 1}`}
              className="w-full h-[400px] object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
              }}
            />
          )
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center text-gray-400">
            No Media
          </div>
        )}

        {media.length > 1 && (
          <>
            <button
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); prevMedia(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full transition z-10 opacity-0 group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); nextMedia(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full transition z-10 opacity-0 group-hover:opacity-100"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {media.map((_, idx: number) => (
                <button
                  key={idx}
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition ${idx === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="text-gray-500 text-sm font-mono">{product.id}</div>
          <div className="text-purple-600 font-bold text-xl">
            €{product.price}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2">{tData(product.item, lang)}</h3>

        <div className="mb-3">
          <span className="inline-flex items-center bg-purple-50 text-purple-700 border border-purple-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            {tData(product.color, lang)}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
          <p className="leading-relaxed">{tData(product.fabric_and_work, lang)}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'fi'>('en');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<'catalog' | 'about'>('catalog');
  const [showContactDialog, setShowContactDialog] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    item: [] as string[],
    color: [] as string[],
    fabric: [] as string[],
    quality: [] as string[]
  });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const t = translations[lang];

  // Load Data
  useEffect(() => {
    Papa.parse(catalogData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedProducts = results.data as Product[];
        // Filter out any invalid rows if necessary
        const validProducts = parsedProducts
          .filter(p => p.id && p.price)
          .map(p => ({
            ...p,
            // Convert Rupees to Euros (approx 1 EUR = 90 INR)
            price: Number((p.price / 90).toFixed(2))
          }));
        setProducts(validProducts);
        setLoading(false);
      },
      error: (error: Error) => {
        console.error('Error parsing CSV:', error);
        setLoading(false);
      }
    });
  }, []);

  // Extract unique values for filters
  const uniqueValues = useMemo(() => {
    const getUnique = (key: keyof Product) =>
      Array.from(new Set(products.map(p => p[key]?.toString()).filter(Boolean))).sort();

    return {
      item: getUnique('item'),
      color: getUnique('color'),
      fabric: getUnique('fabric_and_work'),
      quality: getUnique('quality')
    };
  }, [products]);

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      item: [],
      color: [],
      fabric: [],
      quality: []
    });
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        !searchTerm ||
        Object.values(product).some(val =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      const minPrice = parseFloat(priceRange.min) || 0;
      const maxPrice = parseFloat(priceRange.max) || Infinity;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;

      const itemMatch = filters.item.length === 0 || filters.item.includes(product.item);
      const colorMatch = filters.color.length === 0 || filters.color.includes(product.color);
      const fabricMatch = filters.fabric.length === 0 || filters.fabric.includes(product.fabric_and_work);
      const qualityMatch = filters.quality.length === 0 || filters.quality.includes(product.quality);

      return searchMatch && priceMatch && itemMatch && colorMatch && fabricMatch && qualityMatch;
    });
  }, [products, searchTerm, filters, priceRange]);

  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 style={{ fontFamily: 'cursive', fontSize: '2.5rem', fontWeight: 'bold' }}>
              Auralane
            </h1>
            <div className="flex gap-2 bg-white/20 p-2 rounded-lg">
              <button
                onClick={() => setLang('en')}
                className={`px-4 py-2 rounded transition ${lang === 'en' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
                  }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('fi')}
                className={`px-4 py-2 rounded transition ${lang === 'fi' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
                  }`}
              >
                Suomi
              </button>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto p-8">
          <button
            onClick={() => setCurrentPage('catalog')}
            className="mb-6 text-purple-600 hover:text-purple-800"
          >
            ← {t.back}
          </button>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="mb-6" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{t.aboutUsTitle}</h2>
            <div className="space-y-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              <p><strong>{t.owner}:</strong> Rishi Kant Kumar</p>
              <p><strong>{t.maintainedBy}:</strong> Guru Consultants Oy</p>
              <p><strong>{t.websiteDesigner}:</strong> Jyothi Dayama</p>
            </div>
          </div>
        </div>
        <footer className="bg-white border-t mt-16 py-6">
          <div className="max-w-7xl mx-auto px-8 flex justify-center gap-8">
            <button onClick={() => setCurrentPage('about')} className="text-purple-600 hover:text-purple-800">
              {t.aboutUs}
            </button>
            <button onClick={() => setShowContactDialog(true)} className="text-purple-600 hover:text-purple-800">
              {t.contactUs}
            </button>
            <a href="mailto:guruconsultantsfinland@gmail.com" className="text-purple-600 hover:text-purple-800">
              {t.reportIssue}
            </a>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="w-[150px]" />
          <h1 className="flex-1 text-center" style={{ fontFamily: 'cursive', fontSize: '3.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Auralane
          </h1>
          <div className="flex gap-2 bg-white/20 p-2 rounded-lg">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded transition ${lang === 'en' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
                }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('fi')}
              className={`px-4 py-2 rounded transition ${lang === 'fi' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
                }`}
            >
              Suomi
            </button>
          </div>
        </div>
        <div className="flex gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition whitespace-nowrap"
          >
            {t.browse}
          </button>
          <div className="flex-1 flex bg-white rounded-lg overflow-hidden shadow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 px-4 py-3 outline-none text-gray-900"
            />
            <button className="bg-purple-600 text-white px-6 hover:bg-purple-700 transition">
              {t.search}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-[300px] bg-white shadow-lg p-6 overflow-y-auto h-[calc(100vh-200px)] sticky top-0">
            {/* Item */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.item}
              </h3>
              {uniqueValues.item.map((val) => (
                <label key={val} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.item.includes(val as string)}
                    onChange={() => toggleFilter('item', val as string)}
                    className="mr-2"
                  />
                  <span>{tData(val as string, lang)}</span>
                </label>
              )
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.color}
              </h3>
              {uniqueValues.color.map((val) => (
                <label key={val} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.color.includes(val as string)}
                    onChange={() => toggleFilter('color', val as string)}
                    className="mr-2"
                  />
                  <span>{tData(val as string, lang)}</span>
                </label>
              ))}
            </div>

            {/* Fabric */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.fabric}
              </h3>
              {uniqueValues.fabric.map((val) => (
                <label key={val} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.fabric.includes(val as string)}
                    onChange={() => toggleFilter('fabric', val as string)}
                    className="mr-2"
                  />
                  <span>{tData(val as string, lang)}</span>
                </label>
              ))}
            </div>

            {/* Quality */}
            {/* <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.quality}
              </h3>
              {uniqueValues.quality.map((val) => (
                <label key={val} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.quality.includes(val as string)}
                    onChange={() => toggleFilter('quality', val as string)}
                    className="mr-2"
                  />
                  <span>{val}</span>
                </label>
              ))}
            </div> */}

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.priceRange}
              </h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                  placeholder="Min"
                  className="w-20 px-2 py-1 border rounded"
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                  placeholder="Max"
                  className="w-20 px-2 py-1 border rounded"
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              {t.clearFilters}
            </button>
          </aside>
        )}

        {/* Products */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h2 className="text-gray-600">
              <span style={{ fontSize: '1.1rem' }}>{filteredProducts.length} {t.productsFound}</span>
            </h2>
          </div>
          {loading ? (
            <div className="text-center py-16 text-gray-500">
              <p style={{ fontSize: '1.2rem' }}>{t.loadingCatalog}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p style={{ fontSize: '1.2rem' }}>{t.noProductsFound}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-6">
        <div className="max-w-7xl mx-auto px-8 flex justify-center gap-8">
          <button onClick={() => setCurrentPage('about')} className="text-purple-600 hover:text-purple-800">
            {t.aboutUs}
          </button>
          <button onClick={() => setShowContactDialog(true)} className="text-purple-600 hover:text-purple-800">
            {t.contactUs}
          </button>
          <a href="mailto:guruconsultantsfinland@gmail.com" className="text-purple-600 hover:text-purple-800">
            {t.reportIssue}
          </a>
        </div>
      </footer>

      {/* Contact Dialog */}
      {showContactDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowContactDialog(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{t.contactUsTitle}</h2>
            <div className="mb-6">
              <p className="mb-4">Rishi Kant Kumar</p>
              <p className="text-gray-600">+91 99909 20613</p>
            </div>
            <div className="space-y-3">
              <a
                href="tel:+919990920613"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition"
              >
                📞 {t.call}
              </a>
              <a
                href="sms:+919990920613"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
              >
                💬 {t.sms}
              </a>
              <a
                href="https://wa.me/919990920613"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition"
              >
                📱 {t.whatsapp}
              </a>
            </div>
            <button
              onClick={() => setShowContactDialog(false)}
              className="w-full mt-4 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

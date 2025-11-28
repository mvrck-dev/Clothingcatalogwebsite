import React, { useState, useMemo } from 'react';

// Translations
const translations = {
  en: {
    browse: 'Browse Catalog',
    search: 'Search',
    searchPlaceholder: 'Search products by code, color, material, usage...',
    itemType: 'Item Type',
    mensApparel: "Men's Apparel",
    womensApparel: "Women's Apparel",
    childrensApparel: "Children's Apparel",
    bedsheets: 'Bedsheets',
    curtains: 'Curtains',
    material: 'Material',
    cotton: 'Cotton',
    silk: 'Silk',
    linen: 'Linen',
    polyester: 'Polyester',
    wool: 'Wool',
    color: 'Color',
    white: 'White',
    black: 'Black',
    blue: 'Blue',
    red: 'Red',
    beige: 'Beige',
    green: 'Green',
    yellow: 'Yellow',
    gray: 'Gray',
    brown: 'Brown',
    usage: 'Usage',
    dailyUse: 'Daily Use',
    partyWear: 'Party Wear',
    weddingBridal: 'Weddings/Bridal',
    sportswear: 'Sportswear',
    priceRange: 'Price Range (€)',
    clearFilters: 'Clear Filters',
    productsFound: 'products found',
    noProductsFound: 'No products match your search criteria.',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    reportIssue: 'Report Issue',
    aboutUsTitle: 'About Auralane',
    aboutUsContent: 'Auralane is owned by Rishi Kant Kumar. The website is maintained by Guru Consultants Oy. Website design by Jyothi Dayama.',
    contactUsTitle: 'Contact Us',
    call: 'Call',
    sms: 'SMS',
    whatsapp: 'WhatsApp',
    close: 'Close',
    reportIssueTitle: 'Report an Issue',
    back: 'Back'
  },
  fi: {
    browse: 'Selaa luetteloa',
    search: 'Hae',
    searchPlaceholder: 'Hae tuotteita koodin, värin, materiaalin, käytön mukaan...',
    itemType: 'Tuotetyyppi',
    mensApparel: 'Miesten vaatteet',
    womensApparel: 'Naisten vaatteet',
    childrensApparel: 'Lasten vaatteet',
    bedsheets: 'Lakanat',
    curtains: 'Verhot',
    material: 'Materiaali',
    cotton: 'Puuvilla',
    silk: 'Silkki',
    linen: 'Pellava',
    polyester: 'Polyesteri',
    wool: 'Villa',
    color: 'Väri',
    white: 'Valkoinen',
    black: 'Musta',
    blue: 'Sininen',
    red: 'Punainen',
    beige: 'Beige',
    green: 'Vihreä',
    yellow: 'Keltainen',
    gray: 'Harmaa',
    brown: 'Ruskea',
    usage: 'Käyttö',
    dailyUse: 'Päivittäinen käyttö',
    partyWear: 'Juhlavaatteet',
    weddingBridal: 'Häät/Morsiusasut',
    sportswear: 'Urheiluvaatteet',
    priceRange: 'Hintaluokka (€)',
    clearFilters: 'Tyhjennä suodattimet',
    productsFound: 'tuotetta löydetty',
    noProductsFound: 'Hakuehtosi eivät tuottaneet tuloksia.',
    aboutUs: 'Tietoa meistä',
    contactUs: 'Ota yhteyttä',
    reportIssue: 'Ilmoita ongelmasta',
    aboutUsTitle: 'Tietoa Auralane',
    aboutUsContent: 'Auralane on Rishi Kant Kumarin omistama. Verkkosivustoa ylläpitää Guru Consultants Oy. Verkkosivuston suunnittelu: Jyothi Dayama.',
    contactUsTitle: 'Ota yhteyttä',
    call: 'Soita',
    sms: 'Tekstiviesti',
    whatsapp: 'WhatsApp',
    close: 'Sulje',
    reportIssueTitle: 'Ilmoita ongelmasta',
    back: 'Takaisin'
  }
};

// Generate products
const generateProducts = () => {
  const itemTypes = ['mens-apparel', 'womens-apparel', 'childrens-apparel', 'bedsheets', 'curtains'];
  const colors = ['white', 'black', 'blue', 'red', 'beige', 'green', 'yellow', 'gray', 'brown'];
  const materials = ['cotton', 'silk', 'linen', 'polyester', 'wool'];
  const usages = ['daily', 'party', 'wedding', 'sportswear'];
  
  const images = {
    'mens-apparel': [
      'https://images.unsplash.com/photo-1760433468572-44d1cf0b8641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBmb3JtYWwlMjBzaGlydHxlbnwxfHx8fDE3NjQyNTA0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1631883958724-4aebab11b6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjYXN1YWwlMjB3ZWFyfGVufDF8fHx8MTc2NDI1MDcwNXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    'womens-apparel': [
      'https://images.unsplash.com/photo-1729146768776-8356708e907d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBhcnR5JTIwZHJlc3N8ZW58MXx8fHwxNzY0MzMwNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1756483510840-b0dda5f0dd0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGRyZXNzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjQyNzAzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1554321859-118e8b287c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGFsJTIwZHJlc3N8ZW58MXx8fHwxNzY0MzMwNTUxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    'childrens-apparel': [
      'https://images.unsplash.com/photo-1622218286192-95f6a20083c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc2NDI1OTc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758687125910-c233b47f47b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2FzdWFsJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0MzMwNTUxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    'bedsheets': [
      'https://images.unsplash.com/photo-1589895868947-b51095d437f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRzaGVldCUyMGxpbmVufGVufDF8fHx8MTc2NDMzMDU0OXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    'curtains': [
      'https://images.unsplash.com/photo-1764217543048-62710d6b0166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXJ0YWlucyUyMGhvbWV8ZW58MXx8fHwxNzY0MzMwNTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  };

  const products = [];
  let counter = 1;

  // Generate at least 25+ items per category to exceed 100 total
  for (const itemType of itemTypes) {
    const itemsPerCategory = 25;
    for (let i = 0; i < itemsPerCategory; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const usage = usages[Math.floor(Math.random() * usages.length)];
      const price = (Math.random() * 250 + 20).toFixed(2);
      
      const prefix = itemType.substring(0, 2).toUpperCase();
      const code = `${prefix}-${String(counter).padStart(3, '0')}-${color.substring(0, 3).toUpperCase()}`;
      
      products.push({
        code,
        price: parseFloat(price),
        itemType,
        color,
        material,
        usage,
        images: images[itemType as keyof typeof images]
      });
      
      counter++;
    }
  }

  return products;
};

const products = generateProducts();

// Product card with image carousel
function ProductCard({ product, lang }: { product: any; lang: 'en' | 'fi' }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const getTagLabel = (type: string, value: string) => {
    if (type === 'itemType') {
      const itemTypeMap: Record<string, keyof typeof translations.en> = {
        'mens-apparel': 'mensApparel',
        'womens-apparel': 'womensApparel',
        'childrens-apparel': 'childrensApparel',
        'bedsheets': 'bedsheets',
        'curtains': 'curtains'
      };
      return translations[lang][itemTypeMap[value]] || value;
    }
    if (type === 'usage') {
      const usageMap: Record<string, keyof typeof translations.en> = {
        daily: 'dailyUse',
        party: 'partyWear',
        wedding: 'weddingBridal',
        sportswear: 'sportswear'
      };
      return translations[lang][usageMap[value]] || value;
    }
    return translations[lang][value as keyof typeof translations.en] || value;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-[300px] bg-gray-100">
        <img
          src={product.images[currentImageIndex]}
          alt={product.code}
          className="w-full h-full object-cover"
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full transition"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full transition"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <div className="text-gray-500 text-sm mb-2">{product.code}</div>
        <div className="text-purple-600 mb-4" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
          €{product.price.toFixed(2)}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {getTagLabel('itemType', product.itemType)}
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {getTagLabel('color', product.color)}
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {getTagLabel('material', product.material)}
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {getTagLabel('usage', product.usage)}
          </span>
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
  const [filters, setFilters] = useState({
    itemType: [] as string[],
    material: [] as string[],
    color: [] as string[],
    usage: [] as string[]
  });
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const t = translations[lang];

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
      itemType: [],
      material: [],
      color: [],
      usage: []
    });
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        !searchTerm ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.usage.toLowerCase().includes(searchTerm.toLowerCase());

      const minPrice = parseFloat(priceRange.min) || 0;
      const maxPrice = parseFloat(priceRange.max) || Infinity;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;

      const itemTypeMatch =
        filters.itemType.length === 0 || filters.itemType.includes(product.itemType);
      const materialMatch =
        filters.material.length === 0 || filters.material.includes(product.material);
      const colorMatch = filters.color.length === 0 || filters.color.includes(product.color);
      const usageMatch = filters.usage.length === 0 || filters.usage.includes(product.usage);

      return searchMatch && priceMatch && itemTypeMatch && materialMatch && colorMatch && usageMatch;
    });
  }, [searchTerm, filters, priceRange]);

  const getItemTypeLabel = (item: string) => {
    const itemTypeMap: Record<string, keyof typeof translations.en> = {
      'mens-apparel': 'mensApparel',
      'womens-apparel': 'womensApparel',
      'childrens-apparel': 'childrensApparel',
      'bedsheets': 'bedsheets',
      'curtains': 'curtains'
    };
    return t[itemTypeMap[item]];
  };

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
                className={`px-4 py-2 rounded transition ${
                  lang === 'en' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('fi')}
                className={`px-4 py-2 rounded transition ${
                  lang === 'fi' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
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
              <p><strong>Owner:</strong> Rishi Kant Kumar</p>
              <p><strong>Maintained by:</strong> Guru Consultants Oy</p>
              <p><strong>Website Designer:</strong> Jyothi Dayama</p>
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
              className={`px-4 py-2 rounded transition ${
                lang === 'en' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('fi')}
              className={`px-4 py-2 rounded transition ${
                lang === 'fi' ? 'bg-white text-purple-600' : 'bg-white/30 text-white'
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
          <aside className="w-[300px] bg-white shadow-lg p-6 overflow-y-auto">
            {/* Item Type */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.itemType}
              </h3>
              {['mens-apparel', 'womens-apparel', 'childrens-apparel', 'bedsheets', 'curtains'].map(
                (item) => (
                  <label key={item} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.itemType.includes(item)}
                      onChange={() => toggleFilter('itemType', item)}
                      className="mr-2"
                    />
                    <span>{getItemTypeLabel(item)}</span>
                  </label>
                )
              )}
            </div>

            {/* Material */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.material}
              </h3>
              {['cotton', 'silk', 'linen', 'polyester', 'wool'].map((item) => (
                <label key={item} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.material.includes(item)}
                    onChange={() => toggleFilter('material', item)}
                    className="mr-2"
                  />
                  <span>{t[item as keyof typeof t]}</span>
                </label>
              ))}
            </div>

            {/* Color */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.color}
              </h3>
              {['white', 'black', 'blue', 'red', 'beige', 'green', 'yellow', 'gray', 'brown'].map((item) => (
                <label key={item} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.color.includes(item)}
                    onChange={() => toggleFilter('color', item)}
                    className="mr-2"
                  />
                  <span>{t[item as keyof typeof t]}</span>
                </label>
              ))}
            </div>

            {/* Usage */}
            <div className="mb-6">
              <h3 className="text-purple-600 mb-3 pb-2 border-b-2 border-purple-600">
                {t.usage}
              </h3>
              {['daily', 'party', 'wedding', 'sportswear'].map((item) => (
                <label key={item} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.usage.includes(item)}
                    onChange={() => toggleFilter('usage', item)}
                    className="mr-2"
                  />
                  <span>
                    {item === 'daily'
                      ? t.dailyUse
                      : item === 'party'
                      ? t.partyWear
                      : item === 'wedding'
                      ? t.weddingBridal
                      : t.sportswear}
                  </span>
                </label>
              ))}
            </div>

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
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p style={{ fontSize: '1.2rem' }}>{t.noProductsFound}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.code} product={product} lang={lang} />
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

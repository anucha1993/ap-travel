"use client";

import { useState, useMemo } from "react";

// ข้อมูลทัวร์ตัวอย่าง 10 ทัวร์
const toursData = [
  {
    id: 1,
    name: "โตเกียว ฟูจิ ซากุระ",
    country: "ญี่ปุ่น",
    countryCode: "JP",
    price: 29900,
    days: 5,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    tags: ["ซากุระ", "ภูเขาไฟฟูจิ", "ช้อปปิ้ง", "วัด"],
    description: "สัมผัสความงามของซากุระบาน ชมภูเขาไฟฟูจิ ช้อปปิ้งชินจูกุ",
    highlight: "🌸 ซากุระบาน"
  },
  {
    id: 2,
    name: "เกาหลี โซล ซูวอน",
    country: "เกาหลีใต้",
    countryCode: "KR",
    price: 19900,
    days: 4,
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=300&fit=crop",
    tags: ["K-POP", "เมียงดง", "ฮงแด", "พระราชวัง"],
    description: "ตะลุยโซล เยือนพระราชวังเคียงบก ช้อปปิ้งเมียงดง",
    highlight: "🎤 K-POP Tour"
  },
  {
    id: 3,
    name: "ปารีส หอไอเฟล",
    country: "ฝรั่งเศส",
    countryCode: "FR",
    price: 59900,
    days: 7,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    tags: ["หอไอเฟล", "ลูฟร์", "โรแมนติก", "ไวน์"],
    description: "เมืองแห่งความรัก ชมหอไอเฟล พิพิธภัณฑ์ลูฟร์ ล่องเรือแม่น้ำแซน",
    highlight: "💕 โรแมนติก"
  },
  {
    id: 4,
    name: "สวิตเซอร์แลนด์ แอลป์",
    country: "สวิตเซอร์แลนด์",
    countryCode: "CH",
    price: 79900,
    days: 8,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop",
    tags: ["เทือกเขาแอลป์", "รถไฟ", "ทะเลสาบ", "หิมะ"],
    description: "นั่งรถไฟชมเทือกเขาแอลป์ เที่ยวทะเลสาบสวยงาม",
    highlight: "🏔️ เทือกเขาแอลป์"
  },
  {
    id: 5,
    name: "ดูไบ อาบูดาบี",
    country: "สหรัฐอาหรับเอมิเรตส์",
    countryCode: "AE",
    price: 35900,
    days: 5,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    tags: ["บุรจญ์เคาะลีฟะฮ์", "ทะเลทราย", "หรูหรา", "ช้อปปิ้ง"],
    description: "สัมผัสความหรูหรา ชมตึกสูงที่สุดในโลก ขี่อูฐทะเลทราย",
    highlight: "🌟 หรูหรา"
  },
  {
    id: 6,
    name: "บาหลี อูบุด",
    country: "อินโดนีเซีย",
    countryCode: "ID",
    price: 15900,
    days: 4,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop",
    tags: ["นาขั้นบันได", "วัด", "สปา", "ธรรมชาติ"],
    description: "พักผ่อนบาหลี ชมนาขั้นบันได สปาผ่อนคลาย",
    highlight: "🌴 พักผ่อน"
  },
  {
    id: 7,
    name: "มัลดีฟส์ รีสอร์ท",
    country: "มัลดีฟส์",
    countryCode: "MV",
    price: 45900,
    days: 4,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop",
    tags: ["รีสอร์ท", "ทะเล", "ดำน้ำ", "ฮันนีมูน"],
    description: "พักวิลล่าริมทะเล น้ำใส ดำน้ำดูปะการัง",
    highlight: "🏝️ ทะเลสวย"
  },
  {
    id: 8,
    name: "ลอนดอน อังกฤษ",
    country: "อังกฤษ",
    countryCode: "GB",
    price: 55900,
    days: 6,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    tags: ["บิ๊กเบน", "พระราชวัง", "พิพิธภัณฑ์", "แฮร์รี่พอตเตอร์"],
    description: "เที่ยวลอนดอน ชมบิ๊กเบน พระราชวังบักกิงแฮม",
    highlight: "🎡 เมืองประวัติศาสตร์"
  },
  {
    id: 9,
    name: "ฮอกไกโด หิมะ",
    country: "ญี่ปุ่น",
    countryCode: "JP",
    price: 39900,
    days: 6,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    tags: ["หิมะ", "ออนเซ็น", "ปู", "สกี"],
    description: "เล่นสกี แช่ออนเซ็น กินปูยักษ์ ชมหิมะ",
    highlight: "❄️ หิมะ"
  },
  {
    id: 10,
    name: "เวียดนาม ดานัง",
    country: "เวียดนาม",
    countryCode: "VN",
    price: 9900,
    days: 3,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop",
    tags: ["บานาฮิลล์", "โฮยอัน", "ทะเล", "อาหาร"],
    description: "เที่ยวดานัง ชมสะพานมือยักษ์ ล่องเรือโฮยอัน",
    highlight: "🌉 สะพานมือ"
  }
];

// Quick Tags สำหรับค้นหาเร็ว
const quickTags = [
  { label: "🇯🇵 ญี่ปุ่น", query: "ญี่ปุ่น" },
  { label: "🇰🇷 เกาหลี", query: "เกาหลี" },
  { label: "🇪🇺 ยุโรป", query: "ฝรั่งเศส สวิตเซอร์แลนด์ อังกฤษ" },
  { label: "🏝️ ทะเล", query: "ทะเล" },
  { label: "❄️ หิมะ", query: "หิมะ" },
  { label: "💰 งบน้อย", query: "15000" },
  { label: "✈️ 3-4 วัน", query: "4 วัน" },
  { label: "💕 ฮันนีมูน", query: "โรแมนติก ฮันนีมูน" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Smart Search Function
  const filteredTours = useMemo(() => {
    if (!searchQuery.trim()) return toursData;

    const query = searchQuery.toLowerCase();
    const tokens = query.split(/\s+/).filter(t => t.length > 0);

    return toursData.filter(tour => {
      // สร้าง searchable text
      const searchText = `${tour.name} ${tour.country} ${tour.tags.join(" ")} ${tour.description} ${tour.highlight}`.toLowerCase();

      // ค้นหาตามราคา
      const priceMatch = query.match(/(\d{4,6})/);
      if (priceMatch) {
        const maxPrice = parseInt(priceMatch[1]);
        if (tour.price > maxPrice) return false;
      }

      // ค้นหาตามจำนวนวัน
      const daysMatch = query.match(/(\d+)\s*(วัน|day|d)/i);
      if (daysMatch) {
        const days = parseInt(daysMatch[1]);
        if (Math.abs(tour.days - days) > 1) return false;
      }

      // ค้นหาตาม keyword
      return tokens.every(token => {
        if (/^\d+$/.test(token)) return true; // skip pure numbers (already handled)
        return searchText.includes(token);
      });
    });
  }, [searchQuery]);

  // Suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const q = searchQuery.toLowerCase();
    const results: { type: string; text: string; icon: string }[] = [];

    // แนะนำประเทศ
    const countries = [...new Set(toursData.map(t => t.country))];
    countries.forEach(c => {
      if (c.toLowerCase().includes(q) || c.includes(searchQuery)) {
        results.push({ type: "country", text: c, icon: "🌍" });
      }
    });

    // แนะนำทัวร์
    toursData.forEach(tour => {
      if (tour.name.toLowerCase().includes(q) || tour.name.includes(searchQuery)) {
        results.push({ type: "tour", text: tour.name, icon: "✈️" });
      }
    });

    // แนะนำ tags
    const allTags = [...new Set(toursData.flatMap(t => t.tags))];
    allTags.forEach(tag => {
      if (tag.toLowerCase().includes(q) || tag.includes(searchQuery)) {
        results.push({ type: "tag", text: tag, icon: "🏷️" });
      }
    });

    return results.slice(0, 6);
  }, [searchQuery]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  const handleSuggestionClick = (text: string) => {
    setSearchQuery(text);
    setShowSuggestions(false);
  };

  const handleQuickTag = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          {/* Logo */}
          <div className="logo">
            <span className="logo-icon">✈️</span>
            <span className="logo-text">AP Travel</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">ค้นหาทัวร์ในฝันของคุณ</h1>
          <p className="hero-subtitle">
            พิมพ์อะไรก็ได้ เช่น &quot;ญี่ปุ่น 5 วัน&quot; หรือ &quot;งบ 30000&quot; หรือ &quot;ทะเล ฮันนีมูน&quot;
          </p>

          {/* Search Box */}
          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="ค้นหาทัวร์... ประเทศ, งบ, จำนวนวัน"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {searchQuery && (
                <button
                  className="clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(s.text)}
                  >
                    <span className="suggestion-icon">{s.icon}</span>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tags */}
          <div className="quick-tags">
            {quickTags.map((tag, i) => (
              <button
                key={i}
                className={`quick-tag ${searchQuery === tag.query ? "active" : ""}`}
                onClick={() => handleQuickTag(tag.query)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="results-header">
          <h2>
            {searchQuery ? (
              <>
                ผลการค้นหา &quot;{searchQuery}&quot;
                <span className="results-count">({filteredTours.length} ทัวร์)</span>
              </>
            ) : (
              <>
                ทัวร์แนะนำ
                <span className="results-count">({toursData.length} ทัวร์)</span>
              </>
            )}
          </h2>
        </div>

        {/* Tour Grid */}
        <div className="tour-grid">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <article key={tour.id} className="tour-card">
                <div className="tour-image-container">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="tour-image"
                    loading="lazy"
                  />
                  <span className="tour-highlight">{tour.highlight}</span>
                  <span className="tour-days">{tour.days} วัน</span>
                </div>

                <div className="tour-content">
                  <div className="tour-country">{tour.country}</div>
                  <h3 className="tour-name">{tour.name}</h3>
                  <p className="tour-description">{tour.description}</p>

                  <div className="tour-tags">
                    {tour.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="tour-tag"
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="tour-footer">
                    <div className="tour-price">
                      <span className="price-label">เริ่มต้น</span>
                      <span className="price-value">฿{formatPrice(tour.price)}</span>
                    </div>
                    <button className="book-btn">ดูรายละเอียด</button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>ไม่พบทัวร์ที่ค้นหา</h3>
              <p>ลองค้นหาด้วยคำอื่น เช่น ประเทศ, งบประมาณ, หรือกิจกรรม</p>
              <button
                className="reset-btn"
                onClick={() => setSearchQuery("")}
              >
                ดูทัวร์ทั้งหมด
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">✈️</span>
            <span>AP Travel</span>
          </div>
          <p>© 2026 AP Travel. ใบอนุญาตเลขที่ 11/XXXXX</p>
          <div className="footer-contact">
            <span>📞 02-XXX-XXXX</span>
            <span>📱 Line: @aptravel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

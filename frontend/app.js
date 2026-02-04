const { useEffect, useMemo, useState } = React;

const translations = {
  EN: {
    home: "Home",
    races: "Races",
    wiki: "Wiki",
    horses: "Horses",
    jockeys: "Jockeys",
    hallOfFame: "Hall of Fame",
    heroTitle: "Royal Racing System",
    heroSubtitle: "Luxury-grade ticketing with absolute transparency, verified schedules, and live arena insights.",
    heroDescription:
      "Every race is sourced from real-world venues (Ascot, Churchill Downs, Nakayama) with secure, auditable ticket flows.",
    featureRaces: "Feature Races",
    countdown: "Countdown",
    fieldSize: "Field size",
    distance: "Distance",
    price: "Ticket price",
    seats: "Seats left",
    buyNow: "Buy ticket",
    viewSchedule: "View schedule",
    racesSchedule: "Races schedule",
    filterCountry: "Filter by country",
    all: "All",
    pledgeTitle: "Real race commitment",
    pledgeText:
      "We only list official racing venues. No virtual or simulated races are accepted in Royal Racing System.",
    wikiTitle: "Royal Racing Wiki",
    wikiSubtitle: "Verified data for every horse, jockey, and legend.",
    status: "Status",
    lineage: "Lineage",
    achievements: "Achievements",
    follow: "Follow",
    following: "Following",
    notifications: "Notifications",
    liveWeather: "Live weather",
    seatingPlan: "Interactive seating plan",
    selectSeat: "Select grandstand",
    seatA: "Grandstand A",
    seatB: "Grandstand B",
    seatVIP: "VIP Lounge",
    confirm: "Confirm purchase",
    ticketSummary: "Ticket summary",
    hello: "Hello",
    signIn: "Sign in",
    signUp: "Sign up",
    myTickets: "My Tickets",
    upcomingAlert: "Upcoming race alert",
    close: "Close",
    noNotifications: "No notifications yet.",
    followAlert: "New schedule for",
  },
  JP: {
    home: "ホーム",
    races: "レース",
    wiki: "ウィキ",
    horses: "競走馬",
    jockeys: "ジョッキー",
    hallOfFame: "殿堂入り",
    heroTitle: "ロイヤルレーシング",
    heroSubtitle: "透明性と安全性を重視したプレミアムチケットシステム。",
    heroDescription:
      "Ascot、チャーチルダウンズ、ナカヤマなど実在の競馬場のみを掲載します。",
    featureRaces: "注目レース",
    countdown: "発走まで",
    fieldSize: "出走頭数",
    distance: "距離",
    price: "価格",
    seats: "残席",
    buyNow: "チケット購入",
    viewSchedule: "スケジュール",
    racesSchedule: "レース日程",
    filterCountry: "国別フィルター",
    all: "すべて",
    pledgeTitle: "実在レースのみ",
    pledgeText: "Royal Racing Systemは公式競馬場のレースのみを提供します。",
    wikiTitle: "ロイヤルレーシング・ウィキ",
    wikiSubtitle: "すべてのデータは実在の情報です。",
    status: "ステータス",
    lineage: "血統",
    achievements: "実績",
    follow: "フォロー",
    following: "フォロー中",
    notifications: "通知",
    liveWeather: "現地天気",
    seatingPlan: "座席マップ",
    selectSeat: "座席を選択",
    seatA: "スタンドA",
    seatB: "スタンドB",
    seatVIP: "VIPラウンジ",
    confirm: "購入確認",
    ticketSummary: "購入内容",
    hello: "こんにちは",
    signIn: "ログイン",
    signUp: "新規登録",
    myTickets: "チケット",
    upcomingAlert: "レース通知",
    close: "閉じる",
    noNotifications: "通知はまだありません。",
    followAlert: "新しいレース予定:",
  },
  VI: {
    home: "Trang chủ",
    races: "Chặng đua",
    wiki: "Wiki",
    horses: "Ngựa đua",
    jockeys: "Nài ngựa",
    hallOfFame: "Huyền thoại",
    heroTitle: "Royal Racing System",
    heroSubtitle: "Hệ thống bán vé cao cấp với bảo mật tuyệt đối và dữ liệu minh bạch.",
    heroDescription:
      "Mọi trận đấu đều đến từ trường đua thực tế (Ascot, Churchill Downs, Nakayama) và được xác minh 100%.",
    featureRaces: "Trận đấu tiêu điểm",
    countdown: "Đếm ngược",
    fieldSize: "Số ngựa",
    distance: "Chiều dài",
    price: "Giá vé",
    seats: "Số chỗ còn",
    buyNow: "Mua vé",
    viewSchedule: "Xem lịch",
    racesSchedule: "Lịch chặng đua",
    filterCountry: "Lọc theo quốc gia",
    all: "Tất cả",
    pledgeTitle: "Cam kết dữ liệu thật",
    pledgeText:
      "Royal Racing System chỉ cung cấp các giải đua thực tế, tuyệt đối không có giải ảo.",
    wikiTitle: "Kho báu Wiki",
    wikiSubtitle: "Dữ liệu chuẩn xác cho từng ngựa, nài ngựa và huyền thoại.",
    status: "Trạng thái",
    lineage: "Phả hệ",
    achievements: "Danh hiệu",
    follow: "Theo dõi",
    following: "Đang theo dõi",
    notifications: "Thông báo",
    liveWeather: "Thời tiết trực tiếp",
    seatingPlan: "Sơ đồ chỗ ngồi",
    selectSeat: "Chọn khán đài",
    seatA: "Khán đài A",
    seatB: "Khán đài B",
    seatVIP: "Khán đài VIP",
    confirm: "Xác nhận mua",
    ticketSummary: "Thông tin vé",
    hello: "Xin chào",
    signIn: "Đăng nhập",
    signUp: "Đăng ký",
    myTickets: "Vé của tôi",
    upcomingAlert: "Thông báo lịch đua",
    close: "Đóng",
    noNotifications: "Chưa có thông báo.",
    followAlert: "Lịch thi đấu mới cho",
  },
};

const featureRaces = [
  {
    id: 1,
    name: "Kentucky Derby",
    country: "USA",
    venue: "Churchill Downs",
    startsAt: "2025-05-04T18:30:00Z",
    fieldSize: 20,
    distance: "2000m",
    price: 180,
    totalSeats: 3200,
    availableSeats: 842,
    weather: "Louisville · 18°C · Clear",
  },
  {
    id: 2,
    name: "Arima Kinen",
    country: "Japan",
    venue: "Nakayama",
    startsAt: "2025-12-22T06:40:00Z",
    fieldSize: 16,
    distance: "2500m",
    price: 140,
    totalSeats: 2400,
    availableSeats: 665,
    weather: "Chiba · 12°C · Light rain",
  },
  {
    id: 3,
    name: "Royal Ascot Gold Cup",
    country: "UK",
    venue: "Ascot",
    startsAt: "2025-06-20T15:20:00Z",
    fieldSize: 12,
    distance: "3200m",
    price: 210,
    totalSeats: 2800,
    availableSeats: 430,
    weather: "Berkshire · 16°C · Cloudy",
  },
];

const racesSchedule = [
  {
    id: 101,
    name: "Dubai World Cup",
    country: "USA",
    date: "2025-03-29",
    venue: "Churchill Downs",
  },
  {
    id: 102,
    name: "Kentucky Derby",
    country: "USA",
    date: "2025-05-04",
    venue: "Churchill Downs",
  },
  {
    id: 103,
    name: "Royal Ascot Gold Cup",
    country: "UK",
    date: "2025-06-20",
    venue: "Ascot",
  },
  {
    id: 104,
    name: "King George VI and Queen Elizabeth Stakes",
    country: "UK",
    date: "2025-07-27",
    venue: "Ascot",
  },
  {
    id: 105,
    name: "Japan Cup",
    country: "Japan",
    date: "2025-11-24",
    venue: "Tokyo Racecourse",
  },
  {
    id: 106,
    name: "Arima Kinen",
    country: "Japan",
    date: "2025-12-22",
    venue: "Nakayama",
  },
];

const horses = [
  {
    id: "horse-1",
    name: "Equinox",
    status: "Active",
    color: "Bay",
    dob: "2019-03-23",
    age: 6,
    startYear: 2021,
    winRate: "76%",
    starts: 12,
    achievements: ["Japan Cup", "Arima Kinen", "Tenno Sho (Autumn)"],
    lineage: {
      sire: "Kitasan Black",
      dam: "Château Blanche",
      grandsire: "Black Tide",
      granddam: "Blanche",
      broodmareSire: "King Halo",
      broodmareDam: "Winds in Her Hair",
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Equinox_20221225.jpg",
  },
];

const jockeys = [
  {
    id: "jockey-1",
    name: "Yutaka Take",
    dob: "1969-03-15",
    gender: "Male",
    status: "Active",
    startYear: 1987,
    achievements: ["Japan Cup", "Arima Kinen", "Tokyo Yushun"],
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Yutaka_Take_2017.jpg",
  },
  {
    id: "jockey-2",
    name: "Frankie Dettori",
    dob: "1970-12-15",
    gender: "Male",
    status: "Active",
    startYear: 1986,
    achievements: ["Ascot Gold Cup", "Prix de l'Arc de Triomphe"],
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Frankie_Dettori_2014.jpg",
  },
];

const hallOfFame = [
  {
    id: "legend-1",
    name: "Deep Impact",
    status: "Retired",
    color: "Bay",
    dob: "2002-03-25",
    age: "2002-2019",
    retiredOn: "2006-12-24",
    startYear: 2004,
    winRate: "75%",
    starts: 14,
    achievements: ["Japanese Triple Crown", "Japan Cup", "Arima Kinen"],
    lineage: {
      sire: "Sunday Silence",
      dam: "Wind In Her Hair",
      grandsire: "Halo",
      granddam: "Wishing Well",
      broodmareSire: "Alzao",
      broodmareDam: "Burghclere",
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Deep_Impact_20061224.jpg",
  },
  {
    id: "legend-2",
    name: "Secretariat",
    status: "Hall of Fame",
    color: "Chestnut",
    dob: "1970-03-30",
    age: "1970-1989",
    retiredOn: "1973-11-06",
    startYear: 1972,
    winRate: "89%",
    starts: 21,
    achievements: ["Triple Crown", "Kentucky Derby", "Belmont Stakes"],
    lineage: {
      sire: "Bold Ruler",
      dam: "Somethingroyal",
      grandsire: "Nasrullah",
      granddam: "Miss Disco",
      broodmareSire: "Princequillo",
      broodmareDam: "Imperatrice",
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Secretariat_1973.jpg",
  },
];

const getFallbackImage = (event) => {
  event.target.src = "assets/cup-logo.svg";
};

const formatCountdown = (startsAt) => {
  const distance = new Date(startsAt) - new Date();
  if (distance <= 0) {
    return "00:00:00";
  }
  const totalSeconds = Math.floor(distance / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const Header = ({ lang, setLang, tickets, accountName }) => {
  const [showWiki, setShowWiki] = useState(false);
  const text = translations[lang];
  return (
    <header>
      <div className="logo">
        <img src="assets/cup-logo.svg" alt="Royal Racing" />
        <span>Royal Racing</span>
      </div>
      <nav>
        <a href="#home">{text.home}</a>
        <a href="#races">{text.races}</a>
        <div
          className="dropdown"
          onMouseEnter={() => setShowWiki(true)}
          onMouseLeave={() => setShowWiki(false)}
        >
          <button type="button">{text.wiki}</button>
          {showWiki && (
            <div className="dropdown-menu">
              <a href="#horses">{text.horses}</a>
              <a href="#jockeys">{text.jockeys}</a>
              <a href="#hall">{text.hallOfFame}</a>
            </div>
          )}
        </div>
      </nav>
      <div className="header-actions">
        <div className="language-switcher">
          {Object.keys(translations).map((option) => (
            <button
              key={option}
              className={lang === option ? "active" : ""}
              onClick={() => setLang(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
        <div>
          {text.myTickets}
          <span className="ticket-badge">{tickets}</span>
        </div>
        <div>
          {accountName ? `${text.hello}, ${accountName}` : `${text.signIn} / ${text.signUp}`}
        </div>
      </div>
    </header>
  );
};

const FeatureRaceCard = ({ race, onBuy, lang }) => {
  const text = translations[lang];
  const [countdown, setCountdown] = useState(formatCountdown(race.startsAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(formatCountdown(race.startsAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [race.startsAt]);

  return (
    <div className="card">
      <div className="badge">
        {race.venue} · {race.country}
      </div>
      <h3>{race.name}</h3>
      <div>
        <strong>{text.countdown}:</strong> {countdown}
      </div>
      <div>
        <strong>{text.fieldSize}:</strong> {race.fieldSize}
      </div>
      <div>
        <strong>{text.distance}:</strong> {race.distance}
      </div>
      <div>
        <strong>{text.price}:</strong> ${race.price}
      </div>
      <div>
        <strong>{text.seats}:</strong> {race.availableSeats} / {race.totalSeats}
      </div>
      <div className="badge">
        {text.liveWeather}: {race.weather}
      </div>
      <button type="button" onClick={() => onBuy(race)}>
        {text.buyNow}
      </button>
    </div>
  );
};

const RacesSchedule = ({ lang }) => {
  const text = translations[lang];
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => {
    if (filter === "All") {
      return racesSchedule;
    }
    return racesSchedule.filter((race) => race.country === filter);
  }, [filter]);

  return (
    <section className="section" id="races">
      <h2>{text.racesSchedule}</h2>
      <div className="filters">
        {["All", "USA", "Japan", "UK"].map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item === "All" ? text.all : item}
          </button>
        ))}
      </div>
      <div className="cards">
        {filtered.map((race) => (
          <div className="card" key={race.id}>
            <div className="badge">
              {race.country} · {race.venue}
            </div>
            <h3>{race.name}</h3>
            <div>{race.date}</div>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>{text.pledgeTitle}</h3>
        <p>{text.pledgeText}</p>
      </div>
    </section>
  );
};

const WikiSection = ({ title, items, type, lang, onFollow, following }) => {
  const text = translations[lang];
  return (
    <section className="section" id={type}>
      <h2>{title}</h2>
      <div className="grid-two">
        {items.map((item) => (
          <div className="wiki-card" key={item.id}>
            <img src={item.image} alt={item.name} onError={getFallbackImage} />
            <h3>{item.name}</h3>
            <div className="meta">
              {text.status}: {item.status}
            </div>
            {item.color && <div className="meta">Color: {item.color}</div>}
            {item.dob && <div className="meta">DOB: {item.dob}</div>}
            {item.retiredOn && (
              <div className="meta">Retired: {item.retiredOn}</div>
            )}
            {item.lineage && (
              <div className="lineage">
                <strong>{text.lineage}</strong>
                <br />
                Sire: {item.lineage.sire}
                <br />
                Dam: {item.lineage.dam}
                <br />
                Grandsire: {item.lineage.grandsire}
                <br />
                Granddam: {item.lineage.granddam}
              </div>
            )}
            {item.achievements && (
              <div>
                <strong>{text.achievements}:</strong> {item.achievements.join(", ")}
              </div>
            )}
            <button
              className={following.includes(item.id) ? "secondary" : ""}
              type="button"
              onClick={() => onFollow(item.id, item.name)}
            >
              {following.includes(item.id) ? text.following : text.follow}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const Modal = ({ race, onClose, onConfirm, lang }) => {
  const text = translations[lang];
  const [seat, setSeat] = useState(text.seatA);
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{text.seatingPlan}</h3>
        <p>
          {text.selectSeat} - {race.name}
        </p>
        <div className="seating-grid">
          {[text.seatA, text.seatB, text.seatVIP].map((option) => (
            <button
              key={option}
              type="button"
              className={seat === option ? "secondary" : ""}
              onClick={() => setSeat(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div>
          <strong>{text.ticketSummary}</strong>
          <div>
            {race.name} · {seat}
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" onClick={() => onConfirm(seat)}>
            {text.confirm}
          </button>
          <button type="button" className="secondary" onClick={onClose}>
            {text.close}
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState("VI");
  const [tickets, setTickets] = useState(2);
  const [accountName] = useState("Minh Anh");
  const [modalRace, setModalRace] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [following, setFollowing] = useState([]);
  const text = translations[lang];

  const handleBuy = (race) => {
    setModalRace(race);
  };

  const handleConfirm = (seat) => {
    setTickets((prev) => prev + 1);
    setModalRace(null);
    setNotifications((prev) => [
      `${text.upcomingAlert}: ${modalRace.name} · ${seat}`,
      ...prev,
    ]);
  };

  const handleFollow = (id, name) => {
    setFollowing((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setNotifications((prev) => [
      `${text.followAlert} ${name}.`,
      ...prev,
    ]);
  };

  return (
    <div>
      <Header
        lang={lang}
        setLang={setLang}
        tickets={tickets}
        accountName={accountName}
      />
      <main>
        <section className="hero" id="home">
          <h1>{text.heroTitle}</h1>
          <h2>{text.heroSubtitle}</h2>
          <p>{text.heroDescription}</p>
        </section>

        <section className="section">
          <h2>{text.featureRaces}</h2>
          <div className="cards">
            {featureRaces.map((race) => (
              <FeatureRaceCard
                key={race.id}
                race={race}
                onBuy={handleBuy}
                lang={lang}
              />
            ))}
          </div>
        </section>

        <RacesSchedule lang={lang} />

        <section className="section" id="wiki">
          <h2>{text.wikiTitle}</h2>
          <p>{text.wikiSubtitle}</p>
        </section>

        <WikiSection
          title={text.horses}
          items={horses}
          type="horses"
          lang={lang}
          onFollow={handleFollow}
          following={following}
        />

        <WikiSection
          title={text.jockeys}
          items={jockeys}
          type="jockeys"
          lang={lang}
          onFollow={handleFollow}
          following={following}
        />

        <WikiSection
          title={text.hallOfFame}
          items={hallOfFame}
          type="hall"
          lang={lang}
          onFollow={handleFollow}
          following={following}
        />

        <section className="section">
          <h2>{text.notifications}</h2>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div>{text.noNotifications}</div>
            ) : (
              notifications.map((note, index) => <div key={index}>{note}</div>)
            )}
          </div>
        </section>

        <footer className="footer">
          <div>© 2025 Royal Racing System</div>
          <div>{text.pledgeText}</div>
        </footer>
      </main>
      {modalRace && (
        <Modal
          race={modalRace}
          onClose={() => setModalRace(null)}
          onConfirm={handleConfirm}
          lang={lang}
        />
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

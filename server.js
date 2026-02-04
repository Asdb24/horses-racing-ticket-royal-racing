const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 3000;

const featuredRaces = [
  {
    id: 'kentucky-derby',
    name: 'Kentucky Derby',
    location: 'Churchill Downs, USA',
    date: '2025-05-03T18:57:00-04:00',
    distance: '1.25 miles',
    horses: 20,
    seatsRemaining: 320,
    priceUSD: 125
  },
  {
    id: 'royal-ascot',
    name: 'Royal Ascot (Opening Day)',
    location: 'Ascot Racecourse, UK',
    date: '2025-06-17T13:30:00+01:00',
    distance: '1 mile (feature races)',
    horses: 16,
    seatsRemaining: 240,
    priceUSD: 160
  },
  {
    id: 'arima-kinen',
    name: 'Arima Kinen',
    location: 'Nakayama Racecourse, Japan',
    date: '2025-12-28T15:25:00+09:00',
    distance: '2,500 m',
    horses: 16,
    seatsRemaining: 180,
    priceUSD: 140
  }
];

const ticketTiers = [
  {
    id: 'standard',
    label: 'Standard',
    color: '#c7a17a',
    priceUSD: 95,
    seatsRemaining: 180
  },
  {
    id: 'premium',
    label: 'Premium',
    color: '#9c6b43',
    priceUSD: 160,
    seatsRemaining: 90
  },
  {
    id: 'vip',
    label: 'VIP',
    color: '#5b3a22',
    priceUSD: 280,
    seatsRemaining: 35
  }
];

const horses = [
  {
    name: 'Equinox',
    country: 'Japan',
    color: 'Bay',
    foaled: '2019-03-23',
    started: 2021,
    record: '10 starts • 8 wins',
    titles: 'Arima Kinen (2022), Tenno Sho (Autumn) (2022)'
  },
  {
    name: 'Flightline',
    country: 'USA',
    color: 'Bay',
    foaled: '2018-03-14',
    started: 2020,
    record: '6 starts • 6 wins',
    titles: 'Breeders\' Cup Classic (2022), Pacific Classic (2022)'
  },
  {
    name: 'Frankel',
    country: 'UK',
    color: 'Bay',
    foaled: '2008-02-11',
    started: 2010,
    record: '14 starts • 14 wins',
    titles: 'Queen Elizabeth II Stakes (2011), Sussex Stakes (2011)'
  }
];

const hallOfFame = [
  {
    name: 'Secretariat',
    country: 'USA',
    color: 'Chestnut',
    foaled: '1970-03-30',
    started: 1972,
    record: '21 starts • 16 wins',
    titles: 'Triple Crown (1973), Belmont Stakes record',
    retired: '1974',
    memorial: '1989-10-04'
  },
  {
    name: 'Deep Impact',
    country: 'Japan',
    color: 'Bay',
    foaled: '2002-03-25',
    started: 2004,
    record: '14 starts • 12 wins',
    titles: 'Japanese Triple Crown (2005), Arima Kinen (2006)',
    retired: '2006',
    memorial: '2019-07-30'
  }
];

const jockeys = [
  {
    name: 'Frankie Dettori',
    birth: '1970-12-15',
    gender: 'Male',
    status: 'Active',
    started: 1987,
    wins: 'Over 3,000 wins',
    awards: 'Prix de l\'Arc de Triomphe (multiple), Champion Jockey (UK)'
  },
  {
    name: 'Yutaka Take',
    birth: '1969-03-15',
    gender: 'Male',
    status: 'Active',
    started: 1987,
    wins: 'Over 4,000 wins',
    awards: 'Japan Cup, Tokyo Yushun (Japanese Derby)'
  },
  {
    name: 'John Velazquez',
    birth: '1971-11-24',
    gender: 'Male',
    status: 'Active',
    started: 1990,
    wins: 'Over 5,000 wins',
    awards: 'Kentucky Derby, Belmont Stakes, Breeders\' Cup Classic'
  }
];

const news = [
  {
    title: 'Royal Ascot confirms traditional five-day festival schedule',
    source: 'Ascot Racecourse',
    location: 'UK',
    date: '2024-11-01'
  },
  {
    title: 'Churchill Downs outlines Kentucky Derby week security upgrades',
    source: 'Churchill Downs',
    location: 'USA',
    date: '2024-10-10'
  },
  {
    title: 'Japan Racing Association previews year-end championship meets',
    source: 'JRA',
    location: 'Japan',
    date: '2024-10-25'
  }
];

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const sendFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  if (req.method === 'GET' && pathname === '/api/featured-races') {
    sendJson(res, 200, featuredRaces);
    return;
  }

  if (req.method === 'GET' && pathname === '/api/ticket-tiers') {
    sendJson(res, 200, ticketTiers);
    return;
  }

  if (req.method === 'GET' && pathname === '/api/horses') {
    sendJson(res, 200, horses);
    return;
  }

  if (req.method === 'GET' && pathname === '/api/hall-of-fame') {
    sendJson(res, 200, hallOfFame);
    return;
  }

  if (req.method === 'GET' && pathname === '/api/jockeys') {
    sendJson(res, 200, jockeys);
    return;
  }

  if (req.method === 'GET' && pathname === '/api/news') {
    sendJson(res, 200, news);
    return;
  }

  if (req.method === 'POST' && pathname === '/api/purchase') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const payload = body ? JSON.parse(body) : {};
      const { tierId, quantity } = payload;
      const tier = ticketTiers.find((item) => item.id === tierId);
      const amount = Number(quantity);

      if (!tier || Number.isNaN(amount) || amount <= 0) {
        sendJson(res, 400, { message: 'Invalid purchase request.' });
        return;
      }

      if (tier.seatsRemaining < amount) {
        sendJson(res, 409, { message: 'Not enough seats remaining.' });
        return;
      }

      tier.seatsRemaining -= amount;
      sendJson(res, 200, {
        message: 'Purchase confirmed.',
        tierId: tier.id,
        seatsRemaining: tier.seatsRemaining
      });
    });
    return;
  }

  const publicPath = path.join(__dirname, 'public');
  const htmlRoutes = {
    '/': 'index.html',
    '/index.html': 'index.html',
    '/races.html': 'races.html',
    '/horses.html': 'horses.html',
    '/jockeys.html': 'jockeys.html',
    '/hall-of-fame.html': 'hall-of-fame.html',
    '/wiki.html': 'wiki.html'
  };

  if (req.method === 'GET' && htmlRoutes[pathname]) {
    sendFile(res, path.join(publicPath, htmlRoutes[pathname]), 'text/html');
    return;
  }

  if (req.method === 'GET' && pathname === '/styles.css') {
    sendFile(res, path.join(publicPath, 'styles.css'), 'text/css');
    return;
  }

  if (req.method === 'GET' && pathname === '/app.js') {
    sendFile(res, path.join(publicPath, 'app.js'), 'text/javascript');
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Royal Racing running on http://localhost:${PORT}`);
});

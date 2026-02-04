const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const { exec } = require('child_process');

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
    priceUSD: 125,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Churchill_Downs_2019.jpg'
  },
  {
    id: 'royal-ascot',
    name: 'Royal Ascot (Opening Day)',
    location: 'Ascot Racecourse, UK',
    date: '2025-06-17T13:30:00+01:00',
    distance: '1 mile (feature races)',
    horses: 16,
    seatsRemaining: 240,
    priceUSD: 160,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Ascot_Racecourse_2006.jpg'
  },
  {
    id: 'arima-kinen',
    name: 'Arima Kinen',
    location: 'Nakayama Racecourse, Japan',
    date: '2025-12-28T15:25:00+09:00',
    distance: '2,500 m',
    horses: 16,
    seatsRemaining: 180,
    priceUSD: 140,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nakayama_Racecourse_2004.jpg'
  },
  {
    id: 'breeders-cup-classic',
    name: "Breeders' Cup Classic",
    location: 'Del Mar, USA',
    date: '2025-11-01T17:45:00-07:00',
    distance: '1.25 miles',
    horses: 14,
    seatsRemaining: 210,
    priceUSD: 190,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Del_Mar_Racetrack.jpg'
  },
  {
    id: 'preakness-stakes',
    name: 'Preakness Stakes',
    location: 'Pimlico Race Course, USA',
    date: '2025-05-17T18:50:00-04:00',
    distance: '1 3/16 miles',
    horses: 14,
    seatsRemaining: 200,
    priceUSD: 135,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Pimlico_Race_Course_2019.jpg'
  },
  {
    id: 'japan-cup',
    name: 'Japan Cup',
    location: 'Tokyo Racecourse, Japan',
    date: '2025-11-30T15:40:00+09:00',
    distance: '2,400 m',
    horses: 18,
    seatsRemaining: 240,
    priceUSD: 150,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tokyo_Racecourse_2016.jpg'
  },
  {
    id: 'epsom-derby',
    name: 'Epsom Derby',
    location: 'Epsom Downs, UK',
    date: '2025-06-07T15:30:00+01:00',
    distance: '1 mile 4 furlongs',
    horses: 16,
    seatsRemaining: 190,
    priceUSD: 155,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Epsom_Downs_Racecourse.jpg'
  },
  {
    id: 'belmont-stakes',
    name: 'Belmont Stakes',
    location: 'Belmont Park, USA',
    date: '2025-06-07T19:00:00-04:00',
    distance: '1.5 miles',
    horses: 12,
    seatsRemaining: 170,
    priceUSD: 130,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Belmont_Park_2021.jpg'
  },
  {
    id: 'tenno-sho-autumn',
    name: 'Tenno Sho (Autumn)',
    location: 'Tokyo Racecourse, Japan',
    date: '2025-11-02T15:40:00+09:00',
    distance: '2,000 m',
    horses: 17,
    seatsRemaining: 220,
    priceUSD: 135,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tokyo_Racecourse_2016.jpg'
  },
  {
    id: 'cheltenham-gold-cup',
    name: 'Cheltenham Gold Cup',
    location: 'Cheltenham, UK',
    date: '2025-03-14T15:30:00+00:00',
    distance: '3 miles 2½ furlongs',
    horses: 14,
    seatsRemaining: 180,
    priceUSD: 145,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cheltenham_Racecourse_2007.jpg'
  },
  {
    id: 'grand-national',
    name: 'Grand National',
    location: 'Aintree, UK',
    date: '2025-04-05T17:15:00+01:00',
    distance: '4 miles 2½ furlongs',
    horses: 40,
    seatsRemaining: 320,
    priceUSD: 165,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Aintree_Racecourse_2018.jpg'
  },
  {
    id: 'nhk-mile-cup',
    name: 'NHK Mile Cup',
    location: 'Tokyo Racecourse, Japan',
    date: '2025-05-11T15:40:00+09:00',
    distance: '1,600 m',
    horses: 18,
    seatsRemaining: 210,
    priceUSD: 120,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tokyo_Racecourse_2016.jpg'
  },
  {
    id: 'tokyo-yushun',
    name: 'Tokyo Yushun (Japanese Derby)',
    location: 'Tokyo Racecourse, Japan',
    date: '2025-05-25T15:40:00+09:00',
    distance: '2,400 m',
    horses: 18,
    seatsRemaining: 260,
    priceUSD: 145,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tokyo_Racecourse_2016.jpg'
  },
  {
    id: 'satsuki-sho',
    name: 'Satsuki Sho (Japanese 2000 Guineas)',
    location: 'Nakayama Racecourse, Japan',
    date: '2025-04-20T15:40:00+09:00',
    distance: '2,000 m',
    horses: 18,
    seatsRemaining: 230,
    priceUSD: 135,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nakayama_Racecourse_2004.jpg'
  },
  {
    id: 'kikuka-sho',
    name: 'Kikuka Sho (Japanese St. Leger)',
    location: 'Kyoto Racecourse, Japan',
    date: '2025-10-19T15:40:00+09:00',
    distance: '3,000 m',
    horses: 18,
    seatsRemaining: 210,
    priceUSD: 130,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Kyoto_Racecourse_2008.jpg'
  },
  {
    id: 'tenno-sho-spring',
    name: 'Tenno Sho (Spring)',
    location: 'Kyoto Racecourse, Japan',
    date: '2025-05-04T15:40:00+09:00',
    distance: '3,200 m',
    horses: 18,
    seatsRemaining: 200,
    priceUSD: 135,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Kyoto_Racecourse_2008.jpg'
  },
  {
    id: 'takarazuka-kinen',
    name: 'Takarazuka Kinen',
    location: 'Hanshin Racecourse, Japan',
    date: '2025-06-22T15:40:00+09:00',
    distance: '2,200 m',
    horses: 16,
    seatsRemaining: 220,
    priceUSD: 130,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Hanshin_Racecourse_2006.jpg'
  },
  {
    id: 'yasuda-kinen',
    name: 'Yasuda Kinen',
    location: 'Tokyo Racecourse, Japan',
    date: '2025-06-08T15:40:00+09:00',
    distance: '1,600 m',
    horses: 18,
    seatsRemaining: 240,
    priceUSD: 125,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tokyo_Racecourse_2016.jpg'
  },
  {
    id: 'osaka-hai',
    name: 'Osaka Hai',
    location: 'Hanshin Racecourse, Japan',
    date: '2025-03-30T15:40:00+09:00',
    distance: '2,000 m',
    horses: 16,
    seatsRemaining: 210,
    priceUSD: 120,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Hanshin_Racecourse_2006.jpg'
  },
  {
    id: 'japan-cup-dirt',
    name: 'Champions Cup (Japan Cup Dirt)',
    location: 'Chukyo Racecourse, Japan',
    date: '2025-12-07T15:30:00+09:00',
    distance: '1,800 m',
    horses: 16,
    seatsRemaining: 190,
    priceUSD: 125,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Chukyo_Racecourse_2012.jpg'
  },
  {
    id: 'february-stakes',
    name: 'February Stakes',
    location: 'Tokyo Racecourse, Japan',
    date: '2025-02-23T15:40:00+09:00',
    distance: '1,600 m',
    horses: 16,
    seatsRemaining: 170,
    priceUSD: 115,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tokyo_Racecourse_2016.jpg'
  },
  {
    id: 'victoria-mile',
    name: 'Victoria Mile',
    location: 'Tokyo Racecourse, Japan',
    date: '2025-05-18T15:40:00+09:00',
    distance: '1,600 m',
    horses: 16,
    seatsRemaining: 200,
    priceUSD: 120,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tokyo_Racecourse_2016.jpg'
  },
  {
    id: 'queen-elizabeth-cup',
    name: 'Queen Elizabeth II Cup',
    location: 'Kyoto Racecourse, Japan',
    date: '2025-11-16T15:40:00+09:00',
    distance: '2,200 m',
    horses: 16,
    seatsRemaining: 210,
    priceUSD: 125,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Kyoto_Racecourse_2008.jpg'
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
    titles: 'Arima Kinen (2022), Tenno Sho (Autumn) (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Equinox_2022_Arima_Kinen.jpg'
  },
  {
    name: 'Kitasan Black',
    country: 'Japan',
    color: 'Black',
    foaled: '2012-03-10',
    started: 2014,
    record: '20 starts • 12 wins',
    titles: 'Japan Cup (2016), Arima Kinen (2016)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kitasan_Black_2016_Japan_Cup.jpg'
  },
  {
    name: 'Contrail',
    country: 'Japan',
    color: 'Bay',
    foaled: '2017-04-01',
    started: 2019,
    record: '11 starts • 8 wins',
    titles: 'Japanese Triple Crown (2020)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Contrail_2020.jpg'
  },
  {
    name: 'Almond Eye',
    country: 'Japan',
    color: 'Bay',
    foaled: '2015-03-10',
    started: 2017,
    record: '15 starts • 11 wins',
    titles: 'Japan Cup (2018, 2020)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Almond_Eye_2019_Japan_Cup.jpg'
  },
  {
    name: 'Efforia',
    country: 'Japan',
    color: 'Bay',
    foaled: '2018-02-10',
    started: 2020,
    record: '10 starts • 6 wins',
    titles: 'Arima Kinen (2021)'
  },
  {
    name: 'Panthalassa',
    country: 'Japan',
    color: 'Chestnut',
    foaled: '2017-02-18',
    started: 2019,
    record: '23 starts • 7 wins',
    titles: 'Dubai Turf (2023)'
  },
  {
    name: 'Liberty Island',
    country: 'Japan',
    color: 'Bay',
    foaled: '2020-02-02',
    started: 2022,
    record: '9 starts • 7 wins',
    titles: 'Japanese Filly Triple Crown (2023)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Liberty_Island_2023.jpg'
  },
  {
    name: 'Do Deuce',
    country: 'Japan',
    color: 'Bay',
    foaled: '2019-05-07',
    started: 2021,
    record: '14 starts • 6 wins',
    titles: 'Tokyo Yushun (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Do_Deuce_2022.jpg'
  },
  {
    name: 'Stars on Earth',
    country: 'Japan',
    color: 'Bay',
    foaled: '2019-02-27',
    started: 2021,
    record: '10 starts • 5 wins',
    titles: 'Oka Sho (2022), Yushun Himba (2022)'
  },
  {
    name: 'Sodashi',
    country: 'Japan',
    color: 'White',
    foaled: '2018-03-08',
    started: 2020,
    record: '16 starts • 8 wins',
    titles: 'Oka Sho (2021)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Sodashi_2021.jpg'
  },
  {
    name: 'Titleholder',
    country: 'Japan',
    color: 'Bay',
    foaled: '2018-02-10',
    started: 2020,
    record: '18 starts • 7 wins',
    titles: 'Tenno Sho (Spring) (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Titleholder_2022.jpg'
  },
  {
    name: 'Shahryar',
    country: 'Japan',
    color: 'Bay',
    foaled: '2018-02-05',
    started: 2020,
    record: '15 starts • 5 wins',
    titles: 'Tokyo Yushun (2021)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Shahryar_2021.jpg'
  },
  {
    name: 'Geoglyph',
    country: 'Japan',
    color: 'Chestnut',
    foaled: '2019-02-25',
    started: 2021,
    record: '12 starts • 3 wins',
    titles: 'Satsuki Sho (2022)'
  },
  {
    name: 'Serifos',
    country: 'Japan',
    color: 'Bay',
    foaled: '2019-03-27',
    started: 2021,
    record: '16 starts • 4 wins',
    titles: 'NHK Mile Cup (2022)'
  },
  {
    name: 'Daring Tact',
    country: 'Japan',
    color: 'Chestnut',
    foaled: '2017-04-18',
    started: 2019,
    record: '12 starts • 5 wins',
    titles: 'Japanese Filly Triple Crown (2020)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Daring_Tact_2020.jpg'
  },
  {
    name: 'Chrono Genesis',
    country: 'Japan',
    color: 'Bay',
    foaled: '2016-03-06',
    started: 2018,
    record: '17 starts • 8 wins',
    titles: 'Arima Kinen (2019, 2020)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Chrono_Genesis_2019.jpg'
  },
  {
    name: 'Loves Only You',
    country: 'Japan',
    color: 'Bay',
    foaled: '2016-03-26',
    started: 2018,
    record: '15 starts • 7 wins',
    titles: 'Breeders\' Cup Filly & Mare Turf (2021)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Loves_Only_You_2021.jpg'
  },
  {
    name: 'Gran Alegria',
    country: 'Japan',
    color: 'Bay',
    foaled: '2016-01-24',
    started: 2018,
    record: '16 starts • 9 wins',
    titles: 'Yasuda Kinen (2020, 2021)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Gran_Alegria_2021.jpg'
  },
  {
    name: 'Flightline',
    country: 'USA',
    color: 'Bay',
    foaled: '2018-03-14',
    started: 2020,
    record: '6 starts • 6 wins',
    titles: 'Breeders\' Cup Classic (2022), Pacific Classic (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flightline_2022.jpg'
  },
  {
    name: 'Frankel',
    country: 'UK',
    color: 'Bay',
    foaled: '2008-02-11',
    started: 2010,
    record: '14 starts • 14 wins',
    titles: 'Queen Elizabeth II Stakes (2011), Sussex Stakes (2011)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Frankel_%28horse%29.jpg'
  },
  {
    name: 'City of Troy',
    country: 'UK',
    color: 'Bay',
    foaled: '2021-03-04',
    started: 2023,
    record: '6 starts • 5 wins',
    titles: 'Dewhurst Stakes (2023), Derby (2024)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/City_of_Troy_2024.jpg'
  },
  {
    name: 'Luxembourg',
    country: 'Ireland',
    color: 'Bay',
    foaled: '2019-03-08',
    started: 2021,
    record: '16 starts • 8 wins',
    titles: 'Irish Champion Stakes (2023)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Luxembourg_racehorse_2023.jpg'
  },
  {
    name: 'Ka Ying Rising',
    country: 'Hong Kong',
    color: 'Bay',
    foaled: '2018-10-02',
    started: 2021,
    record: '16 starts • 12 wins',
    titles: 'Hong Kong Sprint (2024)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Ka_Ying_Rising_2024.jpg'
  },
  {
    name: 'Romantic Warrior',
    country: 'Hong Kong',
    color: 'Bay',
    foaled: '2018-09-15',
    started: 2021,
    record: '24 starts • 17 wins',
    titles: 'Hong Kong Cup (2022, 2023)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Romantic_Warrior_2022_Hong_Kong_Cup.jpg'
  },
  {
    name: 'Forever Young',
    country: 'Japan',
    color: 'Chestnut',
    foaled: '2021-02-24',
    started: 2023,
    record: '6 starts • 6 wins',
    titles: 'UAE Derby (2024)'
  },
  {
    name: 'Auguste Rodin',
    country: 'Ireland',
    color: 'Bay',
    foaled: '2020-03-17',
    started: 2022,
    record: '13 starts • 7 wins',
    titles: 'Epsom Derby (2023), Irish Champion Stakes (2023)'
  },
  {
    name: 'National Treasure',
    country: 'USA',
    color: 'Bay',
    foaled: '2020-02-17',
    started: 2022,
    record: '14 starts • 5 wins',
    titles: "Preakness Stakes (2023), Pegasus World Cup (2024)"
  },
  {
    name: 'Elite Power',
    country: 'USA',
    color: 'Chestnut',
    foaled: '2018-04-04',
    started: 2020,
    record: '17 starts • 10 wins',
    titles: "Breeders' Cup Sprint (2022, 2023)"
  },
  {
    name: 'Omaha Beach',
    country: 'USA',
    color: 'Bay',
    foaled: '2016-02-24',
    started: 2018,
    record: '7 starts • 4 wins',
    titles: 'Arkansas Derby (2019), Malibu Stakes (2019)'
  },
  {
    name: 'Mishriff',
    country: 'UK',
    color: 'Bay',
    foaled: '2017-03-16',
    started: 2019,
    record: '20 starts • 7 wins',
    titles: 'Saudi Cup (2021), International Stakes (2021)'
  },
  {
    name: 'Hukum',
    country: 'UK',
    color: 'Bay',
    foaled: '2017-02-23',
    started: 2019,
    record: '16 starts • 9 wins',
    titles: 'King George VI & Queen Elizabeth Stakes (2023)'
  },
  {
    name: 'Enable',
    country: 'UK',
    color: 'Bay',
    foaled: '2014-03-11',
    started: 2016,
    record: '19 starts • 15 wins',
    titles: "Prix de l'Arc de Triomphe (2017, 2018)",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Enable_at_Ascot_2019.jpg'
  },
  {
    name: 'Golden Sixty',
    country: 'Hong Kong',
    color: 'Bay',
    foaled: '2015-08-12',
    started: 2018,
    record: '31 starts • 26 wins',
    titles: 'Hong Kong Mile (2020, 2021, 2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Golden_Sixty_2021.jpg'
  },
  {
    name: 'Adare Manor',
    country: 'USA',
    color: 'Bay',
    foaled: '2018-02-22',
    started: 2020,
    record: '15 starts • 9 wins',
    titles: 'Clement L. Hirsch Stakes (2021, 2022, 2023)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Adare_Manor_2022.jpg'
  },
  {
    name: "Jackie's Warrior",
    country: 'USA',
    color: 'Chestnut',
    foaled: '2018-03-18',
    started: 2020,
    record: '22 starts • 12 wins',
    titles: "Breeders' Cup Sprint (2021)",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Jackies_Warrior_2021.jpg'
  },
  {
    name: 'Mo Donegal',
    country: 'USA',
    color: 'Bay',
    foaled: '2019-04-18',
    started: 2021,
    record: '10 starts • 4 wins',
    titles: 'Belmont Stakes (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Mo_Donegal_2022.jpg'
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
    memorial: '1989-10-04',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Secretariat_-_1973.jpg'
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
    memorial: '2019-07-30',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Deep_Impact_2005.jpg'
  },
  {
    name: 'Symboli Rudolf',
    country: 'Japan',
    color: 'Bay',
    foaled: '1981-03-13',
    started: 1983,
    record: '16 starts • 13 wins',
    titles: 'Japanese Triple Crown (1984)',
    retired: '1985',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Symboli_Rudolf_1984.jpg'
  },
  {
    name: 'Tokai Teio',
    country: 'Japan',
    color: 'Chestnut',
    foaled: '1988-04-20',
    started: 1990,
    record: '12 starts • 9 wins',
    titles: 'Japan Cup (1992)',
    retired: '1993',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Tokai_Teio_1992.jpg'
  },
  {
    name: 'Mejiro McQueen',
    country: 'Japan',
    color: 'Grey',
    foaled: '1987-04-03',
    started: 1989,
    record: '21 starts • 12 wins',
    titles: 'Tenno Sho (Spring) (1991, 1992)',
    retired: '1992',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Mejiro_McQueen_1991.jpg'
  },
  {
    name: 'Narita Brian',
    country: 'Japan',
    color: 'Bay',
    foaled: '1991-05-03',
    started: 1993,
    record: '21 starts • 12 wins',
    titles: 'Japanese Triple Crown (1994)',
    retired: '1996',
    memorial: '1998-09-27',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Narita_Brian_1994.jpg'
  },
  {
    name: 'Admire Don',
    country: 'Japan',
    color: 'Bay',
    foaled: '1999-03-29',
    started: 2001,
    record: '22 starts • 9 wins',
    titles: 'Feb Stakes (2004)',
    retired: '2005',
    memorial: '—'
  },
  {
    name: 'Vodka',
    country: 'Japan',
    color: 'Chestnut',
    foaled: '2004-04-04',
    started: 2006,
    record: '26 starts • 9 wins',
    titles: 'Japan Cup (2007), Yasuda Kinen (2009)',
    retired: '2009',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Vodka_2007_Japan_Cup.jpg'
  },
  {
    name: 'Winx',
    country: 'Australia',
    color: 'Bay',
    foaled: '2011-09-14',
    started: 2013,
    record: '43 starts • 37 wins',
    titles: 'Cox Plate (2015-2019)',
    retired: '2019',
    memorial: '—'
  },
  {
    name: 'Zenyatta',
    country: 'USA',
    color: 'Bay',
    foaled: '2004-04-01',
    started: 2007,
    record: '20 starts • 19 wins',
    titles: "Breeders' Cup Classic (2009)",
    retired: '2010',
    memorial: '—'
  },
  {
    name: 'Orfevre',
    country: 'Japan',
    color: 'Chestnut',
    foaled: '2008-05-14',
    started: 2010,
    record: '21 starts • 12 wins',
    titles: 'Japanese Triple Crown (2011)',
    retired: '2013',
    memorial: '—'
  },
  {
    name: 'Kitasan Black',
    country: 'Japan',
    color: 'Black',
    foaled: '2012-03-10',
    started: 2014,
    record: '20 starts • 12 wins',
    titles: 'Japan Cup (2016), Arima Kinen (2016)',
    retired: '2017',
    memorial: '—'
  },
  {
    name: 'American Pharoah',
    country: 'USA',
    color: 'Bay',
    foaled: '2012-02-02',
    started: 2014,
    record: '11 starts • 9 wins',
    titles: 'Triple Crown (2015), Breeders\' Cup Classic (2015)',
    retired: '2015',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/American_Pharoah_2015.jpg'
  },
  {
    name: 'Justify',
    country: 'USA',
    color: 'Chestnut',
    foaled: '2015-03-28',
    started: 2018,
    record: '6 starts • 6 wins',
    titles: 'Triple Crown (2018)',
    retired: '2018',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Justify_2018.jpg'
  },
  {
    name: 'Black Caviar',
    country: 'Australia',
    color: 'Bay',
    foaled: '2006-08-18',
    started: 2008,
    record: '25 starts • 25 wins',
    titles: 'Diamond Jubilee Stakes (2012)',
    retired: '2013',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Black_Caviar_2012.jpg'
  },
  {
    name: 'Wise Dan',
    country: 'USA',
    color: 'Bay',
    foaled: '2007-04-15',
    started: 2009,
    record: '23 starts • 14 wins',
    titles: 'Breeders\' Cup Mile (2012, 2013)',
    retired: '2015',
    memorial: '—',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Wise_Dan_2013.jpg'
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
    awards: 'Prix de l\'Arc de Triomphe (multiple), Champion Jockey (UK)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Frankie_Dettori_2014.jpg'
  },
  {
    name: 'Yutaka Take',
    birth: '1969-03-15',
    gender: 'Male',
    status: 'Active',
    started: 1987,
    wins: 'Over 4,000 wins',
    awards: 'Japan Cup, Tokyo Yushun (Japanese Derby)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Yutaka_Take_2012.jpg'
  },
  {
    name: 'Yuga Kawada',
    birth: '1985-10-15',
    gender: 'Male',
    status: 'Active',
    started: 2004,
    wins: 'Over 1,800 wins',
    awards: 'JRA Best Jockey (2016, 2020)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Yuga_Kawada_2018.jpg'
  },
  {
    name: 'Yuichi Fukunaga',
    birth: '1976-12-09',
    gender: 'Male',
    status: 'Active',
    started: 1996,
    wins: 'Over 2,600 wins',
    awards: 'Japanese Derby, Japan Cup',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Yuichi_Fukunaga_2018.jpg'
  },
  {
    name: 'Takeshi Yokoyama',
    birth: '1998-02-10',
    gender: 'Male',
    status: 'Active',
    started: 2016,
    wins: 'Over 500 wins',
    awards: 'NHK Mile Cup (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Takeshi_Yokoyama_2022.jpg'
  },
  {
    name: 'Hideaki Miyuki',
    birth: '1976-01-06',
    gender: 'Male',
    status: 'Active',
    started: 1994,
    wins: 'Over 900 wins',
    awards: 'Dubai Turf (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Hideaki_Miyuki_2022.jpg'
  },
  {
    name: 'Mirco Demuro',
    birth: '1979-01-11',
    gender: 'Male',
    status: 'Active',
    started: 1998,
    wins: 'Over 1,200 wins',
    awards: 'Japanese Derby, Arima Kinen',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mirco_Demuro_2018.jpg'
  },
  {
    name: 'Keita Tosaki',
    birth: '1980-07-20',
    gender: 'Male',
    status: 'Active',
    started: 1998,
    wins: 'Over 1,300 wins',
    awards: 'JRA Best Jockey (2014, 2016)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Keita_Tosaki_2017.jpg'
  },
  {
    name: 'Kohei Matsuyama',
    birth: '1990-03-01',
    gender: 'Male',
    status: 'Active',
    started: 2009,
    wins: 'Over 1,100 wins',
    awards: 'Takamatsunomiya Kinen (2021)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Kohei_Matsuyama_2021.jpg'
  },
  {
    name: 'Akira Sugawara',
    birth: '2001-03-12',
    gender: 'Male',
    status: 'Active',
    started: 2019,
    wins: 'Over 400 wins',
    awards: 'JRA Best Young Jockey (2022)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Akira_Sugawara_2022.jpg'
  },
  {
    name: 'Ryuusei Sakai',
    birth: '1997-03-12',
    gender: 'Male',
    status: 'Active',
    started: 2016,
    wins: 'Over 500 wins',
    awards: 'Dubai World Cup (2023)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Ryuusei_Sakai_2023.jpg'
  },
  {
    name: 'John Velazquez',
    birth: '1971-11-24',
    gender: 'Male',
    status: 'Active',
    started: 1990,
    wins: 'Over 5,000 wins',
    awards: 'Kentucky Derby, Belmont Stakes, Breeders\' Cup Classic',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/John_Velazquez_2010.jpg'
  },
  {
    name: 'Ryan Moore',
    birth: '1983-09-18',
    gender: 'Male',
    status: 'Active',
    started: 2000,
    wins: 'Over 2,500 wins',
    awards: 'Epsom Derby, Prix de l\'Arc de Triomphe',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Ryan_Moore_2016.jpg'
  },
  {
    name: 'William Buick',
    birth: '1988-10-22',
    gender: 'Male',
    status: 'Active',
    started: 2006,
    wins: 'Over 1,700 wins',
    awards: 'Epsom Derby, Dubai World Cup',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/William_Buick_2019.jpg'
  },
  {
    name: 'Christophe Lemaire',
    birth: '1979-05-20',
    gender: 'Male',
    status: 'Active',
    started: 1999,
    wins: 'Over 1,800 wins',
    awards: 'Japan Cup, Japanese Derby',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Christophe_Lemaire_2019.jpg'
  },
  {
    name: 'Joao Moreira',
    birth: '1983-09-26',
    gender: 'Male',
    status: 'Active',
    started: 2006,
    wins: 'Over 2,000 wins',
    awards: 'Hong Kong Champion Jockey',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Joao_Moreira_2017.jpg'
  },
  {
    name: 'Zac Purton',
    birth: '1983-01-03',
    gender: 'Male',
    status: 'Active',
    started: 2000,
    wins: 'Over 2,000 wins',
    awards: 'Hong Kong Champion Jockey',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Zac_Purton_2019.jpg'
  },
  {
    name: 'James McDonald',
    birth: '1991-01-26',
    gender: 'Male',
    status: 'Active',
    started: 2007,
    wins: 'Over 1,800 wins',
    awards: 'Cox Plate, Hong Kong Cup',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/James_McDonald_2019.jpg'
  },
  {
    name: 'Irad Ortiz Jr.',
    birth: '1992-08-11',
    gender: 'Male',
    status: 'Active',
    started: 2012,
    wins: 'Over 3,000 wins',
    awards: 'Eclipse Award for Outstanding Jockey',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Irad_Ortiz_Jr_2017.jpg'
  },
  {
    name: 'Jose Ortiz',
    birth: '1993-10-02',
    gender: 'Male',
    status: 'Active',
    started: 2012,
    wins: 'Over 2,700 wins',
    awards: 'Eclipse Award for Outstanding Jockey',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Jose_Ortiz_2017.jpg'
  },
  {
    name: 'Flavien Prat',
    birth: '1992-08-04',
    gender: 'Male',
    status: 'Active',
    started: 2009,
    wins: 'Over 2,000 wins',
    awards: 'Breeders\' Cup Turf, Eclipse Award',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Flavien_Prat_2016.jpg'
  },
  {
    name: 'Oisin Murphy',
    birth: '1995-09-06',
    gender: 'Male',
    status: 'Active',
    started: 2013,
    wins: 'Over 1,200 wins',
    awards: 'British Champion Jockey (2019-2021)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Oisin_Murphy_2019.jpg'
  },
  {
    name: 'Hollie Doyle',
    birth: '1996-10-11',
    gender: 'Female',
    status: 'Active',
    started: 2013,
    wins: 'Over 1,100 wins',
    awards: 'UK Champion Apprentice (2017)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Hollie_Doyle_2019.jpg'
  },
  {
    name: 'Rachel King',
    birth: '1990-07-31',
    gender: 'Female',
    status: 'Active',
    started: 2009,
    wins: 'Over 600 wins',
    awards: 'JRA Best New Jockey (2014)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Rachel_King_2019.jpg'
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
  const urlToOpen = `http://localhost:${PORT}`;
  console.log(`Royal Racing running on ${urlToOpen}`);
  const start =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
        ? 'start'
        : 'xdg-open';
  exec(`${start} ${urlToOpen}`, (err) => {
    if (err) {
      console.log('Open your browser at:', urlToOpen);
    }
  });
});

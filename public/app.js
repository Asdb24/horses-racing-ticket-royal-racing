const showToast = (message) => {
  const toast = document.getElementById('toast');
  if (!toast) {
    return;
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
};

const formatCountdown = (targetDate) => {
  const now = new Date();
  const distance = targetDate - now;

  if (distance <= 0) {
    return 'Live now';
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${minutes}m`;
};

const renderFeaturedRaces = (races) => {
  const container = document.getElementById('featured-races');
  if (!container) {
    return;
  }
  container.innerHTML = races
    .map(
      (race) => `
      <article class="card">
        <div>
          <h3>${race.name}</h3>
          <p>${race.location}</p>
        </div>
        <div class="meta">
          <span>${race.distance}</span>
          <span>${race.horses} horses</span>
        </div>
        <p class="countdown" data-date="${race.date}">Loading countdown...</p>
        <p>Seats left: <strong>${race.seatsRemaining}</strong></p>
        <p class="price">$${race.priceUSD}</p>
        <button class="primary-button">Buy ticket</button>
      </article>
    `
    )
    .join('');
};

const updateCountdowns = () => {
  document.querySelectorAll('[data-date]').forEach((node) => {
    const date = new Date(node.getAttribute('data-date'));
    node.textContent = `Countdown: ${formatCountdown(date)}`;
  });
};

const renderNextRacePanel = (race) => {
  const panel = document.getElementById('next-race-panel');
  if (!panel) {
    return;
  }

  panel.innerHTML = `
    <div>
      <p class="eyebrow">Next up</p>
      <h3>${race.name}</h3>
      <p>${race.location}</p>
    </div>
    <div class="countdown-metrics">
      <span data-date="${race.date}">Countdown: ${formatCountdown(new Date(race.date))}</span>
      <span>${race.distance}</span>
      <span>${race.horses} horses</span>
      <span>Seats left: ${race.seatsRemaining}</span>
    </div>
    <div>
      <p class="price">$${race.priceUSD}</p>
      <a class="primary-button" href="races.html">View tickets</a>
    </div>
  `;
};

const renderTicketTiers = (tiers) => {
  const container = document.getElementById('ticket-tiers-grid');
  if (!container) {
    return;
  }
  container.innerHTML = tiers
    .map(
      (tier) => `
      <article class="tier-card">
        <span style="background:${tier.color}; color: #fff;">${tier.label}</span>
        <h3>$${tier.priceUSD}</h3>
        <p>Seats remaining: <strong>${tier.seatsRemaining}</strong></p>
        <button class="ghost-button" data-tier="${tier.id}">Book ${tier.label}</button>
      </article>
    `
    )
    .join('');

  container.querySelectorAll('button[data-tier]').forEach((button) => {
    button.addEventListener('click', async () => {
      const tierId = button.getAttribute('data-tier');
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierId, quantity: 1 })
      });

      const data = await response.json();
      if (!response.ok) {
        showToast(data.message);
        return;
      }

      showToast('Purchase confirmed. Your ticket is secured.');
      fetchTicketTiers();
    });
  });
};

const renderNews = (items) => {
  const container = document.getElementById('news-grid');
  if (!container) {
    return;
  }
  container.innerHTML = items
    .map(
      (item) => `
      <article class="news-card">
        <h3>${item.title}</h3>
        <p>${item.location} • ${item.source}</p>
        <p>${item.date}</p>
      </article>
    `
    )
    .join('');
};

const renderTable = (containerId, headers, rows) => {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }
  const headCells = headers.map((header) => `<th>${header}</th>`).join('');
  const bodyRows = rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`
    )
    .join('');

  container.innerHTML = `
    <table>
      <thead><tr>${headCells}</tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;
};

const fetchFeaturedRaces = async () => {
  const response = await fetch('/api/featured-races');
  const data = await response.json();
  renderFeaturedRaces(data);
  const upcoming = [...data]
    .map((race) => ({ ...race, dateObj: new Date(race.date) }))
    .filter((race) => race.dateObj > new Date())
    .sort((a, b) => a.dateObj - b.dateObj);
  if (upcoming.length > 0) {
    renderNextRacePanel(upcoming[0]);
  }
  updateCountdowns();
};

const fetchTicketTiers = async () => {
  const response = await fetch('/api/ticket-tiers');
  const data = await response.json();
  renderTicketTiers(data);
};

const fetchNews = async () => {
  const response = await fetch('/api/news');
  const data = await response.json();
  renderNews(data);
};

const fetchHorses = async () => {
  const response = await fetch('/api/horses');
  const data = await response.json();
  renderTable(
    'horses-table',
    ['Name', 'Country', 'Color', 'Foaled', 'Started', 'Record', 'Major Titles'],
    data.map((horse) => [
      horse.name,
      horse.country,
      horse.color,
      horse.foaled,
      horse.started,
      horse.record,
      horse.titles
    ])
  );
};

const fetchJockeys = async () => {
  const response = await fetch('/api/jockeys');
  const data = await response.json();
  renderTable(
    'jockeys-table',
    ['Name', 'Birth', 'Gender', 'Status', 'Career Start', 'Wins', 'Major Awards'],
    data.map((jockey) => [
      jockey.name,
      jockey.birth,
      jockey.gender,
      jockey.status,
      jockey.started,
      jockey.wins,
      jockey.awards
    ])
  );
};

const fetchHallOfFame = async () => {
  const response = await fetch('/api/hall-of-fame');
  const data = await response.json();
  renderTable(
    'hof-table',
    ['Name', 'Country', 'Color', 'Foaled', 'Started', 'Record', 'Major Titles', 'Retired', 'Memorial'],
    data.map((horse) => [
      horse.name,
      horse.country,
      horse.color,
      horse.foaled,
      horse.started,
      horse.record,
      horse.titles,
      horse.retired,
      horse.memorial
    ])
  );
};

fetchFeaturedRaces();
fetchTicketTiers();
fetchNews();
fetchHorses();
fetchJockeys();
fetchHallOfFame();

setInterval(updateCountdowns, 60000);

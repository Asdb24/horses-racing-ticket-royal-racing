# Royal Racing System

Prototype layout for the **Royal Racing System** with a React-based frontend, a Node.js gateway API, and a Java Spring Boot core service.

## Structure

- `frontend/` - React (via CDN) single-page prototype.
- `backend-node/` - Node.js/Express API gateway to the Java service.
- `backend-java/` - Spring Boot service with JPA entities and sample endpoints.

## Quick start (local)

### Frontend

Open `frontend/index.html` directly in a browser or serve it locally.

### Node API gateway

```bash
cd backend-node
npm install
npm start
```

### Java service

```bash
cd backend-java
mvn spring-boot:run
```

## GitHub: push or download

### Push this repo to GitHub

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

If you already have a remote named `origin`, update it:

```bash
git remote set-url origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Download (clone) from GitHub

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

## Notes

- The frontend uses only real-world race names and venues.
- Image fallback logic is handled in `frontend/app.js` with the Cup logo.
- Replace the stubbed data with real integrations before production use.

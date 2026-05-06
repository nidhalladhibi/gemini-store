# Gemini Store

Site e-commerce full stack pour vendre smartphones, laptops, PC gamer, accessoires et services digitaux.

## Stack

- Frontend: Next.js, React, Tailwind CSS, Axios, Context API, Swiper, React Icons
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Cloudinary

## Installation

```bash
cd /home/vabene/gemini-store
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
npm run dev
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000/api`

## Compte admin

Après configuration de MongoDB:

```bash
npm run seed
```

- Email: `admin@geministore.tn`
- Mot de passe: `Admin12345!`

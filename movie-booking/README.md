# 🎬 Movie Booking System

A React-based movie booking web application that lets users browse shows, search for titles, select seats, and track their booking history. The app uses the [TVmaze API](https://www.tvmaze.com/api) for movie/show data and [BoneYard JS](https://github.com/0xGF/boneyard) for pixel-perfect skeleton loading screens.

---

## ✨ Features

- **Browse Shows** — Paginated listing of shows fetched from the TVmaze API.
- **Search** — Real-time search with Enter key or button click.
- **Seat Selection** — Interactive 5×4 seat grid with booked / selected / available states.
- **Booking Confirmation** — Persists bookings to `localStorage`.
- **Booking History** — Dedicated page showing all past bookings with poster, seats, and date.
- **Skeleton Loading** — Shimmer-animated skeleton screens powered by BoneYard JS while data loads.
- **Client-Side Routing** — Multi-page navigation using React Router v7.

---

## 🛠️ Tech Stack

| Layer         | Technology                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| Framework     | [React 19](https://react.dev)                                             |
| Build Tool    | [Vite 8](https://vite.dev)                                                |
| Styling       | [Tailwind CSS 4](https://tailwindcss.com) (via `@tailwindcss/vite`)       |
| Routing       | [React Router v7](https://reactrouter.com)                                |
| HTTP Client   | [Axios](https://axios-http.com)                                           |
| UI Components | [MUI (Material UI) v7](https://mui.com) — Pagination                     |
| Skeleton UI   | [BoneYard JS](https://github.com/0xGF/boneyard)                          |
| API           | [TVmaze API](https://www.tvmaze.com/api)                                  |
| Storage       | Browser `localStorage`                                                    |

---

## 📁 Project Structure

```
movie-booking/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite config (React, Tailwind, BoneYard plugins)
├── package.json
├── BoneYard.md                 # BoneYard JS reference documentation
├── src/
│   ├── main.jsx                # App entry — router setup & bones registry import
│   ├── App.jsx                 # Root component (legacy, now unused by router)
│   ├── Layout.jsx              # Layout wrapper with Header + <Outlet />
│   ├── App.css                 # Tailwind import + custom utility styles
│   ├── index.css               # Global design tokens & base styles
│   ├── bones/
│   │   ├── registry.js         # Auto-generated BoneYard bone registry
│   │   └── movies-card.bones.json  # Captured skeleton layout data
│   └── components/
│       ├── Header/
│       │   └── Header.jsx      # Sticky navbar with nav links
│       ├── MovieList.jsx       # Show listing with search, pagination & skeleton
│       ├── SeatBooking.jsx     # Seat selection & booking confirmation
│       └── BookingHistory.jsx  # Displays past bookings from localStorage
└── public/                     # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or **bun**)

### Installation

```bash
# Clone the repository
git clone https://github.com/SatyamPrakash09/movie-booking-system.git
cd movie-booking-system/movie-booking

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 💀 Using BoneYard JS (Skeleton Loading)

[BoneYard JS](https://github.com/0xGF/boneyard) generates **pixel-perfect skeleton loading screens** by capturing the actual layout of your components — no manual measurement or hand-tuned placeholders needed.

### How It's Used in This Project

BoneYard is integrated at three levels:

#### 1. Vite Plugin (`vite.config.js`)

The BoneYard Vite plugin is added alongside React and Tailwind. It automatically captures bone layouts from your running dev server and regenerates them on HMR updates.

```js
// vite.config.js
import { boneyardPlugin } from 'boneyard-js/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(), boneyardPlugin()],
})
```

#### 2. Bone Registry (`src/bones/registry.js`)

The registry is **auto-generated** by the Vite plugin. It imports the captured `.bones.json` files and registers them so the `<Skeleton>` component can look them up by name. This file is imported once in `main.jsx`.

```js
// src/bones/registry.js  (auto-generated — do not edit manually)
import { registerBones } from 'boneyard-js/react'
import _movies_card from './movies-card.bones.json'

registerBones({
  "movies-card": _movies_card,
})
```

```js
// src/main.jsx — import the registry at the app entry point
import './bones/registry.js'
```

#### 3. `<Skeleton>` Component (`MovieList.jsx`)

Wrap any content that has a loading state with the `<Skeleton>` component. When `loading` is `true`, BoneYard renders the captured skeleton; when `false`, it transitions to the real content.

```jsx
import { Skeleton } from 'boneyard-js/react'

<Skeleton
  name="movies-card"       // matches the key in registry
  loading={isLoading}      // boolean — show skeleton or real content
  animate="shimmer"        // animation style: 'pulse' | 'shimmer' | 'solid'
  color="#FFF8DC"           // bone fill color
  transition={true}        // fade out when loading ends (300ms)
>
  {/* Your real UI goes here */}
  <div className="movie-grid">
    {movies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
</Skeleton>
```

### Step-by-Step: Adding BoneYard to Your Own Project

1. **Install the package**

   ```bash
   npm install boneyard-js
   ```

2. **Add the Vite plugin** (for Vite-based projects)

   ```js
   // vite.config.js
   import { boneyardPlugin } from 'boneyard-js/vite'

   export default defineConfig({
     plugins: [/* ...other plugins */, boneyardPlugin()],
   })
   ```

   > For non-Vite setups, use the CLI instead: `npx boneyard-js build`

3. **Wrap your component with `<Skeleton>`**

   ```jsx
   import { Skeleton } from 'boneyard-js/react'

   function MyPage() {
     const [loading, setLoading] = useState(true)

     return (
       <Skeleton name="my-component" loading={loading}>
         <MyComponent />
       </Skeleton>
     )
   }
   ```

4. **Start the dev server** — The Vite plugin opens a headless browser, finds every `<Skeleton>`, and captures their layouts into `.bones.json` files under `src/bones/`.

   ```bash
   npm run dev
   ```

5. **Import the registry** once in your app entry (`main.jsx`):

   ```js
   import './bones/registry'
   ```

6. **Done!** Skeletons are now automatically rendered while your content loads.

### Key `<Skeleton>` Props

| Prop         | Type                                   | Default                  | Description                                        |
| ------------ | -------------------------------------- | ------------------------ | -------------------------------------------------- |
| `name`       | `string`                               | —                        | Unique name (maps to `name.bones.json`)            |
| `loading`    | `boolean`                              | —                        | Show skeleton or real content                      |
| `animate`    | `'pulse'` \| `'shimmer'` \| `'solid'`  | `'pulse'`                | Animation style                                    |
| `color`      | `string`                               | `rgba(0,0,0,0.08)`      | Bone fill color                                    |
| `transition` | `number` \| `boolean`                  | `false`                  | Fade-out duration when loading ends (`true` = 300ms) |
| `stagger`    | `number` \| `boolean`                  | `false`                  | Stagger delay between bones (`true` = 80ms)        |
| `fallback`   | `ReactNode`                            | —                        | Shown when loading but no bones available          |

### CLI Commands (Alternative to Vite Plugin)

```bash
# One-time capture
npx boneyard-js build

# Watch mode — re-captures on HMR changes
npx boneyard-js build --watch

# Custom output directory
npx boneyard-js build --out ./src/bones

# Custom breakpoints
npx boneyard-js build --breakpoints 375,768,1280
```

### Optional Config File

Create a `boneyard.config.json` in the project root:

```json
{
  "breakpoints": [375, 768, 1280],
  "out": "./src/bones",
  "wait": 800,
  "color": "#e5e5e5",
  "animate": "pulse"
}
```

For full documentation, visit the [BoneYard Docs](https://boneyard.vercel.app/overview).

---

## 📄 Routes

| Path              | Component          | Description                   |
| ----------------- | ------------------ | ----------------------------- |
| `/`               | `MovieList`        | Home — browse and search shows |
| `/booking`        | `SeatBooking`      | Seat selection for a show     |
| `/bookinghistory` | `BookingHistory`   | View all past bookings        |

---

## 📝 License

MIT

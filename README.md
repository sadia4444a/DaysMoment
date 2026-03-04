<div align="center">

# ⏰ DaysMoment

### _Every Second Counts. Make It Matter._

<p align="center">
  <img src="./screenshot.png" alt="DaysMoment App Screenshot" width="800px" style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" />
</p>

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Made in Bangladesh](https://img.shields.io/badge/Made%20in-Bangladesh-006747.svg)](https://en.wikipedia.org/wiki/Bangladesh)

</div>

---

## 🌟 About

**DaysMoment** is a minimalist time management application that transforms your perspective on time. Each day, you're gifted with **86,400 moments** (seconds). This elegant app helps you visualize how precious each moment is with a stunning circular countdown clock and inspirational wisdom.

### ✨ Why DaysMoment?

> _"Time is what we want most, but what we use worst."_ — William Penn

We often waste time without realizing its value. DaysMoment brings awareness to every passing second, motivating you to make each moment count.

---

## 🎯 Features

<table>
<tr>
<td width="50%">

### 🕐 Real-Time Tracking

- **86,400 Moments**: Visualize every second of your day
- **Circular Progress Clock**: Beautiful animated ring showing time left
- **Live Countdown**: Hours, minutes, seconds breakdown
- **Midnight Reset**: Automatically refills at 12:00 AM

</td>
<td width="50%">

### 💭 Inspirational Wisdom

- **200+ Quotes**: Carefully curated from various sources
- **Auto-Rotation**: New quote every minute
- **Diverse Topics**: Life, time, Quran, happiness, peace
- **Islamic Wisdom**: Quranic verses & Prophet's sayings

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Design Excellence

- **Minimalist Black & White**: Elegant, distraction-free
- **Smooth Animations**: Powered by Framer Motion
- **Responsive**: Perfect on all devices
- **No Scrolling**: Everything fits on one screen

</td>
<td width="50%">

### ⚡ Performance

- **Fast Loading**: Optimized React components
- **Real-Time Updates**: Instant clock updates
- **RESTful API**: Express backend for quotes
- **Modern Stack**: Latest React & Node.js

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js v14+ and npm installed on your system
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/daysmoment.git
   cd daysmoment
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client && npm install && cd ..
   ```

3. **Start the application**

   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   Frontend: http://localhost:3000
   Backend:  http://localhost:5001
   ```

🎉 That's it! The app should now be running.

---

## 📁 Project Structure

```
DaysMoment/
├── 📂 client/                    # React Frontend
│   ├── 📂 public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── CircularClock.js   # Animated moment counter
│   │   │   ├── DateDisplay.js     # Date & time display
│   │   │   └── QuoteDisplay.js    # Quote rotation component
│   │   ├── App.js                 # Main app component
│   │   ├── App.css                # Global styles
│   │   └── index.js               # React entry point
│   └── package.json
│
├── 📂 server/                    # Node.js Backend
│   ├── 📂 data/
│   │   └── quotes.json            # 200+ inspirational quotes
│   ├── 📂 routes/
│   │   └── quotes.js              # Quote API routes
│   └── index.js                   # Express server
│
├── package.json
├── README.md
└── .gitignore
```

---

## 🎨 Screenshots

<div align="center">

### Main Interface

<img src="./screenshot.png" alt="Main Interface" width="700px" />

_Clean, minimalist design showing date, circular clock, and inspirational quote_

</div>

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="60" height="60" />
<br><strong>React 18</strong>
<br>Modern UI Components
</td>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="60" height="60" />
<br><strong>Node.js</strong>
<br>Backend Server
</td>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="60" height="60" />
<br><strong>Express.js</strong>
<br>RESTful API
</td>
</tr>
<tr>
<td align="center" width="33%">
<img src="https://user-images.githubusercontent.com/38039349/60953119-d3c6f300-a2fc-11e9-9596-4978e5d52180.png" width="60" height="60" />
<br><strong>Framer Motion</strong>
<br>Smooth Animations
</td>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="60" height="60" />
<br><strong>CSS3</strong>
<br>Custom Styling
</td>
<td align="center" width="33%">
<img src="https://axios-http.com/assets/logo.svg" width="60" height="60" />
<br><strong>Axios</strong>
<br>HTTP Requests
</td>
</tr>
</table>

---

## 📖 How It Works

### The Concept

Every day has exactly **86,400 seconds** (24 hours × 60 minutes × 60 seconds). Each second is a "moment" – an opportunity to:

- Learn something new
- Show kindness
- Make progress
- Practice gratitude
- Create memories

### The Clock

The circular progress indicator shows:

- **White ring**: Moments used today
- **Gray ring**: Moments remaining
- **Center display**: Live countdown of remaining moments
- **Percentage**: How much of your day is left

### The Quotes

Wisdom changes every minute, featuring:

- Time management principles
- Life philosophy
- Quranic verses (with references)
- Prophetic sayings
- Financial wisdom
- Happiness & peace insights

---

## 🎯 API Endpoints

| Method | Endpoint                         | Description            |
| ------ | -------------------------------- | ---------------------- |
| GET    | `/api/health`                    | Health check           |
| GET    | `/api/quotes/random`             | Get random quote       |
| GET    | `/api/quotes`                    | Get all quotes         |
| GET    | `/api/quotes/category/:category` | Get quotes by category |

### Example Response

```json
{
  "quote": "Indeed, with hardship comes ease.",
  "author": "Quran 94:6",
  "category": "life"
}
```

---

## 🎨 Customization

### Change Quote Interval

Edit `client/src/components/QuoteDisplay.js`:

```javascript
// Change from 1 minute to your desired interval
const interval = setInterval(() => {
  fetchQuote();
}, 60000); // milliseconds
```

### Add More Quotes

Add to `server/data/quotes.json`:

```json
{
  "quote": "Your quote here",
  "author": "Author Name",
  "category": "category-name"
}
```

### Modify Colors

Edit CSS files in `client/src/components/` to change the color scheme.

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

- **Heroku**: Node.js app deployment
- **Vercel**: Next.js/React hosting
- **Netlify**: Static site hosting
- **AWS/Azure**: Cloud deployment
- **DigitalOcean**: VPS hosting

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

### Ideas for Contribution

- 🌍 Add multi-language support
- 🎨 Create theme variations
- 📊 Add statistics/analytics
- 🔔 Browser notifications
- 📱 Mobile app version
- 🌙 Dark/Light mode toggle

---

## 📝 Quote Categories

- ⏰ **Time Management**: Productivity & efficiency
- 🌟 **Life**: Philosophy & wisdom
- 😊 **Happiness**: Joy & contentment
- ☮️ **Peace**: Tranquility & calm
- 💰 **Finance**: Money & wealth
- 🎯 **Ambition**: Goals & success
- 📖 **Islamic**: Quran & Hadith

---

## 🐛 Known Issues

Currently, there are no known issues. If you find a bug, please [open an issue](https://github.com/yourusername/daysmoment/issues).

---

## 📜 License

This project is licensed under the ISC License.

---

## 💝 Acknowledgments

- 🙏 All the authors whose quotes inspire millions
- 📖 The Holy Quran for timeless wisdom
- 🌟 The open-source community
- 🇧🇩 Made with love in Bangladesh

---

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourusername](https://twitter.com/yourusername)
- 💼 LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Remember**: You have 86,400 moments today. Make them count! ⏰

Made with ❤️ in Bangladesh 🇧🇩

[⬆ Back to Top](#-daysmoment)

</div>

## Tech Stack

### Frontend

- React 18
- Framer Motion (animations)
- Axios (API calls)
- CSS3 with modern features

### Backend

- Node.js
- Express.js
- CORS enabled
- RESTful API

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   cd "DaysMoment "
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
npm start
```

This will start:

- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Run Backend Only

```bash
npm run server
```

### Run Frontend Only

```bash
npm run client
```

## Project Structure

```
DaysMoment/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CircularClock.js
│   │   │   ├── CircularClock.css
│   │   │   ├── DateDisplay.js
│   │   │   ├── DateDisplay.css
│   │   │   ├── QuoteDisplay.js
│   │   │   └── QuoteDisplay.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── data/
│   │   └── quotes.json    # 150 motivational quotes
│   ├── routes/
│   │   └── quotes.js
│   └── index.js
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/quotes/random` - Get a random quote
- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/category/:category` - Get quotes by category

## Quote Categories

- Time Management
- Life
- Happiness
- Peace
- Finance
- Ambition

## Features Explained

### Circular Clock

- Displays remaining moments (seconds) in the day
- Shows visual progress with a circular indicator
- Breaks down time into hours, minutes, and seconds
- Shows percentage of day remaining

### Date Display

- Current day name
- Date with ordinal suffix (1st, 2nd, 3rd, etc.)
- Month and year

### Quote System

- 150+ carefully curated quotes
- Automatic rotation every 10 minutes
- Shows author attribution when available
- Category badges for context
- Smooth fade transitions

## Customization

### Change Quote Rotation Interval

Edit `client/src/components/QuoteDisplay.js`:

```javascript
// Change 600000 (10 minutes) to your desired interval in milliseconds
const interval = setInterval(() => {
  fetchQuote();
}, 600000); // 600000 ms = 10 minutes
```

### Add More Quotes

Add quotes to `server/data/quotes.json`:

```json
{
  "quote": "Your quote here",
  "author": "Author Name",
  "category": "category-name"
}
```

### Modify Colors

Edit the CSS files in `client/src/components/` to change colors, fonts, or styles.

## Building for Production

1. Build the React app:

   ```bash
   npm run build
   ```

2. Set environment variable:

   ```bash
   export NODE_ENV=production
   ```

3. Start the server:
   ```bash
   npm run server
   ```

The server will serve the built React app from the `client/build` directory.

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC License

## Author

Made with ❤️ in Bangladesh

---

**Remember**: You have 86,400 moments each day. Make each one count! ⏰

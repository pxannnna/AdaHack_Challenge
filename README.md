# Climate Shopping App 🌱

An interactive web application that helps users make climate-conscious shopping choices while saving money. The app provides eco-friendly alternatives for shopping items with detailed information about prices, carbon footprint, and miles traveled.

## 🚀 Features

- **AI-Powered List Cleaning**: Uses OpenAI to clean and organize shopping lists
- **Interactive Flashcards**: Choose from 3 alternatives for each item
- **Climate Impact Tracking**: Shows CO₂ impact and miles traveled for each choice
- **Cost Analysis**: Tracks spending and calculates savings
- **Progress Tracking**: Visual progress bar and sidebar list
- **Summary Dashboard**: Complete overview of financial and environmental impact

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **AI Integration**: OpenAI API (mock implementation included)
- **Data**: Static JSON mock data for development

## 📁 Project Structure

```
src/
├── components/
│   ├── Flashcard.jsx      # Individual product option cards
│   └── SidebarList.jsx    # Shopping list progress sidebar
├── pages/
│   ├── Home.jsx           # Budget and list input form
│   ├── Results.jsx        # Interactive flashcard selection
│   └── Summary.jsx        # Final cost and impact summary
├── api/
│   └── openai.js          # OpenAI API integration (mock)
├── data/
│   └── mockData.js        # Mock supermarket data
├── App.jsx                # Main router and layout
└── main.jsx               # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser: https://ada-hack-challenge.vercel.app

### Building for Production

```bash
npm run build
```

## 🎨 Design System

The app uses a climate-friendly color palette:
- **Primary Green**: `#22c55e` (eco-green-600)
- **Light Green**: `#f0fdf4` (eco-green-50)
- **Earth Brown**: Various shades for natural feel
- **Neutral Grays**: For text and backgrounds

## 🔧 Development Workflow

### Team Roles

- **Coder 1**: Frontend structure, pages, and routing
- **Coder 2**: OpenAI API integration and list processing
- **Coder 3**: Flashcards, selection logic, and calculations
- **Designer**: Styling, SVG icons, and visual polish

### Key Components

#### Flashcard Component
- Displays product alternatives with pricing and environmental data
- Interactive selection with hover effects
- CO₂ impact rating system (A-D scale)

#### SidebarList Component
- Shows shopping list progress
- Displays completion status for each item
- Real-time progress tracking

#### Pages
- **Home**: Input form with budget and shopping list
- **Results**: Interactive selection interface
- **Summary**: Final calculations and impact summary

## 📊 Mock Data

The app includes comprehensive mock data for:
- UK supermarket prices
- Carbon footprint calculations
- Miles traveled estimates
- Product categories and alternatives

## 🔮 Future Enhancements

- Real OpenAI API integration
- Actual supermarket API connections
- User accounts and shopping history
- Social sharing features
- Mobile app version
- Advanced analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌍 Impact

By making informed shopping choices, users can:
- Reduce their carbon footprint
- Save money on groceries
- Support sustainable practices
- Learn about environmental impact

Every small decision adds up to create a big impact! 🌱

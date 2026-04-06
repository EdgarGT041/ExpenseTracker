# MERNproyect - Expense and Income Manager

A full-stack web application to manage and track your personal expenses and income. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 🎯 Features

- **User Authentication**: Secure registration and login system with JWT and bcryptjs
- **Expense Management**: Create, edit, and delete expense records
- **Income Management**: Create, edit, and delete income records
- **Dashboard**: Data visualization with charts and statistics
- **Data Filtering**: Filter transactions by date and other criteria
- **Data Export**: Export data to Excel (xlsx)
- **User Profile**: Manage personal information
- **Responsive Interface**: Modern design adaptable to different devices

## 🛠 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **bcryptjs** - Password encryption
- **Cors** - CORS handling
- **dotenv** - Environment variables
- **XLSX** - Excel export

### Frontend
- **React** - UI library
- **Vite** - Fast build tool
- **React Router** - Page navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Utility CSS styling
- **Recharts** - Charts and visualizations
- **Framer Motion** - Animations
- **React Modal** - Modal dialogs
- **React Toastify** - Notifications
- **Lucide React** - Icons

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- MongoDB (local or cloud - Atlas)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/MERNproyect.git
cd MERNproyect
```

### 2. Install Backend dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend dependencies
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/mernproject
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

**To use MongoDB Atlas (cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mernproject
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:4000
```

## 📦 Running the Application

### Run Backend in development mode
```bash
cd backend
npm run dev
```
The server will be available at `http://localhost:4000`

### Run Frontend in development mode
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`

### Build Frontend for production
```bash
cd frontend
npm run build
```

## 📁 Project Structure

```
MERNproyect/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB configuration
│   ├── controllers/
│   │   ├── userController.js  # User logic
│   │   ├── incomeController.js # Income logic
│   │   ├── expenseController.js # Expense logic
│   │   └── dashboardController.js # Dashboard logic
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── userModel.js       # User schema
│   │   ├── incomeModel.js     # Income schema
│   │   └── expenseModel.js    # Expense schema
│   ├── routes/
│   │   ├── userRoute.js       # User routes
│   │   ├── incomeRoute.js     # Income routes
│   │   ├── expenseRoute.js    # Expense routes
│   │   └── dashboardRoute.js  # Dashboard routes
│   ├── utils/
│   │   └── dataFilter.js      # Filtering utilities
│   ├── server.js              # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx     # Main layout component
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Signup.jsx     # Registration page
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── Sidebar.jsx    # Sidebar
│   │   │   ├── Add.jsx        # Transaction add form
│   │   │   ├── TransactionItem.jsx # Transaction component
│   │   │   ├── FinancialCard.jsx # Financial card
│   │   │   ├── GaugeCard.jsx  # Gauge chart
│   │   │   └── Helpers.jsx    # Helper components
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx  # Dashboard page
│   │   │   ├── Income.jsx     # Income page
│   │   │   ├── Expense.jsx    # Expense page
│   │   │   └── Profile.jsx    # Profile page
│   │   ├── utils/
│   │   │   ├── dateUtils.js   # Date utilities
│   │   │   └── exportUtils.js # Export utilities
│   │   ├── assets/
│   │   │   ├── color.jsx      # Color configuration
│   │   │   ├── dummy.js       # Dummy data
│   │   │   └── dummyStyles.js # Dummy styles
│   │   ├── App.jsx            # Root component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── Dockerfile                 # Docker configuration (optional)
└── README.md
```

## 🔌 API Endpoints

### User Authentication
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Login
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update profile (protected)

### Income
- `GET /api/income` - Get all incomes (protected)
- `POST /api/income` - Create new income (protected)
- `PUT /api/income/:id` - Update income (protected)
- `DELETE /api/income/:id` - Delete income (protected)

### Expenses
- `GET /api/expense` - Get all expenses (protected)
- `POST /api/expense` - Create new expense (protected)
- `PUT /api/expense/:id` - Update expense (protected)
- `DELETE /api/expense/:id` - Delete expense (protected)

### Dashboard
- `GET /api/dashboard` - Get dashboard data (protected)
- `GET /api/dashboard/filter` - Filter data by date range (protected)

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** for authentication:

1. User logs in with their credentials
2. Server validates credentials and generates a JWT
3. Client stores the token in localStorage or sessionStorage
4. On each request to protected routes, the token is sent in the `Authorization: Bearer <token>` header
5. Authentication middleware verifies the token before accessing data

## 📊 Main Features

### Dashboard
- Current balance visualization
- Income and expense charts
- Monthly/annual summary
- Latest transactions

### Transaction Management
- Create new income/expenses
- Categorize transactions
- Edit existing transactions
- Delete transactions
- Filter by date, category, etc.

### Data Export
- Export transactions to Excel
- Export dashboard reports

## 🐳 Docker (Optional)

If you want to run the application in Docker:

```bash
docker build -t mernproject .
docker run -p 4000:4000 -p 5173:5173 mernproject
```

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the ISC License. See the `LICENSE` file for more details.

## 📞 Support

If you have questions or encounter issues, please open an issue in the repository.

## ✨ Future Improvements

- [ ] Google/Facebook authentication
- [ ] Email notifications
- [ ] Advanced expense analytics
- [ ] Custom budgets
- [ ] Bank account synchronization
- [ ] Mobile application

---

**Made using MERN Stack!**

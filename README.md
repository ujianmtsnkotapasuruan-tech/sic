# Teaching Journal Logging System (SIC)

A comprehensive system for tracking and managing teaching activities, student progress, and educational insights.

## Features

- **Daily Teaching Journal**: Record lessons, activities, and classroom events
- **Student Progress Tracking**: Monitor individual and class-wide learning outcomes
- **Attendance Management**: Track student attendance and participation
- **Performance Analysis**: Generate reports on teaching effectiveness and student achievement
- **Note-taking System**: Comprehensive note-taking with timestamps and categorization
- **Search & Filter**: Easily find past entries and records
- **Export Capabilities**: Export journals and reports in multiple formats

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB for flexible document storage
- **Frontend**: React.js with modern UI components
- **Authentication**: JWT-based authentication
- **API**: RESTful API design

## Project Structure

```
sic/
├── backend/              # Express.js backend server
│   ├── routes/          # API routes
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── middleware/      # Authentication, validation
│   └── config/          # Configuration files
├── frontend/            # React.js frontend
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   └── styles/          # CSS and styling
├── docs/                # Documentation
└── tests/               # Test suites
```

## Getting Started

### Prerequisites
- Node.js v14+
- MongoDB v4.4+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ujianmtsnkotapasuruan-tech/sic.git
cd sic
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create `.env` file in backend directory:
```
MONGODB_URI=mongodb://localhost:27017/teaching-journal
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

5. Start the backend server:
```bash
cd backend
npm run dev
```

6. Start the frontend server (in new terminal):
```bash
cd frontend
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Journal Entries
- `GET /api/entries` - Get all entries
- `POST /api/entries` - Create new entry
- `GET /api/entries/:id` - Get specific entry
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student info

### Reports
- `GET /api/reports/summary` - Get teaching summary report
- `GET /api/reports/student/:id` - Get student progress report

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For support, email support@sic-teaching.local or open an issue on GitHub.

---

*Sistema Informasi Center - Teaching Journal Logging System*

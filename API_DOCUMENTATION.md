# Teaching Journal Logging System - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
- **Endpoint**: `POST /auth/register`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "school": "Central High School",
  "department": "Mathematics"
}
```
- **Response**: `201 Created`
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
- **Endpoint**: `POST /auth/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**: `200 OK`
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Profile
- **Endpoint**: `GET /auth/profile`
- **Auth**: Required
- **Response**: `200 OK`
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "teacher",
  "school": "Central High School",
  "department": "Mathematics"
}
```

---

## Journal Entries Endpoints

### Get All Entries
- **Endpoint**: `GET /entries`
- **Auth**: Required
- **Response**: `200 OK` - Array of entries sorted by date

### Get Single Entry
- **Endpoint**: `GET /entries/:id`
- **Auth**: Required
- **Response**: `200 OK` - Entry object

### Create Entry
- **Endpoint**: `POST /entries`
- **Auth**: Required
- **Body**:
```json
{
  "date": "2026-05-20",
  "subject": "Mathematics",
  "topic": "Quadratic Equations",
  "category": "lecture",
  "description": "Covered solving quadratic equations using three methods...",
  "classLevel": "Grade 10",
  "numberOfStudents": 30,
  "attendanceCount": 28,
  "studentEngagement": "excellent",
  "keyPoints": ["Method 1", "Method 2"],
  "notes": "Class engaged well, especially with practical examples"
}
```
- **Response**: `201 Created`

### Update Entry
- **Endpoint**: `PUT /entries/:id`
- **Auth**: Required
- **Body**: Same as create (partial update allowed)
- **Response**: `200 OK`

### Delete Entry
- **Endpoint**: `DELETE /entries/:id`
- **Auth**: Required
- **Response**: `200 OK`

---

## Students Endpoints

### Get All Students
- **Endpoint**: `GET /students`
- **Auth**: Required
- **Response**: `200 OK` - Array of students

### Get Single Student
- **Endpoint**: `GET /students/:id`
- **Auth**: Required
- **Response**: `200 OK` - Student object

### Add Student
- **Endpoint**: `POST /students`
- **Auth**: Required
- **Body**:
```json
{
  "rollNumber": "001",
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phone": "1234567890",
  "classLevel": "Grade 10",
  "section": "A",
  "guardianName": "Robert Smith",
  "guardianPhone": "9876543210",
  "academicPerformance": "excellent"
}
```
- **Response**: `201 Created`

### Update Student
- **Endpoint**: `PUT /students/:id`
- **Auth**: Required
- **Body**: Same as add (partial update allowed)
- **Response**: `200 OK`

### Delete Student
- **Endpoint**: `DELETE /students/:id`
- **Auth**: Required
- **Response**: `200 OK`

---

## Reports Endpoints

### Get Teaching Summary
- **Endpoint**: `GET /reports/summary`
- **Auth**: Required
- **Response**: `200 OK`
```json
{
  "totalEntries": 15,
  "totalStudents": 30,
  "entriesByCategory": {
    "lecture": 8,
    "practical": 4,
    "discussion": 2,
    "assessment": 1
  },
  "averageEngagement": "85%"
}
```

### Get Student Progress Report
- **Endpoint**: `GET /reports/student/:studentId`
- **Auth**: Required
- **Response**: `200 OK`
```json
{
  "student": "Alice Smith",
  "rollNumber": "001",
  "academicPerformance": "excellent",
  "attendance": {
    "total": 25,
    "present": 24
  },
  "enrolledClass": "Grade 10"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Authorization token missing"
}
```

### 404 Not Found
```json
{
  "message": "Entry not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Entry Categories

- `lecture` - Classroom lectures and theory sessions
- `practical` - Practical/lab sessions
- `discussion` - Discussion-based sessions
- `assessment` - Quizzes, tests, and assessments

## Student Engagement Levels

- `excellent` - Highly engaged class
- `good` - Well-engaged class
- `average` - Moderately engaged
- `poor` - Low engagement

## Academic Performance Ratings

- `excellent` - Outstanding performance
- `good` - Above average performance
- `average` - Average performance
- `below-average` - Below average performance

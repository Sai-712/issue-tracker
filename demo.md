# Issue Tracker Demo

## Quick Start

### 1. Start the Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend will be available at: http://localhost:8000

### 2. Start the Frontend (in a new terminal)
```bash
cd frontend/issue-tracker-frontend
npm install
npm start
```
Frontend will be available at: http://localhost:4200

## Features Demonstrated

### Backend API
- ✅ Health check: `GET http://localhost:8000/health`
- ✅ Get all issues: `GET http://localhost:8000/issues`
- ✅ Get single issue: `GET http://localhost:8000/issues/1`
- ✅ Create issue: `POST http://localhost:8000/issues`
- ✅ Update issue: `PUT http://localhost:8000/issues/1`
- ✅ Search, filter, sort, pagination support

### Frontend Features
- ✅ Modern Material Design UI
- ✅ Responsive data table with all issue columns
- ✅ Real-time search by title
- ✅ Filter by status, priority, assignee
- ✅ Sort by any column (click headers)
- ✅ Pagination with customizable page sizes
- ✅ Create new issues with validation
- ✅ Edit existing issues
- ✅ View issue details with raw JSON
- ✅ Error handling and loading states

## Sample Data
The application comes with 5 pre-loaded sample issues to demonstrate all features.

## API Documentation
Once the backend is running, visit: http://localhost:8000/docs for interactive API documentation.

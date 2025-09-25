# Issue Tracker

A full-stack Issue Tracker application built with Python FastAPI backend and Angular frontend. This application allows users to view, search, filter, sort, create, and update issues with a modern, responsive UI.

## Features

### Backend (Python FastAPI)
- ✅ Health check endpoint
- ✅ RESTful API for issue management
- ✅ Search by title
- ✅ Filter by status, priority, and assignee
- ✅ Sorting by multiple fields
- ✅ Pagination support
- ✅ Auto-generated IDs and timestamps
- ✅ CORS enabled for frontend integration

### Frontend (Angular 17)
- ✅ Modern Material Design UI
- ✅ Responsive table with all issue data
- ✅ Advanced filtering and search
- ✅ Column sorting
- ✅ Pagination with customizable page sizes
- ✅ Create/Edit issue forms with validation
- ✅ Issue detail view with raw JSON display
- ✅ Real-time updates and error handling

## Project Structure

```
issue-tracker/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   └── requirements.txt     # Python dependencies
└── frontend/
    └── issue-tracker-frontend/
        ├── src/
        │   └── app/
        │       ├── components/
        │       │   ├── issue-list/      # Main issues table component
        │       │   ├── issue-detail/    # Issue detail modal
        │       │   └── issue-form/      # Create/Edit form
        │       ├── models/
        │       │   └── issue.model.ts   # TypeScript interfaces
        │       ├── services/
        │       │   └── issue.service.ts # API service
        │       └── app.component.*      # Main app component
        └── package.json                 # Node.js dependencies
```

## Prerequisites

- Python 3.8+
- Node.js 18+ (Angular 17 compatible)
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
python main.py
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/issue-tracker-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:4200`

## API Endpoints

### Health Check
- `GET /health` - Returns API status

### Issues
- `GET /issues` - Get all issues with filtering, sorting, and pagination
  - Query parameters: `search`, `status`, `priority`, `assignee`, `sort_by`, `sort_order`, `page`, `pageSize`
- `GET /issues/{id}` - Get a specific issue by ID
- `POST /issues` - Create a new issue
- `PUT /issues/{id}` - Update an existing issue

## Usage

### Viewing Issues
- The main page displays all issues in a responsive table
- Use the search box to filter by title
- Apply filters for status, priority, and assignee
- Click column headers to sort
- Use pagination controls to navigate through results

### Creating Issues
- Click "Create Issue" button
- Fill in the required fields (title, status, priority)
- Optional fields: description, assignee
- Click "Create Issue" to save

### Editing Issues
- Click the edit icon in any row
- Modify the fields as needed
- Click "Update Issue" to save changes

### Viewing Issue Details
- Click anywhere on a row (except the edit button) to view full details
- The detail view shows all issue information and raw JSON data

## Sample Data

The application comes pre-loaded with sample issues to demonstrate functionality:
- Fix login bug (High priority, Open)
- Add dark mode (Medium priority, In Progress)
- Update documentation (Low priority, Closed)
- Performance optimization (Critical priority, Open)
- Add unit tests (Medium priority, In Progress)

## Technical Details

### Backend
- **Framework**: FastAPI 0.104.1
- **Data Models**: Pydantic
- **CORS**: Enabled for cross-origin requests
- **Data Storage**: In-memory (easily replaceable with database)

### Frontend
- **Framework**: Angular 17
- **UI Library**: Angular Material
- **State Management**: Component-based with services
- **HTTP Client**: Angular HttpClient
- **Forms**: Reactive Forms with validation

## Development

### Adding New Features
1. Backend: Add new endpoints in `main.py` and models in `models.py`
2. Frontend: Create components, update services, and integrate with backend

### Database Integration
To use a real database instead of in-memory storage:
1. Install a database adapter (e.g., SQLAlchemy for PostgreSQL)
2. Update the models to use database models
3. Replace the in-memory storage with database operations

## Troubleshooting

### Common Issues
1. **CORS errors**: Ensure backend is running on port 8000
2. **API connection failed**: Check if backend server is running
3. **Build errors**: Ensure all dependencies are installed
4. **Port conflicts**: Change ports in configuration files if needed

### Logs
- Backend logs: Check terminal where `python main.py` is running
- Frontend logs: Check browser console and terminal where `npm start` is running

## License

This project is created for demonstration purposes.

## Contact

For questions or issues, please refer to the project documentation or create an issue in the repository.

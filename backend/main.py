from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from datetime import datetime
import math

from models import Issue, IssueCreate, IssueUpdate, IssueResponse, IssueStatus, IssuePriority

app = FastAPI(title="Issue Tracker API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (in production, use a database)
issues_db = []
next_id = 1

# Sample data
sample_issues = [
    {
        "title": "Fix login bug",
        "description": "Users cannot login with special characters in password",
        "status": "open",
        "priority": "high",
        "assignee": "John Doe"
    },
    {
        "title": "Add dark mode",
        "description": "Implement dark theme for better user experience",
        "status": "in_progress",
        "priority": "medium",
        "assignee": "Jane Smith"
    },
    {
        "title": "Update documentation",
        "description": "Update API documentation with new endpoints",
        "status": "closed",
        "priority": "low",
        "assignee": "Bob Johnson"
    },
    {
        "title": "Performance optimization",
        "description": "Optimize database queries for better performance",
        "status": "open",
        "priority": "critical",
        "assignee": "Alice Brown"
    },
    {
        "title": "Add unit tests",
        "description": "Write comprehensive unit tests for core functionality",
        "status": "in_progress",
        "priority": "medium",
        "assignee": "Charlie Wilson"
    }
]

# Initialize with sample data
for issue_data in sample_issues:
    issue = Issue(
        id=next_id,
        title=issue_data["title"],
        description=issue_data["description"],
        status=IssueStatus(issue_data["status"]),
        priority=IssuePriority(issue_data["priority"]),
        assignee=issue_data["assignee"],
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    issues_db.append(issue)
    next_id += 1

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/issues", response_model=IssueResponse)
async def get_issues(
    search: Optional[str] = Query(None, description="Search by title"),
    status: Optional[IssueStatus] = Query(None, description="Filter by status"),
    priority: Optional[IssuePriority] = Query(None, description="Filter by priority"),
    assignee: Optional[str] = Query(None, description="Filter by assignee"),
    sort_by: Optional[str] = Query("updated_at", description="Sort by field (id, title, status, priority, assignee, created_at, updated_at)"),
    sort_order: Optional[str] = Query("desc", description="Sort order (asc, desc)"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page")
):
    # Filter issues
    filtered_issues = issues_db.copy()
    
    # Apply search filter
    if search:
        filtered_issues = [issue for issue in filtered_issues if search.lower() in issue.title.lower()]
    
    # Apply status filter
    if status:
        filtered_issues = [issue for issue in filtered_issues if issue.status == status]
    
    # Apply priority filter
    if priority:
        filtered_issues = [issue for issue in filtered_issues if issue.priority == priority]
    
    # Apply assignee filter
    if assignee:
        filtered_issues = [issue for issue in filtered_issues if issue.assignee and assignee.lower() in issue.assignee.lower()]
    
    # Apply sorting
    reverse = sort_order == "desc"
    if sort_by in ["id", "title", "status", "priority", "assignee", "created_at", "updated_at"]:
        filtered_issues.sort(key=lambda x: getattr(x, sort_by), reverse=reverse)
    
    # Apply pagination
    total = len(filtered_issues)
    total_pages = math.ceil(total / page_size)
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_issues = filtered_issues[start_index:end_index]
    
    return IssueResponse(
        issues=paginated_issues,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )

@app.get("/issues/{issue_id}", response_model=Issue)
async def get_issue(issue_id: int):
    issue = next((issue for issue in issues_db if issue.id == issue_id), None)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue

@app.post("/issues", response_model=Issue)
async def create_issue(issue_data: IssueCreate):
    global next_id
    issue = Issue(
        id=next_id,
        title=issue_data.title,
        description=issue_data.description,
        status=issue_data.status,
        priority=issue_data.priority,
        assignee=issue_data.assignee,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    issues_db.append(issue)
    next_id += 1
    return issue

@app.put("/issues/{issue_id}", response_model=Issue)
async def update_issue(issue_id: int, issue_data: IssueUpdate):
    issue = next((issue for issue in issues_db if issue.id == issue_id), None)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    
    # Update fields if provided
    if issue_data.title is not None:
        issue.title = issue_data.title
    if issue_data.description is not None:
        issue.description = issue_data.description
    if issue_data.status is not None:
        issue.status = issue_data.status
    if issue_data.priority is not None:
        issue.priority = issue_data.priority
    if issue_data.assignee is not None:
        issue.assignee = issue_data.assignee
    
    # Update the updated_at timestamp
    issue.updated_at = datetime.now()
    
    return issue

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

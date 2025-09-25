import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IssueService } from '../../services/issue.service';
import { Issue, IssueStatus, IssuePriority, IssueFilters } from '../../models/issue.model';
import { IssueFormComponent } from '../issue-form/issue-form.component';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  displayedColumns: string[] = ['id', 'title', 'status', 'priority', 'assignee', 'updated_at', 'actions'];
  
  // Filters
  searchTerm = '';
  statusFilter: IssueStatus | '' = '';
  priorityFilter: IssuePriority | '' = '';
  assigneeFilter = '';
  
  // Sorting
  sortBy = 'updated_at';
  sortOrder: 'asc' | 'desc' = 'desc';
  
  // Pagination
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  
  // Loading state
  loading = false;
  
  // Enums for template
  IssueStatus = IssueStatus;
  IssuePriority = IssuePriority;
  
  statusOptions = Object.values(IssueStatus);
  priorityOptions = Object.values(IssuePriority);

  constructor(
    private issueService: IssueService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.loading = true;
    
    const filters: IssueFilters = {
      search: this.searchTerm || undefined,
      status: this.statusFilter || undefined,
      priority: this.priorityFilter || undefined,
      assignee: this.assigneeFilter || undefined,
      sort_by: this.sortBy,
      sort_order: this.sortOrder,
      page: this.pageIndex + 1,
      page_size: this.pageSize
    };

    this.issueService.getIssues(filters).subscribe({
      next: (response) => {
        this.issues = response.issues;
        this.totalItems = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading issues:', error);
        this.snackBar.open('Error loading issues', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.pageIndex = 0;
    this.loadIssues();
  }

  onFilterChange(): void {
    this.pageIndex = 0;
    this.loadIssues();
  }

  onSortChange(sort: Sort): void {
    this.sortBy = sort.active;
    this.sortOrder = sort.direction === 'asc' ? 'asc' : 'desc';
    this.loadIssues();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadIssues();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(IssueFormComponent, {
      width: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIssues();
        this.snackBar.open('Issue created successfully', 'Close', { duration: 3000 });
      }
    });
  }

  openEditDialog(issue: Issue): void {
    const dialogRef = this.dialog.open(IssueFormComponent, {
      width: '600px',
      data: { mode: 'edit', issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIssues();
        this.snackBar.open('Issue updated successfully', 'Close', { duration: 3000 });
      }
    });
  }

  openDetailDialog(issue: Issue): void {
    this.dialog.open(IssueDetailComponent, {
      width: '800px',
      data: { issue }
    });
  }

  getStatusColor(status: IssueStatus): string {
    switch (status) {
      case IssueStatus.OPEN: return 'primary';
      case IssueStatus.IN_PROGRESS: return 'accent';
      case IssueStatus.CLOSED: return 'warn';
      case IssueStatus.RESOLVED: return 'primary';
      default: return 'primary';
    }
  }

  getPriorityColor(priority: IssuePriority): string {
    switch (priority) {
      case IssuePriority.LOW: return 'primary';
      case IssuePriority.MEDIUM: return 'accent';
      case IssuePriority.HIGH: return 'warn';
      case IssuePriority.CRITICAL: return 'warn';
      default: return 'primary';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
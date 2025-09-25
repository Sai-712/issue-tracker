import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

import { Issue, IssueStatus, IssuePriority } from '../../models/issue.model';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent {
  issue: Issue;
  IssueStatus = IssueStatus;
  IssuePriority = IssuePriority;

  constructor(
    public dialogRef: MatDialogRef<IssueDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { issue: Issue }
  ) {
    this.issue = data.issue;
  }

  onClose(): void {
    this.dialogRef.close();
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
    return new Date(dateString).toLocaleString();
  }

  getIssueJson(): string {
    return JSON.stringify(this.issue, null, 2);
  }
}
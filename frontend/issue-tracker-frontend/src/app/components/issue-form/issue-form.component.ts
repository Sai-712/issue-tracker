import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IssueService } from '../../services/issue.service';
import { Issue, IssueCreate, IssueUpdate, IssueStatus, IssuePriority } from '../../models/issue.model';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {
  issueForm: FormGroup;
  isEditMode = false;
  loading = false;
  
  IssueStatus = IssueStatus;
  IssuePriority = IssuePriority;
  
  statusOptions = Object.values(IssueStatus);
  priorityOptions = Object.values(IssuePriority);

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private dialogRef: MatDialogRef<IssueFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit', issue?: Issue }
  ) {
    this.isEditMode = data.mode === 'edit';
    this.issueForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.issue) {
      this.populateForm(this.data.issue);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: [IssueStatus.OPEN, Validators.required],
      priority: [IssuePriority.MEDIUM, Validators.required],
      assignee: ['']
    });
  }

  populateForm(issue: Issue): void {
    this.issueForm.patchValue({
      title: issue.title,
      description: issue.description || '',
      status: issue.status,
      priority: issue.priority,
      assignee: issue.assignee || ''
    });
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      this.loading = true;
      
      if (this.isEditMode && this.data.issue) {
        this.updateIssue();
      } else {
        this.createIssue();
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  createIssue(): void {
    const formValue = this.issueForm.value;
    const issueData: IssueCreate = {
      title: formValue.title,
      description: formValue.description || undefined,
      status: formValue.status,
      priority: formValue.priority,
      assignee: formValue.assignee || undefined
    };

    this.issueService.createIssue(issueData).subscribe({
      next: (issue) => {
        this.loading = false;
        this.dialogRef.close(issue);
      },
      error: (error) => {
        console.error('Error creating issue:', error);
        this.snackBar.open('Error creating issue', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  updateIssue(): void {
    const formValue = this.issueForm.value;
    const issueData: IssueUpdate = {
      title: formValue.title,
      description: formValue.description || undefined,
      status: formValue.status,
      priority: formValue.priority,
      assignee: formValue.assignee || undefined
    };

    this.issueService.updateIssue(this.data.issue!.id, issueData).subscribe({
      next: (issue) => {
        this.loading = false;
        this.dialogRef.close(issue);
      },
      error: (error) => {
        console.error('Error updating issue:', error);
        this.snackBar.open('Error updating issue', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  markFormGroupTouched(): void {
    Object.keys(this.issueForm.controls).forEach(key => {
      const control = this.issueForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.issueForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}
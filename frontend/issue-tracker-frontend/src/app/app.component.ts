import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueListComponent } from './components/issue-list/issue-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IssueListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'issue-tracker-frontend';
}
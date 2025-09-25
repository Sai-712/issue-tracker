import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue, IssueCreate, IssueUpdate, IssueResponse, IssueFilters } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getHealth(): Observable<{status: string}> {
    return this.http.get<{status: string}>(`${this.apiUrl}/health`);
  }

  getIssues(filters: IssueFilters = {}): Observable<IssueResponse> {
    let params = new HttpParams();
    
    if (filters.search) params = params.set('search', filters.search);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.priority) params = params.set('priority', filters.priority);
    if (filters.assignee) params = params.set('assignee', filters.assignee);
    if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    if (filters.sort_order) params = params.set('sort_order', filters.sort_order);
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.page_size) params = params.set('pageSize', filters.page_size.toString());

    return this.http.get<IssueResponse>(`${this.apiUrl}/issues`, { params });
  }

  getIssue(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/issues/${id}`);
  }

  createIssue(issue: IssueCreate): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/issues`, issue);
  }

  updateIssue(id: number, issue: IssueUpdate): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/issues/${id}`, issue);
  }
}

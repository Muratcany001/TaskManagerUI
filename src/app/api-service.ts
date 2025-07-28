import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from './Pages/tasks/tasks';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "https://localhost:7188";
  private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
  });

  constructor(private http: HttpClient){}

  GetAllVersionsByTaskIds(taskId : number): Observable<any>{

    return this.http.get(`${this.apiUrl}/version/GetAllVersionsByTaskId/${taskId}`);
  }

  GetNewVersions(taskId : number, lastUpdaterId : number, status : string): Observable<any>{
    return this.http.post(`${this.apiUrl}/version/GetNewVersion/${taskId}/${lastUpdaterId}/${status}`, {});
  }

  DeleteLatestVersions(taskId:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/version/DeleteLatestVersion/${taskId}`)
  }
  
  GetLatestVersions(taskId:number, status:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/versions/ChangeVersionStatus/${taskId}/${status}`, {});
  }

  GetBackVersions(taskId:number, versionId: number, lastUpdaterId :number): Observable<any>{
    return this.http.patch(`${this.apiUrl}/version/GetBackVersion/${taskId}/${versionId}/${lastUpdaterId}`, {});
  }

  CreateTasks(task: Tasks): Observable<any>{
    return this.http.post(`${this.apiUrl}/task/CreateTask`, task, {headers: this.headers});
  }

  UpdateTaskByIds(id:number): Observable<any>{
    return this.http.patch(`${this.apiUrl}/task/UpdateTaskById/${id}`, {});
  }

  DeleteTaskByIds(id:number){
    return this.http.delete(`${this.apiUrl}/task/DeleteTaskById/${id}`);
  }
  GetAllTasks(): Observable<any>{
    return this.http.get(`${this.apiUrl}/task/GetAllTask`);
  }
  GetTaskByIds(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/task/GetTaskById/${id}`);
  }  
  GetTaskByVersionIds(versionId:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/task/GetTaskByVersionId/${versionId}`)
  }
  GetTaskByTitles(title:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/task/GetTaskByTitle/${title}`)
  }
  GetTaskByDates(date: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/task/GetTaskByDate/${date}`);
  }
  GetLastUpdaterNameByIds(taskId:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/GetFirstUpdaterNameById/${taskId}`)
  }

  CreateUsers(user:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/users/CreateUser`, user)
  }

  UpdateUserByIds(id:number, password:string): Observable<any>{
    return this.http.patch(`${this.apiUrl}/users/UpdateUser/${id}/${password}`, {})
  }

  GetAllUsers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/users/GetAllUsers`)
  }

  GetUserByIds(id:number){
    return this.http.get(`${this.apiUrl}/users/GetUserById/${id}`)
  }
  
  GetUserByEmails(email:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/users/GetUserByEmail/${email}`)
  }

  DeleteUserById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/users/DeleteUserById/${id}`)
  }
  
  CreateDocument(document : Document): Observable<any>{
    return this.http.post(`${this.apiUrl}/document/CreateDocument`, {})
  }

  DeleteDocument(documentId:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/document/DeleteCoument/${documentId}`)
  }

  GetDocumentById(documentId:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/document/GetDocumentById/${documentId}`)
  }
  GetAllDocuments(): Observable<any>{
    return this.http.get(`${this.apiUrl}/document/GetAllDocuments`)
  }
  UpdateDocumentById(id:number, filePath:string): Observable<any>
  {
    return this.http.patch(`${this.apiUrl}/document/UpdateDocumentById/${id}/${filePath}`, {});
  }

  login(user: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/Login`, user, {headers: this.headers});
  }

}

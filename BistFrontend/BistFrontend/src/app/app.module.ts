import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './jwt.interceptor';
import { RegisterSimpleComponent } from './register-simple/register-simple.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { ComplaintFilterComponent } from './complaint-filter/complaint-filter.component';
import { AdmissionComponent } from './admission/admission.component';
import { ComplaintSubAdminComponent } from './complaint-sub-admin/complaint-sub-admin.component';
import { EventComponent } from './event/event.component';
import { EventlistpublicComponent } from './eventlistpublic/eventlistpublic.component';
import { EventlistadminComponent } from './eventlistadmin/eventlistadmin.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Import ReactiveFormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { ChatComponent } from './chat/chat.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { AdmissionListComponent } from './admission-list/admission-list.component';
import { EventUserComponent } from './event-user/event-user.component';
import { EventListComponent } from './event-list/event-list.component';
import { AbsenceAdminComponent } from './absence-admin/absence-admin.component';
import { ListAbsenceAdminComponent } from './list-absence-admin/list-absence-admin.component';
import { ListAbsenceUserComponent } from './list-absence-user/list-absence-user.component';
import { ListNoteAdminComponent } from './list-note-admin/list-note-admin.component';
import { ListNoteUserComponent } from './list-note-user/list-note-user.component';
import { NoteAdminComponent } from './note-admin/note-admin.component';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ClasificationAbsenceAdminComponent } from './clasification-absence-admin/clasification-absence-admin.component';
import { ClasificationAbsenceUserComponent } from './clasification-absence-user/clasification-absence-user.component';
import { ClasificationNoteAdminComponent } from './clasification-note-admin/clasification-note-admin.component';
import { ClasificationNoteUserComponent } from './clasification-note-user/clasification-note-user.component';
import { UserComponent } from './user/user.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddTeacherToClassComponent } from './add-teacher-to-class/add-teacher-to-class.component';
import { ClassComponent } from './class/class.component';
import { ListStudentClassComponent } from './list-student-class/list-student-class.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ListSubjectComponent } from './list-subject/list-subject.component';
import { DeleteSubjectComponent } from './delete-subject/delete-subject.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { AddSubAdminComponent } from './add-sub-admin/add-sub-admin.component';
import { ListSubAdminComponent } from './list-sub-admin/list-sub-admin.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { PrimaryoverviewnComponent } from './primaryoverviewn/primaryoverviewn.component';
import { PrimaryEarlyearComponent } from './primary-earlyear/primary-earlyear.component';
import { PrimaryKeystageComponent } from './primary-keystage/primary-keystage.component';
import { AdmissionStep2Component } from './admission-step2/admission-step2.component';
import { AdmissionStep3Component } from './admission-step3/admission-step3.component';
import { AdmissionStep4Component } from './admission-step4/admission-step4.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSimpleComponent,
    ComplaintComponent,
    NavbarComponent,
    ComplaintListComponent,
    ComplaintFilterComponent,
    AdmissionComponent,
    ComplaintSubAdminComponent,
    EventComponent,
    EventlistpublicComponent,
    EventlistadminComponent,
    ProfileEditComponent,
    ChatComponent,
    ResetPasswordComponent,
    PasswordResetRequestComponent,
    AdmissionListComponent,
    EventUserComponent,
    EventListComponent,
    AbsenceAdminComponent,
    ListAbsenceAdminComponent,
    ListAbsenceUserComponent,
    ListNoteAdminComponent,
    ListNoteUserComponent,
    NoteAdminComponent,
    StudentComponent,
    StudentListComponent,
    ClasificationAbsenceAdminComponent,
    ClasificationAbsenceUserComponent,
    ClasificationNoteAdminComponent,
    ClasificationNoteUserComponent,
    UserComponent,
    AddClassComponent,
    AddStudentComponent,
    AddTeacherToClassComponent,
    ClassComponent,
    ListStudentClassComponent,
    AddSubjectComponent,
    ListSubjectComponent,
    DeleteSubjectComponent,
    TeacherComponent,
    AddTeacherComponent,
    AddAdminComponent,
    ListAdminComponent,
    AddSubAdminComponent,
    ListSubAdminComponent,
    VerifyUserComponent,
    PrimaryoverviewnComponent,
    PrimaryEarlyearComponent,
    PrimaryKeystageComponent,
    AdmissionStep2Component,
    AdmissionStep3Component,
    AdmissionStep4Component,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true  } 
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

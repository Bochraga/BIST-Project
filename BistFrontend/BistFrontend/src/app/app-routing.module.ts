import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegisterSimpleComponent } from './register-simple/register-simple.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { AdmissionComponent } from './admission/admission.component';
import { ComplaintSubAdminComponent } from './complaint-sub-admin/complaint-sub-admin.component';
import { EventComponent } from './event/event.component';
import { EventlistpublicComponent } from './eventlistpublic/eventlistpublic.component';
import { EventlistadminComponent } from './eventlistadmin/eventlistadmin.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { AdmissionListComponent } from './admission-list/admission-list.component';
import { EventUserComponent } from './event-user/event-user.component';
import { EventListComponent } from './event-list/event-list.component';
import { StudentComponent } from './student/student.component';
import { NoteAdminComponent } from './note-admin/note-admin.component';
import { ListNoteAdminComponent } from './list-note-admin/list-note-admin.component';
import { ListNoteUserComponent } from './list-note-user/list-note-user.component';
import { ClasificationNoteAdminComponent } from './clasification-note-admin/clasification-note-admin.component';
import { ListAbsenceAdminComponent } from './list-absence-admin/list-absence-admin.component';
import { ClasificationNoteUserComponent } from './clasification-note-user/clasification-note-user.component';
import { ClasificationAbsenceAdminComponent } from './clasification-absence-admin/clasification-absence-admin.component';
import { ClasificationAbsenceUserComponent } from './clasification-absence-user/clasification-absence-user.component';
import { ListAbsenceUserComponent } from './list-absence-user/list-absence-user.component';
import { AbsenceAdminComponent } from './absence-admin/absence-admin.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UserComponent } from './user/user.component';
import { ClassComponent } from './class/class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentClassComponent } from './list-student-class/list-student-class.component';
import { AddTeacherToClassComponent } from './add-teacher-to-class/add-teacher-to-class.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ListSubjectComponent } from './list-subject/list-subject.component';
import { DeleteSubjectComponent } from './delete-subject/delete-subject.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherComponent } from './teacher/teacher.component';
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

const routes: Routes = [
  {
    path: '', component: BodyComponent,
    children: [
      {
        path: 'eventlistAdmin',
        component: EventlistadminComponent
      },
      { path: 'admissionlist', component: AdmissionListComponent },

      {
        path: 'AddAdmission',
        component: AdmissionComponent
      },
      {
        path: 'AddAdmission2',
        component: AdmissionStep2Component
      },
      {
        path: 'AddAdmission3',
        component: AdmissionStep3Component
      },
      {
        path: 'AddAdmission4',
        component: AdmissionStep4Component
      },
      { path: 'password-reset-request', component: PasswordResetRequestComponent },

      {
        path: 'forgotpassword',
        component: LoginComponent
      },

      {
        path: 'eventlistall',
        component: EventlistpublicComponent
      },
      {
        path: 'complaint',
        component: ComplaintComponent
      },
      {
        path: 'Listcomplaint',
        component: ComplaintListComponent
      },
      {
        path: 'editprofile',
        component: ProfileEditComponent
      },

    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'restpassword/:token',
    component: ResetPasswordComponent
  },
  { path: 'registersimple', component: RegisterSimpleComponent },
  // { path: 'editprofile', component: ProfileEditComponent },

  /* { path: 'complaint', component: ComplaintComponent ,
   children: [
     {
         path: 'Listcomplaint',
         component: ComplaintListComponent
     }
 ]},
 */
  // { path: 'Listcomplaint', component: ComplaintListComponent },
  ///Primary 
  { path: 'primaryOverview',component:PrimaryoverviewnComponent },
  { path: 'primaryEarlyear',component:PrimaryEarlyearComponent },
  { path: 'primaryKeystage', component: PrimaryKeystageComponent },

  { path: 'Listadmission', component: AdmissionComponent },
  { path: 'ListcomplaintSub-admin', component: ComplaintSubAdminComponent },
  { path: 'eventUser', component: EventUserComponent },
  { path: 'eventpart', component: EventListComponent },
  { path: 'uploadfile', component: UserComponent },
  { path: 'verifyuser', component: VerifyUserComponent },



  { path: 'event', component: EventComponent },
  //{ path: 'eventlistall', component: EventlistpublicComponent , outlet: 'eventList'},
  { path: 'eventlistAdmin', component: EventlistadminComponent },
  { path: 'addNote', component: NoteAdminComponent },//done
  { path: 'ListNote', component: ListNoteAdminComponent },//done
  { path: 'ListNoteParent', component: ListNoteUserComponent },//done
  { path: 'NoteClassificationTeacher', component: ClasificationNoteAdminComponent },//done
  { path: 'ListAbsence', component: ListAbsenceAdminComponent },//done
  { path: 'NoteClassifictaionParent', component: ClasificationNoteUserComponent },//prs done(prb de AND et OR)
  { path: 'AbsenceClassification', component: ClasificationAbsenceAdminComponent }, 
  { path: 'AbsenceClassificationParent', component: ClasificationAbsenceUserComponent },
  { path: 'ListAbsenceParent', component: ListAbsenceUserComponent },
  { path: 'AddAbsenceTeacher', component: AbsenceAdminComponent },//reste getStudent
  /////////////////// sub-adminAdmission
  { path: 'listStudent', component: StudentListComponent }, // Done
  { path: 'getClass', component: ClassComponent },    // Done 
  {path:'addClass',component: AddClassComponent}, // Done 
  {path:'addStudent',component:AddStudentComponent}, // Done
  {path:'addStudentToClass',component:StudentComponent}, // Done
  //////// For the Sub-admin-teacher
  {path:'listStudentClass', component:ListStudentClassComponent},/////   ---> En cours %%%%
  {path:'addTeacherToClass', component:AddTeacherToClassComponent},
  {path:'addTeacher',component:AddTeacherComponent },
  {path:'ListTeacher',component:TeacherComponent},

   /// Done ( fixed problem of level list )
  /// 05-09  [ Works ]
  {path:'addSubject', component:AddSubjectComponent},
  {path:'ListSubject', component:ListSubjectComponent},
  {path:'DeleteSubject', component:DeleteSubjectComponent},
/////////// for superAdmin
{path:'AddAdmin', component:AddAdminComponent},
{path:'ListAdmin', component:ListAdminComponent},
///////for Admin
{path:'AddSubAdmin', component:AddSubAdminComponent},
{path:'ListSubAdmin', component:ListSubAdminComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

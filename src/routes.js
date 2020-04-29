import React from 'react';
//import ManageUser from "../src/views/ManageUser/UserDetails/UserDetails";


const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));

const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));

const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));

const Dashboard = React.lazy(() => import('./views/Dashboard'));



const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
//const Typography = React.lazy(() => import('./views/ManageUser/Typography'));
// const ManageUser = React.lazy(() => import('./views/ManageUser/UserDetails/UserDetails'));
//const UserRegistration = React.lazy(() => import('./views/ManageUser/UserRegistration'));

const UserRegistration_1 = React.lazy(() => import('./views/Users/UserRegistration'));

//const AddQuestion = React.lazy(() => import('./views/ManageQuestion/AddQuestion'));
const QuestionList = React.lazy(() => import('./views/ManageQuestion/QuestionsList/Questions'));

const QuestionType = React.lazy(() => import('./views/AssignQuestions/QuestionTypeSelection/QuestionType'));
const AssignQuestion = React.lazy(() => import('./views/AssignQuestions/QuestionTypeSelection/AssignQuestion'));
const SelectQuestions = React.lazy(() => import('./views/AssignQuestions/QuestionTypeSelection/SelectQuestions'));
//const ObjectiveQues = React.lazy(() => import('./views/ManageQuestion/ObjectiveQues'));
//const SubjectiveQues = React.lazy(() => import('./views/ManageQuestion/SubjectiveQues'));
//const TabsResult = React.lazy(() => import('./views/ManageQuestion/Tabs'));


const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const RecruitDefault = React.lazy(() => import('./containers/RecruitDefaultLayout'));

const UserEdit = React.lazy(() => import('./views/Users/UserEdit'));

const EditorJava = React.lazy(() => import('./views/Component/EditorJava'));
const TakeTest = React.lazy(() => import('./views/Component/TakeChallenge/TakeTest'));
const TakeChallenge = React.lazy(() => import('./views/Component/TakeChallenge/TakeChallenge'));
const ObjectiveQuestionWizard = React.lazy(()=> import('./views/Component/TakeChallenge/ObjectiveQuestionWizard/ObjectiveQuestionWizard'));

const CreateQuestion = React.lazy(() => import('./views/ManageQuestion/CreateQuestion/CreateQuestion'));
const CreateSubjective = React.lazy(() => import('./views/ManageQuestion/CreateSubjective/CreateSubjective'));
const CreateObjective = React.lazy(() => import('./views/ManageQuestion/CreateObjective/CreateObjective'));

const ModifySubjectiveQuestion = React.lazy(() => import('./views/ManageQuestion/ModifySubjectiveQuestion/ModifySubjectiveQuestion'));
const ModifyObjectiveQuestion = React.lazy(() => import('./views/ManageQuestion/ModifyObjectiveQuestion/ModifyObjectiveQuestion'));

const TestAccordion =React.lazy(() => import('./views/Component/TakeChallenge/Test/TestAccordionLayout'));
const SolveQuestion =React.lazy(() => import('./views/Component/TakeChallenge/Test/SolveQuestion'));
const SubQuestionsList =React.lazy(() => import('./views/Component/TakeChallenge/Test/SubQuestionsList'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  
  
  
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  
  
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },


  { path: '/manageQuestion/questionList', name: 'Add_Question', component: QuestionList },
  //{ path: '/manageQuestion/addQuestion', name: 'Add_Question', component: AddQuestion },
  { path: '/manageQuestion/editQuestion', name: 'Edit_Question', component: Navs },

  { path: '/manageQuestion/createQuestion', name: 'Create_Question', component : CreateQuestion},
  {path: '/manageQuestion/createSubjective', name: 'Create_Subjective', component : CreateSubjective},
  {path :'/manageQuestion/CreateObjective', name: 'Create_Objective', component: CreateObjective},
  {path :'/manageQuestion/modifySubjectiveQuestion', name: 'Modify_Question', component: ModifySubjectiveQuestion},
  {path :'/manageQuestion/modifyObjectiveQuestion',name:'Modify_Question',component: ModifyObjectiveQuestion},

  { path: '/manageUser/users', name: 'Manage User', component: Users },
  { path: '/manageUser/user/:id', exact: true, name: 'User Details', component: User },
  { path: '/manageUser/user/:id/edit', exact: true, name: 'Edit User', component: UserEdit },
  { path: '/manageUser/user/:userName', exact: true, name: 'User Details', component: User },


  { path: '/manageUser/createUser', name: 'Add User', component: UserRegistration_1 },
  { path: '/manageUser/deleteUser', name: 'Delete User', component: UserRegistration_1 },

  { path: '/manageCandidate/history', name: 'Candidates_History', component:  ButtonDropdowns }, 
  { path: '/manageCandidate/createUser', name: 'Add_Candidate', component: Dashboard },
  { path: '/manageCandidate/deleteUser', name: 'Delete_Candidate', component: Dashboard },

  { path: '/scheduleTest', name: 'Schedule_Test', component: BrandButtons },
  

  { path: '/manageDashbord/users', name: 'Users', component: RecruitDefault },

  { path: '/manage/CREATE_USER', name: 'Add_User', component: Users },

  // { path: '/manage/CREATE_Q', name: 'Add_Question', component: AddQuestion },
  // { path: '/manage/DELETE_Q', name: 'Delete_Question', component: AddQuestion },
  // { path: '/manage/MODIFY_Q', name: 'Edit_Question', component: AddQuestion },
  // { path: '/manage/VIEW_Q', name: 'Questions', component: AddQuestion },
  // { path: '/manage/ASSIGN_Q', name: 'Assign_Questions', component: AddQuestion },

  { path: '/manage/SCHEDULE_TEST', name: 'Schedule_Test', component: BrandButtons },
  { path: '/manage/TAKE_TEST', name: 'Take_Test', component: BrandButtons },
  
  
  { path: '/assignQuestion/AssignQuestion', name: 'Assign_Questions', component: AssignQuestion },
  { path: '/assignQuestion/QuestionType', name: 'Assign_Questions', component: QuestionType },

  { path: '/takechallenge', name: 'TakeChallenge', component: TakeChallenge },
  { path: '/taketest', name: 'TakeTest', component: TakeTest },
  {path: '/takeobjectivetest', name: 'ObjectiveQuestionWizard', component: ObjectiveQuestionWizard},
  {path: '/testAccordion', name: 'ObjectiveQuestionWizard', component: TestAccordion},
  {path: '/solveQuestion', name: 'ObjectiveQuestionWizard', component: SolveQuestion},
  {path: '/subQuestionsList', name: 'SubQuestionsList', component: SubQuestionsList},



];

export default routes;

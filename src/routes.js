import React from 'react';
import ManageUser from "../src/views/ManageUser/UserDetails/UserDetails";


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
const Typography = React.lazy(() => import('./views/ManageUser/Typography'));
// const ManageUser = React.lazy(() => import('./views/ManageUser/UserDetails/UserDetails'));
const UserRegistration = React.lazy(() => import('./views/ManageUser/UserRegistration'));



const AddQuestion = React.lazy(() => import('./views/ManageQuestion/AddQuestion'));
//const ObjectiveQues = React.lazy(() => import('./views/ManageQuestion/ObjectiveQues'));
//const SubjectiveQues = React.lazy(() => import('./views/ManageQuestion/SubjectiveQues'));
//const TabsResult = React.lazy(() => import('./views/ManageQuestion/Tabs'));


const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const AdminDefault = React.lazy(() => import('./containers/AdminDefaultLayout'));
const RecruitDefault = React.lazy(() => import('./containers/RecruitDefaultLayout'));

const UserEdit = React.lazy(() => import('./views/Users/UserEdit'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/theme', exact: true, name: 'Theme', component: ManageUser },
  
  
  
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
  { path: '/manageQuestion/addQuestion', name: 'Add_Question', component: AddQuestion },
  { path: '/manageQuestion/editQuestion', name: 'Edit_Question', component: Navs },
  { path: '/manageQuestion/deleteQuestion', name: 'Delete_Question', component: Typography },
  { path: '/manageQuestion/add', name: 'Question', component: Typography },

  { path: '/manageUser/UserList', name: 'Manage User', component: Users },
  { path: '/manageUser/user/:id', exact: true, name: 'User Details', component: User },
  { path: '/manageUser/user/:id/edit', exact: true, name: 'Edit User', component: UserEdit },
  { path: '/manageUser/user/:userName', exact: true, name: 'User Details', component: User },


  { path: '/manageUser/createUser', name: 'Add User', component: UserRegistration },
  { path: '/manageUser/deleteUser', name: 'Delete User', component: UserRegistration },

  { path: '/manageCandidate/history', name: 'Candidates_History', component:  ButtonDropdowns }, 
  { path: '/manageCandidate/createUser', name: 'Add_Candidate', component: Dashboard },
  { path: '/manageCandidate/editUser', name: 'Edit_Candidate', component: ManageUser },
  { path: '/manageCandidate/deleteUser', name: 'Delete_Candidate', component: Dashboard },

  { path: '/scheduleTest', name: 'Schedule_Test', component: BrandButtons },
  

  { path: '/manageDashbord/user', name: 'user', component: AdminDefault },
  { path: '/manageDashbord/users', name: 'Users', component: RecruitDefault },

  { path: '/manage/CREATE_USER', name: 'Add_User', component: Users },
  { path: '/manage/DELETE_USER', name: 'Delete_User', component: ManageUser },
  { path: '/manage/MODIFY_USER', name: 'Edit_User', component: ManageUser },
  { path: '/manage/VIEW_USER', name: 'Users', component: ManageUser },

  { path: '/manage/CREATE_Q', name: 'Add_Question', component: AddQuestion },
  { path: '/manage/DELETE_Q', name: 'Delete_Question', component: AddQuestion },
  { path: '/manage/MODIFY_Q', name: 'Edit_Question', component: AddQuestion },
  { path: '/manage/VIEW_Q', name: 'Questions', component: AddQuestion },
  { path: '/manage/ASSIGN_Q', name: 'Assign_Questions', component: AddQuestion },

  { path: '/manage/SCHEDULE_TEST', name: 'Schedule_Test', component: BrandButtons },
  { path: '/manage/TAKE_TEST', name: 'Take_Test', component: BrandButtons },
];

export default routes;

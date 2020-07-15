export default {
  
  items: [
    
    {
      name :'Manage User',
      actual_name: 'MANAGE_USER',
      url: '/manageUser/users',
      icon: 'icon-user',
      
     },
	 {
      name :'Manage Permission',
      actual_name: 'MANAGE_PERMISSION',
      url: '/manageUser/managePermission',
      icon: 'icon-pencil',
      
     },
    {
      name :'Manage Question',
      actual_name: 'MANAGE_QUESTION',
       url: '/manageQuestion/questionList',
      icon: 'icon-pencil',
    },
    {
      name :'Schedule Test',
      actual_name: 'ASSIGN_QUESTION',
      url: '/assignQuestion/AssignedQuestion',
      icon: 'icon-calendar'
    },
    {
      name :'Take Test',
      actual_name: 'TAKE_TEST',
      url: '/takechallenge',
      icon: 'icon-puzzle',
    },
    {
      name: 'Test',
      actual_name: 'TEST',
      url: '/testAccordion',
      icon: 'icon-puzzle',
    },
    { name:'Test Report',
    actual_name:'CANDIDATES_REPORT',
      url: '/candidatesReport',
      icon:'icon-note',
    },
    {
      name :'Manage User',
      actual_name: 'Manage MANAGE_USER',
      url: '/manageQuestion/addQuestion',
      icon: 'icon-pencil',
    },
    {
      name:'Editor',
      actual_name: 'Editor',
      url: '/base/tables',
      icon: 'icon-pencil',
    },
    {
      name :'Schedule Request',
      actual_name: 'SCHEDULE_TEST',
      url: '/scheduleTest',
      icon: 'icon-calendar',
    },
  ]
};

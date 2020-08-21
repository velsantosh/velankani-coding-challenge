export default {
  
  items: [
    
    {
      name :'User',
      actual_name: 'MANAGE_USER',
      icon: 'icon-user',
      children:[
        {
          name: 'Manage User',
          url: '/manageUser/users',
         
        },
        {
          name: 'Manage Permission',
          url: '/manageUser/managePermission',
         
        }
      ]
     },
	 
    {
      name :'Question',
      actual_name: 'MANAGE_QUESTION',
      icon: 'icon-pencil',
      children:[
        {
          name: 'Manage Question',
          url: '/manageQuestion/questionList'
         
        },
        {
          name: 'Manage Template',
          url: '/manageQuestionTemplate',
         
        }
      ]
    },
    {
      name :'Schedule Challenge',
      actual_name: 'ASSIGN_QUESTION',
      icon: 'icon-calendar',
      children:[
        {
          name: 'Schedule Test',
          url: '/assignQuestion/AssignedQuestion',
         
        },
        {
          name: 'Schedule Request',
          actual_name: 'SCHEDULE_TEST',
          url: '/scheduleTest',
         
        }
      ]
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
    
    // {
    //   name :'Schedule Request',
    //   actual_name: 'SCHEDULE_TEST',
    //   url: '/scheduleTest',
    //   icon: 'icon-calendar',
    // },
  ]
};

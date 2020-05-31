export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Master',
      url: '/master',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Brand',
          url: '/master/brand',
          icon: 'icon-puzzle',
        },
        {
          name: 'Category',
          url: '/master/category',
          icon: 'icon-puzzle',
        },
        
      ],
    },
    {
      name: 'Reports',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
      ],
    }
  ],
};

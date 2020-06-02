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
      icon: 'fa fa-wpforms',
      children: [
        {
          name: 'Brand',
          url: '/master/brand',
          icon: 'fa fa-edit',
        },
        {
          name: 'Category',
          url: '/master/category',
          icon: 'fa fa-edit',
        },
        {
          name: 'Organization',
          url: '/master/organization',
          icon: 'fa fa-edit',
        },
        {
          name: 'Asset',
          url: '/master/assetEntry',
          icon: 'fa fa-edit',
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

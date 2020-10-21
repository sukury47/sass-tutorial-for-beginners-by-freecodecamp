const routes = [
  {
    key: 'index',
    path: 'index.html'
  },
  {
    key: 'about',
    path: 'about.html'
  },
  {
    key: 'projects',
    path: 'projects.html'
  },
  {
    key: 'contact',
    path: 'contact.html'
  }
];

const getCurrentRoute = () => {
  const url = window.location.href;
  const path = url.replace(
    /https?:\/\/[a-zA-Z\d\.]*(:\d+)?\//,
    ''
  );

  return routes.find((route) => route.path === path);
};

export { routes, getCurrentRoute };

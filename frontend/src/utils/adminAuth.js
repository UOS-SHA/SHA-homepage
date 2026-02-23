const ADMIN_TOKEN_KEY = 'adminToken';

export const getAdminToken = () => sessionStorage.getItem(ADMIN_TOKEN_KEY);

export const setAdminToken = (token) => {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  // Remove old persistent token key if it exists from previous builds.
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

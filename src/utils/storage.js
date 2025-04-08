export function saveUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  export function getUserData() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  }
  
  export function clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
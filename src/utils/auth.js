export const auth = {
  currentUser: null,

  login(email, password) {
    // mock simples
    if (email === "admin@company.com") {
      this.currentUser = { name: "Admin", role: "Admin" };
    } else {
      this.currentUser = { name: "Employee", role: "Employee" };
    }
    return this.currentUser;
  },

  logout() {
    this.currentUser = null;
  },

  getUser() {
    return this.currentUser;
  },

  hasRole(role) {
    return this.currentUser?.role === role;
  },
};

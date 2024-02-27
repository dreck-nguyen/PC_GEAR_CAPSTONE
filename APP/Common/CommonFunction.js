export function checkRole(loginUser, roleName) {
  return loginUser.role === roleName;
}

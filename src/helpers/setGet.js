export const getCurrentUser = () => {
  const user = localStorage.getItem("userAccess");
  if (!user) return null;
  return user;
}

export const setCurrentUser = (user) => {
  localStorage.setItem("userAccess", JSON.stringify(user))
}
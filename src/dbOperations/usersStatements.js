export const signupUser = "INSERT INTO users(username, email, password, role, status) VALUES (?,?,?,?,?) ";

export const loginUser = "SELECT uid,username,email,password,role FROM users WHERE email=? AND status='Y'";

export const getUser = "SELECT uid, username, email,role FROM users WHERE uid = ? AND status='Y'";

export const deleteUser = "UPDATE users SET status='N' WHERE uid=?";

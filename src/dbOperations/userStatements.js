export const signupUser = `INSERT INTO users(email, password, role, organization_id, status) VALUES (?, ?, ?, ?,'Y')`;

export const loginUser = `SELECT id,email,password,role,organization_id FROM users WHERE email=? AND status='Y'`;

export const getUser = `SELECT id, email, role,organization_id FROM users WHERE id = ? AND status='Y'`;

export const deleteUser = `UPDATE users SET status='N' WHERE uid=?`;

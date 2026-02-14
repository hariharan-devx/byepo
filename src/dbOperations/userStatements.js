export const signupUserQuery = `INSERT INTO users(email, password, role, organization_id, status) VALUES (?, ?, ?, ?,'Y')`;

export const loginUserQuery = `SELECT id,email,password,role,organization_id FROM users WHERE email=? AND status='Y'`;

export const getUserQuery = `SELECT id, email, role,organization_id FROM users WHERE id = ? AND status='Y'`;

export const deleteUserQuery = `UPDATE users SET status='N' WHERE id=?`;

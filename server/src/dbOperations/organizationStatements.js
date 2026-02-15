export const getOrganizationsQuery = `SELECT id,name FROM organizations WHERE status = 'Y'`;

export const createOrganizationQuery = `INSERT INTO organizations (name,status) VALUES (?,'Y')`;

export const checkOrganizationExistsQuery = `SELECT id FROM organizations WHERE id = ? AND status = 'Y'`;

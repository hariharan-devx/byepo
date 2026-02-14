export const getOrganizationsQuery = `SELECT id,name FROM organizations WHERE status = 'Y'`;

export const createOrganizationQuery = `INSERT INTO organizations (name,status) VALUES (?,'Y')`;

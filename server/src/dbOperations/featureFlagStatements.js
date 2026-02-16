export const createFeatureFlagQuery = `INSERT INTO feature_flags (feature_key, organization_id, created_by, status) VALUES (?, ?, ?, 'Y')`;

export const updateFeatureFlagQuery = `UPDATE feature_flags SET is_enabled = ?, updated_by = ? WHERE organization_id = ? AND id = ?`;

export const deleteFeatureFlagQuery = `UPDATE feature_flags SET deleted_by = ?, status = 'N' WHERE organization_id = ? AND id = ?`;

export const listFeatureFlagQuery = `SELECT id, feature_key, is_enabled FROM feature_flags WHERE organization_id = ? AND status = 'Y'`;

export const checkFeatureFlagQuery = `SELECT id, feature_key, is_enabled FROM feature_flags WHERE feature_key = ? AND organization_id = ? AND status = 'Y'`;

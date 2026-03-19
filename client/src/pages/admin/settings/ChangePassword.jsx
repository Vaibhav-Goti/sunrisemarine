import { useState } from 'react';
import API from '../../../api/axios';
import { KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setLoading(true);
        try {
            const response = await API.post('/admin/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            setStatus({ type: 'success', message: response.data.message });
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setLoading(false);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Password change failed' });
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Security Settings</h1>
            </div>

            <div className="form-card-admin" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div className="security-icon-header">
                    <ShieldCheck size={48} color="#007bff" />
                    <h2>Change Admin Password</h2>
                    <p>Ensure your account stays secure by using a strong password.</p>
                </div>

                {status.message && (
                    <div className={`status-alert ${status.type}`}>
                        {status.type === 'error' ? <AlertCircle size={20} /> : <ShieldCheck size={20} />}
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Current Password</label>
                        <div className="input-with-icon">
                           
                            <input 
                                type="password" 
                                className="admin-input"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>New Password</label>
                        <input 
                            type="password" 
                            className="admin-input"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input 
                            type="password" 
                            className="admin-input"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn-admin" disabled={loading}>
                        {loading ? 'Changing...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ChangePassword;

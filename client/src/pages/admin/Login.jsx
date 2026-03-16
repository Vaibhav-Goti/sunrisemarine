import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import API from '../../api/axios';

import '../../styles/admin.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Attempting login for:', username);
        try {
            const response = await API.post('/admin/login', { username, password });
            console.log('Login successful:', response.data);
            login(response.data.user, response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed - Check console');
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                <div className="login-card-header">
                    <div className="login-logo-icon">⚓</div>
                    <h2 className="login-title">Admin Login</h2>
                    <p className="login-subtitle">Sunrise Marine Enterprise</p>
                </div>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="admin-input"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="admin-input"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" className="submit-btn-admin">Login</button>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link to="/" style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none' }}>&larr; Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

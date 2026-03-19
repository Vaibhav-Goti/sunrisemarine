import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import API from '../../api/axios';
import { Eye, EyeOff } from 'lucide-react';
import '../../styles/admin.css';
import SEO from '../../components/SEO';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        console.log('Attempting login for:', username);
        try {
            const response = await API.post('/admin/login', { username, password });
            console.log('Login successful:', response.data);
            login(response.data.user, response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed - Check console');
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <SEO 
                title="Admin Login" 
                description="Secure login area for Sunrise Marine Enterprise administration."
                keywords="admin, login, sunrise marine"
                robots="noindex, nofollow"
            />

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
                   <div className="form-group" style={{ position: 'relative' }}>
                    <label>Password</label>

                    <input 
                        type={showPassword ? "text" : "password"}
                        className="admin-input"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="Enter password"
                    />

                    <span 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '38px',
                            cursor: 'pointer',
                            color: '#555',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                </div>
                    <button type="submit" className="submit-btn-admin" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link to="/" style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none' }}>&larr; Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

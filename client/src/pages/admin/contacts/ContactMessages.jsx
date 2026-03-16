import { useState, useEffect } from 'react';
import API from '../../../api/axios';
import { Trash2, ChevronRight, Search, X } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await API.get('/contacts');
            setMessages(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setLoading(false);
        }
    };

    const handleMessageClick = (msg) => {
        setSelectedMessage(msg);
        setIsModalOpen(true);
        if (!msg.isRead) {
            markAsRead(msg._id);
        }
    };

    const markAsRead = async (id) => {
        try {
            await API.patch(`/contacts/${id}/read`);
            setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message?')) {
            try {
                await API.delete(`/contacts/${id}`);
                setMessages(messages.filter(m => m._id !== id));
                if (selectedMessage?._id === id) {
                    setIsModalOpen(false);
                }
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const formatDate = (dateString, full = false) => {
        const date = new Date(dateString);
        if (full) {
            return date.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' UTC'
        };
    };

    const filteredMessages = messages.filter(msg =>
        msg.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="admin-header">
                <h1>Contact Messages</h1>
                <div className="header-actions">
                    <div className="search-box-container">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input-admin"
                        />
                    </div>
                </div>
            </div>

            <div className="inquiry-list-container">
                <div className="inquiry-header">
                    <div className="col-sender">SENDER</div>
                    <div className="col-subject">INQUIRY SUBJECT</div>
                    <div className="col-timestamp">TIMESTAMP</div>
                </div>

                <div className="inquiry-body">
                    {loading ? (
                        <div className="no-data">Loading messages...</div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="no-data">
                            {searchTerm ? `No messages found matching "${searchTerm}"` : 'No messages received yet.'}
                        </div>
                    ) : (
                        filteredMessages.map(msg => {
                            const { date, time } = formatDate(msg.createdAt);
                            return (
                                <div key={msg._id} className={`inquiry-row ${msg.isRead ? 'read' : 'unread'}`} onClick={() => handleMessageClick(msg)}>
                                    <div className="col-sender">
                                        <div className={`avatar avatar-${(msg.user_name || 'A').length % 5}`}>
                                            {getInitials(msg.user_name)}
                                        </div>
                                        <div className="sender-info">
                                            <span className="sender-name">{msg.user_name}</span>
                                            <span className="sender-email">{msg.user_email}</span>
                                        </div>
                                    </div>
                                    <div className="col-subject">
                                        <div className="subject-title">
                                            {!msg.isRead && <span className="unread-dot"></span>}
                                            {msg.subject}
                                        </div>
                                        <div className="subject-snippet">
                                            {msg.message?.substring(0, 100)}{msg.message?.length > 100 ? '...' : ''}
                                        </div>
                                    </div>
                                    <div className="col-timestamp">
                                        <div className="timestamp-date">{date}</div>
                                        <div className="timestamp-time">{time}</div>
                                    </div>
                                    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => handleDelete(msg._id)} className="delete-row-btn" title="Delete Message">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="inquiry-footer">
                    <div className="pagination-info">
                        Showing <strong>1 - {filteredMessages.length}</strong> of <strong>{messages.length}</strong> entries
                    </div>
                    <div className="pagination-controls">
                        <button className="page-btn prev" disabled>
                            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn next" disabled>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Message Detail Modal */}
            {isModalOpen && selectedMessage && (
                <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="admin-modal detail-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="header-user-info">
                                <div className={`avatar avatar-${(selectedMessage.user_name || 'A').length % 5}`}>
                                    {getInitials(selectedMessage.user_name)}
                                </div>
                                <div>
                                    <h2>{selectedMessage.user_name}</h2>
                                    <p className="modal-subtitle">{selectedMessage.user_email}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="close-modal"><X size={24} /></button>
                        </div>

                        <div className="modal-body">
                            <div className="detail-section">
                                <label>Subject</label>
                                <div className="detail-value subject-value">{selectedMessage.subject}</div>
                            </div>

                            <div className="detail-section">
                                <label>Message</label>
                                <div className="detail-value message-value">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="detail-section">
                                <label>Received On</label>
                                <div className="detail-value date-value">
                                    {formatDate(selectedMessage.createdAt, true)}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => handleDelete(selectedMessage._id)} className="delete-btn-modal">
                                <Trash2 size={18} /> Delete Message
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="close-btn-modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ContactMessages;

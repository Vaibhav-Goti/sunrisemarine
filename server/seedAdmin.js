require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const adminExists = await User.findOne({ username: 'admin' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        const admin = new User({
            username: 'admin',
            password: 'adminpassword123' // You should change this later
        });

        await admin.save();
        console.log('Default admin created:');
        console.log('Username: admin');
        console.log('Password: adminpassword123');
        
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();

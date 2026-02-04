require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Sample student data
const students = [
    {
        rollNo: '2024001',
        name: 'Deepak Kumar',
        email: 'deepak.kumar@example.com',
        academics: [
            {
                subjectName: 'Mathematics',
                attendance: { attended: 28, total: 30 },
                marks: { obtained: 92, total: 100 }
            },
            {
                subjectName: 'Physics',
                attendance: { attended: 26, total: 30 },
                marks: { obtained: 85, total: 100 }
            },
            {
                subjectName: 'Chemistry',
                attendance: { attended: 29, total: 30 },
                marks: { obtained: 94, total: 100 }
            }
        ]
    },
    {
        rollNo: '2024002',
        name: 'Jitendra Baghel',
        email: 'jitendra.baghel@example.com',
        academics: [
            {
                subjectName: 'Mathematics',
                attendance: { attended: 27, total: 30 },
                marks: { obtained: 88, total: 100 }
            },
            {
                subjectName: 'Physics',
                attendance: { attended: 28, total: 30 },
                marks: { obtained: 91, total: 100 }
            },
            {
                subjectName: 'Chemistry',
                attendance: { attended: 27, total: 30 },
                marks: { obtained: 93, total: 100 }
            }
        ]
    },
    {
        rollNo: '2024003',
        name: 'Akash Rajput',
        email: 'akash.rajput@example.com',
        academics: [
            {
                subjectName: 'Mathematics',
                attendance: { attended: 25, total: 30 },
                marks: { obtained: 78, total: 100 }
            },
            {
                subjectName: 'Physics',
                attendance: { attended: 27, total: 30 },
                marks: { obtained: 82, total: 100 }
            },
            {
                subjectName: 'Chemistry',
                attendance: { attended: 26, total: 30 },
                marks: { obtained: 89, total: 100 }
            }
        ]
    },
    {
        rollNo: '2024004',
        name: 'Dev Sharma',
        email: 'dev.sharma@example.com',
        academics: [
            {
                subjectName: 'Mathematics',
                attendance: { attended: 29, total: 30 },
                marks: { obtained: 96, total: 100 }
            },
            {
                subjectName: 'Physics',
                attendance: { attended: 29, total: 30 },
                marks: { obtained: 94, total: 100 }
            },
            {
                subjectName: 'Chemistry',
                attendance: { attended: 30, total: 30 },
                marks: { obtained: 98, total: 100 }
            }
        ]
    },
    {
        rollNo: '2024005',
        name: 'Harshita Kuari',
        email: 'harshita.kuari@example.com',
        academics: [
            {
                subjectName: 'Mathematics',
                attendance: { attended: 27, total: 30 },
                marks: { obtained: 87, total: 100 }
            },
            {
                subjectName: 'Physics',
                attendance: { attended: 26, total: 30 },
                marks: { obtained: 85, total: 100 }
            },
            {
                subjectName: 'Chemistry',
                attendance: { attended: 28, total: 30 },
                marks: { obtained: 90, total: 100 }
            }
        ]
    }
];

// Sample teacher data
const teachers = [
    {
        teacherId: 'TCH001',
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        subject: 'Mathematics',
        department: 'Science',
        phone: '9876543210'
    },
    {
        teacherId: 'TCH002',
        name: 'Prof. Anita Sharma',
        email: 'anita.sharma@example.com',
        subject: 'Physics',
        department: 'Science',
        phone: '9876543211'
    },
    {
        teacherId: 'TCH003',
        name: 'Dr. Suresh Patel',
        email: 'suresh.patel@example.com',
        subject: 'Chemistry',
        department: 'Science',
        phone: '9876543212'
    },
    {
        teacherId: 'TCH004',
        name: 'Ms. Priya Singh',
        email: 'priya.singh@example.com',
        subject: 'English',
        department: 'Arts',
        phone: '9876543213'
    },
    {
        teacherId: 'TCH005',
        name: 'Mr. Amit Verma',
        email: 'amit.verma@example.com',
        subject: 'Computer Science',
        department: 'Technology',
        phone: '9876543214'
    }
];

// Seed the database
const seedDB = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Student.deleteMany({});
        await Teacher.deleteMany({});
        console.log('Cleared existing data');

        // Insert new data
        await Student.insertMany(students);
        console.log('Students seeded successfully');

        await Teacher.insertMany(teachers);
        console.log('Teachers seeded successfully');

        console.log('Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeder
seedDB();

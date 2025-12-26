const mongoose = require('mongoose');
const Course = require('./models/Course');
const Instructor = require('./models/Instructor');
require('dotenv').config();

const courses = [
  {
    title: "Hip-Hop Fundamentals",
    instructor: "DJ BRAVO",
    duration: "8 weeks",
    level: "Beginner",
    price: "₹4,500",
    image: "https://imgs.search.brave.com/jY0C_mW_HwdgTubTeq48OaWN7g8gservER3kAe9iqRM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9kYW5jZXItZGFu/Y2VzLWhpcC1ob3At/bmVvbi1saWdodGlu/Zy15b3VuZy1ndXkt/bW92ZXMtaGlzLWFy/bXMtc2lkZS1kYW5j/ZXMtYnJlYWtkYW5j/ZV8xNjQ0MTEtMzEy/MS5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA",
    description: "Master the basics of street dance with breaking, popping, and locking techniques",
    category: "Hip-Hop"
  },
  {
    title: "Contemporary Flow",
    instructor: "Prabudeva",
    duration: "10 weeks",
    level: "Intermediate",
    price: "₹5,500",
    image: "https://imgs.search.brave.com/LOzPTf6kioDv89bctLnfyORfLSc9dExSg7nOGGifM1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGVk/ZW1vc3RvcC5jb20v/YmxvZ3Mvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDQvd2hh/dC1pcy1jb250ZW1w/b3JhcnktZGFuY2Ut/aW1nLmpwZw",
    description: "Express emotions through fluid movements and modern dance techniques",
    category: "Contemporary"
  },
  {
    title: "Bollywood Beats",
    instructor: "Raghava Lawrence",
    duration: "6 weeks",
    level: "Beginner",
    price: "₹3,500",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "High-energy Bollywood choreography with classical and modern fusion",
    category: "Bollywood"
  }
];

const instructors = [
  {
    name: 'DJ BRAVO',
    title: 'Senior Hip-Hop Instructor',
    image: 'https://imgs.search.brave.com/p7vPVJqKNAY0gJYXJiWJtQxtr5oE1H3aHIi9VU8Nkls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2ZmLzY3/L2MwL2ZmNjdjMGNh/NDgzYjVjM2NmYzYy/NDVhZmY0NDBkMmM1/LmpwZw',
    specialties: ['Hip-Hop', 'Breaking', 'Popping', 'Locking'],
    experience: '12+ years professional dance experience',
    email: 'djbravo@dancevibe.com'
  },
  {
    name: 'Prabudeva',
    title: 'Contemporary & Classical Dance Expert',
    image: 'https://imgs.search.brave.com/zy_3nXCseZ9GuTCLw1KsPhDjbq2avgJ-fXiIs2PRsNQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS80Ni82/Ni9zSnQ1STQuanBn',
    specialties: ['Contemporary', 'Bharatanatyam', 'Lyrical', 'Modern'],
    experience: '15+ years in contemporary and classical dance',
    email: 'prabudeva@dancevibe.com'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Instructor.deleteMany({});

    // Insert courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ ${createdCourses.length} courses seeded`);

    // Insert instructors
    const createdInstructors = await Instructor.insertMany(instructors);
    console.log(`✅ ${createdInstructors.length} instructors seeded`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
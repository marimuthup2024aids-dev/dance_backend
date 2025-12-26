const mongoose = require('mongoose');
const Course = require('./models/Course');
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
  },
  {
    title: "Classical Bharatanatyam",
    instructor: "Jyothika",
    duration: "12 weeks",
    level: "Advanced",
    price: "₹7,500",
    image: "https://imgs.search.brave.com/ytNXfqj1I0eYOFHp3w5-IJmmMEaCfVVb-UymZGxb5P8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbGNo/ZXRyb24uY29tL2Nk/bi9jaGFuZHJhbXVr/aGktNjI0MDYzY2Yt/ZDIzMy00MDI2LThm/MDctZmE0MjRhZTQ2/ZDUtcmVzaXplLTc1/MC5qcGc",
    description: "Traditional South Indian classical dance with intricate footwork and expressions",
    category: "Classical"
  },
  {
    title: "Kids Dance Party",
    instructor: "Kamal Haasan",
    duration: "4 weeks",
    level: "Beginner",
    price: "₹2,500",
    image: "https://imgs.search.brave.com/KZj-yRq9nuIRK3NwcZNJjigidikYpJ4NUFrsDSVHb0Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2lkcy1wYXJ0eWNh/YmluLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMva2lkcy1kYW5j/ZS1wYXJ0eS5qcGc",
    description: "Fun and energetic dance classes designed specifically for children",
    category: "Kids"
  },
  {
    title: "Salsa & Latin Dance",
    instructor: "Rajini",
    duration: "8 weeks",
    level: "Intermediate",
    price: "₹5,000",
    image: "https://imgs.search.brave.com/8QVN2mvXcuzMPJbtYRePXyZlxvZY_kH5lPX0WQi99o0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vYWRyaWFuMTk5/MS9hZHJpYW4xOTkx/MjAwOS9hZHJpYW4x/OTkxMjAwOTAwOTIx/LzE1NTgzMjc0OS1s/YXRpbi1zYWxzYS1k/YW5jZS1jb3VwbGUu/anBnP3Zlcj02",
    description: "Passionate Latin dance styles including Salsa, Bachata, and Merengue",
    category: "Latin"
  }
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert new courses
    const insertedCourses = await Course.insertMany(courses);
    console.log(`Inserted ${insertedCourses.length} courses`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedCourses();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Instructor = require('./models/Instructor');
require('dotenv').config();

const defaultCourses = [
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

const defaultInstructors = [
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
  },
  {
    name: 'Raghava Lawrence',
    title: 'Bollywood & Fusion Specialist',
    image: 'https://imgs.search.brave.com/Lvh3U6Flb3wq7kjOYYrKwlAzvAlBBoel-sSyLwHUlOA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jLnNh/YXZuY2RuLmNvbS9h/cnRpc3RzL1JhZ2hh/dmFfTGF3cmVuY2Ut/MjAxNzA3MTYwNTIw/NTJfNTAweDUwMC5q/cGc',
    specialties: ['Bollywood', 'Punjabi', 'Folk Dance', 'Fusion'],
    experience: '10+ years Bollywood choreography',
    email: 'raghava@dancevibe.com'
  },
  {
    name: 'Jyothika',
    title: 'Latin Dance Master',
    image: 'https://imgs.search.brave.com/n-ljW-Bvxz0xq3m571xWrupqvHAntz4l8ybf-a-A8YA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YmVoaW5kd29vZHMu/Y29tL0dhbGxlcnkv/QWN0cmVzcy9Kb3Ro/aWthL3RuX0pvdGhp/a2E4LmpwZw',
    specialties: ['Salsa', 'Bachata', 'Merengue', 'Cha-cha'],
    experience: '8+ years professional Latin dance',
    email: 'jyothika@dancevibe.com'
  },
  {
    name: 'Kamal Haasan',
    title: 'Kids Dance Coordinator',
    image: 'https://imgs.search.brave.com/4O9uAGk_SjxMMvXNe6BgdWTTKG8ywUAp5G970CB2T5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaW5kaWFuZXhw/cmVzcy5jb20vMjAy/Mi8xMS9LYW1hbC1I/YWFzYW4taW4tUGF0/aGFsYS1QYXRoYWxh/LXNvbmctZnJvbS1W/aWtyYW0uanBnP3c9/NjQw',
    specialties: ['Kids Dance', 'Creative Movement', 'Musical Theater', 'Jazz'],
    experience: '6+ years teaching children',
    email: 'kamal@dancevibe.com'
  },
  {
    name: 'Rajini',
    title: 'Salsa & Latin Dance Specialist',
    image: 'https://imgs.search.brave.com/T7jUaCYz3jbVg2MWmwubJjfks8Qh6AND22NceIsqsvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS90aHVtYi8xMjMw/OTg0ODMuanBnP2lt/Z3NpemU9MjM0NTYm/cGhvdG9pZD0xMjMw/OTg0ODMmd2lkdGg9/NjAwJnJlc2l6ZW1v/ZGU9NA',
    specialties: ['Salsa', 'Tango', 'Rumba', 'Samba'],
    experience: '14+ years professional dance experience',
    email: 'rajini@dancevibe.com'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Instructor.deleteMany({});
    console.log('Cleared existing data');

    // Insert default courses
    await Course.insertMany(defaultCourses);
    console.log('✅ Added default courses to MongoDB');

    // Insert default instructors
    await Instructor.insertMany(defaultInstructors);
    console.log('✅ Added default instructors to MongoDB');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
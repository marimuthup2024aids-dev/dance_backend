const mongoose = require('mongoose');
const Instructor = require('./models/Instructor');
require('dotenv').config();

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

const seedInstructors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing instructors
    await Instructor.deleteMany({});
    console.log('Cleared existing instructors');

    // Insert new instructors
    const insertedInstructors = await Instructor.insertMany(instructors);
    console.log(`Inserted ${insertedInstructors.length} instructors`);

    console.log('Instructors seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding instructors:', error);
    process.exit(1);
  }
};

seedInstructors();
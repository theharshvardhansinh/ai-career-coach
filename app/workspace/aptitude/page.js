"use client";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const questions = [
  {
    q: "Which subject do you enjoy the most?",
    options: [
      {
        text: "Coding & Problem Solving",
        field: "Computer",
        info: "Computer Engineering is about programming, solving algorithms, and building software systems.",
      },
      {
        text: "Designing Buildings & Structures",
        field: "Civil",
        info: "Civil Engineering deals with designing and constructing bridges, dams, roads, and infrastructure.",
      },
      {
        text: "Working with Circuits",
        field: "Electrical",
        info: "Electrical Engineering focuses on circuits, power distribution, and electronic systems.",
      },
      {
        text: "Engines & Machines",
        field: "Mechanical",
        info: "Mechanical Engineering works with engines, robotics, machines, and product design.",
      },
    ],
  },
  {
    q: "What kind of projects excite you?",
    options: [
      {
        text: "Building apps or websites",
        field: "Computer",
        info: "You will learn to create mobile apps, web apps, and large-scale digital solutions.",
      },
      {
        text: "Model of a bridge or dam",
        field: "Civil",
        info: "Civil engineers plan and design structural models for safe, long-lasting infrastructure.",
      },
      {
        text: "Solar panel or wiring setup",
        field: "Electrical",
        info: "Work on renewable energy projects, solar grids, and electrical installation.",
      },
      {
        text: "Robotics or automobile models",
        field: "Mechanical",
        info: "Mechanical engineers design and build robots, vehicles, and manufacturing systems.",
      },
    ],
  },
  {
    q: "Which lab activity would you prefer?",
    options: [
      {
        text: "Writing and debugging programs",
        field: "Computer",
        info: "Debugging code is central to computer engineering, involving logic and testing skills.",
      },
      {
        text: "Testing soil samples",
        field: "Civil",
        info: "Civil engineers test materials like soil and concrete for safe construction.",
      },
      {
        text: "Designing a small circuit board",
        field: "Electrical",
        info: "Circuit board design teaches electronics and microcontrollers.",
      },
      {
        text: "Operating a lathe machine",
        field: "Mechanical",
        info: "Hands-on machine work is key in manufacturing and production industries.",
      },
    ],
  },
  {
    q: "Which innovation excites you the most?",
    options: [
      {
        text: "Artificial Intelligence",
        field: "Computer",
        info: "AI powers smart assistants, chatbots, and self-driving cars by mimicking human intelligence.",
      },
      {
        text: "Smart Cities",
        field: "Civil",
        info: "Civil engineers create smart roads, efficient transport, and eco-friendly infrastructure.",
      },
      {
        text: "Renewable Energy Systems",
        field: "Electrical",
        info: "Focus on solar, wind, and hydro projects to power the future sustainably.",
      },
      {
        text: "Autonomous Vehicles",
        field: "Mechanical",
        info: "Designing driverless cars, drones, and robots involves mechanics and control systems.",
      },
    ],
  },
  {
    q: "Which skill do you want to master?",
    options: [
      {
        text: "Programming Languages",
        field: "Computer",
        info: "Languages like Python, Java, and C++ help you create apps and solve real-world problems.",
      },
      {
        text: "Structural Analysis",
        field: "Civil",
        info: "Learn to analyze building loads, stresses, and strengths for safe designs.",
      },
      {
        text: "Power Distribution",
        field: "Electrical",
        info: "Study how electricity is generated and distributed to homes and industries.",
      },
      {
        text: "Thermodynamics",
        field: "Mechanical",
        info: "Master how energy and heat affect engines, machines, and manufacturing.",
      },
    ],
  },
  {
    q: "What do you like solving?",
    options: [
      {
        text: "Algorithmic puzzles",
        field: "Computer",
        info: "Sharpen your problem-solving with logic, coding, and mathematics.",
      },
      {
        text: "Urban planning problems",
        field: "Civil",
        info: "Civil engineers solve city planning, water management, and housing needs.",
      },
      {
        text: "Power loss issues",
        field: "Electrical",
        info: "Work on improving energy efficiency in electrical grids.",
      },
      {
        text: "Engine efficiency problems",
        field: "Mechanical",
        info: "Design better engines to save fuel and increase output.",
      },
    ],
  },
  {
    q: "Which tool excites you?",
    options: [
      {
        text: "Laptop & IDE",
        field: "Computer",
        info: "Software engineers use coding tools like VS Code and IntelliJ for projects.",
      },
      {
        text: "AutoCAD",
        field: "Civil",
        info: "AutoCAD helps design buildings, bridges, and layouts in detail.",
      },
      {
        text: "Multimeter",
        field: "Electrical",
        info: "An essential tool for measuring voltage, resistance, and current.",
      },
      {
        text: "CNC Machine",
        field: "Mechanical",
        info: "Computer-controlled machines manufacture precise mechanical parts.",
      },
    ],
  },
  {
    q: "Preferred work style?",
    options: [
      {
        text: "Team coding projects",
        field: "Computer",
        info: "Collaborating with other developers on projects improves creativity and productivity.",
      },
      {
        text: "Field visits & site work",
        field: "Civil",
        info: "Civil engineers often work outdoors, inspecting and supervising construction.",
      },
      {
        text: "Lab experiments",
        field: "Electrical",
        info: "Electrical engineers spend time testing prototypes and circuits.",
      },
      {
        text: "Workshop fabrication",
        field: "Mechanical",
        info: "Mechanical engineers build and test components in workshops.",
      },
    ],
  },
  {
    q: "What kind of companies do you dream of working in?",
    options: [
      {
        text: "Tech giants like Google",
        field: "Computer",
        info: "Computer engineers often work at IT companies, startups, and global tech firms.",
      },
      {
        text: "Construction firms like L&T",
        field: "Civil",
        info: "Civil engineers are in demand for large-scale building and infrastructure projects.",
      },
      {
        text: "Energy providers like Siemens",
        field: "Electrical",
        info: "Electrical engineers work in power, electronics, and renewable energy companies.",
      },
      {
        text: "Automobile companies like Tesla",
        field: "Mechanical",
        info: "Mechanical engineers join top firms in automotive and aerospace industries.",
      },
    ],
  },
  {
    q: "Which career role seems attractive?",
    options: [
      {
        text: "Software Developer",
        field: "Computer",
        info: "Work on apps, systems, AI, and backend technology for companies.",
      },
      {
        text: "Structural Engineer",
        field: "Civil",
        info: "Ensure bridges, skyscrapers, and dams are safe and strong.",
      },
      {
        text: "Electrical Engineer",
        field: "Electrical",
        info: "Work with circuits, electronics, and energy systems.",
      },
      {
        text: "Mechanical Engineer",
        field: "Mechanical",
        info: "Design machines, engines, and robotics systems.",
      },
    ],
  },
  {
    q: "Which subject did you score highest in school?",
    options: [
      {
        text: "Mathematics",
        field: "Computer",
        info: "Math helps in algorithms, coding, and logical reasoning.",
      },
      {
        text: "Geography",
        field: "Civil",
        info: "Geography knowledge is useful for site planning and environmental impact.",
      },
      {
        text: "Physics",
        field: "Electrical",
        info: "Physics fundamentals power electricity, electronics, and circuits.",
      },
      {
        text: "Mechanical Drawing",
        field: "Mechanical",
        info: "Engineering drawing is core for mechanical design and parts.",
      },
    ],
  },
  {
    q: "Which internship would you choose?",
    options: [
      {
        text: "App Development Company",
        field: "Computer",
        info: "Gain experience in full-stack development and software engineering.",
      },
      {
        text: "Metro Rail Project",
        field: "Civil",
        info: "Work on real-world infrastructure projects in urban transportation.",
      },
      {
        text: "Solar Energy Startup",
        field: "Electrical",
        info: "Hands-on exposure to renewable energy and power systems.",
      },
      {
        text: "Automobile Factory",
        field: "Mechanical",
        info: "Experience in automotive manufacturing and design.",
      },
    ],
  },
  {
    q: "Which club would you join in college?",
    options: [
      {
        text: "Coding Club",
        field: "Computer",
        info: "Collaborate on hackathons and software competitions.",
      },
      {
        text: "Civil Society",
        field: "Civil",
        info: "Discuss urban planning, eco-buildings, and civil innovations.",
      },
      {
        text: "Robotics & Electronics Club",
        field: "Electrical",
        info: "Build drones, bots, and electronic prototypes.",
      },
      {
        text: "Mechanics Club",
        field: "Mechanical",
        info: "Focus on engines, machines, and hands-on workshops.",
      },
    ],
  },
  {
    q: "Which achievement excites you?",
    options: [
      {
        text: "Launching a mobile app",
        field: "Computer",
        info: "You’ll create scalable, global-impact digital products.",
      },
      {
        text: "Building a bridge",
        field: "Civil",
        info: "Contributing to society with long-lasting structures.",
      },
      {
        text: "Powering a village with solar",
        field: "Electrical",
        info: "Bring light and power through renewable energy systems.",
      },
      {
        text: "Designing an electric vehicle",
        field: "Mechanical",
        info: "Innovate sustainable mobility for the future.",
      },
    ],
  },
  {
    q: "Which subject do you enjoy solving problems in?",
    options: [
      {
        text: "Coding assignments",
        field: "Computer",
        info: "Problem-solving in computer engineering builds logic and creativity.",
      },
      {
        text: "Construction drawings",
        field: "Civil",
        info: "Civil engineers interpret blueprints and layouts daily.",
      },
      {
        text: "Electronic circuits",
        field: "Electrical",
        info: "Understanding circuits sharpens your practical engineering.",
      },
      {
        text: "Machine designs",
        field: "Mechanical",
        info: "Mechanical engineers enjoy designing innovative products.",
      },
    ],
  },
  {
    q: "What type of books do you prefer?",
    options: [
      {
        text: "Programming & Tech Blogs",
        field: "Computer",
        info: "Stay updated with AI, coding, and new software tools.",
      },
      {
        text: "Architecture Magazines",
        field: "Civil",
        info: "Learn about design and construction inspirations.",
      },
      {
        text: "Electronics Journals",
        field: "Electrical",
        info: "Keep up with semiconductors, power systems, and robotics.",
      },
      {
        text: "Automobile Magazines",
        field: "Mechanical",
        info: "Follow the latest innovations in cars and machines.",
      },
    ],
  },
  {
    q: "Where would you prefer to work?",
    options: [
      {
        text: "Tech Office",
        field: "Computer",
        info: "Comfortable workspace coding and collaborating.",
      },
      {
        text: "Construction Site",
        field: "Civil",
        info: "Dynamic work environment outdoors on real projects.",
      },
      {
        text: "Research Lab",
        field: "Electrical",
        info: "Work on experimental designs and prototypes.",
      },
      {
        text: "Automobile Plant",
        field: "Mechanical",
        info: "Hands-on work in manufacturing and testing.",
      },
    ],
  },
  {
    q: "Which global problem do you want to solve?",
    options: [
      {
        text: "Smart AI solutions",
        field: "Computer",
        info: "AI can solve global issues like healthcare and education.",
      },
      {
        text: "Affordable housing",
        field: "Civil",
        info: "Design safe and low-cost homes for all.",
      },
      {
        text: "Energy crisis",
        field: "Electrical",
        info: "Innovate renewable energy to fight climate change.",
      },
      {
        text: "Sustainable transport",
        field: "Mechanical",
        info: "Design electric and hybrid vehicles for eco-future.",
      },
    ],
  },
  {
    q: "Which competition would you participate in?",
    options: [
      {
        text: "Hackathon",
        field: "Computer",
        info: "Build software under pressure with creativity.",
      },
      {
        text: "Bridge Design Contest",
        field: "Civil",
        info: "Showcase civil structural strength and creativity.",
      },
      {
        text: "Robotics Championship",
        field: "Electrical",
        info: "Compete by building innovative robots and drones.",
      },
      {
        text: "Auto Design Challenge",
        field: "Mechanical",
        info: "Compete by designing futuristic automobiles.",
      },
    ],
  },
  {
    q: "Preferred working device?",
    options: [
      {
        text: "Laptop",
        field: "Computer",
        info: "Essential for programming, AI, and web development.",
      },
      {
        text: "Surveying Tools",
        field: "Civil",
        info: "Used for land mapping and construction projects.",
      },
      {
        text: "Oscilloscope",
        field: "Electrical",
        info: "Used in testing and debugging electronic systems.",
      },
      {
        text: "3D Printer",
        field: "Mechanical",
        info: "Create rapid prototypes of parts and designs.",
      },
    ],
  },
  {
    q: "Which innovation inspires you most?",
    options: [
      {
        text: "ChatGPT, Google AI",
        field: "Computer",
        info: "AI revolutionizing how we interact with machines.",
      },
      {
        text: "Burj Khalifa",
        field: "Civil",
        info: "An engineering marvel in civil construction.",
      },
      {
        text: "Tesla Powerwall",
        field: "Electrical",
        info: "Energy storage for homes and industries.",
      },
      {
        text: "SpaceX Rockets",
        field: "Mechanical",
        info: "Mechanical innovations making space travel possible.",
      },
    ],
  },
  {
    q: "What motivates you the most?",
    options: [
      {
        text: "Building next-gen software",
        field: "Computer",
        info: "Code that impacts millions globally.",
      },
      {
        text: "Contributing to infrastructure",
        field: "Civil",
        info: "Physical structures that last decades.",
      },
      {
        text: "Innovating in energy",
        field: "Electrical",
        info: "Future-proofing the world with power.",
      },
      {
        text: "Designing machines",
        field: "Mechanical",
        info: "Practical solutions in transport and industry.",
      },
    ],
  },
  {
    q: "Which elective would you pick?",
    options: [
      {
        text: "Artificial Intelligence",
        field: "Computer",
        info: "Future-driven course for smart systems.",
      },
      {
        text: "Environmental Engineering",
        field: "Civil",
        info: "Focus on eco-friendly construction and planning.",
      },
      {
        text: "Renewable Energy",
        field: "Electrical",
        info: "Harnessing wind, solar, and hydro power.",
      },
      {
        text: "Robotics",
        field: "Mechanical",
        info: "Mechanical design + electronics = advanced robots.",
      },
    ],
  },
  {
    q: "Which environment do you thrive in?",
    options: [
      {
        text: "Tech Startup",
        field: "Computer",
        info: "Fast-paced software innovation culture.",
      },
      {
        text: "Construction Field",
        field: "Civil",
        info: "Hands-on environment building projects.",
      },
      {
        text: "Power Plant",
        field: "Electrical",
        info: "Work with high-voltage and renewable grids.",
      },
      {
        text: "Automobile Workshop",
        field: "Mechanical",
        info: "Hands-on with cars, bikes, and machines.",
      },
    ],
  },
  {
    q: "Your dream project?",
    options: [
      {
        text: "Build a social media platform",
        field: "Computer",
        info: "Global-scale impact through coding.",
      },
      {
        text: "Design an eco-city",
        field: "Civil",
        info: "Modern, sustainable cities of the future.",
      },
      {
        text: "Invent wireless charging highways",
        field: "Electrical",
        info: "Electrifying transport with power grids.",
      },
      {
        text: "Create a humanoid robot",
        field: "Mechanical",
        info: "Mechanical and AI synergy in robotics.",
      },
    ],
  },
  {
    q: "Which elective project would you prefer?",
    options: [
      {
        text: "AI Chatbot",
        field: "Computer",
        info: "Practical AI to solve real-world tasks.",
      },
      {
        text: "Smart Water System",
        field: "Civil",
        info: "Civil projects to save water in cities.",
      },
      {
        text: "IoT Smart Home",
        field: "Electrical",
        info: "Connecting devices with sensors and power.",
      },
      {
        text: "3D-Printed Car",
        field: "Mechanical",
        info: "Future automobile manufacturing techniques.",
      },
    ],
  },
  {
    q: "Which industry do you admire?",
    options: [
      {
        text: "IT & Software",
        field: "Computer",
        info: "Industry leaders in technology and digital innovation.",
      },
      {
        text: "Construction & Real Estate",
        field: "Civil",
        info: "Backbone of modern infrastructure.",
      },
      {
        text: "Electronics & Energy",
        field: "Electrical",
        info: "Core of renewable and tech-driven future.",
      },
      {
        text: "Automobile & Aerospace",
        field: "Mechanical",
        info: "Driving force behind global mobility.",
      },
    ],
  },
  {
    q: "Which invention changed the world for you?",
    options: [
      {
        text: "Internet",
        field: "Computer",
        info: "Digital revolution that powers all industries.",
      },
      {
        text: "Concrete",
        field: "Civil",
        info: "Foundation of modern buildings and infrastructure.",
      },
      {
        text: "Electric Bulb",
        field: "Electrical",
        info: "Pioneering invention that powers homes.",
      },
      {
        text: "Steam Engine",
        field: "Mechanical",
        info: "Kickstarted the industrial revolution.",
      },
    ],
  },
  {
    q: "Where do you want to contribute most?",
    options: [
      {
        text: "Tech Innovation",
        field: "Computer",
        info: "Building smart, scalable systems.",
      },
      {
        text: "Urban Development",
        field: "Civil",
        info: "Smart cities and sustainable planning.",
      },
      {
        text: "Green Energy",
        field: "Electrical",
        info: "Renewables to reduce carbon footprint.",
      },
      {
        text: "Automotive Industry",
        field: "Mechanical",
        info: "Designing the cars of tomorrow.",
      },
    ],
  },
  {
    q: "Which branch excites you most overall?",
    options: [
      {
        text: "Computer Engineering",
        field: "Computer",
        info: "Coding, AI, and digital solutions.",
      },
      {
        text: "Civil Engineering",
        field: "Civil",
        info: "Designing and building infrastructure.",
      },
      {
        text: "Electrical Engineering",
        field: "Electrical",
        info: "Power, electronics, and energy systems.",
      },
      {
        text: "Mechanical Engineering",
        field: "Mechanical",
        info: "Machines, vehicles, and robotics.",
      },
    ],
  },
];

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export default function CareerQuiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIndex, field) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = field;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCounts = () => {
    const counts = { Computer: 0, Civil: 0, Electrical: 0, Mechanical: 0 };
    answers.forEach((a) => {
      if (a) counts[a]++;
    });
    return counts;
  };

  const getResult = () => {
    const counts = getCounts();
    let bestField = "Computer";
    let max = 0;
    for (let key in counts) {
      if (counts[key] > max) {
        max = counts[key];
        bestField = key;
      }
    }
    return bestField;
  };

  const counts = getCounts();
  const chartData = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 transition">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Career Interest Quiz
        </h1>

        {!submitted ? (
          <>
            {questions.map((q, index) => (
              <div
                key={index}
                className="mb-6 p-5 border rounded-xl bg-gray-50 hover:shadow-md transition"
              >
                <p className="font-medium mb-3 text-lg">
                  {index + 1}. {q.q}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <button
                        onClick={() => handleAnswer(index, opt.field)}
                        className={`p-3 rounded-lg border text-sm font-medium text-left transition duration-200 ${
                          answers[index] === opt.field
                            ? "bg-blue-600 text-white border-blue-700 shadow"
                            : "bg-white hover:bg-blue-50 border-gray-300"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt.text}
                      </button>

                      {/* Read More Section */}
                      <details className="ml-2 text-gray-600 text-sm cursor-pointer">
                        <summary className="text-blue-600 hover:underline">
                          ℹ️ Read More
                        </summary>
                        <p className="mt-1 pl-2">{opt.info}</p>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Submit Answers
              </button>
            </div>
          </>
        ) : (
          <div className="text-center animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              🎓 Based on your answers, your recommended branch is:
            </h2>
            <p className="text-3xl font-bold text-blue-700 mb-6">
              {getResult()} Engineering
            </p>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 rounded-xl p-4 shadow">
                <h3 className="font-semibold text-gray-700 mb-4">
                  Interest Distribution (Pie Chart)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 shadow">
                <h3 className="font-semibold text-gray-700 mb-4">
                  Interest by Field (Bar Chart)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              This chart shows your interest level in different fields. The
              branch with the highest score is best suited for your career
              growth.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

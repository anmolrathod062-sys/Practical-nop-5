const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let students = [
{
id: 1,
name: "Rahul",
email: "rahul@gmail.com",
year: "TE",
branch: "Computer Engineering"
},
{
id: 2,
name: "Priya",
email: "priya@gmail.com",
year: "BE",
branch: "IT Engineering"
}
];

let nextId = 3;

// GET ALL STUDENTS
app.get("/api/students", (req, res) => {
res.json(students);
});

// ADD STUDENT
app.post("/api/students", (req, res) => {

const newStudent = {
id: nextId++,
name: req.body.name,
email: req.body.email,
year: req.body.year,
branch: req.body.branch
};

students.push(newStudent);

res.json(newStudent);

});

// UPDATE STUDENT
app.put("/api/students/:id", (req, res) => {

const id = Number(req.params.id);

const student = students.find(
s => s.id === id
);

if (!student) {
return res.status(404).json({
message: "Student Not Found"
});
}

student.name = req.body.name;
student.email = req.body.email;
student.year = req.body.year;
student.branch = req.body.branch;

res.json(student);

});

// DELETE STUDENT
app.delete("/api/students/:id", (req, res) => {

const id = Number(req.params.id);

students = students.filter(
s => s.id !== id
);

res.json({
message: "Deleted Successfully"
});

});

// START SERVER
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});
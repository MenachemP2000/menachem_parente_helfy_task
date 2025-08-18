const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/tasks', taskRoutes);



app.listen(4000, () => console.log("API on http://localhost:4000"));

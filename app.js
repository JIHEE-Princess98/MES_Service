const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/v1', userRoutes);

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server running ${PORT}`);
});
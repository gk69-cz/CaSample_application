// index.js (or your main server file)
const express = require('express');
const app = express();
const helloRouter = require('./routing');  // Update this to the path of your router file

app.use('/api', helloRouter);  // Use the router here with a path prefix

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

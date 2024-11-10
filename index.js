const express = require('express');
const helloRoutes = require('./helloRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', helloRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

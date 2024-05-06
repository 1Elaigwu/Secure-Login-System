const express = require('express');
const app = express();

app.use(express.static(__dirname)); // Serve static files from the current directory

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

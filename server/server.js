const path = require('path');
const express = require('express');
const appEx = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
appEx.use(express.static(publicPath));
appEx.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
appEx.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
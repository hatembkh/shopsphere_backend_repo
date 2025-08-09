const express = require('express')
const ConnectDB = require('./Config/ConnectDB')
const UserRouter = require('./Routes/User')
const ProductRouter = require('./Routes/Product')
const CommentsRouter = require('./Routes/Comments')
const commandeRouter = require('./Routes/Commande')
const cors = require('cors');

const app = express()

require('dotenv').config()

ConnectDB()

app.use(cors({
  origin: 'https://symphonious-monstera-bc1032.netlify.app',
  credentials: true
}));

// Add this temporary route to your backend (server.js/app.js)
app.get('/debug-fs', (req, res) => {
  const testPaths = [
    path.join(__dirname, 'public'),
    path.join(__dirname, '../frontend/public'),
    path.join(__dirname, '../../frontend/public')
  ];

  const results = testPaths.map(testPath => {
    const exists = fs.existsSync(testPath);
    let files = [];
    if (exists) {
      try {
        files = fs.readdirSync(testPath);
      } catch (e) {
        files = [`Error: ${e.message}`];
      }
    }
    return { path: testPath, exists, files };
  });

  res.json({
    currentDir: __dirname,
    processCwd: process.cwd(),
    testResults: results
  });
});

app.use(express.json())

app.use('/auth', UserRouter)

app.use('/Product', ProductRouter)

app.use('/Comments', CommentsRouter)

app.use('/Commandes', commandeRouter)




app.listen(process.env.PORT, console.log(`Server is running on Port ${process.env.PORT}`))
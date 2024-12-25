const express = require('express');
const cors = require('cors')
const mainRouter = require('./routes/index');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword

// /api/v1/account/transferMoney
// /api/v1/account/balance

app.listen(PORT);
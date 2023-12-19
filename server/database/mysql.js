const sql = require("mysql")

const db = sql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE,
  connectTimeout:process.env.CONNECT_TIMEOUT,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: true,
  },
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to mysql');
});

module.exports = {
    db
}


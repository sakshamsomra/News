const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const app = express();
const session = require('express-session')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { query } = require('express');
const saltRounds = 10;
const path = require('path')
const multer = require("multer");
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
// app.use('/Images', express.static('Images'));

const emailValidator = require('email-validator');

const isValidEmail = emailValidator.validate('example@email.com');

const sessionStore = new MySQLStore({
  host: 'db4free.net',
  user: 'sakshameta',
  password: 'Internship',
  database: 'newsdata',
});
 


app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1); // Enable trust proxy
 
app.use(session({
  key: "userId",
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'none',
    maxAge: 3600000,  // Set the cookie to expire in 30 days
  },
  store: sessionStore,

}));




const conn = mysql.createConnection({
  host: 'db4free.net',
  user: 'sakshameta',
  password: 'Internship',
  database: 'newsdata',
  insecureAuth : true
});


conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected with App...');
});


const user = "";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });




app.get('/api/get', (req, res) => {
  let sqlQuery = "SELECT * FROM categories";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.get('/api/myfeed', (req, res) => {
  let sqlQuery = `SELECT * FROM blogs WHERE name = '${req.session.user}'`;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


app.get('/api/interests', (req, res) => {

  let sqlq = `SELECT category FROM users WHERE username = '${req.session.user}'`

  let type = "";

  let q1 = conn.query(sqlq, (err, result) => {
    if (err) throw err;
    type = result[0].category;
    let sqlQuery = `SELECT * FROM categories WHERE type = '${type}'`;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
    

  })

 
  
}); 
 

app.get('/api/getcart', (req, res) => {
  let sqlQuery = "SELECT * FROM cart";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});








app.post("/api/blog", upload.single('file'), (req, res) => {
  let data = { title: req.body.title, body: req.body.body, name: req.body.name, date: req.body.date, likes: req.body.likes };

  let sqlQuery = "INSERT INTO blogs SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apires(results));
  });

  console.log(req.body);  
});

 




app.post("/api/users", upload.single('file'), (req, res) => {
  let data = { email: req.body.email, username: req.body.username, password: req.body.password, category: req.body.category };

  let sqlQuery = "INSERT INTO users SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;


    res.send(apires(results));


  });

  console.log(req.body);
});


app.post("/api/addcart", (req, res) => {
  let data = { name: req.body.name, price: req.body.price };

  let qty = req.body.qty;
  let id = req.body.id;

  let sqlQuery = "INSERT INTO cart SET ?";


  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apires(results));
  });

  console.log(req.body);
});




app.get("/api/email", (req, res) => {

  let sqlQuery = `SELECT email FROM users WHERE username = '${req.session.user}'`;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results[0].email);
    console.log(results[0].email);
  });

})


app.get("/api/type", (req, res) => {

  let sqlQuery = `SELECT category FROM users WHERE username = '${req.session.user}'`;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(results[0].category);
    console.log(results[0].category);
  });

})

 


app.get("/api/login", (req, res) => {
  if (req.session.loggedIn) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }


})

app.post("/api/login", upload.single('file'), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;




  conn.query("SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        if (results.length > 0) {
          req.session.loggedIn = true;
          req.session.user = username;
          console.log(req.session.user);
          res.send(results);
        } else {
          res.send({ message: "Wrong Combination" });
        }
      }


    });

  console.log(req.body);
});


app.post("/api/logout", (req, res) => {


  let sqlQuery = "DELETE FROM cart";

  let query = conn.query(sqlQuery, (err, results) => {


  });

  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred while logging out.');
    } else {
      res.send('Logout successful.');
      console.log("session logged out");
    }
  });
})


app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;

  const sqlQuery = 'DELETE FROM blogs WHERE id = ?';
  conn.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error('Error deleting row:', err);
      res.status(500).json({ error: 'Error deleting row' });
    } else {
      res.send({ message: 'topic deleted successfully' });
      console.log("deleted")
    }
  });
});




app.get('/api/username', (req, res) => {
  res.send(req.session.user);
});





function apires(results) {
  return JSON.stringify({ "status": 200, "error": null, "res": results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/


app.listen(3001);

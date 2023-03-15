const express = require('express');
const path = require('path')
require('dotenv').config()
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

const con = require('./connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static("public"))
app.set('view engine','ejs')


//routes

//Insert Data to MariaDB database
app.post('/',(req,res)=>{
  const {name,email} = req.body

   const sql = "INSERT INTO test (UserName,Email) VALUES ?";
  const values = [[name,email]]

  con.query(sql,[values],function(err,result){
    if(err) throw err;

    // console.log(result);
    res.redirect('/');

  })

})

//Get results from MariaDB Database
app.get('/',(req,res)=>{
  const sql = 'SELECT * FROM test';

  con.query(sql,(error,result)=>{
    if(error) throw error;

    res.render('display.ejs',{test:result,title:'Home'})
  })
})

app.get('/update',(req,res)=>{
  
   const sql = "SELECT * FROM test WHERE id = ?;"
    const id = req.query.id;
    con.query(sql,[id],(error,result)=>{
      if(error) console.log(error);

      res.render('update',{test:result,title:"Update"});
    })
  

})

app.post('/updateData',(req,res)=>{
  const {id,name,email} = req.body

  const sql = "UPDATE test SET UserName= ? , Email=? WHERE id=?;";
  con.query(sql,[name,email,id],(error,result)=>{
  if(error) console.log(error);
  console.log("data updated");
  res.redirect('/');
})
})

//Delete 
app.get('/delete',(req,res)=>{
    const sql = "DELETE from test WHERE id = ?"
    const id = req.query.id;
    con.query(sql,[id],(error,result)=>{
      if(error) console.log(error)
      res.redirect('/');
    })
})
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
});


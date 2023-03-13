const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql")
const port = 3000
const database = "voting"
const table = "spis"
app.use(cors())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: `${database}`,
})
con.connect((err) => {
  if (err) console.log(err)
  else console.log(`connected to "${database}"`)
})

app.get("/submit/:selectedWybor/:pesel", (req, res) => {
  const selecetedWybor = req.params.selectedWybor
  const pesel = req.params.pesel

  const sql = `INSERT INTO ${table} (pesel_wyborcy, kandydat) VALUES ('${pesel}', '${selecetedWybor}')`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send("dodano rekord")
  })
})
app.listen(port, () => console.log(`app on ${port}`))

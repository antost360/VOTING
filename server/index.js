//"import" bibliotek
const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql")
const port = 3000
//dane z xampa, aby zmienic baze lub tabele wystarczy tutaj poprawic
const database = "voting"
const table = "spis"
const admin_table = "kandydaci"
const haslo_table = "admin_haslo"
var kandydaci = []
//lepsze naglowki
app.use(cors())
//"const sql" w endpointach to polecenie do bazy danych
//"con.query" wykonywanie zapytania do bazy i zwracanie odpowiedzi
//tworzenie i konfiguracja poloczenia z odpowiednia baza
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: `${database}`,
})
//poloczenie z baza, sprawdzanie czy jest problem z polaczeniem
con.connect((err) => {
  if (err) console.log(err)
  else console.log(`connected to "${database}"`)
})
//do clienta, wyslanie glosu z peselem
app.get("/submit/:selectedWybor/:pesel/", (req, res) => {
  const selecetedWybor = req.params.selectedWybor
  const pesel = req.params.pesel

  const sql = `INSERT INTO ${table} (pesel_wyborcy, kandydat) VALUES ('${pesel}', '${selecetedWybor}'); `
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else console.log("dodano do glos spis")
  })

  const sql2 = `UPDATE ${admin_table} SET liczba_glosow = liczba_glosow + 1 WHERE kandydat = "${selecetedWybor}"`
  con.query(sql2, (err, result, fields) => {
    if (err) console.log(err)
    else console.log("zwiekszenie liczby glosow")
  })

  res.send("zapytanie o submit")
})

//do admina, usuwanie wszystkich rekordow
app.get("/remove_result", (req, res) => {
  const sql = `DELETE FROM ${table} WHERE 1`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else console.log(`usunieto z ${table}`)
  })

  const sql2 = `UPDATE ${admin_table} SET liczba_glosow = 0`
  con.query(sql2, (err, result, fields) => {
    if (err) console.log(err)
    else console.log(`usunieto z ${admin_table}`)
  })

  res.send("zapytanie o usuwanie")
})
app.get("/wyniki", (req, res) => {
  const sql = `select pesel_wyborcy, kandydat from ${table}`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send(result)
  })
})
app.get("/add/:kandydat", (req, res) => {
  const kandydat = req.params.kandydat

  const sql = `INSERT INTO ${admin_table} (kandydat) VALUES ('${kandydat}')`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else {
      kandydaci.push(kandydat)
      res.send(`dodano kandydata ${kandydat}`)
    }
  })
})
app.get("/lista_kandydatow", (req, res) => {
  const sql = `SELECT * FROM ${admin_table}`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send(result)
  })
})
//usuwanie kanydadata z bazy
app.get("/usun/:kandydat", (req, res) => {
  const kandydat = req.params.kandydat

  const sql = `DELETE FROM ${admin_table} WHERE kandydat="${kandydat}"`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else {
      const sql = `DELETE FROM ${table} WHERE kandydat="${kandydat}"`
      con.query(sql, (err, result, fields) => {
        if (err) console.log(err)
        else res.send(result)
      })
    }
  })
})
//zmienianie hasla
app.get("/zmien_haslo/:haslo", (req, res) => {
  const haslo = req.params.haslo
  console.log("haslo zapytanie")
  const sql = `UPDATE ${haslo_table} SET haslo = "${haslo}"`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send(result)
  })
})
//wyslanie hasla
app.get("/pokaz_haslo", (req, res) => {
  const sql = `SELECT * FROM ${haslo_table} LIMIT 1`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send(result)
  })
})

//polaczenie app na zmienna port
app.listen(port, () => console.log(`app on ${port}`))

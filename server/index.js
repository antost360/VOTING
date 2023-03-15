//"import" bibliotek
const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql")
const port = 3000
//dane z xampa, aby zmienic baze lub tabele wystarczy tutaj poprawic
const database = "voting"
const table = "spis"
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
app.get("/submit/:selectedWybor/:pesel", (req, res) => {
  const selecetedWybor = req.params.selectedWybor
  const pesel = req.params.pesel

  const sql = `INSERT INTO ${table} (pesel_wyborcy, kandydat) VALUES ('${pesel}', '${selecetedWybor}')`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send("dodano rekord")
  })
})
//do admina, wyswietlanie stanu bazy danych,
app.get("/result_for_admin", (req, res) => {
  const sql = `SELECT * FROM spis`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send(result)
  })
})
//do admina, usuwanie wszystkich rekordow
app.get("/remove_result", (req, res) => {
  const sql = `DELETE FROM ${table}`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send("usunieto wszystko")
  })
})
//do admina, endpoint od usuwania pojedynczego glosu, uzywa "id"
app.get("/remove_single/:id", (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM ${table} WHERE id=${id}`
  con.query(sql, (err, result, fields) => {
    if (err) console.log(err)
    else res.send(`usunieto rekord z id: ${id}`)
  })
})
//polaczenie app na zmienna port
app.listen(port, () => console.log(`app on ${port}`))

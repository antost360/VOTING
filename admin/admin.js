const base_url = "http://localhost:3000"
var kandydaci = []
var wyniki = []
const all = document.getElementById("all")
async function pokaz_kandydatow() {
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_kandydaci = await fetch(`${base_url}/lista_kandydatow`)
  kandydaci = await data_kandydaci.json()
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_wyniki = await fetch(`${base_url}/wyniki`)
  wyniki = await data_wyniki.json()

  all.innerHTML = ""
  for (var i = 0; i <= 20; i++) {
    const div = document.createElement("div")
    div.classList.add("div")

    const tytul = document.createElement("h1")
    tytul.innerHTML = kandydaci[i].kandydat
    tytul.classList.add("tytul")
    div.appendChild(tytul)

    for (var j = 0; j <= wyniki.length - 1; j++) {
      if (wyniki[j].kandydat == `${kandydaci[i].kandydat}`) {
        const pesel = document.createElement("h1")
        pesel.innerHTML = wyniki[j].pesel_wyborcy
        div.appendChild(pesel)
      }
    }

    all.appendChild(div)
  }
}
//usuwa wszystkie rekordy z tabeli spis
async function remove_result() {
  const url = `${base_url}/remove_result`

  await fetch(url)
  fresh_result()
}
async function dodaj_kandydata() {
  const input = document.getElementById("dodaj")

  const url = `${base_url}/add/${input.value}`

  await fetch(url)
  input.value = ""
}

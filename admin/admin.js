const base_url = "http://localhost:3000"
var kandydaci = []
var wyniki = []
const all = document.getElementById("all")
var div_wynik
async function pokaz_kandydatow() {
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_kandydaci = await fetch(`${base_url}/lista_kandydatow`)
  kandydaci = await data_kandydaci.json()
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_wyniki = await fetch(`${base_url}/wyniki`)
  wyniki = await data_wyniki.json()

  all.innerHTML = ""
  for (var i = 0; i <= kandydaci.length - 1; i++) {
    const div = document.createElement("div")
    div.classList.add("div")

    const div_tytul = document.createElement("div")
    div_tytul.classList.add("div_tytul")
    div_wynik = document.createElement("div")
    div_wynik.classList.add("div_wynik")

    const tytul = document.createElement("h1")
    tytul.innerHTML = kandydaci[i].kandydat
    tytul.classList.add("tytul")
    div_tytul.appendChild(tytul)

    const delete_button = document.createElement("button")
    delete_button.classList.add("usun_kandydata")
    delete_button.innerHTML = `usun ${kandydaci[i].kandydat} ❌`
    delete_button.setAttribute("onclick", `usun_kandydata(${kandydaci[i].kandydat})`)
    div_tytul.appendChild(delete_button)

    pokaz_wyniki(kandydaci[i].kandydat)
    div.appendChild(div_tytul)
    div.appendChild(div_wynik)
    all.appendChild(div)
  }
}
//usuwa wszystkie rekordy z tabeli spis
async function remove_result() {
  const url = `${base_url}/remove_result`

  await fetch(url)
  fresh_result()
}
//wyslanie zapytania do servera o dodanie kandydata, nazwa z inputa

async function dodaj_kandydata() {
  const input = document.getElementById("dodaj")

  const url = `${base_url}/add/${input.value}`

  await fetch(url)
  input.value = ""
  alert("dodano kandydata")
  pokaz_kandydatow()
}
//wyslanie zapytania do servera o usuniecie kandydata o podanym id
async function usun_kandydata(kandydat) {
  console.log(kandydat)
  const url = `${base_url}/usun_kandydata/${kandydat}`
  await fetch(url)
  pokaz_kandydatow()
}
//pokazuje pesela u odpowiedniego kanydata
function pokaz_wyniki(kandydat) {
  for (var i = 0; i <= wyniki.length - 1; i++) {
    if (wyniki[i].kandydat == kandydat) {
      const tytul = document.createElement("h1")
      tytul.innerHTML = wyniki[i].pesel_wyborcy
      tytul.classList.add("pesel")
      div_wynik.appendChild(tytul)
    }
  }
}

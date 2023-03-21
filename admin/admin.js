const base_url = "http://localhost:3000"
var kandydaci = []
var wyniki = []
const all = document.getElementById("all")
var div_wynik
var glosy = []
var gora = []

async function pokaz_kandydatow() {
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_kandydaci = await fetch(`${base_url}/lista_kandydatow`)
  kandydaci = await data_kandydaci.json()
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_wyniki = await fetch(`${base_url}/wyniki`)
  wyniki = await data_wyniki.json()

  console.log(kandydaci)
  document.getElementById("wykres").innerHTML = ""
  const canvas = document.createElement("canvas")
  canvas.setAttribute("id", "myChart")
  document.getElementById("wykres").appendChild(canvas)
  all.innerHTML = ""
  gora = []
  glosy = []
  for (var i = 0; i <= kandydaci.length - 1; i++) {
    gora.push(kandydaci[i].kandydat)
    glosy.push(kandydaci[i].liczba_glosow)

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

    const delete_btn = document.createElement("button")
    delete_btn.innerHTML = "usun kandydata"
    delete_btn.setAttribute("onclick", `usun_kandydata("${kandydaci[i].kandydat}")`)
    delete_btn.setAttribute("class", "przycisk remove_btn")
    div_tytul.appendChild(delete_btn)

    pokaz_wyniki(kandydaci[i].kandydat)
    div.appendChild(div_tytul)
    div.appendChild(div_wynik)
    all.appendChild(div)
  }
  Charte()
}
//usuwa wszystkie rekordy z tabeli spis
async function remove_result() {
  const url = `${base_url}/remove_result`

  await fetch(url)
  pokaz_kandydatow()
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

function Charte() {
  const ctx = document.getElementById("myChart")
  char = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: gora,

      datasets: [
        {
          label: "glosy: ",
          data: glosy,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: "rozklad glosów",
          color: "white",
          font: {
            size: 50,
            family: "Tilt Warp",
          },
        },
        tooltip: {
          enabled: true,
        },
        label: {
          color: "black",
        },
      },
    },
  })
}
async function usun_kandydata(kandydat) {
  var wybrany = kandydat
  const url = `${base_url}/usun/${wybrany}`
  await fetch(url)
  pokaz_kandydatow()
}
function make_dodaj() {
  all.innerHTML = ""
  const div = document.createElement("div")
  div.setAttribute("id", "dodawanie")

  const label = document.createElement("label")
  label.setAttribute("for", "dodaj")
  label.innerHTML = "DODAJ KANDYDATA"
  label.setAttribute("class", "pesel")

  const input = document.createElement("input")
  input.setAttribute("type", "text")
  input.setAttribute("class", "przycisk")
  input.setAttribute("id", "dodaj")

  const btn = document.createElement("button")
  btn.setAttribute("id", "dodaj_guzik")
  btn.setAttribute("class", "przycisk")
  btn.setAttribute("onclick", "dodaj_kandydata()")
  btn.innerHTML = "DODAJ"

  div.appendChild(label)
  div.appendChild(input)
  div.appendChild(btn)
  all.appendChild(div)
}
async function pokaz_zmien_haslo() {
  var data = await fetch(`${base_url}/pokaz_haslo`)
  var json = await data.json()

  all.innerHTML = ""
  const div = document.createElement("div")
  div.style.margin = "70px"

  const input = document.createElement("input")
  input.setAttribute("id", "haslo")
  input.classList.add("przycisk")
  input.setAttribute("placeholder", "nowe haslo")
  input.setAttribute("type", "password")

  const btn = document.createElement("button")
  btn.innerHTML = "zmien haslo"
  btn.setAttribute("onclick", `zmien_haslo()`)
  btn.classList.add("przycisk")

  const haslo_now = document.createElement("h1")
  haslo_now.innerHTML = "aktualne haslo: " + json[0].haslo
  haslo_now.classList.add("haslo")

  div.appendChild(haslo_now)
  div.appendChild(input)
  div.appendChild(btn)
  all.appendChild(div)
}
async function zmien_haslo() {
  const new_haslo = document.getElementById("haslo").value
  console.log(new_haslo)

  const url = `${base_url}/zmien_haslo/${new_haslo}`
  await fetch(url)

  pokaz_kandydatow()
}
pokaz_kandydatow()

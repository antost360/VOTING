const base_url = "http://localhost:3000"
const all = document.getElementById("all")
const wykres = document.getElementById("wykres")
const popup_glos = document.getElementById("popup_glos_id")
const popup_haslo = document.getElementById("popup_haslo_id")
const haslo = document.getElementById("haslo")
const nowe_haslo = document.getElementById("nowe_haslo")
var data_kandydaci
var kandydaci = []
var wyniki = []
var div_wynik
var glosy = []
var gora = []
pokaz_kandydatow()

async function pokaz_kandydatow() {
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_kandydaci = await fetch(`${base_url}/lista_kandydatow`)
  kandydaci = await data_kandydaci.json()
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_wyniki = await fetch(`${base_url}/wyniki`)
  wyniki = await data_wyniki.json()

  console.log(kandydaci)
  wykres.innerHTML = ""
  all.innerHTML = ""

  przygotuj_wykres()

  for (var i = 0; i <= kandydaci.length - 1; i++) {
    var kandydat = kandydaci[i].kandydat

    gora.push(kandydat)
    glosy.push(kandydaci[i].liczba_glosow)

    make_div_kandydata(kandydat)
    pokaz_wyniki(kandydat)
  }
  Charte()
}

function make_div_kandydata(kandydat) {
  const div = document.createElement("div")
  div.classList.add("div")

  const div_tytul = document.createElement("div")
  div_tytul.classList.add("div_tytul")
  div_wynik = document.createElement("div")
  div_wynik.classList.add("div_wynik")

  const tytul = document.createElement("h1")
  tytul.innerHTML = kandydat
  tytul.classList.add("tytul")
  div_tytul.appendChild(tytul)

  const delete_btn = document.createElement("button")
  delete_btn.innerHTML = "usun kandydata"
  delete_btn.setAttribute("onclick", `usun_kandydata("${kandydat}")`)
  delete_btn.setAttribute("class", "przycisk remove_btn")
  div_tytul.appendChild(delete_btn)

  div.appendChild(div_tytul)
  div.appendChild(div_wynik)
  all.appendChild(div)
}
function przygotuj_wykres() {
  gora = []
  glosy = []
  //customowy element w ktorym robi sie wykres
  const canvas = document.createElement("canvas")
  canvas.setAttribute("id", "myChart")
  document.getElementById("wykres").appendChild(canvas)
}
//usuwa wszystkie rekordy z tabeli spis
async function remove_result() {
  const url = `${base_url}/remove_result`

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
//tworzy wykres
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

//wyslanie zapytania do servera o dodanie kandydata, nazwa z inputa
async function dodaj_kandydata() {
  const input = haslo

  const url = `${base_url}/add/${input.value}`

  await fetch(url)
  input.value = ""
  closePopup_haslo()
  pokaz_kandydatow()
}
//do dodawania kandydata ulatwienie
haslo.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    dodaj_kandydata()
  }
})
//tworzy miejsce do zmieniania hasla
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
//obsluguje zmienianie hasla w bazie danych przez server
async function zmien_haslo() {
  const new_haslo = nowe_haslo.value
  console.log(new_haslo)

  const url = `${base_url}/zmien_haslo/${new_haslo}`
  await fetch(url)
  closePopup_glos()
  pokaz_kandydatow()
}
//do dodawania kandydata ulatwienie
nowe_haslo.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    zmien_haslo()
  }
})
//otwiera okienko do wpowadzenia haslo do admina
function openPopup_haslo() {
  popup_haslo.classList.add("open-popup_haslo")
  haslo.focus()
  document.getElementById("body").style.overflowY = "hidden"
}
function closePopup_haslo() {
  popup_haslo.classList.remove("open-popup_haslo")
  document.getElementById("body").style.overflowY = "auto"
}
//otwiera okienko do wyslania glosu
function openPopup_glos() {
  popup_glos.classList.add("open-popup_glos")
  nowe_haslo.value = ""
  nowe_haslo.focus()
  document.getElementById("body").style.overflowY = "hidden"
}
function closePopup_glos() {
  popup_glos.classList.remove("open-popup_glos")
  document.getElementById("body").style.overflowY = "auto"
}
document.addEventListener("keydown", function (e) {
  if (e.code === "Escape") {
    closePopup_haslo()
    closePopup_glos()
  }
})

const base_url = "http://localhost:3000"
const all = document.getElementById("all")
const wykres = document.getElementById("wykres")
const popup_haslo = document.getElementById("popup_haslo_id")
const popup_kandydat = document.getElementById("popup_kandydat_id")
const new_kandydat = document.getElementById("nowy_kandydat")
const nowe_haslo = document.getElementById("nowe_haslo")
const tytul_haslo = document.getElementById("tytul_haslo")
var data_kandydaci
var kandydaci = []
var wyniki = []
var div_wynik
var glosy = []
var gora = []
pokaz_kandydatow()

/**
 * ! POBIERANIE, TWORZENIE i USUWANIE ELEMENTOW NA STRONIE
 */
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
//usuwa wszystkie rekordy z tabeli spis
async function remove_result() {
  const url = `${base_url}/remove_result`

  await fetch(url)
  pokaz_kandydatow()
}
/**
 * ! WYKRES
 */
function przygotuj_wykres() {
  gora = []
  glosy = []
  //customowy element w ktorym robi sie wykres
  const canvas = document.createElement("canvas")
  canvas.setAttribute("id", "myChart")
  document.getElementById("wykres").appendChild(canvas)
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
/**
 * ! WSZYSTKO OD HASLA
 */
//tworzy miejsce do zmieniania hasla
async function pokaz_haslo() {
  var data = await fetch(`${base_url}/pokaz_haslo`)
  var json = await data.json()

  const haslo_now = document.getElementById("aktualne_haslo")
  haslo_now.innerHTML = `aktualne haslo: ${json[0].haslo}`
}
//obsluguje zmienianie hasla w bazie danych przez server
async function zmien_haslo() {
  var data = await fetch(`${base_url}/pokaz_haslo`)
  var json = await data.json()

  const new_haslo = nowe_haslo.value

  if (new_haslo == json[0].haslo) {
    tytul_haslo.innerHTML = "TO SAMO HASLO"
  } else {
    const url = `${base_url}/zmien_haslo/${new_haslo}`
    await fetch(url)
    closePopup_haslo()
    pokaz_kandydatow()
  }
}
function show_password() {
  if (nowe_haslo.type == "password") {
    console.log("text")
    nowe_haslo.type = "text"
  } else {
    nowe_haslo.type = "password"
    console.log("passord")
  }
}
//otwiera okienko do wyslania glosu
function openPopup_haslo() {
  popup_haslo.classList.add("open-popup_haslo")
  nowe_haslo.value = ""
  nowe_haslo.focus()
  document.getElementById("body").style.overflowY = "hidden"
  pokaz_haslo()
}
function closePopup_haslo() {
  popup_haslo.classList.remove("open-popup_haslo")
  document.getElementById("body").style.overflowY = "auto"
  tytul_haslo.innerHTML = "Wprowadz nowe haslo"
}
//do dodawania kandydata ulatwienie
nowe_haslo.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    zmien_haslo()
  }
})
/**
 * ! WSZYSTKO OD KANDYDATA
 */
async function usun_kandydata(kandydat) {
  var wybrany = kandydat
  const url = `${base_url}/usun/${wybrany}`

  await fetch(url)
  pokaz_kandydatow()
}
//wyslanie zapytania do servera o dodanie kandydata, nazwa z inputa
async function dodaj_kandydata() {
  const input = new_kandydat

  const url = `${base_url}/add/${input.value}`

  await fetch(url)
  input.value = ""
  closePopup_kandydat()
  pokaz_kandydatow()
}
//otwiera okienko do wpowadzenia haslo do admina
function openPopup_kandydat() {
  popup_kandydat.classList.add("open-popup_kandydat")
  new_kandydat.focus()
  document.getElementById("body").style.overflowY = "hidden"
}
function closePopup_kandydat() {
  popup_kandydat.classList.remove("open-popup_kandydat")
  document.getElementById("body").style.overflowY = "auto"
}
document.addEventListener("keydown", function (e) {
  if (e.code === "Escape") {
    closePopup_kandydat()
    closePopup_haslo()
  }
})
//do dodawania kandydata ulatwienie
new_kandydat.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    dodaj_kandydata()
  }
})

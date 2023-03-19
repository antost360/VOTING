const base_url = "http://localhost:3000"
var kandydaci = []
var wyniki = []
const all = document.getElementById("all")
var div_wynik
var d = []
var podpis = []
var votes = []
var glosy
async function pokaz_kandydatow() {
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_kandydaci = await fetch(`${base_url}/lista_kandydatow`)
  kandydaci = await data_kandydaci.json()
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data_wyniki = await fetch(`${base_url}/wyniki`)
  wyniki = await data_wyniki.json()

  document.getElementById("wykres").innerHTML = ""
  const canvas = document.createElement("canvas")
  canvas.setAttribute("id", "myChart")
  document.getElementById("wykres").appendChild(canvas)
  all.innerHTML = ""
  podpis = []
  var glosy = 0
  for (var i = 0; i <= kandydaci.length - 1; i++) {
    podpis.push(kandydaci[i].kandydat)

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
    delete_btn.classList.add("przycisk")
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
      labels: d,
      datasets: [
        {
          label: "Votes",
          data: podpis,
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
          text: "Głosy",
          color: "black",
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

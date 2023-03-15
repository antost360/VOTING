const base_url = "http://localhost:3000"
var json = []
async function fresh_result() {
  const kandydat_1 = document.getElementById("kandydat_1")
  const kandydat_2 = document.getElementById("kandydat_2")
  const kandydat_3 = document.getElementById("kandydat_3")
  //czysczenie przed tworzeniem swiezych elementow
  kandydat_1.innerHTML = ""
  kandydat_2.innerHTML = ""
  kandydat_3.innerHTML = ""
  //tworzenie tytulu dla kazdej kolumny (kandydata), funckja tworzaca
  make_title("kandydat_1_title", kandydat_1, "kandydat_1")
  make_title("kandydat_2_title", kandydat_2, "kandydat_2")
  make_title("kandydat_3_title", kandydat_3, "kandydat_3")
  //pobranie danych z serwera, serwer z bazy danych (/server/index.js)
  var data = await fetch(`${base_url}/result_for_admin`)
  json = await data.json()
  console.log(json)
  //tworzy wszystie wyniki, uzywa funkcji tworzacych pojedyncze elementy
  for (var i = 0; i <= json.length - 1; i++) {
    //zmienne uzywane do parametrow funckji tworzacych, tylko dla czytelnosci kodu
    var id = json[i].id
    var pesel = json[i].pesel_wyborcy
    var kandydat = json[i].kandydat
    //warunki, jaki glosc przypisac do ktorej kolumny(kandydata)
    if (kandydat == "kandydat_1") {
      make_pesel(pesel, kandydat_1)
      make_remove_btn(id, kandydat_1, i)
    } else if (kandydat == "kandydat_2") {
      make_pesel(pesel, kandydat_2)
      make_remove_btn(id, kandydat_2, i)
    } else if (kandydat == "kandydat_3") {
      make_pesel(pesel, kandydat_3)
      make_remove_btn(id, kandydat_3, i)
    }
  }
}
//usuwa wszystkie rekordy z tabeli spis
async function remove_result() {
  const url = `${base_url}/remove_result`

  await fetch(url)
  fresh_result()
}
//usuwa pojedynczy glosc po id
async function remove_single(id) {
  console.log(id)
  const url = `${base_url}/remove_single/${id}`

  await fetch(url)
  fresh_result()
}
//FUNKCJE TWORZACE
//tworzy guzik od usuwania glosu z bazy,
function make_remove_btn(id, kandydat, index) {
  const remove_btn = document.createElement("button")
  remove_btn.innerHTML = "remove ❌"
  remove_btn.classList.add("remove_btn")
  remove_btn.setAttribute("onclick", `remove_single(${json[index].id})`)
  kandydat.appendChild(remove_btn)
}
//tworzy guzik od wyswietlania pesela wyborcy w odpowiedniej tabeli
function make_pesel(pesel, kandydat) {
  const wynik = document.createElement("h1")
  wynik.innerHTML = "pesel_wyborcy: " + pesel
  wynik.setAttribute("class", "wynik")
  kandydat.appendChild(wynik)
}
//tworzy odpowiedni tytul dla kadej kolumny(kandydata)
function make_title(kandydat_x_title, kandydat, kandydat_text) {
  var kandydat_x_title = document.createElement("h1")
  kandydat_x_title.innerHTML = `${kandydat_text}`
  kandydat_x_title.setAttribute("class", "title_in_column")
  kandydat.appendChild(kandydat_x_title)
}

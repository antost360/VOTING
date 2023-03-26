const pesel_id = document.querySelector("#pesel")
const lista_kandydatow_id = document.querySelector("#lista_kandydatow")
const haslo = document.getElementById("haslo")
const popup_glos = document.getElementById("popup_glos_id")
const popup_haslo = document.getElementById("popup_haslo_id")
make_kandydat()
//sprawdza wybor
async function zaglosuj() {
  const wybor = document.getElementsByName("wybor")
  const pesel = document.getElementById("pesel").value
  var selectedWybor

  wybor.forEach((wybor) => {
    if (wybor.checked) {
      selectedWybor = wybor.value
      console.log("selected wybor")

      submit(pesel, selectedWybor)
    }
  })

  if (pesel == "" && selectedWybor == null) {
    closePopup_glos()
    blad(pesel_id)
    blad(lista_kandydatow_id)
    return
  }
  if (pesel == "") {
    closePopup_glos()
    blad(pesel_id)
    return
  }
  if (selectedWybor == null) {
    closePopup_glos()
    blad(lista_kandydatow_id)
    return
  }
  location.reload()
}
async function make_kandydat() {
  document.getElementById("lista_kandydatow").innerHTML = ""

  var data = await fetch(`${base_url}/lista_kandydatow`)
  kandydaci = await data.json()
  console.log(kandydaci)

  for (var i = 0; i <= kandydaci.length - 1; i++) {
    var kandydat = kandydaci[i].kandydat
    stworz_kandydata(kandydat)
  }
}
//tworzy radio buttona z kandydatem
function stworz_kandydata(kandydat) {
  const div = document.createElement("div")
  div.classList.add("div_kandydat")

  const input = document.createElement("input")
  input.setAttribute("class", "kandydat")
  input.setAttribute("type", "radio")
  input.setAttribute("name", "wybor")
  input.setAttribute("id", `${kandydat}`)
  input.setAttribute("value", `${kandydat}`)

  const label = document.createElement("label")
  label.setAttribute("class", "label")
  label.setAttribute("for", `${kandydat}`)
  label.innerHTML = `${kandydat}`

  div.appendChild(input)
  div.appendChild(label)
  document.getElementById("lista_kandydatow").appendChild(div)
}
//wysyla glos do servera
async function submit(pesel, selecetedWybor) {
  //(dane wprowadzone) url to adres endpointa,
  const url = `${base_url}/submit/${selecetedWybor}/${pesel}`
  //wyslanie zapytania do servera o dodanie glosu do bazy danych
  await fetch(url)
  console.log("url wyslany")
}
//blokada admina haslem z bazy
haslo.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    admin_test()
  }
})
async function admin_test() {
  var data = await fetch(`${base_url}/pokaz_haslo`)
  var json = await data.json()
  console.log(json)
  var password = haslo.value

  if (password != json[0].haslo) {
    haslo.style.border = "5px solid tomato"
    return
  } else {
    window.location.href = "../admin/admin.html"
  }
}
//pokazanie jakie dane nie zostaly wpisane
function blad(miejsce) {
  miejsce.style.borderColor = "#cc0000"
}
function usun_blad(miejsce) {
  miejsce.style.borderColor = ""
}
//otwiera okienko do wyslania glosu
function openPopup_glos() {
  popup_glos.classList.add("open-popup_glos")
  console.log("open")
}
function closePopup_glos() {
  popup_glos.classList.remove("open-popup_glos")
  console.log("close")
}
//otwiera okienko do wpowadzenia haslo do admina
function openPopup_haslo() {
  popup_haslo.classList.add("open-popup_haslo")
  console.log("open")
}
function closePopup_haslo() {
  popup_haslo.classList.remove("open-popup_haslo")
  console.log("close")
}

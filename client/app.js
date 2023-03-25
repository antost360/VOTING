//funkcja wysyla glos do servera, sprawdza czy dane zostaly wypenione

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

      if (pesel == "") {
        location.reload()
        alert("nie wpisano peselu")
        return
      }
      submit(pesel, selectedWybor)
    }
  })

  if (pesel == "" && selectedWybor == null) {
    alert("nie wybrano ani kandydata ani peselu")
    return
  }
  if (pesel == "") {
    alert("nie wpisano peselu")
    return
  }
  if (selectedWybor == null) {
    alert("nie wybrano kandydata")
    return
  }
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

  //zakonczenie glosowania

  alert("ZAGLOSOWANO WYSLANY")
  location.reload()
}
//blokada admina haslem z bazy
async function admin_test() {
  var data = await fetch(`${base_url}/pokaz_haslo`)
  var json = await data.json()
  console.log(json)

  var password = prompt("podaj haslo do admina")

  if (password != json[0].haslo) {
    alert("niepoprawne haslo")
    return
  } else {
    window.location.href = "../admin/admin.html"
  }
}

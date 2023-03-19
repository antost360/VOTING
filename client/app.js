//funkcja wysyla glos do servera, sprawdza czy dane zostaly wypenione
var kandydaci = []
async function zaglosuj() {
  const bledy = document.getElementById("bledy")
  const wybor = document.getElementsByName("wybor")
  const pesel = document.getElementById("pesel").value
  var selectedWybor

  //(ktos zostal wybrany) sprawdzenie dokladnie ktory kandydat zostal wybrany
  wybor.forEach((wybor) => {
    if (wybor.checked) {
      selectedWybor = wybor.value
      console.log("selected wybor")
      //konstrola czy pesel zostal wpisany, jesli nie to alert i nie przechodzi dalej
      if (pesel == "") {
        console.log("nieprawidlowy pesel")
        bledy.innerHTML = "nie wpisano peselu"
      } else {
        submit(pesel, selectedWybor)
      }
    } else {
    }
  })
}

async function make_kandydat() {
  var data = await fetch(`${base_url}/lista_kandydatow`)
  kandydaci = await data.json()

  document.getElementById("lista_kandydatow").innerHTML = ""
  for (var i = 0; i <= kandydaci.length - 1; i++) {
    var kandydat = kandydaci[i].kandydat

    const div = document.createElement("div")
    div.classList.add("div_kandydat")

    const input = document.createElement("input")
    input.classList.add("kandydat")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "wybor")
    input.setAttribute("id", `${kandydat}`)
    input.setAttribute("value", `${kandydat}`)

    const label = document.createElement("label")
    label.classList.add("kandydat_label")
    label.setAttribute("for", `${kandydat}`)
    label.innerHTML = `${kandydat}`

    div.appendChild(input)
    div.appendChild(label)
    document.getElementById("lista_kandydatow").appendChild(div)
  }
}

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

make_kandydat()
function admin_test() {
  var password = prompt("podaj haslo do admina")

  if (password != "admin") {
    alert("niepoprawne haslo")
    return
  } else {
    window.location.href = "../admin/admin.html"
  }
}

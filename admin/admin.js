const base_url = "http://localhost:3000"
const kandydat_1 = document.getElementById("kandydat_1")
const kandydat_2 = document.getElementById("kandydat_2")
const kandydat_3 = document.getElementById("kandydat_3")
var json = []
async function fresh_result() {
  kandydat_1.innerHTML = ""
  kandydat_2.innerHTML = ""
  kandydat_3.innerHTML = ""

  const kandydat_1_title = document.createElement("h1")
  kandydat_1_title.innerHTML = "kandydat_1"
  kandydat_1_title.setAttribute("class", "title_in_column")
  kandydat_1.appendChild(kandydat_1_title)

  const kandydat_2_title = document.createElement("h1")
  kandydat_2_title.innerHTML = "kandydat_2"
  kandydat_2_title.setAttribute("class", "title_in_column")
  kandydat_2.appendChild(kandydat_2_title)

  const kandydat_3_title = document.createElement("h1")
  kandydat_3_title.innerHTML = "kandydat_3"
  kandydat_3_title.setAttribute("class", "title_in_column")
  kandydat_3.appendChild(kandydat_3_title)

  var data = await fetch(`${base_url}/result_for_admin`)
  json = await data.json()
  console.log(json)

  for (var i = 0; i <= json.length - 1; i++) {
    const wynik = document.createElement("h1")
    if (json[i].kandydat == "kandydat_1") {
      wynik.innerHTML = "pesel_wyborcy: " + json[i].pesel_wyborcy
      wynik.setAttribute("class", "wynik")
      kandydat_1.appendChild(wynik)
    } else if (json[i].kandydat == "kandydat_2") {
      wynik.innerHTML = "pesel_wyborcy: " + json[i].pesel_wyborcy
      wynik.setAttribute("class", "wynik")
      kandydat_2.appendChild(wynik)
    } else if (json[i].kandydat == "kandydat_3") {
      wynik.innerHTML = "pesel_wyborcy: " + json[i].pesel_wyborcy
      wynik.setAttribute("class", "wynik")
      kandydat_3.appendChild(wynik)
    }
  }
}

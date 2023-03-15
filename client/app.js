//funkcja wysyla glos do servera, sprawdza czy dane zostaly wypenione
async function zaglosuj() {
  //zmienne od radio btns
  const kandydat_1 = document.getElementById("kandydat_1").checked
  const kandydat_2 = document.getElementById("kandydat_2").checked
  const kandydat_3 = document.getElementById("kandydat_3").checked
  const wybor = document.getElementsByName("wybor")
  const pesel = document.getElementById("pesel").value
  var selectedWybor

  //kontrola czy jakikolwiek kandydat zostal wybrany, jesli nie to alert i nie przechodzi dalej
  if (kandydat_1 == false && kandydat_2 == false && kandydat_3 == false) {
    console.log("wszystko false")
    alert("nieprawidlowy kandydat")
  } else {
    //(ktos zostal wybrany) sprawdzenie dokladnie ktory kandydat zostal wybrany
    wybor.forEach((wybor) => {
      if (wybor.checked) {
        selectedWybor = wybor.value
      }
    })

    //konstrola czy pesel zostal wpisany, jesli nie to alert i nie przechodzi dalej
    if (pesel == "") {
      console.log("nieprawidlowy pesel")
      alert("nieprawidlowy pesel")
    } else {
      //(dane wprowadzone) url to adres endpointa,
      const url = `${base_url}/submit/${selectedWybor}/${pesel}`

      //wyslanie zapytania do servera o dodanie glosu do bazy danych
      await fetch(url)
      console.log("url wyslany")

      //zakonczenie glosowania
      alert("ZAGLOSOWANO WYSLANY")
      location.reload()
    }
  }
}

async function zaglosuj() {
  const kandydat_1 = document.getElementById("kandydat_1").checked
  const kandydat_2 = document.getElementById("kandydat_2").checked
  const kandydat_3 = document.getElementById("kandydat_3").checked
  const wybor = document.getElementsByName("wybor")
  const pesel = document.getElementById("pesel").value
  var selectedWybor

  if (kandydat_1 == false && kandydat_2 == false && kandydat_3 == false) {
    console.log("wszystko false")
    alert("nieprawidlowy kandydat")
  } else {
    wybor.forEach((wybor) => {
      if (wybor.checked) {
        selectedWybor = wybor.value
      }
    })

    if (pesel == "") {
      console.log("nieprawidlowy pesel")
      alert("nieprawidlowy pesel")
    } else {
      const url = `${base_url}/submit/${selectedWybor}/${pesel}`

      await fetch(url)
      console.log("url wyslany")

      alert("ZAGLOSOWANO WYSLANY")
      location.reload()
    }
  }
}

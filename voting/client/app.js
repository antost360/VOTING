async function zaglosuj() {
  const wybor = document.getElementsByName("wybor")
  var selectedWybor

  wybor.forEach((wybor) => {
    if (wybor.checked) {
      selectedWybor = wybor.value
    }
  })
  console.log(selectedWybor)

  const pesel = document.getElementById("pesel").value
  console.log(pesel)

  const url = `${base_url}/submit/${selectedWybor}/${pesel}`

  await fetch(url)

  alert("ZAGLOSOWANO")
  location.reload()
}

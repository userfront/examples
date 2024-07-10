function doLogout() {
  Userfront.logout();
}

function setData(data) {
  const el = document.querySelector("#data");
  if (el) {
    el.innerHTML = data;
  }
}

async function getData() {
  const res = await fetch("https://localhost:8080/api/data", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Userfront.tokens.accessToken}`
    }
  });
  console.dir(res);
  const body = JSON.stringify(await res.json(), null, 4);
  setData(body);
}

async function onDocReady() {
  if (! Userfront?.user?.email) {
    // corejs not loaded or could not find a user
    document.location.pathname = '/login';
  }

  await getData();
}

if (document.readyState!='loading') {
  onDocReady()
} else {
  document.addEventListener('DOMContentLoaded', onDocReady);
}

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function convertFullNameToFirstLastName(fullName) {
  const firstName = fullName
    .split(" ")
    .slice(0, -1)
    .join(" ");
  const lastName = fullName
    .split(" ")
    .slice(-1)
    .join(" ");
  return { firstName: firstName, lastName: lastName };
}

export function generateRandomColor() {
  const pallete = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink"
  ];
  return pallete[Math.floor(Math.random() * pallete.length)];
}

export function colorToHex(color) {
  const pallete = {
    gray: "#808080",
    red: "#ff0000",
    orange: "#ffa500",
    yellow: "#ffff00",
    green: "#008000",
    teal: "#008080",
    blue: "#0000ff",
    indigo: "#4b0082",
    purple: "#800080",
    pink: "#ffc0cb"
  };
  return pallete[color];
}

export function filterCards(cards, status) {
  const filterCards = cards.filter(card => {
    return card.status === status;
  });
  return filterCards;
}

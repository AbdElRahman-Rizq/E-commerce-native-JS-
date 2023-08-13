// ////////////getCookie()//////////////////////
export function getCookie(cookieName) {
  const name = cookieName + "=";
 
  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return "";
}

// //////////////////////setCookie()///////////////
export function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

/////////////////////////deleteCookie()////////////////
export function deleteCookie(cookieName) {
  document.cookie = cookieName + "=; expires=Sun, 06 Aug 1999 12:43:35 GMT; path=/;";
}

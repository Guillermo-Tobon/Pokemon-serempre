document.addEventListener('DOMContentLoaded', function(){
  
  const nav = document.querySelector('nav');
  const navBar = document.createElement('ul');
  
  nav.classList.add('nav-bar-principal');
  navBar.innerHTML = `
                      <li> <a href="/index.html">Home</a> </li>
                      <li> <a href="/pages/buscar.html">Buscar</a> </li>
                      `;
  nav.appendChild(navBar);

});
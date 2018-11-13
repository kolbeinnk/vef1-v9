// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {

  let domains;

  function displayError(error){
    const container = domains.querySelector('.results');

    while(container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }


  function displayLen(len) {
    if(len.length===0) {
      displayError('Lén er ekki skráð');
      return;
    }

    const [{domain, registered, lastChange, expires, registrantname, email, address, country}] = len;
  //  const arr = [domain, registered, lastChange, expires, registrantname, email, address, country];

    const dl1 = document.createElement('dl');
    const dl2 = document.createElement('dl');
    const dl3 = document.createElement('dl');
    const dl4 = document.createElement('dl');

    //LAGA ÞETTA DRASL EF TIMI
    //Lén
    const LenElement = document.createElement('dt');
    LenElement.appendChild(document.createTextNode('Lén'));
    dl1.appendChild(LenElement);

    const LenValueElement = document.createElement('dd');
    LenValueElement.appendChild(document.createTextNode(domain));
    dl1.appendChild(LenValueElement);


    //Skráð
    const reg = new Date(registered);
    reg.toISOString();
    const SkrElement = document.createElement('dt');
    SkrElement.appendChild(document.createTextNode('Skráð'));
    dl2.appendChild(SkrElement);

    const SkrValueElement = document.createElement('dd');
    SkrValueElement.appendChild(document.createTextNode(reg.toISOString().substring(0,10)));
    dl2.appendChild(SkrValueElement);
    //SiðastBreytt
    const lastCh = new Date(lastChange);
    lastCh.toISOString();
    const LtElement = document.createElement('dt');
    LtElement.appendChild(document.createTextNode('Seinast breytt'));
    dl3.appendChild(LtElement);

    const LtValueElement = document.createElement('dd');
    LtValueElement.appendChild(document.createTextNode(lastCh.toISOString().substring(0,10)));
    dl3.appendChild(LtValueElement);

    //Rennur út
    const exp = new Date(expires);
    exp.toISOString();
    const expElement = document.createElement('dt');
    expElement.appendChild(document.createTextNode('Rennur út'));
    dl4.appendChild(expElement);

    const expValueElement = document.createElement('dd');
    expValueElement.appendChild(document.createTextNode(exp.toISOString().substring(0,10)));
    dl4.appendChild(expValueElement);

    //Hreinsa
    const container = domains.querySelector('.results');

    while(container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(dl1);
    container.appendChild(dl2);
    container.appendChild(dl3);
    container.appendChild(dl4);

    //Skráningaraðilli 
    if(registrantname!==''){

      const dl5 = document.createElement('dl');
      const regElement = document.createElement('dt');
      regElement.appendChild(document.createTextNode('Skráningaraðili'));
      dl5.appendChild(regElement);
  
      const regValueElement = document.createElement('dd');
      regValueElement.appendChild(document.createTextNode(registrantname));
      dl5.appendChild(regValueElement);
      container.appendChild(dl5);
      
    }

    //Netfang
    if(email!==''){

      const dl6 = document.createElement('dl');
      const emElement = document.createElement('dt');
      emElement.appendChild(document.createTextNode('Netfang'));
      dl6.appendChild(emElement);
  
      const emValueElement = document.createElement('dd');
      emValueElement.appendChild(document.createTextNode(email));
      dl6.appendChild(emValueElement);
      container.appendChild(dl6);

    }

    //Heimilisfang
    if(address!==''){

      const dl7 = document.createElement('dl');
      const hfElement = document.createElement('dt');
      hfElement.appendChild(document.createTextNode('Heimilisfang'));
      dl7.appendChild(hfElement);
  
      const hfValueElement = document.createElement('dd');
      hfValueElement.appendChild(document.createTextNode(address));
      dl7.appendChild(hfValueElement);
      container.appendChild(dl7);
    }

    //Land
    if(country!==''){

      const dl8 = document.createElement('dl');
      const coElement = document.createElement('dt');
      coElement.appendChild(document.createTextNode('Land'));
      dl8.appendChild(coElement);
  
      const coValueElement = document.createElement('dd');
      coValueElement.appendChild(document.createTextNode(country));
      dl8.appendChild(coValueElement);
      container.appendChild(dl8);   
      
    }

  }
  function fetchData(len) {
    fetch(`${API_URL}${len}`)

      .then((response) => {
        if(response.ok){
          return response.json();
        }
        throw new Error();
      })

      .then((data) => {
        displayLen(data.results);
      })

      .catch((error) => {
        displayError('Villa við að sækja gögn');
      })
  }

  function onSubmit(e){

    e.preventDefault();
    input = e.target.querySelector('input');
    if(input.value==="") {
      displayError('Lén verður að vera strengur');
    } else {
    const container = domains.querySelector('.results');

    const div = document.createElement('div');
    div.setAttribute('class', 'loading');

    const img = document.createElement('img');
    img.setAttribute('src', 'loading.gif')

    div.appendChild(img);
    div.appendChild(document.createTextNode('Leita að léni...'));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(div);
    window.onload = fetchData(input.value);
    }

  }

  function init(_domains) {
    domains = _domains;
    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {

  const domains = document.querySelector('.domains');
  program.init(domains);

});

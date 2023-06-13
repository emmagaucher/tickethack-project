const MAX_RESULTS = 10;

let hide = function (element) {
    document.querySelector(element).style.display = 'none';
}

let show = function (element) {
    document.querySelector(element).style.display = 'block';
}

let setTodayDate = function (element) {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const todayDate = `${year}-${month}-${day}`;
    document.querySelector(element).value = todayDate;
}

hide("#tripnotfound")
hide("#showtrips")
setTodayDate('#date')


let sendform = function() {
    const departure = document.querySelector("#departure").value
    const arrival = document.querySelector("#arrival").value
    const date = document.querySelector("#date").value
    const endpoint = `http://localhost:3000/tickets?departure=${departure}&arrival=${arrival}&date=${date}`
    
    fetch(endpoint).then(response => response.json()).
    then(function(response) {
        console.log(response)
        if (response.length === 0) {
            hide("#firststep")
            hide("#showtrips")
            show("#tripnotfound")
            return 
        }
        
        hide("#firststep")
        hide("#tripnotfound")
        show("#showtrips")
        
        document.querySelector('#showtrips').innerHTML = `` 
        

// for (let i = 0; i <response.length; i++)

        for (let i = 0; i < MAX_RESULTS; i++) {
            if (!response[i]) break;
            const element = response[i];
            const date = new Date(element.date);
            const hoursAndMinutes = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
            
            document.querySelector('#showtrips').innerHTML += `
            <div class="row result"> 
            <div class="col-7">${element.departure} &gt; ${element.arrival}  </div>
            <div class="col-3"> ${hoursAndMinutes} </div>
            <div class="col-2 result-price">${element.price}€</div>
            </div>
            `;
            
            
        }
    })
    
}

document.querySelector("#search").addEventListener('click', sendform);

const loadPhones = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones,dataLimit )=>{
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.textContent =``;
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 12){
        phones = phones.slice(0,12);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
    const noPhone = document.getElementById('no-found-message')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }else{
        phones.forEach(phone =>{
            const {brand,image,phone_name,slug} = phone;
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('col')
            phoneDiv.innerHTML =`
            <div class="card p-4">
                    <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${brand}</h5>
                    <p class="card-text">${phone_name}</p>
                    <p class="card-text">${slug}</p>
                </div>
                <button onclick = "loadDetials('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
                Show Detials
                </button>
            </div>
            `;
            phonesContainer.appendChild(phoneDiv);
        })
        noPhone.classList.add('d-none');
    }   
    toggleSpinner(false)
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const search = searchField.value;
    loadPhones(search,dataLimit);
}
const searchField = () =>{
    processSearch(12)
}
const el = document.getElementById("search-field");
el.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
     processSearch(12)    
    }
});
const toggleSpinner = isLoading =>{
const loadingSpiner = document.getElementById('loading-spiner');
    if(isLoading){
        loadingSpiner.classList.remove('d-none')
    }else{
    loadingSpiner.classList.add('d-none')    

    }
}
document.getElementById('btn-show-all').addEventListener('click', function (){
    processSearch();
})
const loadDetials =async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetials(data.data)
}
const displayDetials = (modalDetials) => {
    console.log(modalDetials)
    const {name,brand,mainFeatures,releaseDate} = modalDetials;
    const {chipSet,displaySize,memory,storage} =mainFeatures
    const phoneDetailModalLabel = document.getElementById('phoneDetailModalLabel');
    phoneDetailModalLabel.innerText =`${name}`
    const modelBody = document.getElementById('modal-body');
    modelBody.innerHTML =`
    <p><span class ="fw-bold">Brand: </span> <span class ='text-danger'>${brand}</span></p>
    <p><span class ="fw-bold">releaseDate: </span>:${releaseDate}</p>
    <p><span class ="fw-bold">chipSet: </span>${chipSet}</p>
    <p><span class ="fw-bold">displaySize: </span>${displaySize}</p>
    <p><span class ="fw-bold">memory: </span> ${memory}</p>
    <p><span class ="fw-bold">storage: </span> ${storage}</p>
    `

}

loadPhones('iphone');
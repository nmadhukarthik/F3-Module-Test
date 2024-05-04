
//const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const searchInput = document.querySelector("input")
const SortBymktCapBtn = document.querySelector("#MktCapBtn")
const SortByPercentageBtn = document.querySelector("#PercentageBtn")
const tableContainer = document.querySelector("#tableContainer")
const tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];


async function fetchData() { //if i have url then we need to pass url as parameter in fetchData
    try {
      //converting json file into array format
      const response = await fetch('data.json'); 
      const data = await response.json(); 
      renderData(data);
      return data;
    } catch (error) {
      console.log("Error:", error);
    }
  };


  // adding eventlistener for sorting by market_caps
SortBymktCapBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sortByMarketCap();
  });

// adding eventlistener for sorting by percentageChange
  SortByPercentageBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sortByChange();
  });



  // debounce
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    //let debounceTimeout;

    searchInput.addEventListener('input', function() {
        //clearTimeout(debounceTimeout);
        setTimeout(searchByName, 300); 
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            //clearTimeout(debounceTimeout);  
            searchByName();          
        }
    });
});


// function to search data by name or symbol as an input using async await
async function searchByName() {
    let userSearch = searchInput.value.toLowerCase();
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const filteredData = data.filter(coin => 
          coin.name.toLowerCase().includes(userSearch) || coin.symbol.toLowerCase().includes(userSearch)
        );
        renderData(filteredData);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to sort data by market cap
async function sortByMarketCap() {
    try {
      const response = await fetch('data.json'); 
      const data = await response.json();
      const sortedData = data.sort((a, b) => Number(b.market_cap) - Number(a.market_cap)); 
      console.log(sortedData);
      renderData(sortedData);
    } catch (error) {
      console.error("Error:", error);
    }
  
}

// Function to sort data by percentage change
async function sortByChange() {
  try {
    const response = await fetch('data.json'); 
    const data = await response.json();
    const sortedData = data.sort(
      (a, b) => Number(b.price_change_percentage_24h) - Number(a.price_change_percentage_24h));
      console.log(sortedData);
    renderData(sortedData);
  } catch (error) {
    console.error("Error:", error);
  }
}



function renderData(data) {
    tableBody.innerHTML = ""; // Clear existing data
    for (let item of data) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${item.image}" id="image" alt="${item.name}"></td>
          <td>${item.name}</td>
          <td>${item.id}</td>
          <td>${item.symbol}</td>
          <td>$ ${item.current_price}</td>
          <td>${item.total_volume}</td>
          <td>${item.price_change_percentage_24h}%</td>
          <td>Mkt Cap: $ ${item.market_cap}</td>
        `;
        tableBody.appendChild(row);
    }
} 
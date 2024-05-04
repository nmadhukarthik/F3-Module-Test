
const searchInput = document.querySelector("input")
const mktCapBtn = document.querySelector("#MktCapBtn")
const percentageBtn = document.querySelector("#PercentageBtn")
const tableContainer = document.querySelector("#tableContainer")

document.addEventListener("DOMContentLoaded", console.log(dataFetcher()))

const bitcoin = (async () => {

  const data_source = await fetch('data.json');
  const data = await data_source.json()
  return (data)
  
})()
  
console.log(bitcoin)
bitcoin.then((data)=>console.log(`this is data: ${data}`))
//console.log(`this is a: ${a}`)


async function dataFetcher()
{
    try
    {
        const data = await fetch('data.json')
        //const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        //const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        let bitcoinData = await data.json()
        return bitcoinData
      }
    catch(e)
    {
        console.log(e)
    }

}

console.log(`this is bitcoinData: ${bitcoinData}`)





function dataRetrivalAndDisplay()
{
    let dataArr = []
    // let itemsArr = []
    dataFetcher()
    .then((data)=> {data.forEach(element => {dataArr.push(element.id)})})//, element.id, element.symbol, element.current_price, element.total_volume, element.price_change_percentage_24h, element.market_cap)})})
    // .then((data)=> {data.forEach(element => {
    //     tableContainer.innerHTML = `<table style="width:90%">
    //     <tr>
    //     <td> <image src=${element.image} style="width:25px"></td>
    //     <td>${element.id}</td>
    //     <td>${element.symbol}</td>
    //     <td>${element.current_price}</td>
    //     <td>${element.total_volume}</td>
    //     <td>${element.price_change_percentage_24h}</td>
    //     <td>${element.market_cap}</td>
    //     </tr>   
    //     </table>` 
    // })})
    .catch((error)=>console.log(error))

    // logArr = [1,2,3]
    // console.log(`dataArr ${dataArr}`)
    // console.log(`logArr ${logArr} `)
    // console.log(dataArr[0])

    let itemsArr = []
    itemsArr = JSON.parse(JSON.stringify(dataArr));
   // console.log(itemsArr)

    tableContainer.innerHTML = `<table>
                                    <tr>
                                        <td> <image src=${dataArr[0]}></td>
                                        <td>${itemsArr[1]}</td>
                                        <td>${dataArr[2]}</td>
                                        <td>$${dataArr[3]}</td>
                                        <td>$${dataArr[4]}</td>
                                        <td>${dataArr[5]}%</td>
                                        <td>$${dataArr[6]}</td>
                                    </tr>   
                                </table>`


    
}


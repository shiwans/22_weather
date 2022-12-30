
console.log("Client side Javascript has loaded!")

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('/weather?address=!').then((response)=>{ 
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.address)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from Javascript'

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''  //this is very usefull as it do empty when not in used

    fetch('/weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
            // if(!data){
            //     console.log('pleace provide location')
            // }
            // this is alredy done in app.js of full file i.e in src directory wala js......
            if(data.error){
                messageOne.textContent=data.error

            }else{
                messageOne.textContent = data.address

                messageTwo.textContent = data.forecast

            }
        })

    })
})
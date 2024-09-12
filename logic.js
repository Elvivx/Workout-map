const months = ['','January','Febuary','March','April', 'June','July','August','September','October','November','December']
const form = document.querySelector('form')

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        const {longitude} = position.coords
        const {latitude} = position.coords
        const map = L.map('map').setView([latitude, longitude], 13);
        workouts = []
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);  
        
        const container = document.querySelector('.app-data .workouts')
    map.on('click',(mapEvent)=>{
        const { lat ,lng } = mapEvent.latlng
        const select = document.querySelector('.select')
        const distance = document.querySelector('.distance')
        const duration = document.querySelector('.duration')
        const candence = document.querySelector('.candence')
        let date = new Date
        let html = `
        `

        form.classList.remove('hide')
        distance.focus()
        

        window.onkeydown = (e)=>{
            if(e.key == 'Enter'){
                e.preventDefault()
                if(distance.value == '' && duration.value == '' && candence.value == ''){
                    console.log('end it now')
                }
                else if(distance.value != '' && duration.value != '' && candence.value != ''){
                    if(select.value == 'Running'){
        
                        html += `
                            <div class="workout running" data-lat="${lat}" data-lng="${lng}">
                                <div class="info">
                                    <h3>${select.value} on ${months[date.getMonth()] } ${date.getDate()}</h3>
                                    <div>
                                        <p>🏃🏼</p>
                                        <p class="value">${distance.value}</p>
                                        <small>km</small>
                                    </div>
                                    <div>
                                        <p>🕛</p>
                                        <p class="value">${duration.value}</p>
                                        <small>MIN</small>
                                    </div>
                                    <div>
                                        <p>⚡</p>
                                        <p class="value">${Math.floor(duration.value / distance.value)}</p>
                                        <small>MIN/KM</small>
                                    </div>
                                    <div>
                                        <p>🦶🏼</p>
                                        <p class="value">${candence.value}</p>
                                        <small>SPM</small>
                                    </div>
            
                                </div>
                            </div>
                        `
                        mark('running')
                    }
                    else if(select.value == 'Cycling') {
        
                        html += `
                            <div class="workout cycling" data-lat="${lat}" data-lng="${lng}">
                                <div class="info">
                                    <h3>${select.value} on ${months[date.getMonth()] } ${date.getDate()}</h3>
                                    <div>
                                        <p>🚴‍♀️</p>
                                        <p class="value">${distance.value}</p>
                                        <small>KM</small>
                                    </div>
                                    <div>
                                        <p>🕛</p>
                                        <p class="value">${duration.value}</p>
                                        <small>MIN</small>
                                    </div>
                                    <div>
                
                                        <p>⚡</p>
                                        <p class="value">${Math.floor(duration.value / distance.value)}</p>
                                        <p>KM/H</p>
                                    </div>
                                    <div>
                                        <p> ⛰ </p>
                                        <p class="value">${candence.value}</p>
                                        <small>M</small>
                                    </div>
            
                                </div>
                            </div>
                        `
                        mark('cycling')
        
                    }
                    
                    
                }
                function mark(type){

                    L.marker([lat, lng]).addTo(map)
                    .bindPopup(
                        L.popup({
                            maxWidth: 250,
                            minWidth: 100,
                            autoClose: false,
                            closeOnClick: false,
                            className: 'popup',
                        })
                    )
                    .setPopupContent(`
                            <div class="info ${type}">
                                <h3>🏃🏼${select.value} on ${months[date.getMonth()] } ${date.getDate()}</h3>
                            </div>
                        </div>`)
                    .openPopup();
    
                    distance.value = ''
                    duration.value = ''
                    candence.value = ''
                    select.value = 'Running'

                    // workouts.push(person)
                    console.log(workouts)
                    render()
                }
                function render (){
                    container.innerHTML +=  html
                    form.classList.add('hide')  
                }
                
            }
            
            
        }
        
    })
    container.onclick = (e)=>{
        item = e.target.closest('.workout')
        locate = [item.dataset.lat , item.dataset.lng]
        map.setView(locate, 13, {
            animate: true,
            pan:{
                duration: 1,
            },
        })
    }
}),

()=>{
    alert('Where the Hell are you')
}
}




// console.log(months[date.getMonth()])
const form = document.querySelector('#form')
const images = document.querySelector('.container')
const imgs=document.querySelectorAll('img')
function reset() {
    var images = document.getElementsByTagName('img');
    while(images.length > 0) {
        images[0].parentNode.removeChild(images[0]);
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    reset();
    const showName = form.elements.query.value
    form.elements.query.value = ''
    try {
        const req = async () => {
            const res = await axios(`https://api.tvmaze.com/search/shows?q=${showName}`)
            const shows = res.data
            console.log(shows)
            if (shows.length === 0) {
                alert('No shows found with given show name!!')
            }
            for (let result of shows) {
                const img = document.createElement('img')
                img.src = result.show.image.medium
                images.append(img)
            }
        }
        req();
    } catch (err) {
        console.log("Show not found");
    }
})
const resetData = document.querySelector('#reset')
resetData.addEventListener('click', reset);
const userCardTemplate = document.querySelector("[data-user-template")
const userCardContainer = document.querySelector("[data-user-cards-container")
const searchInput = document.querySelector("[data-search")

let users = []
    /*  users comes from the return statement at the end of the fetch request 
        return means that it gets emitted 
        can be captured in a ready made empty array with the same name */

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    /* console.log(users) */
    users.forEach(user => {
        const isVisible = 
            user.name.toLowerCase().includes(value) || 
            user.email.toLowerCase().includes(value) ||
            user.phone.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            const phone = card.querySelector("[data-phone]")
            header.textContent = user.name
            body.textContent = user.email
            phone.textContent = user.phone
            userCardContainer.append(card)
            return { name: user.name, email: user.email, element: card, phone: user.phone } /* Emit it so that it can be searched on */
        })
    })
    

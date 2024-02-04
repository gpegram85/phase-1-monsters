// const input = document.getElementById('submit')
// input.addEventListener('click', createMonsters)

// 

let limit = 1000
let currentPage = 1
const monstersPerPage = 50
let monsters =[]

const monsterBox = document.getElementById('monster-container')


function fetchMonsters() {
    return fetch(`http://localhost:3000/monsters/?_limit=${limit}`)
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to catch monsters', response.statusText)
        } else {
            return response.json()
        }
    })
    .then(allMonsters => {
        monsters = allMonsters
        renderMonsters(currentPage)
    })
    .catch(error => {
        console.log('Error: ' + error)
    })
}

function renderMonsters(page) {
    const startIndex = (page - 1) * monstersPerPage
    const endIndex = Math.min(startIndex + monstersPerPage, monsters.length)

    monsterBox.innerHTML = ''

    for (let i = startIndex; i < endIndex; i++) {
        const monster = monsters[i]
        const { name, age, description } = monster

        const title = document.createElement('h2');
        const ageElem = document.createElement('h4');
        const descriptor = document.createElement('p');

        title.innerText = name;
        ageElem.innerText = age;
        descriptor.innerText = `BIO: ${description}`;

        monsterBox.appendChild(title);
        monsterBox.appendChild(ageElem);
        monsterBox.appendChild(descriptor);
    }
}

const create = document.getElementById('submit')
create.addEventListener('click', createMonsters)

function createMonsters(e) {
    e.preventDefault()

    const newMonsterName = document.getElementById('name').value
    const newMonsterAge = document.getElementById('age').value
    const newMonsterDescription = document.getElementById('description').value

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: 
        {
            "Content-Type" : "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: newMonsterName,
            age: newMonsterAge,
            description: newMonsterDescription
        })
    })
    .then(response => {
        if(response.ok) {
            document.getElementById('name').value = ''
            document.getElementById('age').value = ''
            document.getElementById('description').value = ''
        }
    })
}

document.getElementById('back').addEventListener('click', () => {
    if(currentPage > 1) {
    currentPage--
    renderMonsters(currentPage)
    }
})

document.getElementById('forward').addEventListener('click', () => {
    if (currentPage < Math.ceil(monsters.length / monstersPerPage)) {
        currentPage++;
        renderMonsters(currentPage);
    }
})

fetchMonsters()

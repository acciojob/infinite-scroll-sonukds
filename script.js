const addItemForm = document.getElementById('addItemForm');
const itemText = document.getElementById('itemText');
const platesList = document.getElementById('plates');

let items = JSON.parse(localStorage.getItem('items')) || [];

// Add 10 default items if the list is empty
if (items.length === 0) {
    for (let i = 1; i <= 10; i++) {
        items.push({ text: `Default item ${i}`, done: false });
    }
    localStorage.setItem('items', JSON.stringify(items));
}

function addItem(e) {
    e.preventDefault();
    const text = itemText.value.trim();
    if (text === '') return;
    const item = {
        text: text,
        done: false
    };
    items.push(item);
    populateList(items, platesList);
    localStorage.setItem('items', JSON.stringify(items));
    itemText.value = '';
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input[type="checkbox"]')) return;
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, platesList);
}

// Automatically add 2 more items when user reaches the end of the list
function checkScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        for (let i = 0; i < 2; i++) {
            items.push({ text: `New item ${items.length + 1}`, done: false });
        }
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, platesList);
    }
}

addItemForm.addEventListener('submit', addItem);
platesList.addEventListener('click', toggleDone);
window.addEventListener('scroll', checkScroll);

populateList(items, platesList);

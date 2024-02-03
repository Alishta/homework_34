const input = document.querySelector('.notation__input');
const addButton = document.querySelector('.add-btn');
const notationBlock = document.querySelector('.notation-block');
let notesData = JSON.parse(localStorage.getItem('localData')) || [];

console.log(input, addButton, notesData, notationBlock);

function render() {
    notationBlock.innerHTML = '';

    for (let i = 0; i < notesData.length; i++) {
        let index = i;

        const item = document.createElement('div');
        item.classList.add('item');

        const itemText = document.createElement('div');
        itemText.classList.add('item-text');

        const message = document.createTextNode(notesData[i]);
        itemText.appendChild(message);

        const delButton = document.createElement('button');
        delButton.classList.add('del-btn');
        const delButtonName = document.createTextNode('Delete');
        delButton.appendChild(delButtonName);
        delButton.addEventListener('click', () => {
            delItem(index);
        })

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        const editButtonName = document.createTextNode('Edit');
        editButton.appendChild(editButtonName);
        editButton.addEventListener('click', () => {
            editItem(index);
        })

        const editInput = document.createElement('input');
        editInput.classList.add('edit-input');
        editInput.type = 'text';
        editInput.value = notesData[i];
        editInput.style.display = 'none';

        const saveButton = document.createElement('button');
        saveButton.classList.add('save-btn');
        const saveButtonName = document.createTextNode('Save');
        saveButton.appendChild(saveButtonName);
        saveButton.style.display = 'none';
        saveButton.addEventListener('click', () => {
            saveItem(index);
        })
        item.appendChild(itemText);
        item.appendChild(editButton);
        item.appendChild(delButton);
        item.appendChild(editInput);
        item.appendChild(saveButton);
        notationBlock.appendChild(item);
    }
}

render();

function addItem() {
    const item = input.value;
    notesData.push(item);
    input.value = '';
    render();
    saveInLocalStor();
}

addButton.onclick = addItem;

function delItem(index) {
    notesData.splice(index, 1);
    render();
    saveInLocalStor();
}

function saveInLocalStor() {
    localStorage.setItem('localData', JSON.stringify(notesData));
}

function editItem(index) {
    const items = document.querySelectorAll('.item');
    const editInputs = document.querySelectorAll('.edit-input');
    const saveButtons = document.querySelectorAll('.save-btn');
    const editButtons = document.querySelectorAll('.edit-btn');

    editButtons[index].style.display = 'none';
    items[index].querySelector('.item-text').style.display = 'none';
    editInputs[index].style.display = 'inline-block';
    saveButtons[index].style.display = 'inline-block';
}

function saveItem(index) {
    const items = document.querySelectorAll('.item');
    const editInputs = document.querySelectorAll('.edit-input');
    const saveButtons = document.querySelectorAll('.save-btn');
    const editButtons = document.querySelectorAll('.edit-btn');

    notesData[index] = editInputs[index].value;
    editButtons[index].style.display = 'inline-block';
    items[index].querySelector('.item-text').innerText = notesData[index];
    items[index].querySelector('.item-text').style.display = 'inline-block';
    editInputs[index].style.display = 'none';
    saveButtons[index].style.display = 'none';

    render();
    saveInLocalStor();
}
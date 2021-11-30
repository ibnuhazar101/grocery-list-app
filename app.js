let listItem = ['soap'];
let isEdit = false;
let indexItem = 0;

const inputItem = document.getElementById('input-item');
const submitBtn = document.getElementById('btn-submit');
const container = document.getElementById('list-container');
const emptyBtn = document.getElementById('btn-empty');

showDataList();

inputItem.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		submit();
	}
});
submitBtn.addEventListener('click', submit);
emptyBtn.addEventListener('click', emptyList);

function showDataList() {
	container.innerHTML = '';
	listItem.forEach((el, id) => {
		addListCard(el, id);
	});

	if (listItem.length === 0) {
		emptyBtn.classList.add('hidden');
		emptyBtn.classList.remove('block');
	} else {
		emptyBtn.classList.add('block');
		emptyBtn.classList.remove('hidden');
	}
}

function emptyList() {
	listItem = [];
	showDataList();
}

function submit() {
	let input = inputItem.value;
	if (input !== '' && !isEdit) {
		listItem.push(input);
	} else if (input !== '' && isEdit) {
		listItem.splice(indexItem, 1, input);
	}

	inputItem.value = '';
	isEdit = false;
	submitBtn.innerHTML = 'Submit';

	showDataList();
}

function addListCard(input, index) {
	const card = `<div id=${index} class="list-card"><p class="item">${input}</p><div class="list-action"><button id="edit-${index}" class="btn-edit" onclick="editItem('${input}', ${index})">Edit</button><button id="delete-${index}" class="btn-delete" onclick="deleteItem(${index})">Delete</button></div></div>`;

	container.innerHTML += card;
}

function editItem(input, id) {
	inputItem.value = input;
	submitBtn.innerHTML = 'Edit';
	indexItem = id;
	isEdit = true;
}

function deleteItem(id) {
	listItem.splice(id, 1);

	showDataList();
}

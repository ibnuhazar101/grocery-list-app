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
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
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
	const listCard = document.createElement('div');
	listCard.classList.add('list-card');
	listCard.setAttribute('id', index);
	container.appendChild(listCard);

	const listCardChildItem = document.createElement('p');
	listCardChildItem.innerHTML = input;
	listCardChildItem.classList.add('item');

	const listCardChildListActions = document.createElement('div');
	listCardChildListActions.classList.add('list-action');

	listCard.appendChild(listCardChildItem);
	listCard.appendChild(listCardChildListActions);

	const listActionChildBtnEdit = document.createElement('button');
	listActionChildBtnEdit.classList.add('btn-edit');
	listActionChildBtnEdit.setAttribute('id', `edit-${index}`);
	listActionChildBtnEdit.innerHTML = 'Edit';

	const listActionChildBtnDelete = document.createElement('button');
	listActionChildBtnDelete.classList.add('btn-delete');
	listActionChildBtnDelete.setAttribute('id', `delete-${index}`);
	listActionChildBtnDelete.innerHTML = 'Delete';

	listCardChildListActions.appendChild(listActionChildBtnEdit);
	listCardChildListActions.appendChild(listActionChildBtnDelete);

	const editButton = document.getElementById(`edit-${index}`);
	editButton.addEventListener('click', function () {
		inputItem.value = input;
		submitBtn.innerHTML = 'Edit';
		indexItem = index;
		isEdit = true;
	});

	const deleteButton = document.getElementById(`delete-${index}`);
	deleteButton.addEventListener('click', function () {
		listItem.splice(index, 1);

		showDataList();
	});
}

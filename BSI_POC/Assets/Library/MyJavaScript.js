function addRow() {
    const el = document.getElementById("add");
    const table = document.getElementById("semprot_lahan");
    var rows = table.getElementsByTagName("tr");
    var rowCount = rows.length;
    for (var i = 1; i < rowCount; i++) {
        rows[i].cells[0].innerHTML = i;
    }

    const newRow = table.insertRow();
    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    const cell3 = newRow.insertCell();
    const cell4 = newRow.insertCell();
    const cell5 = newRow.insertCell();

    var noText = document.createTextNode(rowCount);

    cell1.appendChild(noText);

    const dropdown = document.createElement('select');

    const option0 = document.createElement('option');
    option0.text = '== Select Stationary Item ==';
    option0.disabled = "disabled";
    option0.selected = "selected";
    option0.classList.add("text-center");
    dropdown.add(option0);

    const option1 = document.createElement('option');
    option1.text = 'A4 Paper';
    dropdown.add(option1);

    const option2 = document.createElement('option');
    option2.text = 'Pencil';
    dropdown.add(option2);

    const option3 = document.createElement('option');
    option3.text = 'Pencil';
    dropdown.add(option3);

    const option4 = document.createElement('option');
    option4.text = 'Marker';
    dropdown.add(option4);

    const option5 = document.createElement('option');
    option5.text = 'Envelope';
    dropdown.add(option5);

    dropdown.style.width = "90%";


    const celss = [cell3, cell4];

    cell2.appendChild(dropdown);
    for (const i of celss) {
        const inp = document.createElement('input');
        inp.type = "text";
        inp.style.width = "95%";
        i.appendChild(inp);
    }

    const txt = document.createElement('textarea');
    txt.id = "reason";
    txt.style.width = "100%";
    txt.style.height = "auto";
    txt.oninput = "adjustHeight";
    //txt.addEventListener('input', function () {
    //    const inputBox = document.getElementById("reason");
    //    inputBox.style.height = "auto";
    //    inputBox.style.height = inputBox.scrollHeight + "px";
    //    console.log(inputBox);
    //})
    cell5.appendChild(txt);


}

function adjustHeight() {
    const inputBox = document.getElementById("reason");
    inputBox.style.height = "auto";
    inputBox.style.height = inputBox.scrollHeight + "px";
    console.log(inputBox);
}
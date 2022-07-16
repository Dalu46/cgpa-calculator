const calculator = document.getElementById('calculator');
const addBtn = document.querySelector('#add-btn');
const mainCalculator = document.getElementById('calculator')
const input = document.getElementsByClassName('input')
const options = document.getElementsByClassName('options1');
const creditLoad = document.getElementsByClassName('num-input')
const calcBtn = document.querySelector('#calc');
const cgpaText = document.querySelector('.cgpa-text');
const svgIcons = document.getElementsByClassName('icons');


// add new subject
function newSubject() {
    let addSubject = '';
    addSubject += `
        <div class="course">
            <input class="input" type="text" placeholder="Course name">
            <select class="options1">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
            <input class="num-input" type="number" placeholder="Course credit">
            <svg class="icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </div>`;

        if (mainCalculator.childElementCount > 12) {
            alert("You can't add more than 12 subjects")
        } else {
            mainCalculator.insertAdjacentHTML("beforeend", addSubject);
        }
        removeDeleteEvent();
        // add event to delete icons
        addDeleteEvent();
}

// convert first letter to uppercase
for (i = 0;i<input.length;i++) {
    input[i].onkeyup = function(e) {
        if (e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32      
        ) {
            for (j = 0;j<mainCalculator.childElementCount;j++) {
            let x =input[j].value;
            input[j].value = x.charAt(0).toUpperCase() + x.slice(1);
            }
        }
      }
}

// add new data
addBtn.addEventListener("click", newSubject);

// ------------------Calculate grade-------------

const grade = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
}

function calculate() {
    let result = 0;
    let totalCredit = 0;

     for (let i = 0; i < mainCalculator.childElementCount - 1; i++) {
        let creditLoadValue;
        let optionValue = options[i].value;
        if (!creditLoad[i].value) {
            creditLoadValue = 0;
        } else {
            creditLoadValue = Number(creditLoad[i].value);
        }
        totalCredit += creditLoadValue;
        result += (grade[optionValue] * creditLoadValue);
    }
    let cgpa = result/totalCredit;
    cgpaText.innerHTML = `CGPA: ${cgpa.toFixed(2)}`
}

// calculate CGPA
calcBtn.addEventListener('click', calculate);

// delete subject
function deleteSubject(element) {
    console.log(element);
    mainCalculator.removeChild(element)
}

// display data
function addDeleteEvent() {
    // add event listeners to cancel btns
    for(let deleteBtn of svgIcons) {
        deleteBtn.addEventListener('click', () => {
            deleteSubject(deleteBtn.parentElement);
        })
    };
}

function removeDeleteEvent() {
    // add event listeners to cancel btns
    for(let deleteBtn of svgIcons) {
        deleteBtn.removeEventListener('click', () => {
            deleteSubject(deleteBtn.parentElement); 
        })
    };
}

addDeleteEvent();
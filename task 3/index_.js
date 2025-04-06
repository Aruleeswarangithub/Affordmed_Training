function Clear() {
    document.getElementById('res').value = '';
}

function Back() {
    let current = document.getElementById('res').value;
    document.getElementById('res').value = current.substring(0, current.length - 1);
}

function Solve(value) {
    document.getElementById('res').value += value;
}

function Result() {
    try {
        let result = eval(document.getElementById('res').value.replace('x', '*'));
        document.getElementById('res').value = result;
    } catch (e) {
        document.getElementById('res').value = 'Error';
    }
}   

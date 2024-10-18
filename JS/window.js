

function loadWindow(){
    document.getElementById('xmin').value = localStorage.getItem('xmin');
    document.getElementById('xmax').value = localStorage.getItem('xmax');
    document.getElementById('ymin').value = localStorage.getItem('ymin');
    document.getElementById('ymax').value = localStorage.getItem('ymax');
    document.getElementById('zmin').value = localStorage.getItem('zmin');
    document.getElementById('zmax').value = localStorage.getItem('zmax');
}

function resetWindow() {
    document.getElementById('xmin').value = '-8';
    document.getElementById('xmax').value = '8';
    document.getElementById('ymin').value = '-8';
    document.getElementById('ymax').value = '8';
    document.getElementById('zmin').value = '-8';
    document.getElementById('zmax').value = '8';
    saveWindow();
}

function saveWindow() {
    localStorage.setItem("xmin", document.getElementById('xmin').value);
    localStorage.setItem("xmax", document.getElementById('xmax').value);
    localStorage.setItem("ymin", document.getElementById('ymin').value);
    localStorage.setItem("ymax", document.getElementById('ymax').value);
    localStorage.setItem("zmin", document.getElementById('zmin').value);
    localStorage.setItem("zmax", document.getElementById('zmax').value);
}

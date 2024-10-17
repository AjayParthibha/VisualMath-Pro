let port;

async function connectArduino() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        console.log("Connected to Arduino!");
    } catch (error) {
        console.error("Failed to connect:", error);
    }
}

async function sendData() {
    if (!port) {
        console.error("Not connected to Arduino!");
        return;
    }

    const dataArray = [];
    //const dataArray = Array.from({ length: 17 }, () => Array(17).fill(5));

    
    let exp = localStorage.getItem('expression');
    let xmin = parseFloat(localStorage.getItem('xmin'));
    let xmax = parseFloat(localStorage.getItem('xmax'));
    let ymin = parseFloat(localStorage.getItem('ymin'));
    let ymax = parseFloat(localStorage.getItem('ymax'));
    let zmin = parseFloat(localStorage.getItem('zmin'));
    let zmax = parseFloat(localStorage.getItem('zmax'));

    const xStep = (xmax - xmin) / 16;
    const yStep = (ymax - ymin) / 16;

    for (let i = xmin; i <= xmax; i += xStep) {
        for (let j = ymin; j <= ymax; j += yStep) {
            dataArray.push(Math.round((math.evaluate(exp, { x: i, y: j }) - zmin) / (zmax - zmin)*3*2048));
        }
    }

    const writer = port.writable.getWriter();
    //const data = new Uint16Array([1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4]);
    const data = new Uint16Array(dataArray);
    const numElements = new Uint16Array([data.length]);
    await writer.write(numElements);
    await writer.write(data);
    writer.releaseLock();
}

    /*const dataValue = 1024; // Single integer value to be sent
    const writer = port.writable.getWriter();
    const data = new Uint16Array([dataValue]); // Using Uint16Array to represent the integer
    console.log(data);
    await writer.write(data);
    console.log("Data sent:", dataValue);
    writer.releaseLock();*/

document.getElementById("connect").addEventListener("click", connectArduino);
document.getElementById("send").addEventListener("click", sendData);
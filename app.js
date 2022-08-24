const tableBody = document.getElementById('table-body')

let flights = [
    {
        time: "08:11",
        destination: "OMAN",
        flight: "OX 203",
        gate: "A 01",
        remarks: "ON TIME"
    },
    {
        time: "12:39",
        destination: "LONDON",
        flight: "CL 328",
        gate: "C 31",
        remarks: "CANCELED"
    },
    {
        time: "13:21",
        destination: "DUBAI",
        flight: "DBX 201",
        gate: "A 19",
        remarks: "CANCELED"
    },
    {
        time: "14:01",
        destination: "FRANKFURT",
        flight: "FR 402",
        gate: "B 02",
        remarks: "ON TIME"
    },
    {
        time: "15:22",
        destination: "TOKYO",
        flight: "TK 211",
        gate: "A 32",
        remarks: "DELAYED"
    },
]

const destinations = ["TOKYO", "FRANKFURT", "DUBAI", "LONDON", "OMAN", "BEJRUT"];
const remarks = ["ON TIME", "DELAYED", "CANCELED"];
let hour = 15;


function populateTable() {
    for (const flight of flights) {
        const tableRow = document.createElement("tr");

        for (const flightDetail in flight) {
            const tableCell = document.createElement("td");
            const word = Array.from(flight[flightDetail])

            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div');

                setTimeout(() => {

                    letterElement.classList.add('flip');
                    letterElement.textContent = letter;
                    tableCell.append(letterElement);
                }, 100 * index);

            }

            tableRow.append(tableCell)
        }

        tableBody.append(tableRow);
    }
}
populateTable();

//UNTIL HERE THE APP DISPLAYS FLIGHT WIDGET WITH DATA STORED IN FLIGHTS VARIBLE. works fine.
//  Below there is a code wich transform everything in random display of given data. In this case we can display our
// destinations and remarks and generating random flights number, time and gates. With nice flipping interval.

//just for fun. shuffeling with random data from objects. Works fine, but need some polishing :)

//*********COMMENT / UNCOMMENT SECTION BELOW TO SEE HOW IT WORKs *************** */



function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPRSTUXWVYZ";
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

function generateRandomNumber(maxNumber) {
    const numbers = "0123456789";
    if (maxNumber) {
        const newNumbers = numbers.slice(0, maxNumber + 1)
        return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))

    }

    return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

function generateTime() {
    let displayHour = hour;

    if (hour < 24) {
        hour++;
    }
    if (hour > 24) {
        hour = 1
        displayHour = hour;
    }
    if (hour < 10) {
        displayHour = "0" + hour;
    }
    return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber()
}


function shuffleUp() {
    flights.shift();
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber() + generateRandomNumber(),
        gate: generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)],
    })
    tableBody.textContent = "";
    populateTable();
}

setInterval(shuffleUp, 3000)
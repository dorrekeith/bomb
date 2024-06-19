document.addEventListener('DOMContentLoaded', (event) => {
    let correctCode = generateRandomCode();
    console.log(`Correct Code: ${correctCode}`); // For debugging purposes
    let timer;
    const timeLimit = 30;
    const intervals = [];
    const displays = [];

    function startRandomizing() {
        for (let i = 1; i <= 4; i++) {
            const display = document.getElementById(`randomNumber${i}`);
            displays.push(display);
            display.innerText = getRandomNumber();
            intervals.push(setInterval(() => {
                display.innerText = getRandomNumber();
            }, 1000));
        }

        // Show initial numbers in popup
        showInitialNumbersPopup(correctCode);

        let timeLeft = timeLimit;
        document.getElementById('time').innerText = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('time').innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                intervals.forEach(clearInterval);
                alert('BOOM! The bomb has exploded!');
                location.reload();
            }
        }, 1000);

        document.getElementById('initialNumbers').addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length > 4) {
                e.target.value = value.slice(0, 4);
            }
        });

        document.getElementById('initialNumbers').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const enteredCode = e.target.value;
                checkCode(enteredCode);
                e.target.value = ''; // Reset input box to blank
            }
        });

        document.getElementById('popupSubmit').addEventListener('click', () => {
            const enteredCode = document.getElementById('popupInput').value;
            checkCode(enteredCode);
            document.getElementById('popupInput').value = ''; // Reset input box to blank
            document.getElementById('initialNumbersPopup').style.display = 'none'; // Hide popup
        });
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    function generateRandomCode() {
        return `${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}`;
    }

    function showInitialNumbersPopup(correctCode) {
        document.getElementById('popupNumbers').innerText = correctCode;
        document.getElementById('initialNumbersPopup').style.display = 'block';
    }

    function checkCode(enteredCode) {
        if (enteredCode === correctCode) {
            clearInterval(timer);
            intervals.forEach(clearInterval);
            alert('Disarmed! The bomb is safe.');
            document.getElementById('time').style.color = '#0f0';
            document.getElementById('timer').innerText = 'Bomb Disarmed';
            for (let i = 0; i < displays.length; i++) {
                displays[i].style.color = '#0f0';
            }
        }
    }

    startRandomizing();
});

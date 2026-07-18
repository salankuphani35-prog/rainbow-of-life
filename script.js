// -------------------- CHOOSE PAGE --------------------

const colorCards = document.querySelectorAll(".color-card");
const count = document.getElementById("count");
const submitBtn = document.getElementById("submitBtn");

let selectedColors = [];

if (colorCards.length > 0) {

    colorCards.forEach(card => {

        card.addEventListener("click", () => {

            const color = card.dataset.color;

            if (card.classList.contains("selected")) {

                card.classList.remove("selected");
                selectedColors = selectedColors.filter(c => c !== color);

            } else {

                if (selectedColors.length < 5) {

                    card.classList.add("selected");
                    selectedColors.push(color);

                } else {

                    alert("You can select only 5 colors.");
                }
            }

            count.innerHTML = `Selected : ${selectedColors.length} / 5`;

        });

    });

    submitBtn.addEventListener("click", () => {

        if (selectedColors.length !== 5) {
            alert("Please select exactly 5 colors.");
            return;
        }

        localStorage.setItem("colors", JSON.stringify(selectedColors));
        window.location.href = "result.html";

    });

}

// -------------------- RESULT PAGE --------------------

const scoreElement = document.getElementById("score");
const personalityElement = document.getElementById("personality");

if (scoreElement && personalityElement) {

    const selected = JSON.parse(localStorage.getItem("colors")) || [];

    const points = {
        red: 20,
        orange: 15,
        yellow: 20,
        green: 15,
        blue: 10,
        indigo: 10,
        violet: 10
    };

    const meanings = {
        red: "Courage & Confidence",
        orange: "Creativity & Enthusiasm",
        yellow: "Happiness & Optimism",
        green: "Growth & Balance",
        blue: "Peace & Trust",
        indigo: "Wisdom & Imagination",
        violet: "Leadership & Inspiration"
    };

    let total = 0;
    let traits = [];

    selected.forEach(color => {
        total += points[color];
        traits.push(meanings[color]);
    });

    scoreElement.innerHTML = `Score : ${total} / 100`;

    personalityElement.innerHTML =
        "<b>Your Personality:</b><br><br>" +
        traits.join(", ") +
        "<br><br><b>Make your life as colorful as the rainbow 🌈</b>";
}
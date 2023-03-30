let url = "https://dossier.parcoursup.fr/Candidat/scolarite.baccalaureat"


chrome.tabs.query({ active: true }, (tabs) => {
    let activeTab = tabs[0];
    if (activeTab.url != url) {
        document.querySelector(".container").style.display = "none";
        return;
    }
    document.querySelector("#badPage").style.display = "none";

    chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["content.js"]
    }).then((response) => {

        if (response[0].result.every((el) => el == null)) { return; }
        let [gradesWeightedSum, gradesCoeffSum, total_coeff] = response[0].result;

        let average = gradesWeightedSum / gradesCoeffSum;
        let total_points = average * total_coeff / gradesCoeffSum;
        let percentage = (total_points / total_coeff) * 100;
        console.log(gradesWeightedSum, gradesCoeffSum, total_coeff);

        const slider = document.querySelector(".slider");
        const output = document.querySelector('.output');
        const grade = document.querySelector('.grade-value');
        const points = document.querySelector('.points');
        const mention = document.querySelector('#mention');

        slider.value = percentage;
        output.value = `${slider.value}%`;
        output.style.left = `calc(${0.9 * percentage}% - 5px)`;
        slider.style.background = `linear-gradient(to right, green ${percentage}%, grey ${percentage}%)`;
        grade.innerHTML = `${average.toFixed(1)}/20`;
        points.innerHTML = `${total_points.toFixed(1)}/${total_coeff}`;

        if (percentage < 50) {
            mention.innerHTML = "Vous n'avez pas encore votre BAC";
        } else if (percentage < 60) {
            mention.innerHTML = "Vous avez déjà votre BAC";
        } else if (percentage < 70) {
            mention.innerHTML = "Vous avez déjà la mention Assez Bien";
        } else if (percentage < 80) {
            mention.innerHTML = "Vous avez déjà la mention Bien";
        } else {
            mention.innerHTML = "Vous avez déjà la mention Très Bien";
        }

    });
})

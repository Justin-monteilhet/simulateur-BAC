(() => {
    let error = [null, null, null];

    let order_subjects =
        ["fr_ecrit", "fr_oral", "philosophie", "grand_oral", "spe_2", "spe_2",
            "eps", "emc_1", "emc_2", "es_1", "es_2", "hg_1", "hg_2", "lva_1", "lva_2", "lvb_1", "lvb_2",
            "spe_1"]


    let coefficients = {
        "fr_ecrit": 5,
        "fr_oral": 5,
        "philosophie": 8,
        "grand_oral": 10,
        "spe_2": 16,
        "eps": 6,
        "emc_1": 1,
        "emc_2": 1,
        "es_1": 3,
        "es_2": 3,
        "hg_1": 3,
        "hg_2": 3,
        "lva_1": 3,
        "lva_2": 3,
        "lvb_1": 3,
        "lvb_2": 3,
        "spe_1": 8,
        "opt_2": 2,
        "opt_1": 4
    }


    let iframe = document.getElementById("iframeBac").contentWindow.document;
    let gradeTable = iframe.getElementById("table-afficher-epreuve-bac");
    let rows = Array.from(gradeTable.querySelectorAll(".form-group > input"));
    let nb_subjects = order_subjects.length;  // lenght without options, in order to iterate over options after    
    let gradesWeightedSum = 0;
    let gradesCoeffSum = 0;
    let total_coeff = 0;
    let grade, subject, code, coeff;

    for (let i= 0 ; i < nb_subjects ; i++) {
        subject = order_subjects[i];
        if (subject in coefficients) {
            coeff = coefficients[subject];
            total_coeff += coeff 
        } else {
            console.log("error ", subject);
            return error;
        }

        grade = parseFloat(rows[i].value);
        if (isNaN(grade)) {continue;}

        gradesCoeffSum += coeff;
        gradesWeightedSum += grade * coeff;
    }

    for (let i = nb_subjects ; rows[i] ; i++) {
        coeff = coefficients["opt_2"];
        total_coeff += coeff;

        grade = parseFloat(rows[i].value);
        if (isNaN(grade)) {continue;}

        gradesCoeffSum += coeff;
        gradesWeightedSum += grade * coeff;
    }
    
    return [gradesWeightedSum, gradesCoeffSum, total_coeff];
})()
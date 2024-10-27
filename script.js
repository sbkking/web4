document.getElementById('submit').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    let price = Number(document.getElementById('starting_bid').value);

    if (name && price) {
        let totalCoefficient = 1;
        let totalBonus = 0;
        let totalDeduction = 0;

        totalCoefficient *= Number(document.getElementById('education').value);
        totalCoefficient *= Number(document.getElementById('networth').value);
        
        totalBonus += Number(document.getElementById('caste').value);

        const skillValues = Array.from(document.getElementsByClassName('skills'))
            .filter(skill => skill.checked)
            .map(skill => Number(skill.value));
        totalBonus += skillValues.reduce((total, value) => total + value, 0);

        const ageCoefficient = [...document.getElementsByName('age')]
            .filter(radio => radio.checked)
            .map(radio => Number(radio.value))
            .reduce((total, value) => total * value, 1);
        totalCoefficient *= ageCoefficient;

        const reputationValues = Array.from(document.getElementsByClassName('reputation'));
        reputationValues.forEach(rep => {
            const value = Number(rep.value);
            if (value < 0) {
                totalDeduction += Math.abs(value);
            } else {
                totalCoefficient *= value;
            }
        });

        price *= totalCoefficient;
        price += totalBonus;
        price -= totalDeduction;

        const loveLetter = document.getElementById('love_letter').value;

        const person = {
            bride_groom_name: name,
            final_price: price,
            love_letter: loveLetter
        };

        document.getElementById('result').innerHTML = `
            <h3>The calculated price for ${person.bride_groom_name} is $${person.final_price.toFixed(2)}</h3>
            <p>Your love letter: ${person.love_letter}</p>
        `;
    } else {
        document.getElementById('result').innerHTML = `<h3>Please provide both a name and starting bid.</h3>`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const countryInput = document.getElementById('country-input');
    const countryInfo = document.getElementById('country-info');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const countryName = countryInput.value.trim();

        if (countryName === '') {
            alert('Please enter a country name');
            return;
        }

        try {
            const response = await fetch(`https://restcountries.com/v2/name/${countryName}`);
            const data = await response.json();

            if (response.ok) {
                if (data.length === 0) {
                    throw new Error('Country not found');
                }
                displayCountryInfo(data[0]);
            } else {
                throw new Error('Failed to fetch country data');
            }
        } catch (error) {
            console.error('Error fetching country data:', error.message);
            alert('An error occurred while fetching country data. Please try again later.');
        }
    });

    function displayCountryInfo(country) {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        countryCard.innerHTML = `
            <h2>${country.name}</h2>
            <img src="${country.flag}" alt="${country.name} flag" style="max-width: 100px;">
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <button class="details-btn">More Details</button>
            <div class="more-details" style="display: none;">
                <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</p>
            </div>
        `;

        const detailsBtn = countryCard.querySelector('.details-btn');
        const moreDetails = countryCard.querySelector('.more-details');

        detailsBtn.addEventListener('click', () => {
            moreDetails.style.display = moreDetails.style.display === 'none' ? 'block' : 'none';
        });

        countryInfo.appendChild(countryCard);
    }
});

import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';

checkAuth();

const familyHold = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familyHold.textContent = '';
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const familyElem = document.createElement('div');
        const nameElem = document.createElement('h2');
        const bunniesElem = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el
        bunniesElem.classList.add('bunnies');
        familyElem.classList.add('families');
        // put the family name in the name element
        nameElem.append(familyElem);
        // for each of this family's bunnies
        for (let bunny of loving_families.fuzzy_bunnies) {
            // make an element with the css class 'bunny', and put the bunny's name in the text content
            const bunnyElem = document.createElement('p');

            bunnyElem.classList.add('bunny');
            bunnyElem.textContent = fuzzy_bunnies.name;
            // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            bunnyElem.addEventListener('click', async() => {
                await deleteBunny(fuzzy_bunnies.id);

                displayFamilies();
            });
            // append this bunnyEl to the bunniesEl
            bunniesElem.append(bunnyElem);
        }

        // append the bunniesEl and nameEl to the familyEl
        familyElem.append(nameElem, bunniesElem);
        // append the familyEl to the familiesEl
        familyHold.append(familyElem);

    }


}

window.addEventListener('load', async() => {
    const families = await getFamilies();

    displayFamilies(families);
});
// global variables =============================
// variable to store which feature id was selected
let selectedFeatureId = '';

// helper functions ====================================
// make a request to the server for the list of features and create buttons for them
const createFeatureButtons = async (createBugDiv) => {
  // logic to create elements to display features buttons
  try {
    const featuresInfo = await axios.get('/features');
    const featuresArray = featuresInfo.data;

    // div to store the buttons
    const featuresBtnsDiv = document.createElement('div');
    createBugDiv.appendChild(featuresBtnsDiv);

    // create a button for each feature
    featuresArray.forEach((feature) => {
      const featureBtn = document.createElement('button');
      featureBtn.innerHTML = feature.name;
      featuresBtnsDiv.appendChild(featureBtn);

      // add a class to button so we can find the buttons later on to remove the 'selected' class
      featureBtn.classList.add('feature-btn');

      // add event listener to select a feature
      featureBtn.addEventListener('click', () => {
        // get all the feature btns and remove the 'selected' class if there is
        const featureBtns = document.getElementsByClassName('feature-btn');

        for (let i = 0; i < featureBtns.length; i += 1) {
          // returns true is btn is selected
          const isSelected = featureBtns[i].classList.contains('selected');

          if (isSelected === true) {
            featureBtns[i].classList.remove('selected');
          }
        }

        // add the selected class to the button clicked and store the selected class
        featureBtn.classList.add('selected');
        selectedFeatureId = feature.id;
      });
    });
  } catch (error) {
    // handle error
    console.log(error);
  }
};

// create elements to create a bug
const createBugElements = () => {
  // create createBugBtn
  const createBugBtn = document.createElement('BUTTON');
  createBugBtn.innerHTML = 'Create a Bug';
  document.body.appendChild(createBugBtn);

  // add event listener to render a create bug form when user clicks on createBugBtn
  createBugBtn.addEventListener('click', async () => {
  // create div to display elements of the create bug form
    const createBugDiv = document.createElement('div');
    document.body.appendChild(createBugDiv);

    // create elements required to create a bug form input
    const createBugInputDiv = document.createElement('div');
    const problemLabel = document.createElement('label');
    problemLabel.innerHTML = 'Describe your Problem';
    const problemInput = document.createElement('input');

    const commitLabel = document.createElement('label');
    commitLabel.innerHTML = 'Describe your Commit';
    const commitInput = document.createElement('input');

    const errorTextLabel = document.createElement('label');
    errorTextLabel.innerHTML = 'Describe your Error';
    const errorTextInput = document.createElement('input');

    const submitBtn = document.createElement('button');
    submitBtn.innerHTML = 'Submit';

    // append the input and label elements
    createBugDiv.appendChild(createBugInputDiv);
    createBugInputDiv.appendChild(problemLabel);
    createBugInputDiv.appendChild(problemInput);

    createBugInputDiv.appendChild(commitLabel);
    createBugInputDiv.appendChild(commitInput);

    createBugInputDiv.appendChild(errorTextLabel);
    createBugInputDiv.appendChild(errorTextInput);

    createBugInputDiv.appendChild(submitBtn);

    submitBtn.addEventListener('click', () => {
      const data = {
        problem: problemInput.value,
        commit: commitInput.value,
        errorText: errorTextInput.value,
        FeatureId: selectedFeatureId,
      };

      // form validation for empty fields
      if (data.problem === '' || data.commit === '' || data.errorText === '' || data.FeatureId === '') {
        console.log('empty field(s) detected');
      } else {
      // Make a request to create a bug
      // eslint-disable-next-line no-undef
        axios.post('/createBug', data)
          .then((response) => {
            // handle success
            console.log(response);
            document.body.removeChild(createBugDiv);
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      }
    });

    // create elements to display features buttons
    createFeatureButtons(createBugDiv);
  });
};

// create login and registration form --------------------------
const loginAndRegDiv = document.createElement('div');
document.body.append(loginAndRegDiv);

const emailLabel = document.createElement('label');
emailLabel.innerHTML = 'Email';
const emailInput = document.createElement('input');

const passwordLabel = document.createElement('label');
passwordLabel.innerHTML = 'Password';
const passwordInput = document.createElement('input');

const loginBtn = document.createElement('button');
loginBtn.innerHTML = 'login';
const registerBtn = document.createElement('button');
registerBtn.innerHTML = 'register';

loginAndRegDiv.append(emailLabel, emailInput, passwordLabel, passwordInput, loginBtn, registerBtn);

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // find user data from database
  try {
    const userInfo = await axios.get(`/users?email=${email}&password=${password}`);

    if (userInfo === 'no user') {
      console.log('no user');
    } else {
      // create and display the elements needed to create a bug
      createBugElements();
    }
  } catch (error) {
    // handle error
    console.log(error);
  }
});

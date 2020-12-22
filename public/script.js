// Make a request for all the items
const createBugBtn = document.createElement('BUTTON');
createBugBtn.innerHTML = 'Create a Bug';

const createBugDiv = document.querySelector('.createBugDiv');
createBugDiv.appendChild(createBugBtn);

createBugBtn.addEventListener('click', () => {
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

  createBugDiv.appendChild(problemLabel);
  createBugDiv.appendChild(problemInput);

  createBugDiv.appendChild(commitLabel);
  createBugDiv.appendChild(commitInput);

  createBugDiv.appendChild(errorTextLabel);
  createBugDiv.appendChild(errorTextInput);

  createBugDiv.appendChild(submitBtn);

  // document.body.appendChild(createBugDiv);

  submitBtn.addEventListener('click', () => {
    const data = {
      problem: problemInput.value,
      commit: commitInput.value,
      errorText: errorTextInput.value,
    };
      // Make a request to create an bug
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
  });
});

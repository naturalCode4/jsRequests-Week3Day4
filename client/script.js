////////////////////////////////////////////////
//THE TEST SERVER IS RUNNING ON LOCALHOST:3000//
////////////////////////////////////////////////

// PROBLEM 1
/*
    In the index.html file in this folder there is a button with an id of 'say-hello-button'!

    Use querySelector to select that button and save it to a variable called sayHelloButton
*/

// CODE HERE

const sayHelloButton = document.getElementById('say-hello-button')


// PROBLEM 2
/*
    Create a function that changes sayHelloButton's background color to black and its text color to white (you can use the .style object or create a CSS class and use classList.add)
    
    Attach a mouseover event to sayHelloButton that calls the function you wrote
*/

// CODE HERE

const changeHelloButtonColor = (event) => {
    event.target.style.color = 'white'
    event.target.style.backgroundColor = 'black'
    // event.target.classList.add('.hello-button-mouseover')
}

sayHelloButton.addEventListener('mouseover', changeHelloButtonColor)

// changeHelloButtonColor()

// PROBLEM 3
/*
    Now you can see that the button colors change, but they do not change back when we take the mouse off of the button.

    Write another function that changes the button back to its original colors. #EFEFEF for the background and black for the text.

    Attach another listener that fires your second function when the mouseout event occurs on the button
*/

// CODE HERE

const removeHelloButtonColor = (event) => {
    event.target.style.color = 'black'
    event.target.style.backgroundColor = '#EFEFEF'

}

sayHelloButton.addEventListener('mouseout', removeHelloButtonColor)

// PROBLEM 4
/*
    Now lets see if we can make a request to our server when we click the button

    Add a 3rd event listener to sayHelloButton and trigger the sayHello function when the button is clicked
*/

// DO NOT EDIT FUNCTION
const sayHello = () => {
    axios.get('http://localhost:3000/say-hello').then((res) => {
        let helloText = document.getElementById('hello-text');
        helloText.style.display = 'block';
        helloText.style.backgroundColor = 'green';
        helloText.textContent = res.data;
    })
}
// DO NOT EDIT FUNCTION

// CODE HERE

sayHelloButton.addEventListener('click',sayHello)

// PROBLEM 5 
/*
    Now that we have attached a few event listeners why dont we try adding a request? 
    
    Below you will find an event listener on a button. 
    
    Use axios inside the ohMy function to make a GET request to 'http://localhost:3000/animals' 
    
    Handle the promise that's returned with a .then, which you should pass a callback function to. Inside the callback function, console.log the response's data (in the intermediate instructions we'll come back to this function and add HTML).
*/ 

const ohMy = () => {
    axios
        .get(`http://localhost:3000/animals`)
        .then(res => {
            for (let i=0; i<res.data.length; i++) {
                
                let newP = document.createElement('p')
                document.querySelector('body').appendChild(newP)
                newP.textContent = res.data[i]
                // append the new p element onto the document's body.

                // const movie = document.createElement('li')
                // movie.appendChild(movieTitle);

            }
        })
        .catch(err => {
            console.log(err)
        })
}

document.getElementById('animals-button').addEventListener('click', ohMy)


// PROBLEM 6 
/*
    Now lets see if you can send a request param! inside repeatMyParam function below make get request to 'http://localhost:3000/repeat/{SOMEPARAM}', but with a string instead of {SOMEPARAM}.  

    The function that runs when this request is made will return whatever parameter you sent 

    Handle the promise returned from the request with a .then, which will take in a callback -- the callback function should print the response.data.
    
    Outside of the function, select the button with the id "repeat-button" and add a click event listener that calls the repeatMyParam function.
    
    We'll be updating this function in the next problem.
*/

const repeatMyParam = () => {
    axios
        .get(`http://localhost:3000/repeat/Rainbows & da Sunshine Button!`)
        .then (response => {
            console.log(response.data)
            document.getElementById('repeat-button').textContent = response.data
        })
        .catch(err => {
            console.log(err)
        })
    
}

const repeat = document.getElementById('repeat-button')
repeat.addEventListener('click', repeatMyParam)

// PROBLEM 7
/*
    Now that we have the response data, let's add it to our web page! 
    
    Inside the repeatMyParam function above, grab the element with the id of 'repeat-text' and set its textContent property equal to the response data.
*/

// Code in the repeatMyParam function above



// PROBLEM 8
/*
    Time to attach a query to our request!

    Write a function that makes a get request to 'http://localhost:3000/query-test', with a query of your choice on the end!

    Outside of your new function, select the button with the id "query-button" and add a click event listener that calls your function.
*/

// CODE HERE

const queryTest = (event) => {
    axios.get('http://localhost:3000/query-test/?bees=cool&tree=drool')
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

const queryButton = document.getElementById('query-button')
queryButton.addEventListener('click', queryTest)



////////////////
//INTERMEDIATE//
////////////////

// PROBLEM 9
/* 
    Back in the ohMy function on Problem 5, replace the console log in the promise's callback with a for loop that loops over res.data. 

    On each iteration of the loop, create a new p element. Set its textContent equal the string at the current index (i) and then append the new p element onto the document's body. 
*/



// Code in the ohMy function in Problem 5

// PROBLEM 10 
/*
    In the function that you wrote for Problem 8, change the URL to test a couple different scenarios. 

    1: Send no queries on the URL -- what happened? 

    2: Send more than 1 query on the URL -- what happened? 
*/

// Edit code in Problem 8



////////////
//ADVANCED//
////////////

//PROBLEM 11
/*
    You are going to add the ability to POST to the server. You'll need to create a small form and write a function that makes a post request. Then you'll attach that function to the submit event on the form. We'll be creating a list of foods. 
    In the index.html file inside of the client folder, create a form with one text input field and a button. The input field should have a placeholder that tells the user to enter a food. And the button should indicate that it will add food into a list. 
    In this file (script.js), create a function called createFood. 
    Inside the function, select the input you just created in the HTML and save it to a variable called foodInput. 
    Next, create an object called body inside the function. It should have one key-value pair. The key should be newFood (make sure to match the case and spelling exactly) and the value should be the value of the food input. 
    Now make an axios post request to /food. Inside the parentheses where you passed the URL in, pass in body as the second argument. 
    Use a .then to handle the promise returned from the axios call. Pass a callback function to the .then. Inside that callback, console log the res.data. 
    Based on what we did earlier to display this type of data, write code that will display the response in your HTML document. 
*/

// CODE HERE 

//could do by adding div section to html doc
const createFood = (event) => {

    event.preventDefault()

    const foodSection = document.querySelector('#food-section')
    const foodInput = document.getElementById('food-text')
    const body = {newFood: `${foodInput.value}`}


    axios
    .post('http://localhost:3000/food', body)
    .then(response => {

        let newDiv = document.createElement('div')
        foodSection.appendChild(newDiv)

        let newP = document.createElement('p')
        newDiv.appendChild(newP)
       
        let newDelBtn = document.createElement('button')
        newDiv.appendChild(newDelBtn)

        newDelBtn.textContent = 'delete'
        newP.textContent = foodInput.value
        foodInput.value = ''

        newDelBtn.addEventListener('click', deleteFood)

    })
    .catch(error => {console.log(error)
    })
}

const deleteFood = (event) => {
    event.preventDefault()

    // console.log(event.target.parentNode)
    const deletedFood = event.target.parentNode.firstChild.innerText
    event.target.parentNode.remove()

    let message = document.createElement('p')
    message.textContent = `you deleted ${deletedFood}`
    document.getElementsByTagName('body')[0].appendChild(message)
    setTimeout(() => {message.remove()}, 1500)

    setTimeout(() => {myAlert(deletedFood)}) // even though no time, still makes alert run after. puts it in secondary queue
}

const myAlert = (deletedFood) => {
    console.log('alerted yo')
    alert(`you deleted ${deletedFood}`)
}

const foodButton = document.getElementById('food-button')
foodButton.addEventListener('click', createFood)


const imageInput = document.getElementById('URL-input')
const imageButton = document.getElementById('image-button')

const displayImage = event => {
    event.preventDefault()

    const image = document.createElement('img')
    image.src = `${imageInput.value}`
    image.style = 'width: 300px; height: auto;'
    console.log('my image is ' + image.src, imageInput.value)
    document.getElementById('pics').appendChild(image)

}

imageButton.addEventListener('click', displayImage)




// https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=cbe66879ae8c0ac09975d945f39137f6
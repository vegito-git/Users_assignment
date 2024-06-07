Hello, run npm install to install the dependencies(as there is no node_modules folder available).
Then to run the app use npm start.

About the project.....
First of all I have used the GET request inside App .js, then I have put the data received on a state variable(array).
This is the array I have displayed on the home page(have used the map function).
Every row have a edit and a delete button and at the end of the table a add user button.

I have use four components(to add, update, delete users and a loading component).
The loading component have a spinner from react-bootstrap.
Then for the adding and updating I have used modals from react-bootstarap.

I have used the API given.
As for add, update and delete, they are only being done on the array storing the data received from response.data, no backend api is being used except for the GET.
Other API's are fake one(as mentioned).

And I have used toastify for alerts and msgs.
Thanks and have a great day!!
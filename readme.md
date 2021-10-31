## Todo Manager

A personal todo list management system

### Features

1. User Registration, login, logout
2. Adding, deleting, editing tasks from todo list

### Files & Directories

- `Main Directory`

	- `accounts` - django app for managing user authentication		
		- `api.py` - api views for user registration, login and logout
		- `serializers.py` - serializers for representing user data 
		- `urls.py` - endpoints for user registration, login, logout
	
	- `capstone` - python package for this project
		- `settings.py` - settings, configurations for the project
		- `urls.py` - main endpoints
	
	- `frontend` - django app containing all react code 
		- `src` - directory containing all react components, redux store, reducers, custom hooks
		- `static` - directory containing the main.js file
		- `templates` - directory containing the templates 
		- `urls.py` - endpoints for the homepage
	
	- `todo` - django app for managing the todo lists
		- `admin.py` - for customizing admin interface
		- `api.py` - api views for viewing, adding, deleting, editing, items from todo list
		- `models.py` - ORM models for todo list
		- `serializers.py` - serializers for representing todo list
		- `urls.py` - endpoints for viewing, editing, deleting,adding todo items
	
	- `.babelrc` - babel configuration for transpiling react
	
	- `.gitignore` - for ignoring files in git 
	
	- `manage.py` - command line utitlity
	
	- `package.json` - dependencies, scripts for javascript
	
	- `package-lock.json` - for keeping track of exact versions of the installed javascript packages
	
	- `requirements.txt` - list of pyton dependencies
	
	- `webpack.config.js` - webpack configurations 

### Installation 

Run the following commands from this directory 

```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Justification

- This project incorporates materials not discussed in the lectures or given as part of assignments
- Django Rest Framework has been used for creating REST API
- The frontend is done completely in react js
- all the components in react are functional components
- state management has been done by redux
- custom hooks have been used in forms



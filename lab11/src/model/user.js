class User {
	constructor(email, password) {
		this.email = email
		this.password = password
	}

	getUserEmail = () => {
		return this.email
	}

	setUserEmail = (email) => {
		this.email = email
	}
	
	getUserPassword = () => {
		return this.password
	}

	setUserPassword = (password) => {
		this.password = password
	}
}

module.exports = User

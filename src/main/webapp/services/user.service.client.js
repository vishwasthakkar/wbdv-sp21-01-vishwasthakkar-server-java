function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    // this.findUserById = findUserById;

    this.url = 'https://wbdv-generic-server.herokuapp.com/api/vishwas/users';
    var self = this;

    function createUser(user) {
        return fetch(self.url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json()
        })
    }

    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            })
    }

    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
    }

    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`,
                     {method: 'DELETE'})
    }

    //     function findUserById(userId) { … }
}

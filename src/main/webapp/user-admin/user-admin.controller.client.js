
(function () {
    var $tbody;
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $createBtn, $updateBtn, $deleteBtn, $selectBtn;

    var userService = new AdminUserServiceClient();
    var users = [];
    var selectedUser = null;

    jQuery(main);

    function main() {
        $tbody = $('.wbdv-tbody');
        $usernameFld = $('.vdt-userNameFld');
        $passwordFld = $('.vdt-passwordFld');
        $firstNameFld = $('.vdt-firstNameFld');
        $lastNameFld = $('.vdt-lastNameFld');
        $roleFld = $('.vdt-roleFld');
        $createBtn = jQuery('.wbdv-create');
        $updateBtn = $('.wbdv-update');

        $createBtn.click(createUser);
        $updateBtn.click(updateUser)

        userService.findAllUsers()
            .then(function (usersFromServer) {
                users = usersFromServer;
                renderUsers(users);
            });
    }


    function createUser() {
        var newUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        };
        $usernameFld.val('');
        $passwordFld.val('');
        $firstNameFld.val('');
        $lastNameFld.val('');

        userService.createUser(newUser)
            .then(function (actualUser) {
                users.push(actualUser);
                renderUsers(users);
            });
    }


    function deleteUser(event) {
        var rowId = $(event.target
                          .parentElement
                          .parentElement
                          .parentElement)
            .attr('class');
        var index = users.findIndex(user => user._id === rowId)
        userService.deleteUser(rowId)
            .then(function (status) {
                users.splice(index, 1);
                renderUsers(users)
            });
    }

    function selectUser(event) {
        var rowId = $(event.target
                          .parentElement
                          .parentElement
                          .parentElement)
            .attr('class');
        selectedUser = users.find(user => user._id === rowId);
        $usernameFld.val(selectedUser.username);
        $passwordFld.val(selectedUser.password);
        $firstNameFld.val(selectedUser.firstName);
        $lastNameFld.val(selectedUser.lastName);
        $roleFld.val(selectedUser.role);
    }


    function updateUser() {
        selectedUser.username = $usernameFld.val();
        selectedUser.password = $passwordFld.val();
        selectedUser.firstName = $firstNameFld.val();
        selectedUser.lastName = $lastNameFld.val();
        selectedUser.role = $roleFld.val();
        userService.updateUser(selectedUser._id, selectedUser)
            .then(function (status) {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser;
                renderUsers(users)
            });
        $usernameFld.val('');
        $passwordFld.val('');
        $firstNameFld.val('');
        $lastNameFld.val('');
    }

    function renderUsers(users) {
        $tbody.empty();
        users.forEach(user => {
            $tbody.append(`
                <tr class="${user._id}">
                    <td class="vdt-row-username">${user.username}</td>
                    <td>&nbsp;</td>
                    <td class="vdt-row-first-name">${user.firstName}</td>
                    <td class="vdt-row-last-name">${user.lastName}</td>
                    <td class="vdt-row-role">${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="float-right">
                          <i class="fa-2x fa fa-times vdt-row-remove"></i>
                          <i class="fa-2x fa fa-pencil vdt-row-edit"></i>
                        </span>
                    </td>
                </tr>
            `);
        });

        $deleteBtn = $(".vdt-row-remove");
        $deleteBtn.click(deleteUser);

        $selectBtn = $(".vdt-row-edit");
        $selectBtn.click(selectUser);
    }

})();
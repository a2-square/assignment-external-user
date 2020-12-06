(function() {
    'use strict';

    //* Never change id || Never change userRoles and authTypes
    //* Don't ever change the index of elements of USER_ROLES & AUTH_TYPES

    module.exports = {
        //List of fields accepted from external user
        ACCEPT_USER_FIELDS: [
            "firstName",
            "lastName",
            "email",
            "ssn",
            "PhoneNumber",
            "fullAddress"
        ],
        //Type of users in wiseen system 
        USER_ROLES: ['admin'],
        
        USER_ROLES_OBJ: {
            ADMIN: {
                id: 1,
                name: 'admin'
            }
        },

        // Type of login or signup in wissen system
        AUTH_TYPES: ['local'],

        DEFAULT_AUTH_TYPES: 'local'
    }

}());
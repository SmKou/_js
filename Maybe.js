var user = {
    email: 'james@example.com',
    accountDetails: {
        address: {
            street:   '123 Fake St',
            city:     'Exampleville',
            province: 'NS',
            postcode: '1234'
        }
    },
    preferences: {}
}

var banners = {
    'AB': '/assets/banners/alberta.jpg',
    'BC': '/assets/banners/british-columbia.jpg',
    'MB': '/assets/banners/manitoba.jpg',
    'NL': '/assets/banners/newfoundland-labrador.jpg',
    'NS': '/assets/banners/nova-scotia.jpg',
    'NT': '/assets/banners/northwest-territories.jpg',
    'ON': '/assets/banners/ontario.jpg',
    'PE': '/assets/banners/prince-edward.jpg',
    'QC': '/assets/banners/quebec.jpg',
    'SK': '/assets/banners/saskatchewan.jpg',
    'YT': '/assets/banners/yukon.jpg',
};

function getUserBanner(banners, user) {
    return banners[user.accountDetails.address.province];
}

/* user did not login */
function getUserBanner(banners, user) {
    if (typeof user.accountDetails !== 'undefined') {
        return banners[user.accountDetails.address.province];
    }
}

/* user null */
function getUserBanner(banners, user) {
    if (user !== null) {
        if (user.accountDetails !== undefined) {
            return banners[user.accountDetails.address.province];
        }
    }
}

/* user logged in with no details */
function getUserBanner(banners, user) {
    if (user !== null) {
        if (user.accountDetails !== undefined) {
            if (user.accountDetails.address !== undefined) {
                return banners[user.accountDetails.address.province];
            }
        }
    }
}

/* ------------------------------------ MAYBE */

var Maybe = function(val) {
    this.__value = val;
};
var maybeOne = new Maybe(1);

Maybe.of = function(val) {
    return new Maybe(val);
};
var maybeTwo = Maybe.of(1);

Maybe.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
    if (this.isNothing()) {
        return Maybe.of(null);
    }
    return Maybe.of(f(this.__value));
};

function getUserBanner(banners, user) {
    return Maybe.of(user)
        .map(prop('accountDetails'))
        .map(prop('address'))
        .map(prop('province'))
        .map(prop(R.__, banners));
}
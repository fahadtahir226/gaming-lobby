const db = firebase.firestore();
let currentUser;
window.fbAsyncInit = function () {
    FB.init({
        appId: 'APP-ID',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
    });

    FB.AppEvents.logPageView();

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
            // console.log('Successful login for: ' + response.name);
            console.log(response);
            
            db.collection('users').doc(response.id).get()
                .then(async (doc) => {
                    if (doc.exists) {
                        await db.collection('users').doc(`${response.id}`).get()
                            .then(doc => {
                                currentUser = doc.data();
                                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                                window.location.replace("./Dashboard/dashboard.html")

                                console.log(doc.data().name,doc.data().id,doc.data().level,doc.data().league,doc.data().xp);  
                            })
                    } else {
                        await db.collection('users').doc(`${response.id}`).set({
                            name: response.name,
                            email: '',
                            id: response.id,
                            level: 1,
                            league: 'Stone I',
                            xp: 0,
                        }).then(res => console.log(res, 'added'))
                            .catch(err => alert(`Error from catch: ${err.message}`))
                    }
                })

            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
            FB.Canvas.startTimer();
        });
    } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}

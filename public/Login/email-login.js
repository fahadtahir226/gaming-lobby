const auth = firebase.auth();
// const db = firebase.firestore();
let currentEmailUser;
// user Sign Up  
const Register = (event) => {
    var name = document.getElementById('reg-name').value;
    var email = document.getElementById('reg-email').value;
    var pass = document.getElementById('reg-password').value;


    if ((email.length && pass.length && name.length) !== 0) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(async (res) => {
                console.log(res);
                alert(`Your Account Has Been Created Successfully !!`)
                await db.collection('users').doc(res.user.uid).set({
                    name,
                    id: res.user.uid,
                    email,
                    level: 1,
                    league: 'Stone I',
                    xp: 0,
                }).then(res => console.log(res, 'added'))
            })
            .catch(err => alert(err.message))
    } else {
        alert('field is empty!!')
    }
}

// User login 
const login = (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;
    auth.signInWithEmailAndPassword(email, pass)
    .then(async res => {
        // console.log( res.user.uid, auth.currentUser.uid);

        await db.collection('users').doc(res.user.uid).get()
            .then(doc => {
                currentEmailUser = doc.data();
                console.log(currentEmailUser, doc.data());
                localStorage.setItem('currentUser', JSON.stringify(currentEmailUser));
                window.location.replace("./Dashboard/dashboard.html")
            })
    })
        .catch(err => alert(err.message));
}

// USer Sign Out
const SignOut = (e) => {
    e.preventDefault();
    auth.signOut().then(res => {
        window.location.replace("../index.html")
    }).catch(err => alert(err.message))
}
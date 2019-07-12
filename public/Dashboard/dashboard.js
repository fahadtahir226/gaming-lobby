let leagues = [
    'Stone I', 'Stone II', 'Stone III',
    'Bronze I', 'Bronze II', 'Bronze II',
    'Silver I', 'Silver II', 'Silver III',
    'Gold I', 'Gold II', 'Gold III',
    'Platinum I', 'Platinum II', 'Platinum III',
    'Titanium I', 'Titanium II', 'Titanium III',
    'Crystal I', 'Crystal II', 'Crystal III',
    'Dimond I', 'Dimond II', 'Dimond III',
    'Warrior I', 'Warrior II', 'Warrior III',
    'Legend I', 'Legend II', 'Legend III',
];
window.addEventListener('DOMContentLoaded', (event) => {
    // show the user profile
    let ul = document.getElementById("profile");
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (ul) {
        ul.innerHTML = `
                    <li>Name : ${currentUser.name}</li> 
                    <li>ID : ${currentUser.id}</li>
                    <li>Email : ${currentUser.email}
                    <li>Level : ${currentUser.level}</li>
                    <li>League: ${currentUser.league}</li>
                    <li>XP : ${currentUser.xp}</li>
                    `;
    }
    // show Challenge options
    var currentLeague = leagues.indexOf(currentUser.league);

    let challangeTags = document.getElementsByClassName('challengetag');
    let challangeBtn = document.getElementsByClassName('challengebtn');

    // Previous Lobby
    if (currentLeague) {
        challangeTags[0].innerHTML = leagues[currentLeague - 1];
        db.collection('leagues').doc(leagues[currentLeague - 1]).get()
            .then(res => {
                var status = res.data().status;
                if(res.data().challenger === currentUser.id){
                    challangeBtn[0].innerHTML = 'Waiting...'
                }
                else{
                    challangeBtn[0].innerHTML = status;
                }

            })
    }
    else {
        challangeTags[0].style.display = 'none';
        challangeBtn[0].style.display = 'none';
    }


    //  Current Lobby
    challangeTags[1].innerHTML = leagues[currentLeague];
    db.collection('leagues').doc(leagues[currentLeague]).get()
        .then(res => {
            var status = res.data().status;
            if(res.data().challenger === currentUser.id){
                challangeBtn[1].innerHTML = 'Waiting...'
            }
            else{
                challangeBtn[1].innerHTML = status;
            }
        })

    // Next Lobby
    if (currentLeague > 28) {
        challangeTags[2].style.display = 'none';
        challangeBtn[2].style.display = 'none';
    }
    else {
        challangeTags[2].innerHTML = leagues[currentLeague + 1];
        db.collection('leagues').doc(leagues[currentLeague + 1]).get()
            .then(res => {
                var status = res.data().status;
                if(res.data().challenger === currentUser.id){
                    challangeBtn[2].innerHTML = 'Waiting...'
                }
                else{
                    challangeBtn[2].innerHTML = status;
                }
            })
    }


    //show challenge status






});

function challenge(event) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    event.preventDefault();
    // console.log(event.target.innerHTML);
    let eventTarget = event.target.parentNode.childNodes[1].innerHTML;
    if(event.target.innerHTML === 'Place a Challange'){
        db.collection('leagues').doc(eventTarget).set({
            status: 'Accept challenge',
            challenger: currentUser.id
        }).then(res => {
            console.log('Status changed')
            window.location.reload();
        })
        .catch(err => console.log(err))

    }
    else{
        db.collection('leagues').doc(eventTarget).set({
            status: 'Place a Challange',
            challenger: ''
        }).then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })

        // window.location.replace('Link to the game');

    }
}
// challenge(event);

function returneToSite(gameResults){

}

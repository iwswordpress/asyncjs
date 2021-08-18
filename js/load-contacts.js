function loadContacts() {
   let db = new Localbase('db');
   const url = 'https://randomuser.me/api/?results=20';
   //const url = '../_data/randomuser50UK.json';
   fetch(url)
      .then(function (response) {
         if (response.ok) {
            return response.json();
         }
      })
      .then(function (data) {
         console.log(data.results);
         for (var i = 0; i < data.results.length; i++) {
            db.collection('users')
               .doc(data.results[i].login.uuid) // set up Primary Key
               .set({
                  uuid: data.results[i].login.uuid,
                  firstName: data.results[i].name.first,
                  lastName: data.results[i].name.last,
                  telMob: data.results[i].phone,
                  email: data.results[i].email,
                  avatar: data.results[i].picture.thumbnail,
               });
         }
      })
      .catch(err => console.log(err));
}

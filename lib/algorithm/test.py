from firebase import firebase
firebase = firebase.FirebaseApplication('https://asdfg.firebaseio.com', None)
result = firebase.get('/users', None)
print result
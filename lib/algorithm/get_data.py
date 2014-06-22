def getFirebaseAsDict():
  firebase_url = 'https://asdfg.firebaseio.com'
  from firebase import firebase
  firebase = firebase.FirebaseApplication(firebase_url, None)
  result = firebase.get('/users', None)
  return result

def getFirebaseAsDict():
  firebase_url = 'https://cflo-sbd.firebaseio.com'
  from firebase import firebase
  firebase = firebase.FirebaseApplication(firebase_url, None)
  result = firebase.get('/transactions_master', None)
  return result

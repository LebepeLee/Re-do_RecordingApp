import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import{createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../FirebaseConfig/Firebase'
import {db} from '../../FirebaseConfig/Firebase'
import {collection, addDoc} from 'firebase/firestore'
import { View,Text,FormView,TouchableOpacity } from 'react-native'
import Login from './Login'



function SignIn() {

  const [user,setUser] = useState({
    name: '',
    surname: '',
    mobileNumber: 0,
    email: '',
    password: '',
    cPassword: '',
  })
  const [error,setError] = useState(false)

  let history = useNavigate()

  function userInput(e){
    setUser ({...user, [e.target.name]:e.target.value})
    console.log(user);
  
  }
  

  const register = () =>{
    
    createUserWithEmailAndPassword(auth, user.email, user.password).then((results)=>{
      const collectionRef = collection(db, 'userInfo');
    addDoc(collectionRef,{...user,id: results.user.uid}).then((snapshot)=>{
      alert('Your information is successfully saved')
      console.log(snapshot.docs);
      history('/Login')
    })
    .catch((error)=>{
      alert('failed to save your details, sorry'+error.message)
    })
      
    }).catch((error)=>{
      console.log(error)
    }) 
  }

   const handleSubmit = (e) =>{
    e.preventDefault ()
    
    if (user.name ===''){
      setError(true)
      console.log(user.name)
    }
    if (user.surname===''){
      setError(true)
      console.log(user.surname)
    }
    if (user.mobileNumber===''){
      setError(true)
      console.log(user.mobileNumber)
    }
    if (user.email===''){
      setError(true)
      console.log(user.email)
    }
    if(user.password=== ''){
      setError(true)
      console.log(user.password)
    }
    if (user.name&&user.surname&&user.mobileNumber&&user.email&&user.password){
      console.log(user)
      register()
      
    }
    
   }
  
   return (
    <View style={Styles.Container}>
    <View style={Styles.SignIn}>
    <FormView className='userInputs' onSubmit={handleSubmit}> 
      <Text style={Styles.Heading}>Sign Up</Text>
        <TextInput style={Styles.TextInput} placeholder={'Enter your Full names'} placeholderTextColor={'white'} onChange={(e)=>userInput(e)}/><br></br>
      {error.name?
      <Text>Please fill in your full names</Text>
      : ''}
        <TextInput style={Styles.TextInput} placeholder={'Enter your email'} placeholderTextColor={'white'} onChange={(e)=>userInput(e)}/><br></br>
        {error.surname?
      <Text>Please fill in your email</Text>
      : ''}
        <TextInput style={Styles.TextInput} placeholder={'Enter your password'} placeholderTextColor={'white'} onChange={(e)=>userInput(e)}/><br></br>
        {error.password?
      <Text>Please fill in your password</Text>
      : ''}
        <TextInput style={Styles.TextInput} placeholder={'confirm your password'} placeholderTextColor={'white'} onChange={(e)=>userInput(e)}/><br></br>
        {error.cPassword?
      <Text>Please fill in confirm password</Text>
      : ''}
      <TouchableOpacity style={Styles.Button}>
        <Navigate to ='/Login'>
        <Text style={Styles.ButtonText} onPress={handleSubmit}>Sign Up</Text>
        </Navigate>
        </TouchableOpacity>
        <Text style={Styles.Text}>Already have an account?</Text><br></br>
        <TouchableOpacity style={Styles.Button}>
         <Text style={Styles.Text}><Navigate to ={Login}>Go to Login</Navigate></Text>
         </TouchableOpacity>
        </FormView>
        </View>
        </View>
  )
}
const Styles = StyleSheet.create({
  Container:{
    marginTop:20,
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  SignIn:{
    width:'100%',
    height:'40%',
    display:'flex',
    justifyContent:'center'
  },
  Heading:{
    fontSize:40,
    color:'white',
    fontWeight:500,
    marginLeft:30,
    marginTop:60,
  },
  FormView:{
    width:'100%',
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    marginTop:30,
  },
  TextInput:{
    width:'90%',
    borderWidth:1,
    borderColor:'#fff',
    height:52,
    borderRadius:10,
    paddingLeft:5,
    marginTop:20,
    color: 'white'
  },
  Button:{
    width: '90%',
    color:'white',
    height:'50',
    backgroundColor:'black',
    borderRadius:10,
    marginTop: 20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonText:{
    fontSize: 20,
    fontWeight:'500'
  },
  Text:{
    fontSize: 20,
    fontWeight:'500'
  }
})

export default SignIn
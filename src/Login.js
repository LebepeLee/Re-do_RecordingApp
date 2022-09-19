import React ,{useState}from 'react'
import {Navigate} from 'react-native'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../FirebaseConfig/Firebase'
import {db} from '../../FirebaseConfig/Firebase'
import {collection, getDocs} from 'firebase/firestore'
import { View, StyleSheet,TextInput, FormView , TouchableOpacity} from 'react-native'
import SignIn from './SignIn'


export default function Login() {
  
  const [email,setEmail] = useState('')
    const [password,setPassword] = useState ('')
    const [error,setError] = useState(false)
 
    let history = useNavigate()

        const Login = (()=>{
    
          signInWithEmailAndPassword(auth, email, password).then(()=>{
            const collectionRef = collection(db, 'userCredentionals');
            getDocs(collectionRef).then((snapshot)=>{
          alert('Logged in successfully')
          console.log(snapshot.docs);
        })
        .catch((error)=>{
          alert('failed to Login, sorry'+error.message)
        })
          }).catch((error)=>{
            
          })
    
        })
    
        const handleSubmit = (e) =>{
          e.preventDefault ()

          if (email.length ===' '){
           
            setError(true)
          
          }
          if(password===' '){
         
            setError(true)
          
          }
          if (email&&password){
            console.log(email,password)
            Login()
            history('/')
          }

         }
   
  return (
    <View style={Styles.Container}>
    <View style={Styles.Login}>
    <FormView onSubmit={handleSubmit}> 
      <Text style={Styles.Heading}>Login</Text>
      <TextInput style={Styles.TextInput} placeholder={'Enter your email'} placeholderTextColor={'white'} onChange={(e)=>setEmail(e.target.value)}/>
      {error&&email === ' '?
      <Text>please fill in E-mail</Text> : ''}
        <TextInput style={Styles.TextInput} placeholder={'Enter your password'} secureTextEntry={true} placeholderTextColor={'white'} onChange={(e)=>setPassword(e.target.value)}/>
        {error&&password === ' '?
      <Text>please fill in E-mail</Text> : ''}
         <Navigate to ='/'>
          <TouchableOpacity style={Styles.Button}>
         <Text style={Styles.ButtonText} onPress={handleSubmit}>Login</Text>
         </TouchableOpacity>
         </Navigate>
         <Text style={Styles.Text}>Do not have an account?</Text><br></br>
         <TouchableOpacity style={Styles.Button}>
         <Text style={Styles.Text}><Navigate to ={SignIn}>Create an account</Navigate></Text>
         </TouchableOpacity>
         <TouchableOpacity style={Styles.Button}></TouchableOpacity>
       
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
  Login:{
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
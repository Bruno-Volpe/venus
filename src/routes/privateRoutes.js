import { useState, useEffect } from 'react'

import { auth } from '../service/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'

import { Navigate } from 'react-router-dom'

export default function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        //se tem user logado
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          }

          localStorage.setItem("@detailUser", JSON.stringify(userData))

          setLoading(false);
          setSigned(true);

        } else {
          //nao possui user logado
          setLoading(false);
          setSigned(false);
        }
      })
    }

    checkLogin();
  }, [])

  if (loading) {
    return (
      <div></div>
    )
  }
  console.log('REACT_APP_NODE_ENV:', process.env.REACT_APP_NODE_ENV);
  // Permite acesso livre em ambiente de teste (REACT_APP_NODE_ENV === 'test')
  // Só libera se a variável estiver definida explicitamente como 'test'
  if (process.env.REACT_APP_NODE_ENV && process.env.REACT_APP_NODE_ENV === 'test') {
    return children;
  }

  if (!signed) {
    return <Navigate to="/login" />
  }

  return children;
}
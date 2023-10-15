import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Placeholder from 'react-bootstrap/Placeholder'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import db, { auth } from '../../service/firebaseConnection'
import './style.css'



interface Subject {
  id: string
  imageUrl: string
  subjectName: string
  techerName: string
}

function Cards() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const user = auth.currentUser

        if (user) {
          const q = query(collection(db, 'subject'), where('userId', '==', user.uid))
          const querySnapshot = await getDocs(q)

          const subjectData: Subject[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            subjectName: doc.data().subjectName,
            techerName: doc.data().techerName,
          }))

          setSubjects(subjectData)
        }
      } catch (err) {
        console.log(err)
      }
    }

    loadSubjects()
  }, [])

  const handleCardClick = (id: string) => {
    navigate(`/cardDetails/${id}`)
  }

  return (
    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="row-cards g-4">
      {subjects.length > 0 ? (
        subjects.map((subject: Subject, idx: number) => (
          <Col key={idx}>
            <Card className="card-container mx-auto" onClick={() => handleCardClick(subject.id)}>
              {subject.imageUrl ? (
                <Card.Img variant="top" className="background-card" src={subject.imageUrl} />
              ) : (
                <Placeholder as={Card.Img} variant="top" className="background-card" />
              )}
              <Card.Body className="body-card">
                <Card.Title>{subject.subjectName}</Card.Title>
                <Card.Text>Professor: {subject.techerName}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col xs={12} className="mt-5 text-center">
          Adicione novas matérias...
        </Col>
      )}
    </Row>
  )
}

export default Cards

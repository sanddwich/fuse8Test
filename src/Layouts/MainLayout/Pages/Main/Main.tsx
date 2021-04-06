import { randomInt } from 'crypto'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CardInterface from '../../../../Interfaces/CardInterface'
import CardItem from './CardItem/CardItem'
import './Main.scss'

interface MainProps {}

interface MainState {
  images: string[]
  loading: boolean
  error: boolean
  url: string
  cardlist: CardInterface[]
}

class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props)
    this.state = {
      images: ['/img/1.png', '/img/2.png', '/img/3.png'],
      loading: true,
      error: false,
      url: 'https://603e38c548171b0017b2ecf7.mockapi.io/homes',
      cardlist: [],
    }
  }

  componentDidMount() {
    this.getCards()
  }

  getCards = async (): Promise<any> => {
    const response = await fetch(this.state.url)
    if (response.ok) {
      const responseResult = await response.json()
      this.setState({
        cardlist: responseResult.map((el: CardInterface) => {
          return { ...el, visible: true, img: this.state.images[Math.floor(Math.random() * this.state.images.length)] }
        }),
        loading: false,
      })
      console.log(this.state.cardlist)
    } else {
      this.setState({ error: true, loading: false })
    }
  }

  inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value.trim().toLowerCase()
    let cardlist = this.state.cardlist
    if (value.length > 2) {
      cardlist = cardlist.map((card) => {
        if (card.title.toLowerCase().includes(value)) {
          card.visible = true
        } else {
          card.visible = false
        }

        return card
      })
    } else {
      cardlist = cardlist.map((card) => {
        card.visible = true
        return card
      })
    }

    this.setState({ cardlist })
  }

  render() {
    return (
      <Container fluid className="Main p-0">
        <Container className="Main__cont">
          <h1>Our Latest Developments</h1>
          <Row className="Main__filterLine d-flex align-items-center m-0">
            <div className="Main__filterTitle d-none d-sm-flex">Filter</div>
            <div className="Main__filterInput">
              <input
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.inputChangeHandler(event)}
                placeholder="Filter"
              />
            </div>
          </Row>

          <Row className="Main__cardList">
            {this.state.cardlist.map((card, index) => {
              if (card.visible) {
                return (
                  <Col key={index} md={4} className="Main__card">
                    <CardItem card={card} />
                  </Col>
                )
              }
            })}
          </Row>

          <Row className="Main__seeMorecCont d-flex justify-content-center">
            <div className="Main__seeMore">See more <img src="/img/Chevron.svg" alt=""/></div>
          </Row>
        </Container>
      </Container>
    )
  }
}

export default Main

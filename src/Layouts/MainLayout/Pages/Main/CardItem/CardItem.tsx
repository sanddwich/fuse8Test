import React from 'react'
import { Container, Row } from 'react-bootstrap'
import CardInterface from '../../../../../Interfaces/CardInterface'
import './CardItem.scss'

interface CardItemProps {
  card: CardInterface
}

interface CardItemState {}

export default class CardItem extends React.Component<CardItemProps, CardItemState> {
  render() {
    return (
      <Container fluid className="CardItem">
        <a href={`/details/${this.props.card.id}`}>
          <Row
            className="CardItem__img"
            style={{
              backgroundImage: `url("${this.props.card.img}")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* <img src={`${this.props.img}`} alt={`${this.props.card.title}`}/> */}
          </Row>
          <Row className="CardItem__stickerCont d-flex justify-content-end">
            <div
              className="CardItem__sticker"
              style={{
                backgroundColor: this.props.card.type === 'IndependentLiving' ? '#006F79' : '#EC6608',
              }}
            >
              {this.props.card.type}
            </div>
          </Row>
          <Row className="CardItem__content">
            <div className="CardItem__title w-100">{this.props.card.title}</div>
            <div className="CardItem__address w-100">{this.props.card.address}</div>
            <div className="CardItem__line1 w-100">
              New Properties for Sale from <b>£{this.props.card.price}</b>
            </div>
            <div className="CardItem__line2 w-100">Shared Ownership Available</div>
          </Row>
        </a>
      </Container>
    )
  }
}

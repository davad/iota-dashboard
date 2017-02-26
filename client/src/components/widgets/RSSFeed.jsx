import React, { Component } from 'react';
import Slider from 'react-slick';

class RSSFeed extends Component {
  static propTypes = {
    transactions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  }

  formatSlides(transactions) {
    return transactions.map( (tx, index) => {
      return (
        <p key={tx.index}>
          <blockquote key={tx.index}>
            {tx.sender} sent {tx.value} IOTA to {tx.recipient}
          </blockquote>
        </p>
      );
    });
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 1000,
      beforeChange: function (currentSlide, nextSlide) {
        console.log(new Date().toLocaleString(), 'before change', currentSlide, nextSlide);
      },
      afterChange: function (currentSlide) {
        console.log('after change', currentSlide);
      },
    };

    let transactions = this.props.transactions;

    const slides = (transactions) ? this.formatSlides(this.props.transactions) : <div key='empty' />;

    return (
      <div className="slick-slider">
        {slides}
      </div>
    );
  }
}

export default RSSFeed;

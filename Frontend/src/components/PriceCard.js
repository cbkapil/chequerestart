import React from 'react'

function PriceCard() {
  return (
    <body>

<h2 class="price-heading"> Pricing </h2>
    <div class="pricing-container">
        <div class="pricing-item">
            <h3 class="pricing-kit">Personal</h3>
            <p class="pricing"><sup>$</sup>15 <sub>/MO</sub> </p>
            <ul class="offers">
                <li>2 websites</li>
              
            </ul>
            <button class="order-btn">order now</button>
        </div>
        <div class="pricing-item">
            <h3 class="pricing-kit">Premium</h3>
            <p class="pricing"><sup>$</sup>30 <sub>/MO</sub> </p>
            <ul class="offers">
                <li>50 websites</li>
               
            </ul>
            <button class="order-btn">order now</button>
        </div>
        <div class="pricing-item">
            <h3 class="pricing-kit">Ultimate</h3>
            <p class="pricing"><sup>$</sup>100 <sub>/MO</sub> </p>
            <ul class="offers">
                <li>100 websites</li>
                
            </ul>
            <button class="order-btn">Order Now</button>
        </div>
    </div>
    </body>
  )
}

export default PriceCard
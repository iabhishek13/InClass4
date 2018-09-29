
const dealBtn = document.querySelector('#deal');
let deck_id;
let hand = [];

function initialize() {
  

  const init = fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
                .then(res => res.json())
                .then(data => {
                  
                 deck_id = data.deck_id;             
                  dealBtn.addEventListener('click', () => {
                    let restEndpoint = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
                    fetch(restEndpoint)
                       .then(res => res.json())
                       .then(data => {
                          console.log(data);
                          hand.push(data);
                          render(hand);
                    
                       });
                 });                  
               });
}
function render(view) {
  const main = document.querySelector('main');
  const displayHand = view.map((card, index) => `
    <div data-index=${index} class="card ${card.selected ? 'highlight' : ''}">
      <div class="card-content">
        <p class="title">
          <img src="${card.cards[0].image}" alt="">
        </p>
      </div>
    </div>
  `)
  .join('');
  
  main.innerHTML = displayHand;
  
  const cardflop = [...document.querySelectorAll('.card')];
  
  cardflop.map(card => {
    card.addEventListener('click', function() {
      view[this.dataset.index].selected = true;
      render(view);
    })
  })
}
const keptBtn = document.querySelector('#kept');
keptBtn.addEventListener('click', () => {
  render(hand.filter(card => card.selected));
});
const trashBtn = document.querySelector('#trash');
trashBtn.addEventListener('click', () => {
  render(hand.filter(card => !card.selected));
});
initialize();


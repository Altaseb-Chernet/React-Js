import profile from './assets/image.png';

function Card() {
  return (
    <div className="card">
      <img className='cardimage' src={profile} alt="profile picture" />
      <h2 className='card-title'>Altaseb</h2>
      <p className='card-text'>I am studying still.</p>
      <button className="button">
        more now!
    </button>
    </div>
  );
}

export default Card;

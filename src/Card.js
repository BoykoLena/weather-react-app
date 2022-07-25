function Card() {
  return (
    <div className="text-center">
      <h5>Monday</h5>
      <img
        className="mb-2"
        width={40}
        height={40}
        src="./img/mist.png"
        alt="description"
      />
      <h5 className="mb-0">26°C</h5>
      <p className="m-0">15°C</p>
    </div>
  );
}

export default Card;

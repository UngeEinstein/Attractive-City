import "./HomePage.css";
export const HomePage = () => {
  return (
    <div className="homepage-main-container">
      <div className="homepage-text-container">
        <h2>Attractive City</h2>
        <p>
          There are so many wonderful sights to see in Trondheim. Heyloft aims
          to make choosing the right one fun and easy.
        </p>
        <p>
          {" "}
          Whether you want to look alone or with others is up to you, pick a
          button and start exploring
        </p>
        <div className="homepage-button-container">
          <div className="box-1">
            <a href="/swiper">
              <div className="homepage-btn btn-one">
                <span>Get Swiping</span>
              </div>
            </a>
          </div>
          <div className="box-1">
            <a href="/groups">
              <div className="homepage-btn btn-one">
                <span>Form a group</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

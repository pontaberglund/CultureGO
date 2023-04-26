import React, { useState, useEffect } from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";
import Logo from "../../Components/icons/Logo.svg";
import CityButton from "../../Components/buttons/button";
import City from "../../Components/icons/City";
import Arrow from "../../Components/icons/Arrow";

// const images = [HomeIcon, CultureGo]

const Home = () => {
  const [itemData, setItemData] = useState({
    name: "",
    shortInfo: "",
    images: [],
  });
  const [currentSight, setCurrentSight] = useState(1)
  const [sights, setSights] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/getitem?amount=20");
      const data = await response.json();
      setSights(data)
      setItemData({
        name: data[currentSight].name,
        shortInfo: data[currentSight].short_info,
        images: data[currentSight].images,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white w-full relative overflow-hidden h-[calc(100%-var(--navbar-height))]">
      <Header />
      <div className="flex justify-end px-7">
        <CitySelector />
      </div>

      <div className="bg-white flex flex-col h-[calc(100%-10%-1.5rem)]">
        <div className="relative h-[85%] w-auto font-inriaSans px-3">
          <div
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,1))",
              position: "absolute",
              width: "100%",
              height: "10%",
            }}
          ></div>
          <Image imgUrl={itemData.images[0]} />
          <div className="absolute bottom-0 left-0 right-0 px-3">
            <InfoBox name={itemData.name} info={itemData.shortInfo} />
          </div>
        </div>
        <Buttons currentSightData={[currentSight, setCurrentSight]} itemData={setItemData} sights={sights}/>
      </div>
    </div>
  );
};

export default Home;

const Image = ({ imgUrl }) => {
  return (
    <div className="h-full">
      <img src={imgUrl} className="rounded-b-[30px] object-cover h-full"></img>
    </div>
  );
};

const InfoBox = ({ name, info }) => {
  return (
    <div className="items-center bg-infoColor rounded-[30px] p-3 text-white backdrop-blur-[2px] bg-opacity-30">
      <h1 className="italic text-2xl px-5 font-bold">{name}</h1>
      <p className="text-base p-5">{info} </p>
      <div className="flex justify-end">
        <Arrow />
      </div>
    </div>
  );
};

const Buttons = ({currentSightData: [currentSight, setCurrentSight], itemData, sights}) => {
  function handleClick() {
    if(currentSight === 19) {
      setCurrentSight(0)
    } else {
      setCurrentSight(currentSight + 1)
      console.log(currentSight + 'sfsfes')
    }
    itemData({
      name: sights[currentSight].name,
      shortInfo: sights[currentSight].short_info,
      images: sights[currentSight].images,
    });

    console.log(currentSight)
    console.log(sights[currentSight].name)
  }

  return (
    <div className="h-[15%] flex-col justify-center flex p-5">
      <div className="flex flex-row gap-[30%] justify-center h-32 w-full">
        <div onClick={() => handleClick()}>
          <img src={Dislike}></img>
        </div>
        <div onClick={() => handleClick()}>
          <img src={Like}></img>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="p-3 pt-5 h-[10%]">
      <img src={Logo}></img>
    </header>
  );
};

const CitySelector = () => {
  function clickHandle() {
    console.log("clicked");
  }

  return (
    <CityButton
      text="Stockholm"
      icon={City}
      size="small"
      clickHandler={clickHandle}
    />
  );
};

const ArrowButton = () => {};

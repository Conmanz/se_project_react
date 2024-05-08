import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import { useEffect, useState, useMemo } from "react";
import ItemModal from "../ItemModal/ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
  parseLocation,
} from "../../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItem, removeItem } from "../../utils/api";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temperature, setTemperature] = useState(undefined);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [filteredCards, setFilteredCards] = useState([]);
  const [clothingItems, setClothingItems] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  /** Clothing items the current user owns */
  const ownedItems = useMemo(() => {
    return clothingItems.filter((item) => item.owner === currentUser?._id);
  }, [clothingItems, currentUser]);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCreateModal = () => {
    openModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    openModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const newTemperature = parseWeatherData(data);
        const city = parseLocation(data);

        setTemperature(newTemperature);
        setLocation(city);
      })
      .catch((error) => {
        console.error("error:", error);
      });

    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch((error) => {
        console.error("error:", error);
      });

    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .getUserData(token) // Gets user data using jwt token
        .then((res) => {
          setCurrentUser(res.data);
          setLoggedIn(true);
        })
        .catch((e) => {
          console.error(`Unable to login to user due to: ${e}`);
        });
    }
  }, []);

  useEffect(() => {
    setFilteredCards(
      clothingItems.filter((item) => {
        return item.weather.toLowerCase() === getWeatherType();
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clothingItems, temperature]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && activeModal !== "") {
      handleCloseModal();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const getWeatherType = () => {
    let hot, cold;

    /* Calculate hot & cold temps for currentTemperatureUnit */
    if (currentTemperatureUnit === "F") {
      hot = 86;
      cold = 65;
    } else if (currentTemperatureUnit === "C") {
      hot = 30;
      cold = (65 - 32) * (5 / 9);
    }

    const weatherTemp = temperature?.temperature?.[currentTemperatureUnit];

    if (weatherTemp >= hot) {
      return "hot";
    } else if (weatherTemp <= cold) {
      return "cold";
    } else {
      return "warm";
    }
  };

  const handleOpenConfirmationModal = () => {
    openModal("delete");
  };

  const deleteCard = (cardToDelete) => {
    removeItem(cardToDelete._id)
      .then(() => {
        const newClothingItems = [...clothingItems].filter(
          (card) => card._id !== cardToDelete._id,
        );
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const addCard = ({ name, imageUrl, weather }) => {
    const item = {
      _id: null,
      name,
      imageUrl,
      weather,
    };
    addItem(item)
      .then((res) => {
        // In mock server, a new item is added with an incremented id (ie if there are 17 items, new item will have id of 18)
        // In order for new item to have the same position when added as when page is refreshed, need to add new item to end of array
        setClothingItems([res, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardLike = (_id, isLiked) => {
    if (isLiked) {
      api
        .dislikeClothingItem(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === _id ? updatedCard : c)),
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeClothingItem(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === _id ? updatedCard : c)),
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const signupUser = (values) => {
    console.log(`signupUser values: `, values);
    setLoading(true);
    auth
      .signUp(values)
      .then(() => {
        handleCloseModal();
        loginUser(values);
      })
      .catch((e) => {
        console.error(`Unable to register user due to: ${e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateUser = (values) => {
    setLoading(true);
    auth
      .update(values)
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch((e) => {
        console.error(`Error: Unable to update user`, e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginUser = (values) => {
    setLoading(true);

    auth
      .signIn(values) // Gets jwt token
      .then((res) => {
        const jwt = res.token;
        localStorage.setItem("jwt", jwt);
        auth
          .getUserData(jwt) // Gets user data using jwt token
          .then((res) => {
            setCurrentUser(res.data);
            setLoggedIn(true);
            handleCloseModal();
          })
          .catch((e) => {
            console.error(`Unable to login to user due to: ${e}`);
          });
      })
      .catch((e) => {
        console.error(`Unable to login to user due to: ${e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLoggedIn(false);
  };

  const RenderProtectedProfile = () => {
    if (loggedIn) {
      return (
        <Profile
          cards={ownedItems}
          onSelectCard={handleSelectedCard}
          onCreateModal={handleCreateModal}
          showEditProfileModal={showEditProfileModal}
          logoutUser={logoutUser}
          loggedIn={loggedIn}
          onCardLike={handleCardLike}
        />
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  const showEditProfileModal = () => {
    openModal("edit");
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onSignUp={() => {
              openModal("signUp");
            }}
            onLogIn={() => {
              openModal("logIn");
            }}
            onCreateModal={handleCreateModal}
            location={location}
            isLoggedIn={loggedIn}
          />
          <Switch>
            <Route exact path="/">
              <Main
                cards={filteredCards}
                weatherTemp={temperature?.temperature?.[currentTemperatureUnit]}
                onSelectCard={handleSelectedCard}
                loggedIn={loggedIn}
                onCardLike={handleCardLike}
              />
            </Route>
            {/* renderProtectedProfile does not allow unauthorized user to get to profile page therefore the route is protected */}
            <Route path="/profile">
              {/* According to the instructions, '/profile' is the only route that should be protected */}
              <RenderProtectedProfile />
            </Route>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              loading={loading}
              handleCloseModal={handleCloseModal}
              onAddItem={addCard}
              handleClick={handleOverlayClick}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              handleClick={handleOverlayClick}
              showConfirmationModal={handleOpenConfirmationModal}
            />
          )}
          {activeModal === "signUp" && (
            <RegisterModal
              loading={loading}
              onClose={handleCloseModal}
              openLoginModal={() => {
                handleCloseModal();
                openModal("logIn");
              }}
              registerUser={signupUser}
            />
          )}
          {activeModal === "logIn" && (
            <LoginModal
              loading={loading}
              onClose={handleCloseModal}
              registerUser={signupUser}
              openRegisterModal={() => {
                handleCloseModal();
                openModal("signUp");
              }}
              loginUser={loginUser}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              loading={loading}
              onClose={handleCloseModal}
              updateUser={updateUser}
            />
          )}
          {activeModal === "delete" && (
            <DeleteConfirmationModal
              handleCloseModal={handleCloseModal}
              deleteCard={deleteCard}
              selectedCard={selectedCard}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
